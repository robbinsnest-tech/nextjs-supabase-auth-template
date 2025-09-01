"use client";

import { SignUpFormValues } from "@/lib/types";
import { passwordRequirements, signUpSchema } from "@/lib/forms";
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
import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { GoogleIcon } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { signInWithGoogle, signUpWithEmail } from "@/lib/auth";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [error, setError] = useState("");
  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);
  const [requirements, setRequirements] = useState(
    passwordRequirements.map((req) => ({ ...req, met: false }))
  );
  const [message, setMessage] = useState("");
  const [googleIsLoading, setGoogleIsLoading] = useState(false);

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const newRequirements = passwordRequirements.map((req) => ({
      ...req,
      met: req.test(passwordValue),
    }));
    setRequirements(newRequirements);
  }, [passwordValue]);

  async function onSubmit(formData: SignUpFormValues) {
    // Sign in with email and password, error handling is done in the auth.ts file
    setIsLoading(true);
    setError("");
    const { data, error } = await signUpWithEmail(
      formData.email,
      formData.password,
      formData.firstName,
      formData.lastName
    );
    if (error) {
      setError(error.message);
    } else {
      // Clear all form fields
      form.reset({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Reset password-related states
      setPasswordValue("");
      setShowPasswordRequirements(false);
      setShowPassword(false);
      setShowConfirmPassword(false);

      // Show success message
      setMessage(
        "Email sent! Please check your inbox to confirm your account."
      );
    }
    setIsLoading(false);
  }

  async function googleClickHandler() {
    setGoogleIsLoading(true);
    setError("");

    const { data, error } = await signInWithGoogle();

    if (error) {
      setError(error.message);
      setGoogleIsLoading(false);
      return;
    }

    // Redirect to the Google OAuth URL
    if (data?.url) {
      window.location.href = data.url;
    } else {
      setError("Failed to initiate Google sign in");
      setGoogleIsLoading(false);
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
          Create an Account
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information to create your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium leading-none"
              >
                First Name
              </label>
              <Input
                id="firstName"
                {...form.register("firstName")}
                className={
                  form.formState.errors.firstName ? "border-red-500" : ""
                }
                disabled={isLoading}
                placeholder="John"
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium leading-none"
              >
                Last Name
              </label>
              <Input
                id="lastName"
                {...form.register("lastName")}
                className={
                  form.formState.errors.lastName ? "border-red-500" : ""
                }
                disabled={isLoading}
                placeholder="Doe"
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              {...form.register("email")}
              className={form.formState.errors.email ? "border-red-500" : ""}
              disabled={isLoading}
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
              className="text-sm font-medium leading-none"
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
                disabled={isLoading}
                onChange={(e) => {
                  setPasswordValue(e.target.value);
                  if (e.target.value) setShowPasswordRequirements(true);
                }}
                onFocus={() => setShowPasswordRequirements(true)}
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
            {showPasswordRequirements && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password Requirements:
                </p>
                <div className="space-y-2">
                  {requirements.map((req) => (
                    <div key={req.id} className="flex items-center space-x-2">
                      {req.met ? (
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span
                        className={`text-sm ${
                          req.met ? "text-green-600" : "text-gray-600"
                        }`}
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium leading-none"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...form.register("confirmPassword")}
                className={
                  form.formState.errors.confirmPassword
                    ? "border-red-500 pr-10"
                    : "pr-10"
                }
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-6">
          <Button
            className="w-full"
            disabled={isLoading}
            type="submit"
            variant="default"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
            {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          </Button>

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              googleClickHandler();
            }}
            disabled={googleIsLoading}
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            {googleIsLoading ? "Signing up..." : "Sign up with Google"}
            {googleIsLoading && (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            )}
          </Button>
          {error && (
            <div className="text-sm text-red-500 text-center">{error}</div>
          )}
          {message && (
            <div className="text-sm text-green-500 text-center">{message}</div>
          )}
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#1F4272] hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
