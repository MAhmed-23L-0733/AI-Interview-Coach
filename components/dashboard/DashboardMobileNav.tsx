"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, Home, Clock, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface DashboardMobileNavProps {
  initials?: string;
}

export function DashboardMobileNav({
  initials = "AM",
}: DashboardMobileNavProps): React.JSX.Element {
  return (
    <>
      {/* Mobile Top Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#1F2937] bg-[#0B0F17]/95 px-4 py-3 backdrop-blur-md md:hidden">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3B82F6] text-white">
            <Activity className="h-5 w-5 stroke-[2.5]" />
          </div>
          <span className="text-sm font-bold text-white tracking-tight">
            AI Interview Coach
          </span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#334155] bg-[#1E293B] text-xs font-bold text-slate-200">
          {initials}
        </div>
      </header>

      {/* Mobile Bottom Navigation Dock */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#1F2937] bg-[#0B0F17]/95 px-4 py-2 backdrop-blur-md pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
      >
        <Link
          href="/dashboard"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-[#3B82F6]"
          aria-label="Home"
        >
          <Home className="h-5 w-5" />
        </Link>
        <Link
          href="/history"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-slate-400 hover:text-white"
          aria-label="History"
        >
          <Clock className="h-5 w-5" />
        </Link>
        <Link
          href="/settings"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center text-slate-400 hover:text-white"
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
