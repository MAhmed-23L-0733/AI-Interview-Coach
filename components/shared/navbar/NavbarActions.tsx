"use client";

import Link from "next/link";
import { ArrowRight, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AuthNav } from "@/components/shared/AuthNav";
import type { SafeUser } from "@/types";

interface NavbarActionsProps {
  readonly user: SafeUser | null;
}

export function NavbarActions({ user }: NavbarActionsProps): React.JSX.Element {
  return (
    <div className="hidden md:flex items-center gap-3">

      {user ? (
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button
              size="sm"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.55)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-blue-200 transition-transform group-hover:rotate-6" />
              <span>Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5 text-blue-200 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <AuthNav user={user} />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl px-3.5 py-2 transition-colors"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="sm"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Practicing</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
