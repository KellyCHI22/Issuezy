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
import { AlertMessage } from "../../../components/AlertMassage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteIssue } from "@/features/issues/apis/issue-api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { XOctagon } from "lucide-react";

interface DeleteIssueAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string;
  issueId: string;
  showDeleteDialog: boolean;
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DeleteIssueAlert({
  projectId,
  issueId,
  showDeleteDialog,
  setShowDeleteDialog,
}: DeleteIssueAlertProps) {
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
      setShowDeleteDialog(false);
      navigate(`/projects/${projectId}`);
    },
    onError: (error) => setDeleteIssueError(error.response.data.message),
  });

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    issueMutation.mutate({ projectId, issueId });
  };

  return (
    <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <XOctagon className="text-destructive" />
          <AlertDialogTitle>
            Are you sure about deleting the issue?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            issue.
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
