import * as z from "zod";
import { signInSchema, signUpSchema } from "@/lib/forms";

// Sign up form values
export type SignUpFormValues = z.infer<typeof signUpSchema>;

// Sign in form values
export type SignInFormValues = z.infer<typeof signInSchema>;
