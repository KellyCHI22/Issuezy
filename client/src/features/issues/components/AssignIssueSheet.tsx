import { Button } from "@/components/ui/button";
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
import { type Issue, assignIssue } from "@/features/issues/apis/issue-api";
import { AlertMessage } from "../../../components/AlertMassage";
import { type Project } from "@/features/projects/apis/project-api";

interface IssueSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
  issue: Issue;
  showAssignSheet: boolean;
  setShowAssignSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const assignIssueFormSchema = z.object({
  assigneeId: z.string().optional().nullable(),
});

export function AssignIssueSheet({
  project,
  issue,
  showAssignSheet,
  setShowAssignSheet,
}: IssueSheetProps) {
  const [assignIssueError, setAssignIssueError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const issueMutation = useMutation({
    mutationFn: assignIssue,
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
      setAssignIssueError("");
      setShowAssignSheet(false);
    },
    onError: (error) => setAssignIssueError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof assignIssueFormSchema>>({
    resolver: zodResolver(assignIssueFormSchema),
    defaultValues: {
      assigneeId: issue.assigneeId?.toString(),
    },
  });

  function onSubmit(values: z.infer<typeof assignIssueFormSchema>) {
    if (values.assigneeId) {
      issueMutation.mutate({
        projectId: project.id,
        issueId: issue.id,
        formData: {
          assigneeId: parseInt(values.assigneeId),
        },
      });
    } else {
      setAssignIssueError("Please select a member");
    }
  }

  return (
    <Sheet open={showAssignSheet} onOpenChange={setShowAssignSheet}>
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Assign issue</SheetTitle>
              <SheetDescription>
                Only project members can assign issues or be assigned.
              </SheetDescription>
            </SheetHeader>
            {assignIssueError && (
              <AlertMessage variant="destructive" message={assignIssueError} />
            )}
            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">Assignee</FormLabel>
                  <div className="col-span-3">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? field.value : undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select user" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {project.Members.map((member) => (
                          <SelectItem
                            key={member.id}
                            value={member.id.toString()}
                          >
                            {member.firstname} {member.lastname}
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
