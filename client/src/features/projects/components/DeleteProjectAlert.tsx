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
import { AlertMessage } from "../../../components/AlertMassage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { deleteProject } from "../apis/project-api";

interface DeleteIssueAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string;
}

export function DeleteProjectAlert({ projectId }: DeleteIssueAlertProps) {
  const [open, setOpen] = useState(false);
  const [deleteProjectError, setDeleteProjectError] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const projectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      const { deletedProject } = data;
      queryClient.setQueryData(["projects", projectId], deletedProject);
      queryClient.invalidateQueries(["projects"], {
        exact: true,
      });
      queryClient.invalidateQueries(["projects", projectId], {
        exact: true,
      });
      setOpen(false);
      navigate(`/projects`);
    },
    onError: (error) => setDeleteProjectError(error.response.data.message),
  });

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    projectMutation.mutate({ projectId });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline-desctructive">
          <Trash2 className="mr-2 h-4 w-4" /> Delete {!isMobile && "project"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <XOctagon className="text-destructive" />
          <AlertDialogTitle>
            Are you sure about deleting the project?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            project.
          </AlertDialogDescription>
          {deleteProjectError && (
            <AlertMessage variant="destructive" message={deleteProjectError} />
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
