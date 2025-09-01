import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the code from the query params
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    // If no code is provided, redirect to the sign-in page with an error
    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(
        new URL(`/sign-in?error=No authorization code provided`, request.url)
      );
    }

    // Create a supabase client
    const supabase = await createClient();

    // Exchange the code for a session regardless of provider
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    // If there is an error, redirect to the sign-in page with an error
    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(
        new URL(
          `/sign-in?error=${encodeURIComponent(error.message)}`,
          request.url
        )
      );
    }

    // Check if we have a user
    if (!data.user) {
      console.error("No user data received after code exchange");
      return NextResponse.redirect(
        new URL("/sign-in?error=Failed to get user data", request.url)
      );
    }

    // Successful sign in
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    console.error("Unexpected error in auth callback:", error);
    return NextResponse.redirect(
      new URL("/sign-in?error=Something went wrong", request.url)
    );
  }
}
