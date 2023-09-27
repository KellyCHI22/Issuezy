import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMediaQuery } from "react-responsive";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postProject } from "@/features/projects/apis/project-api";
import { useState } from "react";
import { AlertMessage } from "../../../components/AlertMassage";
import { Plus } from "lucide-react";
import { AxiosError } from "axios";
import { ErrorResponseData } from "@/lib/axios";

const projectFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Name cannot be blank",
    })
    .max(30, {
      message: "Name cannot be more than 30 characters",
    }),
  description: z
    .string()
    .min(1, {
      message: "Description cannot be blank",
    })
    .max(200, {
      message: "Description cannot be more than 200 characters",
    }),
  isPublic: z.boolean(),
});

export function ProjectSheet() {
  const [open, setOpen] = useState(false);
  const [addProjectError, setAddProjectError] = useState<string | undefined>(
    "",
  );
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const projectMutation = useMutation({
    mutationFn: postProject,
    onSuccess: (data) => {
      const { newProject } = data;
      queryClient.setQueryData(["projects", newProject.id], newProject);
      queryClient.invalidateQueries(["projects"], { exact: true });
      form.reset({ name: "", description: "", isPublic: true });
      setAddProjectError("");
      setOpen(false);
    },
    onError: (error: AxiosError<ErrorResponseData>) =>
      setAddProjectError(error.response?.data.message),
  });

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      isPublic: true,
    },
  });

  function onSubmit(values: z.infer<typeof projectFormSchema>) {
    projectMutation.mutate({
      formData: {
        name: values.name,
        description: values.description,
        isPublic: values.isPublic,
      },
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">
          <Plus className="mr-2 h-4 w-4" />
          Add project
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Add a new project</SheetTitle>
              <SheetDescription>
                Don't forget to save when you're done.
              </SheetDescription>
            </SheetHeader>
            {addProjectError && (
              <AlertMessage variant="destructive" message={addProjectError} />
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">Name</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="My new project" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">
                    Description
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Textarea
                      rows={4}
                      placeholder="Something about this project..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isPublic"
              render={({ field }) => (
                <FormItem className=" flex flex-row items-center justify-between gap-3 rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm font-bold">
                      Public project
                    </FormLabel>
                    <FormDescription>
                      Public projects and issues can be viewed by all users.
                    </FormDescription>
                  </div>
                  <FormControl className="col-span-3">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">Add project</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
