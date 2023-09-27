import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMediaQuery } from "react-responsive";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { type Issue, patchIssue } from "@/features/issues/apis/issue-api";
import { AlertMessage } from "../../../components/AlertMassage";
import { type Project } from "@/features/projects/apis/project-api";
import { AxiosError } from "axios";
import { ErrorResponseData } from "@/lib/axios";

interface IssueSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
  issue: Issue;
  showEditSheet: boolean;
  setShowEditSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const issueFormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Title cannot be blank",
    })
    .max(60, {
      message: "Title cannot be more than 60 characters",
    }),
  description: z
    .string()
    .min(1, {
      message: "Description cannot be blank",
    })
    .max(250, {
      message: "Description cannot be more than 250 characters",
    }),
  priority: z.enum(["high", "medium", "low"]),
  categoryId: z.string(),
  status: z.enum(["open", "in progress", "wait for review", "close"]),
});

const PRIORITY_VALUES = {
  high: "1",
  medium: "2",
  low: "3",
};

const PRIORITY_KEYS = {
  "1": "high",
  "2": "medium",
  "3": "low",
};

const STATUS_VALUES = ["open", "in progress", "wait for review", "close"];

export function EditIssueSheet({
  project,
  issue,
  showEditSheet,
  setShowEditSheet,
}: IssueSheetProps) {
  const [editIssueError, setEditIssueError] = useState<string | undefined>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const issueMutation = useMutation({
    mutationFn: patchIssue,
    onSuccess: (data) => {
      const { updatedIssue } = data;
      const issueId = updatedIssue.id.toString();
      queryClient.setQueryData(
        ["projects", project.id.toString(), "issues", issueId],
        updatedIssue,
      );
      queryClient.invalidateQueries(
        ["projects", project.id.toString(), "issues"],
        {
          exact: true,
        },
      );
      queryClient.invalidateQueries(
        ["projects", project.id.toString(), "issues", issueId],
        {
          exact: true,
        },
      );
      setEditIssueError("");
      setShowEditSheet(false);
    },
    onError: (error: AxiosError<ErrorResponseData>) =>
      setEditIssueError(error.response?.data.message),
  });

  const form = useForm<z.infer<typeof issueFormSchema>>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: issue.title,
      description: issue.description,
      priority: PRIORITY_KEYS[issue.priority] as keyof typeof PRIORITY_VALUES,
      categoryId: issue.categoryId.toString(),
      status: issue.status,
    },
  });

  function onSubmit(values: z.infer<typeof issueFormSchema>) {
    issueMutation.mutate({
      projectId: project.id.toString(),
      issueId: issue.id.toString(),
      formData: {
        title: values.title,
        description: values.description,
        categoryId: parseInt(values.categoryId),
        priority: PRIORITY_VALUES[values.priority],
        status: values.status,
      },
    });
  }

  return (
    <Sheet open={showEditSheet} onOpenChange={setShowEditSheet}>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="overflow-y-scroll dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Edit issue</SheetTitle>
            </SheetHeader>
            {editIssueError && (
              <AlertMessage variant="destructive" message={editIssueError} />
            )}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">Title</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="New issue" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">
                    Description
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Textarea
                      rows={6}
                      placeholder="Something about this issue..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-3 rounded-lg">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold">
                      Priority
                    </FormLabel>
                  </div>
                  <FormControl className="col-span-3">
                    <RadioGroup
                      id="priority"
                      name="priority"
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      className="col-span-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="high" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="low" id="low" />
                        <Label htmlFor="low">Low</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">Category</FormLabel>
                  <div className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {project.categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">Status</FormLabel>
                  <div className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {STATUS_VALUES.map((status, index) => (
                          <SelectItem key={index} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">Save changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
