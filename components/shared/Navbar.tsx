import Link from "next/link";
import { connection } from "next/server";
import { auth } from "@/auth";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { AuthNav } from "@/components/shared/AuthNav";
import { ShieldCheck } from "lucide-react";
import type { SafeUser } from "@/types";

/**
 * Server Component: Navbar reads session state directly on the server
 * and passes user state to leaf interactive components.
 */
export async function Navbar(): Promise<React.JSX.Element> {
  await connection();
  const session = await auth();

  const safeUser: SafeUser | null = session?.user
    ? {
        id: session.user.id || "",
        name: session.user.name || null,
        email: session.user.email || "",
        image: session.user.image || null,
      }
    : null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 transition opacity-90 hover:opacity-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-zinc-900 to-zinc-700 text-white shadow-sm dark:from-zinc-100 dark:to-zinc-300 dark:text-zinc-900">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-bold tracking-tight text-zinc-900 text-lg dark:text-white">
              Next Template
            </span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Dashboard
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800" />
          <AuthNav user={safeUser} />
        </div>
      </div>
    </header>
  );
}
