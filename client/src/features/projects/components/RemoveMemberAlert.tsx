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
import { UserMinus2, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeMember } from "../apis/project-api";
import { Member } from "./MembersList";

interface RemoveMemberAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  member: Member;
  projectId: string;
}

export function RemoveMemberAlert({
  member,
  projectId,
}: RemoveMemberAlertProps) {
  const [open, setOpen] = useState(false);
  const [removeMemberError, setRemoveMemberError] = useState<string>("");
  const queryClient = useQueryClient();
  const projectMutation = useMutation({
    mutationFn: removeMember,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"], { exact: true });
      queryClient.invalidateQueries(["projects", projectId], { exact: true });
      queryClient.invalidateQueries(["projects", projectId, "members"], {
        exact: true,
      });
      queryClient.invalidateQueries(["projects", projectId, "issues"]);
      setRemoveMemberError("");
      setOpen(false);
    },
    onError: (error) => setRemoveMemberError(error.response.data.message),
  });

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    projectMutation.mutate({
      projectId,
      memberId: member.id,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="ml-auto px-2 py-2">
          <UserMinus2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <XOctagon className="text-destructive" />
          <AlertDialogTitle>
            Are you sure you want to remove{" "}
            <span className="text-destructive underline">
              {member.firstname} {member.lastname}
            </span>{" "}
            from the project?
          </AlertDialogTitle>
          <AlertDialogDescription>
            The member will not be able to view the project anymore if the
            project is private.
          </AlertDialogDescription>
          {removeMemberError && (
            <AlertMessage variant="destructive" message={removeMemberError} />
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
