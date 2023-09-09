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
import { ModeToggle } from "./ModeToggle";
import { userSignup } from "@/apis/auth-api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AlertMessage } from "./AlertMassage";

const signupFormSchema = z
  .object({
    name: z
      .string()
      .min(1, {
        message: "Name cannot be blank",
      })
      .max(25, {
        message: "Name cannot be more than 25 characters",
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
  const [signupError, setSignupError] = useState<string>("");
  const navigate = useNavigate();
  const signupMutation = useMutation({
    mutationFn: userSignup,
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error) => setSignupError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
    signupMutation.mutate(values);
  }

  const handleSubmit = () => {
    // signupMutation.mutate({ name, email, password, passwordCheck });
  };

  return (
    <Card className="w-[calc(100%-1.5rem)] dark:bg-gray-900 lg:w-[400px] lg:p-3">
      <CardHeader className="relative space-y-1">
        <div className="absolute left-6 top-6">
          <ModeToggle />
        </div>
        <CardTitle className="pt-7 text-center text-2xl">
          Create an account
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            {signupError && (
              <AlertMessage variant="destructive" message={signupError} />
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
