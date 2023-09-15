import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "@/apis/comment-api";
import { AlertMessage } from "./AlertMassage";

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

export function CommentSheet({ projectId, issueId }) {
  const [open, setOpen] = useState(false);
  const [addCommentError, setAddCommentError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const commentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      const { newComment } = data.data;
      queryClient.setQueryData(
        ["projects", projectId, "issues", issueId, "comments", newComment.id],
        newComment,
      );
      queryClient.invalidateQueries(
        ["projects", projectId, "issues", issueId, "comments"],
        { exact: true },
      );
      setOpen(false);
    },
    onError: (error) => setAddCommentError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(values: z.infer<typeof commentFormSchema>) {
    console.log(values);
    commentMutation.mutate({
      projectId,
      issueId,
      text: values.text,
    });
  }

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset({ text: "" });
      setAddCommentError("");
    }
  }, [form.formState]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">Add comment</Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Add comment</SheetTitle>
            </SheetHeader>
            {addCommentError && (
              <AlertMessage variant="destructive" message={addCommentError} />
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
              <Button type="submit">Send</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
