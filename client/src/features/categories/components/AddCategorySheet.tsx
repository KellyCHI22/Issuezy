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
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { postCategory } from "../apis/category-api";

interface AddCategorySheetProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string;
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

export function AddCategorySheet({ projectId }: AddCategorySheetProps) {
  const [open, setOpen] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const categoryMutation = useMutation({
    mutationFn: postCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"], { exact: true });
      queryClient.invalidateQueries(["projects", projectId], { exact: true });
      queryClient.invalidateQueries(["projects", projectId, "categories"], {
        exact: true,
      });
      form.reset({ name: "" });
      setAddCategoryError("");
      setOpen(false);
    },
    onError: (error) => setAddCategoryError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    categoryMutation.mutate({
      projectId,
      name: values.name,
    });
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setAddCategoryError("");
      }}
    >
      <SheetTrigger asChild>
        <Button variant="secondary">
          <Plus className="mr-2 h-4 w-4" />
          Add category
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Add a new category</SheetTitle>
            </SheetHeader>
            {addCategoryError && (
              <AlertMessage variant="destructive" message={addCategoryError} />
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="New category" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">Add category</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
