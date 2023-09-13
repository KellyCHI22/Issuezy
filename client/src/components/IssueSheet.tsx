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
  FormDescription,
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
import { useEffect, useState } from "react";
import { postIssue } from "@/apis/issue-api";
import { AlertMessage } from "./AlertMassage";

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
    .max(300, {
      message: "Description cannot be more than 300 characters",
    }),
  priority: z.number().min(1).max(3),
  categoryId: z.string(),
});

export function IssueSheet({ project }) {
  const [open, setOpen] = useState(false);
  const [addIssueError, setAddIssueError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const issueMutation = useMutation({
    mutationFn: postIssue,
    onSuccess: (data) => {
      const { newIssue } = data.data;
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
      setOpen(false);
    },
    onError: (error) => setAddIssueError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof issueFormSchema>>({
    resolver: zodResolver(issueFormSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: 1,
      categoryId: project.categories[0].id.toString(),
    },
  });

  function onSubmit(values: z.infer<typeof issueFormSchema>) {
    issueMutation.mutate({ projectId: project.id, formData: values });
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({
        title: "",
        description: "",
        priority: 1,
        categoryId: project.categories[0].id.toString(),
      });
    }
  }, [form.formState]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">Report an issue</Button>
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
                Add a new issue here. Click save when you're done.
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
                <FormItem className=" flex flex-row items-center justify-between gap-3 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold">
                      Priority
                    </FormLabel>
                    <FormDescription>
                      Public projects and issues can be viewed by all users.
                    </FormDescription>
                  </div>
                  <FormControl className="col-span-3">
                    <RadioGroup
                      id="priority"
                      name="priority"
                      defaultValue={field.value.toString()}
                      className="col-span-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id="high" />
                        <Label htmlFor="high">High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="2" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3" id="low" />
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
                          <SelectItem value={category.id.toString()}>
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
              <Button type="submit">Add Issue</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
