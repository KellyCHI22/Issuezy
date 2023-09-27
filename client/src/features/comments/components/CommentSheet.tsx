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
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "@/features/comments/apis/comment-api";
import { AlertMessage } from "../../../components/AlertMassage";
import { Plus } from "lucide-react";

interface CommentSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string;
  issueId: string;
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

export function CommentSheet({ projectId, issueId }: CommentSheetProps) {
  const [open, setOpen] = useState(false);
  const [addCommentError, setAddCommentError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const commentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data) => {
      const { newComment } = data;
      queryClient.setQueryData(
        ["projects", projectId, "issues", issueId, "comments", newComment.id],
        newComment,
      );
      queryClient.invalidateQueries(
        ["projects", projectId, "issues", issueId, "comments"],
        { exact: true },
      );
      form.reset({ text: "" });
      setAddCommentError("");
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
    commentMutation.mutate({
      projectId: projectId.toString(),
      issueId: issueId.toString(),
      text: values.text,
    });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setAddCommentError("");
      }}
    >
      <SheetTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" /> Add comment
        </Button>
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
