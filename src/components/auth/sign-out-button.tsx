"use client";

import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignOutButtonProps {
  variant?: "button" | "menu-item";
  onSignOutSuccess?: () => void;
}

export default function SignOutButton({
  variant = "button",
  onSignOutSuccess,
}: SignOutButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  async function handleSignOut() {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);

    // Start the sign out process after a delay to show the animation
    setTimeout(async () => {
      const { data, error } = await signOut();

      if (!error) {
        setAnimationComplete(true);
        // Add a small delay before redirect to show completion
        setTimeout(() => {
          if (onSignOutSuccess) {
            onSignOutSuccess();
          } else {
            router.push("/sign-in");
          }
        }, 100);
      } else {
        setError("Failed to sign out. Please try again.");
        setIsLoading(false);
        setAnimationComplete(false);
      }
    }, 1000); // Wait for animation before triggering sign out
  }

  if (variant === "menu-item") {
    return (
      <div
        onClick={handleSignOut}
        className={`
          relative overflow-hidden
          px-2 py-1.5
          text-sm w-full
          transition-all duration-1000
          flex items-center
          ${isLoading ? "cursor-not-allowed" : "cursor-pointer hover:bg-red-50"}
          ${animationComplete ? "text-white" : "text-red-600"}
          rounded-sm
        `}
      >
        <div
          className={`
            absolute inset-0 bg-red-600
            transform origin-left
            transition-transform duration-1000
            ${isLoading ? "scale-x-100" : "scale-x-0"}
          `}
        />

        <div
          className={`
            relative z-10 w-full
            transition-colors duration-1000
            ${isLoading || animationComplete ? "text-white" : "text-red-600"}
          `}
        >
          <div className="relative min-w-[120px] flex justify-center mx-auto">
            <div
              className={`
                flex items-center gap-2
                transition-all duration-1000
                ${
                  isLoading
                    ? "translate-x-[calc(100%+0.5rem)] opacity-0"
                    : "opacity-100"
                }
              `}
            >
              <LogOut
                className={`
                  h-4 w-4
                  transition-all duration-1000
                  ${isLoading ? "scale-110" : ""}
                `}
              />
              <span className="whitespace-nowrap">Sign Out</span>
            </div>
            <div
              className={`
                absolute left-1/2 top-0
                -translate-x-1/2
                transition-all duration-1000
                ${
                  isLoading
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }
                text-white whitespace-nowrap
              `}
            >
              <span>Signing out...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {error && <div className="text-sm text-red-500">{error}</div>}
      <button
        onClick={handleSignOut}
        disabled={isLoading}
        className={`
          relative overflow-hidden
          h-9 px-4
          border border-red-600 rounded-md
          text-sm font-medium
          transition-all duration-1000
          flex items-center gap-2
          ${isLoading ? "cursor-not-allowed" : "cursor-pointer hover:bg-red-50"}
          ${animationComplete ? "bg-red-600 text-white" : "text-red-600"}
        `}
      >
        <div
          className={`
            absolute inset-0 bg-red-600
            transform origin-left
            transition-transform duration-1000
            ${isLoading ? "scale-x-100" : "scale-x-0"}
          `}
        />

        <div
          className={`
            relative z-10 flex items-center gap-2
            transition-colors duration-1000
            ${isLoading || animationComplete ? "text-white" : "text-red-600"}
          `}
        >
          <div className="relative min-w-[120px] flex justify-center">
            <div
              className={`
                flex items-center gap-2
                transition-all duration-1000
                ${
                  isLoading
                    ? "translate-x-[calc(100%+0.5rem)] opacity-0"
                    : "opacity-100"
                }
              `}
            >
              <LogOut
                className={`
                  h-4 w-4
                  transition-all duration-1000
                  ${isLoading ? "scale-110" : ""}
                `}
              />
              <span className="whitespace-nowrap">Sign Out</span>
            </div>
            <div
              className={`
                absolute left-1/2 top-0
                -translate-x-1/2
                transition-all duration-1000
                ${
                  isLoading
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-4"
                }
                text-white whitespace-nowrap
              `}
            >
              <span>Signing out...</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
