import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="hidden md:flex justify-between items-center px-6 py-4 border-b">
        <div className="flex items-center">
          <Button asChild variant="ghost" size="lg">
            <Link href="/">Home</Link>
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="lg">
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </header>
    </>
  );
}
