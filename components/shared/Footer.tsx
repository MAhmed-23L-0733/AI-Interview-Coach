import Link from "next/link";
import { ShieldCheck } from "lucide-react";

/**
 * Global Footer component providing project credits, quick navigation, and legal links.
 */
export function Footer(): React.JSX.Element {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50/50 py-10 dark:border-zinc-850 dark:bg-zinc-950/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-sm text-zinc-600 sm:flex-row sm:px-6 lg:px-8 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">ModeroIQ</span>
          <span>&copy; 2025. All rights reserved.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link
            href="/"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Dashboard
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            GitHub
          </a>
          <a
            href="https://authjs.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            Auth.js Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
