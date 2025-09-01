"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";

// Sign up with email and password and first name and last name
export async function signUpWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const supabase = await createClient();

    // Get the current request headers to determine the origin for email verification callback
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = headersList.get("x-forwarded-proto") || "https";

    // Construct the callback URL with Vercel protection bypass if available
    const emailRedirectTo = `${protocol}://${host}`;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo,
      },
    });
    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }
    return {
      data,
      error: null,
    };
  } catch (err) {
    console.error("Unexpected sign up error:", err);
    return {
      data: null,
      error: "Something went wrong. Please try again.",
    };
  }
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }
    return {
      data,
      error: null,
    };
  } catch (err) {
    console.error("Unexpected sign up error:", err);
    return {
      data: null,
      error: "Something went wrong. Please try again.",
    };
  }
}

// Sign in with google
export async function signInWithGoogle() {
  try {
    const supabase = await createClient();

    // Get the current request headers to determine the origin for email verification callback
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = headersList.get("x-forwarded-proto") || "https";

    // Construct the callback URL with Vercel protection bypass if available
    const redirectTo = `${protocol}://${host}/auth/callback`;

    // Sign in with google and redirect to the callback URL
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: {
          prompt: "select_account",
          scope: "openid email profile",
        },
      },
    });
    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }

    if (!data.url) {
      return {
        data: null,
        error: "Failed to get authorization URL",
      };
    }

    return {
      data: { url: data.url },
      error: null,
    };
  } catch (err) {
    console.error("Unexpected get user error:", err);
    return {
      data: null,
      error: "Something went wrong. Please try again.",
    };
  }
}

// Sign out
export async function signOut() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return {
        data: null,
        error: error.message,
      };
    } else {
      return {
        data: null,
        error: null,
      };
    }
  } catch (err) {
    console.error("Unexpected sign out error:", err);
    return {
      data: null,
      error: "Something went wrong. Please try again.",
    };
  }
}

// Get current auth user
export async function getUser() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }
    return {
      data,
      error: null,
    };
  } catch (err) {
    console.error("Unexpected get user error:", err);
    return {
      data: null,
      error: "Something went wrong. Please try again.",
    };
  }
}

// Resend confirmation email
export async function resendConfirmationEmail(email: string) {
  try {
    const supabase = await createClient();

    // Get the current request headers to determine the origin for email verification callback
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = headersList.get("x-forwarded-proto") || "https";

    // Construct the callback URL with Vercel protection bypass if available
    const emailRedirectTo = `${protocol}://${host}`;

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo,
      },
    });
    if (error) {
      return {
        data: null,
        error: error.message,
      };
    }
    return {
      data: null,
      error: null,
    };
  } catch (err) {
    console.error("Unexpected get user error:", err);
    return {
      data: null,
      error: "Something went wrong. Please try again.",
    };
  }
}
