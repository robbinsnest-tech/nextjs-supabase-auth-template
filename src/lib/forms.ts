import * as z from "zod";

// Password requirements for sign up form
export const passwordRequirements = [
  {
    id: "minLength",
    label: "At least 8 characters",
    test: (v: string) => v.length >= 8,
  },
  {
    id: "hasNumber",
    label: "Contains a number",
    test: (v: string) => /\d/.test(v),
  },
  {
    id: "hasUpper",
    label: "Contains an uppercase letter",
    test: (v: string) => /[A-Z]/.test(v),
  },
  {
    id: "hasLower",
    label: "Contains a lowercase letter",
    test: (v: string) => /[a-z]/.test(v),
  },
  {
    id: "hasSpecial",
    label: "Contains a special character",
    test: (v: string) => /[!@#$%^&*(),.?":{}|<>]/.test(v),
  },
];

// Sign up form schema
export const signUpSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/\d/, { message: "Password must contain a number" })
      .regex(/[A-Z]/, { message: "Password must contain an uppercase letter" })
      .regex(/[a-z]/, { message: "Password must contain a lowercase letter" })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain a special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Sign in form schema
export const signInSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
