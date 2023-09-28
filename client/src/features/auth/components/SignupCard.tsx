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
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModeToggle } from "@/components/ModeToggle";
import { userSignup } from "@/features/auth/apis/auth-api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertMessage } from "@/components/AlertMassage";
import { AxiosError } from "axios";
import { ErrorResponseData } from "@/lib/axios";

const signupFormSchema = z
  .object({
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
    email: z.string().email().min(1, {
      message: "Email cannot be blank",
    }),
    password: z.string().min(1, {
      message: "Password cannot be blank",
    }),
    passwordCheck: z.string().min(1, {
      message: "Confirm password cannot be blank",
    }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "Passwords don't match",
    path: ["passwordCheck"],
  });

export function SignupCard() {
  const [signupError, setSignupError] = useState<string | undefined>("");
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: userSignup,
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: AxiosError<ErrorResponseData>) =>
      setSignupError(error.response?.data.message),
  });

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    signupMutation.mutate(values);
  }

  return (
    <Card className="w-[calc(100%-1.5rem)] dark:bg-gray-900 lg:w-[400px] lg:p-3">
      <CardHeader className="relative space-y-1">
        <div className="absolute left-6 top-6">
          <ModeToggle />
        </div>
        <CardTitle className="pt-10 text-center text-2xl">
          Create an account
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            {signupError && (
              <AlertMessage variant="destructive" message={signupError} />
            )}
            <div className="flex gap-3">
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
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordCheck"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Sign up
            </Button>
            <div className="mt-3 text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline hover:text-primary">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
