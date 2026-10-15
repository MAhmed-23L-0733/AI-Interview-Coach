"use client";

import * as React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { LogOut, User as UserIcon } from "lucide-react";
import type { SafeUser } from "@/types";

interface AuthNavProps {
  user: SafeUser | null;
}

export function AuthNav({ user }: AuthNavProps): React.JSX.Element {
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleSignOut = async (): Promise<void> => {
    try {
      setIsLoggingOut(true);
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("[SIGN_OUT_ERROR]", error);
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            Log In
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="default" size="sm">
            Sign Up
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-850"
      >
        <UserIcon className="h-3.5 w-3.5 text-zinc-500" />
        <span className="max-w-30 truncate">{user.name || user.email}</span>
      </Link>
      <Button
        variant="outline"
        size="sm"
        onClick={handleSignOut}
        isLoading={isLoggingOut}
        className="gap-1.5 text-xs"
        aria-label="Sign out"
      >
        <LogOut className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Sign Out</span>
      </Button>
    </div>
  );
}
