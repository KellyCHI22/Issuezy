import { Button } from "@/components/ui/button";
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
import { AlertMessage } from "@/components/AlertMassage";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Category, patchCategory } from "../apis/category-api";

interface EditCategorySheetProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string;
  category: Category;
}

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Category name cannot be blank",
    })
    .max(20, {
      message: "Category name cannot be more than 20 characters",
    }),
});

export function EditCategorySheet({
  projectId,
  category,
}: EditCategorySheetProps) {
  const [open, setOpen] = useState(false);
  const [editCategoryError, setEditCategoryError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const categoryMutation = useMutation({
    mutationFn: patchCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"], { exact: true });
      queryClient.invalidateQueries(["projects", projectId], { exact: true });
      queryClient.invalidateQueries(["projects", projectId, "issues"], {
        exact: true,
      });
      queryClient.invalidateQueries(["projects", projectId, "categories"], {
        exact: true,
      });
      form.reset({ name: "" });
      setEditCategoryError("");
      setOpen(false);
    },
    onError: (error) => setEditCategoryError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: category.name,
    },
  });

  function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    categoryMutation.mutate({
      projectId,
      categoryId: category.id.toString(),
      name: values.name,
    });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setEditCategoryError("");
      }}
    >
      <SheetTrigger asChild>
        <Button variant="outline" className="ml-auto px-2 py-2">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit category</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Edit category</SheetTitle>
            </SheetHeader>
            {editCategoryError && (
              <AlertMessage variant="destructive" message={editCategoryError} />
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="My category" {...field} />
                  </FormControl>
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
