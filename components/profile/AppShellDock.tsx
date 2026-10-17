"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, History, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppShellDockProps {
  userInitials?: string;
}

export function AppShellDock({ userInitials = "AM" }: AppShellDockProps): React.JSX.Element {
  const pathname = usePathname();
  const isProfile = pathname.startsWith("/profile");

  return (
    <aside className="fixed top-0 left-0 hidden h-screen w-[72px] flex-col items-center justify-between border-r border-[#1F2937] bg-[#0B0F17] py-6 z-50 md:flex">
      {/* Brand Icon */}
      <div className="flex flex-col items-center gap-6 w-full">
        <Link
          href="/dashboard"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-transform hover:scale-105 active:scale-95"
          title="Syntropic Coach"
        >
          <Activity className="h-5 w-5" />
        </Link>

        {/* Primary Destination Nav */}
        <nav aria-label="Main Navigation" className="flex flex-col items-center gap-2 w-full px-2">
          <Link
            href="/dashboard"
            className="flex w-full items-center justify-center rounded-lg p-3 text-slate-400 transition-colors hover:bg-[#1E293B]/60 hover:text-white"
            title="Home"
          >
            <Home className="h-5 w-5" />
          </Link>
          <Link
            href="/dashboard#history"
            className="flex w-full items-center justify-center rounded-lg p-3 text-slate-400 transition-colors hover:bg-[#1E293B]/60 hover:text-white"
            title="History"
          >
            <History className="h-5 w-5" />
          </Link>
          <Link
            href="/dashboard#settings"
            className="flex w-full items-center justify-center rounded-lg p-3 text-slate-400 transition-colors hover:bg-[#1E293B]/60 hover:text-white"
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        <Link
          href="#help"
          className="flex w-full items-center justify-center rounded-lg p-3 text-slate-400 transition-colors hover:bg-[#1E293B]/60 hover:text-white"
          title="Help & Documentation"
        >
          <HelpCircle className="h-5 w-5" />
        </Link>

        <div className="h-px w-8 bg-[#1F2937] my-1" />

        {/* User Profile Avatar with active ring */}
        <Link
          href="/profile"
          className={cn(
            "flex w-full items-center justify-center rounded-lg p-2 transition-colors",
            isProfile ? "bg-[#1E293B] border-l-2 border-blue-500" : "hover:bg-[#1E293B]/60"
          )}
          title="Profile & Account"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-xs font-bold text-white shadow-[0_0_12px_rgba(59,130,246,0.4)] ring-2 ring-blue-500/80 ring-offset-2 ring-offset-[#0B0F17]">
            {userInitials}
          </div>
        </Link>
      </div>
    </aside>
  );
}
