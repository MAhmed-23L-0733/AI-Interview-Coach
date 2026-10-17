"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, Home, Clock, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { DashboardMobileNav } from "@/components/dashboard/DashboardMobileNav";

interface DashboardSidebarProps {
  initials?: string;
}

export function DashboardSidebar({
  initials = "AM",
}: DashboardSidebarProps): React.JSX.Element {
  return (
    <>
      {/* Desktop Fixed Left Navigation Rail (72px) */}
      <aside
        aria-label="Sidebar Navigation"
        className="fixed bottom-0 left-0 top-0 z-40 hidden w-[72px] flex-col items-center justify-between border-r border-[#1F2937] bg-[#0B0F17] py-6 md:flex"
      >
        {/* Top: Brand Waveform Logo & Nav Icons */}
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/dashboard"
            aria-label="AI Interview Coach Home"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)] transition-transform hover:scale-105 active:scale-95"
          >
            <Activity className="h-6 w-6 stroke-[2.5]" />
          </Link>

          <nav className="flex flex-col items-center gap-2">
            <Link
              href="/dashboard"
              aria-label="Home"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1E293B] text-[#3B82F6] transition-colors"
            >
              <Home className="h-5 w-5" />
            </Link>

            <Link
              href="/history"
              aria-label="Interview History"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-[#1E293B]/70 hover:text-white"
            >
              <Clock className="h-5 w-5" />
            </Link>

            <Link
              href="/settings"
              aria-label="Settings"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-[#1E293B]/70 hover:text-white"
            >
              <Settings className="h-5 w-5" />
            </Link>

            <button
              type="button"
              onClick={() => signOut({ callbackUrl: "/login" })}
              aria-label="Log out"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-[#1E293B]/70 hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </nav>
        </div>

        {/* Bottom: User Avatar */}
        <div
          aria-label="User Avatar"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#334155] bg-[#1E293B] text-xs font-bold text-slate-200 shadow-sm"
        >
          {initials}
        </div>
      </aside>

      {/* Mobile Navigation Leaves */}
      <DashboardMobileNav initials={initials} />
    </>
  );
}
