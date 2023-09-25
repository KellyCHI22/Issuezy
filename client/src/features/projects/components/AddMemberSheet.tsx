import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { addMember } from "@/features/projects/apis/project-api";
import { useState } from "react";
import { AlertMessage } from "../../../components/AlertMassage";
import { UserPlus2 } from "lucide-react";

interface AddMemberSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  projectId: string;
}

const addMemberFormSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email cannot be blank",
  }),
});

export function AddMemberSheet({ projectId }: AddMemberSheetProps) {
  const [open, setOpen] = useState(false);
  const [addMemberError, setAddMemberError] = useState<string>("");
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const queryClient = useQueryClient();
  const projectMutation = useMutation({
    mutationFn: addMember,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"], { exact: true });
      queryClient.invalidateQueries(["projects", projectId], { exact: true });
      queryClient.invalidateQueries(["projects", projectId, "members"], {
        exact: true,
      });
      form.reset({ email: "" });
      setAddMemberError("");
      setOpen(false);
    },
    onError: (error) => setAddMemberError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof addMemberFormSchema>>({
    resolver: zodResolver(addMemberFormSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof addMemberFormSchema>) {
    projectMutation.mutate({
      projectId,
      formData: {
        ...values,
      },
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <UserPlus2 className="mr-2 h-4 w-4" />
          {isMobile ? "Add" : "Add member"}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={isMobile ? "bottom" : "right"}
        className="dark:bg-gray-900"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <SheetHeader>
              <SheetTitle>Add a new member</SheetTitle>
              <SheetDescription>
                Type user emails to add new members.
              </SheetDescription>
            </SheetHeader>
            {addMemberError && (
              <AlertMessage variant="destructive" message={addMemberError} />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center">
                  <FormLabel className="text-sm font-bold">Email</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage className="col-span-4" />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type="submit">Add member</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
