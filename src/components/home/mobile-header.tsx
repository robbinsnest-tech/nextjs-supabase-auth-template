"use client";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="flex md:hidden flex-col w-full">
        <div className="flex justify-between items-center px-6 py-4 border-b w-full">
          <Link
            href="/"
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <Image src="/logo.png" alt="Logo" width={60} height={60} priority />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleContent className="px-6 py-4 border-b space-y-4">
            <div className="flex flex-col gap-4 w-full">
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="lg" className="w-full">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </header>
    </>
  );
}
