import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchComment, type Comment } from "@/apis/comment-api";
import { AlertMessage } from "./AlertMassage";

interface EditCommentSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId?: string;
  issueId?: string;
  comment: Comment;
  showEditSheet: boolean;
  setShowEditSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const commentFormSchema = z.object({
  text: z
    .string()
    .min(1, {
      message: "Comment cannot be blank",
    })
    .max(250, {
      message: "Comment cannot be more than 250 characters",
    }),
});

export function EditCommentSheet({
  projectId,
  issueId,
  comment,
  showEditSheet,
  setShowEditSheet,
}: EditCommentSheetProps) {
  const [editCommentError, setEditCommentError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const commentMutation = useMutation({
    mutationFn: patchComment,
    onSuccess: (data) => {
      const { updatedComment } = data;
      queryClient.setQueryData(
        [
          "projects",
          projectId,
          "issues",
          issueId,
          "comments",
          updatedComment.id,
        ],
        updatedComment,
      );
      queryClient.invalidateQueries(
        ["projects", projectId, "issues", issueId, "comments"],
        { exact: true },
      );
      setShowEditSheet(false);
      setEditCommentError("");
    },
    onError: (error) => setEditCommentError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      text: comment.text,
    },
  });

  function onSubmit(values: z.infer<typeof commentFormSchema>) {
    commentMutation.mutate({
      projectId,
      issueId,
      commentId: comment.id,
      text: values.text,
    });
  }

  return (
    <Sheet
      open={showEditSheet}
      onOpenChange={(open) => {
        setShowEditSheet(open);
        setEditCommentError("");
      }}
    >
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Edit comment</SheetTitle>
            </SheetHeader>
            {editCommentError && (
              <AlertMessage variant="destructive" message={editCommentError} />
            )}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem className=" items-center">
                  <FormLabel className="sr-only text-sm font-bold">
                    Text
                  </FormLabel>
                  <FormControl className="">
                    <Textarea
                      rows={6}
                      placeholder="Something about this issue..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
