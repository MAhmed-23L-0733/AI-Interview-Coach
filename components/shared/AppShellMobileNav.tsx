"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, Clock, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface AppShellMobileNavProps {
  initials?: string;
}

export function AppShellMobileNav({
  initials = "AM",
}: AppShellMobileNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#1F2937] bg-[#0B0F17]/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            <Activity className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-sm font-bold tracking-tight text-white">
            AI Interview Coach
          </span>
        </div>
        <Link
          href="/profile"
          aria-label="User profile and account settings"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[#334155] bg-[#1E293B] text-xs font-bold text-slate-200 transition-colors hover:border-[#3B82F6] hover:text-white"
        >
          {initials}
        </Link>
      </header>

      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#1F2937] bg-[#0B0F17]/95 px-4 py-2 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <Link
          href="/dashboard"
          className={cn(
            "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl transition-colors",
            pathname === "/dashboard" ? "text-[#3B82F6]" : "text-slate-400 hover:text-white"
          )}
          aria-label="Home"
        >
          <Home className="h-5 w-5" />
        </Link>
        <Link
          href="/history"
          className={cn(
            "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl transition-colors",
            pathname.startsWith("/history") ? "text-[#3B82F6]" : "text-slate-400 hover:text-white"
          )}
          aria-label="History"
        >
          <Clock className="h-5 w-5" />
        </Link>
        <Link
          href="/settings"
          className={cn(
            "flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl transition-colors",
            pathname.startsWith("/settings") ? "text-[#3B82F6]" : "text-slate-400 hover:text-white"
          )}
          aria-label="Settings"
        >
          <Settings className="h-5 w-5" />
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-slate-400 hover:text-red-400"
          aria-label="Log out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </nav>
    </>
  );
}
