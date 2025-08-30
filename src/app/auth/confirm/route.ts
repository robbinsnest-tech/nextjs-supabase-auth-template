import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get token hash and type from query params
    const searchParams = request.nextUrl.searchParams;
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type") as "email";

    if (!tokenHash || !type) {
      return NextResponse.redirect(
        new URL("/sign-in?error=Missing confirmation parameters", request.url)
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type,
    });

    if (error) {
      return NextResponse.redirect(
        new URL(
          `/sign-in?error=${encodeURIComponent(error.message)}`,
          request.url
        )
      );
    }

    // Successful verification
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } catch (error) {
    return NextResponse.redirect(
      new URL("/sign-in?error=Something went wrong", request.url)
    );
  }
}
