"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { SignInFormValues } from "@/lib/types";
import { signInSchema } from "@/lib/forms";
import Image from "next/image";
import { GoogleIcon } from "../ui/icons";
import { Separator } from "../ui/separator";
import {
  resendConfirmationEmail,
  signInWithEmail,
} from "@/lib/auth/client-auth";
import { redirect } from "next/navigation";

export default function SignInForm() {
  const [signInIsLoading, setSignInIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showResendEmail, setShowResendEmail] = useState(false);
  const [message, setMessage] = useState("");
  const [resendIsLoading, setResendIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData: SignInFormValues) {
    // Sign in with email and password, error handling is done in the auth.ts file
    setSignInIsLoading(true);
    setError("");
    const { data, error } = await signInWithEmail(
      formData.email,
      formData.password
    );
    if (error && error.message.includes("Email not confirmed")) {
      setError(error.message);
      setShowResendEmail(true);
    } else if (error) {
      setError(error.message);
    } else {
      console.log(data);
      redirect("/dashboard");
    }
    setSignInIsLoading(false);
  }

  async function resendClickHandler() {
    setResendIsLoading(true);
    const { error } = await resendConfirmationEmail(form.getValues("email"));

    if (error) {
      setError(error.message);
    } else {
      setMessage("Confirmation email sent. Please check your inbox.");
      setError("");
      setResendIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto p-4 sm:p-6">
      <CardHeader className="space-y-1">
        <div className="flex justify-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Logo" width={60} height={60} priority />
          </Link>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to sign in to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...form.register("email")}
              className={form.formState.errors.email ? "border-red-500" : ""}
              disabled={signInIsLoading}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                {...form.register("password")}
                className={
                  form.formState.errors.password
                    ? "border-red-500 pr-10"
                    : "pr-10"
                }
                disabled={signInIsLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-6">
          <Button
            className="w-full"
            disabled={signInIsLoading}
            type="submit"
            variant="default"
          >
            {signInIsLoading ? "Signing in..." : "Sign In"}
            {signInIsLoading && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>

          <div className="flex items-center gap-2 w-full">
            <Separator className="flex-1" />
            <span className="text-xs text-gray-500 uppercase">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              // TODO: Implement Google sign in
              console.log("Google sign in clicked");
            }}
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>

          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
          {message && (
            <div className="text-sm text-green-500 text-center">{message}</div>
          )}
          {showResendEmail && (
            <div className="text-sm text-gray-500 text-center">
              <Button
                variant="link"
                onClick={async () => {
                  resendClickHandler();
                }}
              >
                Resend confirmation email
              </Button>
            </div>
          )}
          <div className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-[#1F4272] hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
