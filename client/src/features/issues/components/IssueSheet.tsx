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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
import { postIssue } from "@/features/issues/apis/issue-api";
import { AlertMessage } from "../../../components/AlertMassage";
import { Flag } from "lucide-react";
import { type Project } from "@/features/projects/apis/project-api";

interface IssueSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
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
});

const PRIORITY_VALUES = {
  high: "1",
  medium: "2",
  low: "3",
};

export function IssueSheet({ project }: IssueSheetProps) {
  const [open, setOpen] = useState(false);
  const [addIssueError, setAddIssueError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const issueMutation = useMutation({
    mutationFn: postIssue,
    onSuccess: (data) => {
      const { newIssue } = data;
      queryClient.setQueryData(
        ["projects", project.id, "issues", newIssue.id],
        newIssue,
      );
      queryClient.invalidateQueries(
        ["projects", project.id.toString(), "issues"],
        {
          exact: true,
        },
      );
      form.reset({
        title: "",
        description: "",
        priority: "high",
        categoryId: project.categories[0].id.toString(),
      });
      setAddIssueError("");
      setOpen(false);
    },
    onError: (error) => setAddIssueError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof issueFormSchema>>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "high",
      categoryId: project.categories[0].id.toString(),
    },
  });

  function onSubmit(values: z.infer<typeof issueFormSchema>) {
    issueMutation.mutate({
      projectId: project.id,
      formData: {
        ...values,
        priority: PRIORITY_VALUES[values.priority],
      },
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">
          <Flag className="mr-2 h-4 w-4" />
          Report issue
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="overflow-y-scroll dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Report an issue</SheetTitle>
              <SheetDescription>
                Something is not working with the project? Or any ideas to make
                it better?
              </SheetDescription>
            </SheetHeader>
            {addIssueError && (
              <AlertMessage variant="destructive" message={addIssueError} />
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
                      rows={4}
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
            <SheetFooter>
              <Button type="submit">Report issue</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
