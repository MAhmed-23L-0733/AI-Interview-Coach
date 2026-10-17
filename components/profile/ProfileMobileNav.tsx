"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Home, History, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileMobileNavProps {
  userInitials?: string;
}

export function ProfileMobileNav({ userInitials = "AM" }: ProfileMobileNavProps): React.JSX.Element {
  const pathname = usePathname();
  const isProfile = pathname.startsWith("/profile");

  return (
    <>
      {/* Mobile Top Header */}
      <header className="flex h-14 items-center justify-between border-b border-[#1F2937] bg-[#0B0F17]/95 px-4 backdrop-blur-md md:hidden sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]">
            <Activity className="h-4 w-4" />
          </div>
          <span className="font-bold text-white text-sm">Syntropic Coach</span>
          <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/30">
            PRO
          </span>
        </div>
        <Link
          href="/profile"
          aria-label="User Profile"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-xs font-bold text-white ring-2 ring-blue-500/80"
        >
          {userInitials}
        </Link>
      </header>

      {/* Mobile Bottom Navigation Bar (Touch target >= 44px) */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[#1F2937] bg-[#0B0F17]/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <Link
          href="/dashboard"
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-slate-400 hover:text-white"
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link
          href="/dashboard#history"
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-slate-400 hover:text-white"
        >
          <History className="h-5 w-5" />
          <span className="text-[10px]">History</span>
        </Link>
        <Link
          href="/profile"
          className={cn(
            "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1",
            isProfile ? "text-blue-400 font-semibold" : "text-slate-400 hover:text-white"
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px]">Profile</span>
        </Link>
        <Link
          href="/dashboard#settings"
          className="flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 text-slate-400 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          <span className="text-[10px]">Settings</span>
        </Link>
      </nav>
    </>
  );
}
