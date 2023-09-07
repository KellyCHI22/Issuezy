import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { userSignup } from "@/apis/auth-api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export function SignupCard() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const signupMutation = useMutation({
    mutationFn: userSignup,
    onSuccess: (data) => {
      navigate("/login");
    },
    onError: (error) => console.log(error.response.data),
  });

  const handleSubmit = () => {
    signupMutation.mutate({ name, email, password, passwordCheck });
  };

  return (
    <Card className="w-[calc(100%-1.5rem)] dark:bg-gray-900 lg:w-[400px] lg:p-3">
      <CardHeader className="space-y-1">
        <ModeToggle />
        <CardTitle className="text-center text-2xl">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Issue management has never been so easy
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password-check">Confirm password</Label>
          <Input
            id="password-check"
            type="password"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full" onClick={handleSubmit}>
          Sign Up
        </Button>
        <div className="mt-3 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-primary">
            login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
