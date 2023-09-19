import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertMessage } from "./AlertMassage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIssue } from "@/apis/issue-api";
import { useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DeleteIssueAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId?: string;
  issueId?: string;
}

export function DeleteIssueAlert({
  projectId,
  issueId,
}: DeleteIssueAlertProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteIssueError, setDeleteIssueError] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const issueMutation = useMutation({
    mutationFn: deleteIssue,
    onSuccess: (data) => {
      const { deletedIssue } = data;
      queryClient.setQueryData(
        ["projects", projectId, "issues", issueId],
        deletedIssue,
      );
      queryClient.invalidateQueries(["projects", projectId, "issues"], {
        exact: true,
      });
      setIsOpen(false);
      navigate(`/projects/${projectId}`);
    },
    onError: (error) => setDeleteIssueError(error.response.data.message),
  });

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    issueMutation.mutate({ projectId, issueId });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline-desctructive">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure about deleting the comment?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            comment.
          </AlertDialogDescription>
          {deleteIssueError && (
            <AlertMessage variant="destructive" message={deleteIssueError} />
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
