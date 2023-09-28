import { AlertMessage } from "@/components/AlertMassage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { X } from "lucide-react";
import UserAvatar from "@/components/UserAvatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CurrentUser, patchUser } from "../apis/user-api";
import { AxiosError } from "axios";
import { ErrorResponseData } from "@/lib/axios";

interface UserProfileFormProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUser: CurrentUser;
}

const userProfileFormSchema = z.object({
  firstname: z
    .string()
    .min(1, {
      message: "Required",
    })
    .max(20, {
      message: "First name cannot be more than 20 characters",
    }),
  lastname: z
    .string()
    .min(1, {
      message: "Required",
    })
    .max(20, {
      message: "Last name cannot be more than 20 characters",
    }),
});

export default function UserProfileForm({ currentUser }: UserProfileFormProps) {
  const [editProfileError, setEditProfileError] = useState<string | undefined>(
    "",
  );
  const queryClient = useQueryClient();
  const userMutation = useMutation({
    mutationFn: patchUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"], { exact: true });
      queryClient.invalidateQueries(["projects"]);
      setEditProfileError("");
    },
    onError: (error: AxiosError<ErrorResponseData>) =>
      setEditProfileError(error.response?.data.message),
  });

  const form = useForm<z.infer<typeof userProfileFormSchema>>({
    resolver: zodResolver(userProfileFormSchema),
    defaultValues: {
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
    },
  });

  function onSubmit(values: z.infer<typeof userProfileFormSchema>) {
    if (
      values.firstname === currentUser.firstname &&
      values.lastname === currentUser.lastname
    ) {
      return setEditProfileError("No changes are made.");
    }
    userMutation.mutate({
      userId: currentUser.id.toString(),
      formData: {
        firstname: values.firstname,
        lastname: values.lastname,
      },
    });
  }

  function handleReset() {
    form.reset({
      firstname: currentUser.firstname,
      lastname: currentUser.lastname,
    });
    setEditProfileError("");
  }

  return (
    <Card className="w-[calc(100%-1.5rem)] dark:bg-gray-900 lg:w-[400px]">
      <CardHeader className="relative space-y-1">
        <CardTitle className="text-xl">Profile</CardTitle>
        <UserAvatar
          user={currentUser}
          className="absolute right-7 top-6 h-16 w-16 text-2xl"
        />
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4 pt-5">
            {editProfileError && (
              <AlertMessage
                variant="destructive"
                message={editProfileError}
                className="mt-3"
              />
            )}
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="space-x-3">
            <Button className="" type="submit">
              Update profile
            </Button>
            <Button variant="secondary" type="button" onClick={handleReset}>
              <X className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
