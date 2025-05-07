"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold">Todo App</span>
        </Link>

        <nav className="flex items-center gap-4">
          <ThemeToggle />
          <Button
            asChild
            variant={pathname === "/user-profile" ? "default" : "ghost"}
            className={pathname === "/user-profile" ? " font-bold" : ""}
          >
            <Link
              href="/user-profile"
              aria-current={pathname === "/user-profile" ? "page" : undefined}
            >
              Profile
            </Link>

          </Button>
          <Button
            asChild
            variant={pathname === "/todos" ? "default" : "ghost"}
            className={pathname === "/todos" ? " font-bold" : ""}
          >
            <Link href="/todos">My Todos</Link>
          </Button>
          <UserButton />
        </nav>
      </div>
    </header>
  );
}