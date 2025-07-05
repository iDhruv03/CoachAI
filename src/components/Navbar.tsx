"use client"
import { useUser } from "@clerk/nextjs"

const Navbar = () => {
    const {isSignedIn} = useUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border py-3">
      <div className = "container mx-auto flex items-center justify-between">

      </div>
    </header>
  )
}

export default Navbar;