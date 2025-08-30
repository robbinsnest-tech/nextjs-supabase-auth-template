import { createClient } from "@/utils/supabase/client";

// Sign up with email and password and first name and last name
export async function signUpWithEmail(
  email: string,
  password: string,
  firstName: string,
  lastName: string
) {
  try {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });
    if (error) {
      return {
        data: null,
        error,
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
      error: new Error("Something went wrong. Please try again."),
    };
  }
}

// Sign in with email and password
export async function signInWithEmail(email: string, password: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return {
        data: null,
        error,
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
      error: new Error("Something went wrong. Please try again."),
    };
  }
}

// Sign out
export async function signOut() {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return {
        data: null,
        error,
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
      error: new Error("Something went wrong. Please try again."),
    };
  }
}

// Get current auth user
export async function getUser() {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      return {
        data: null,
        error,
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
      error: new Error("Something went wrong. Please try again."),
    };
  }
}

// Resend confirmation email
export async function resendConfirmationEmail(email: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });
    if (error) {
      return {
        data: null,
        error,
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
      error: new Error("Something went wrong. Please try again."),
    };
  }
}
