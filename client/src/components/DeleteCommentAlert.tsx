import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertMessage } from "./AlertMassage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Comment, deleteComment } from "@/apis/comment-api";
import { useState } from "react";
import { XOctagon } from "lucide-react";

interface DeleteCommentAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId?: string;
  issueId?: string;
  comment: Comment;
  showDeleteDialog: boolean;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteCommentAlert({
  projectId,
  issueId,
  comment,
  showDeleteDialog,
  setShowDeleteDialog,
}: DeleteCommentAlertProps) {
  const [deleteCommentError, setDeleteCommentError] = useState<string>("");
  const queryClient = useQueryClient();
  const commentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      const { deletedComment } = data;
      queryClient.setQueryData(
        [
          "projects",
          projectId,
          "issues",
          issueId,
          "comments",
          deletedComment.id,
        ],
        deletedComment,
      );
      queryClient.invalidateQueries(
        ["projects", projectId, "issues", issueId, "comments"],
        { exact: true },
      );
      setShowDeleteDialog(false);
    },
    onError: (error) => setDeleteCommentError(error.response.data.message),
  });

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    commentMutation.mutate({ projectId, issueId, commentId: comment.id });
  };

  return (
    <AlertDialog
      open={showDeleteDialog}
      onOpenChange={(open) => {
        setShowDeleteDialog(open);
        setDeleteCommentError("");
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <XOctagon className="text-destructive" />
          <AlertDialogTitle>
            Are you sure about deleting the comment?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            comment.
          </AlertDialogDescription>
          {deleteCommentError && (
            <AlertMessage variant="destructive" message={deleteCommentError} />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
