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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "@/apis/auth-api";
import { useMutation } from "@tanstack/react-query";
import { ModeToggle } from "./ModeToggle";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";
import { AlertMessage } from "./AlertMassage";

const loginFormSchema = z.object({
  email: z.string().email().nonempty({
    message: "Email cannot be blank",
  }),
  password: z.string().nonempty({
    message: "Password cannot be blank",
  }),
});

export function LoginCard() {
  const [loginError, setLoginError] = useState<string>("");
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      navigate("/projects");
    },
    onError: (error) => setLoginError(error.response.data.message),
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <Card className="w-[calc(100%-1.5rem)] dark:bg-gray-900 lg:w-[400px] lg:p-3">
      <CardHeader className="relative space-y-1">
        <div className="absolute left-6 top-6">
          <ModeToggle />
        </div>
        <img src={logoLight} className="mx-auto h-36 w-36 dark:hidden" />
        <img src={logoDark} className="mx-auto hidden h-36 w-36 dark:block " />
        <CardTitle className="text-center text-2xl">Welcome back</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            {loginError && (
              <AlertMessage variant="destructive" message={loginError} />
            )}
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
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit">
              Login
            </Button>
            <div className="mt-3 text-sm text-muted-foreground">
              Don't have an account yet?{" "}
              <Link to="/signup" className="underline hover:text-primary">
                sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
