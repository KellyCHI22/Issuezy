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
import { Trash2, XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, deleteCategory } from "../apis/category-api";

interface DeleteCategoryAlertProps
  extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string;
  category: Category;
}

export function DeleteCategoryAlert({
  projectId,
  category,
}: DeleteCategoryAlertProps) {
  const [open, setOpen] = useState(false);
  const [deleteCategoryError, setDeleteCategoryError] = useState<string>("");
  const queryClient = useQueryClient();
  const projectMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"], { exact: true });
      queryClient.invalidateQueries(["projects", projectId], { exact: true });
      queryClient.invalidateQueries(["projects", projectId, "issues"], {
        exact: true,
      });
      queryClient.invalidateQueries(["projects", projectId, "categories"], {
        exact: true,
      });
      setDeleteCategoryError("");
      setOpen(false);
    },
    onError: (error) => setDeleteCategoryError(error.response.data.message),
  });

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    projectMutation.mutate({
      projectId,
      categoryId: category.id,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="ml-auto px-2 py-2">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <XOctagon className="text-destructive" />
          <AlertDialogTitle>
            Are you sure you want to delete category{" "}
            <span className="text-blue-500">"{category.name}"</span> ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            All issues of this category will be marked as "other" category.
          </AlertDialogDescription>
          {deleteCategoryError && (
            <AlertMessage variant="destructive" message={deleteCategoryError} />
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
