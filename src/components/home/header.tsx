import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <>
      <header className="hidden md:flex justify-between items-center px-6 py-4 border-b">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.png" alt="Logo" width={60} height={60} priority />
          </Link>
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
