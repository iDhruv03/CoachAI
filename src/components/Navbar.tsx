"use client"
import { useUser } from "@clerk/nextjs"
import { ZapIcon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
    const {isSignedIn} = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3">
      <div className = "container mx-auto flex items-center justify-between">
    {/* LOGO */}
    <Link href="/" className="flex items-center gap-2">
          <div className="p-1 bg-primary/10 rounded">
            <ZapIcon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-xl font-bold font-mono">
            code<span className="text-primary">flex</span>.ai
          </span>
        </Link>
      </div>
    </header>
  )
}

export default Navbar;