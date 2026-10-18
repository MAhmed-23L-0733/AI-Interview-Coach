"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

interface MobileNavDrawerFooterProps {
  initials?: string;
  name?: string | null;
  onLogoutClick?: () => void;
  onClose: () => void;
}

export function MobileNavDrawerFooter({
  initials = "AM",
  name = "Alex",
  onLogoutClick,
  onClose,
}: MobileNavDrawerFooterProps): React.JSX.Element {
  const pathname = usePathname();
  const displayName = name?.trim() || "Alex";
  const isProfileActive = pathname.startsWith("/profile");

  const handleLogout = (): void => {
    onClose();
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      void signOut({ callbackUrl: "/login" });
    }
  };

  return (
    <div className="flex flex-col gap-3 border-t border-[#1F2937] pt-4">
      <Link
        href="/profile"
        onClick={onClose}
        aria-label={`User profile for ${displayName}`}
        className={cn(
          "flex min-h-[44px] w-full items-center gap-3 rounded-xl border border-[#1F2937] bg-[#111827]/80 p-2.5 transition-all duration-200",
          isProfileActive
            ? "border-blue-500/40 bg-[#1E293B] ring-1 ring-blue-500/30"
            : "hover:bg-[#1E293B]/70"
        )}
      >
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-xs font-bold text-white shadow-sm ring-1 ring-white/10">
          {initials}
          <span
            className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F17]"
            aria-hidden="true"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col text-left">
          <span className="truncate text-sm font-semibold text-slate-200">
            {displayName}
          </span>
          <span className="truncate text-xs text-slate-400">View Profile</span>
        </div>
      </Link>

      <button
        type="button"
        onClick={handleLogout}
        aria-label="Log out"
        className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-[#1E293B]/70 hover:text-red-400"
      >
        <LogOut className="h-5 w-5 shrink-0" />
        <span>Log out</span>
      </button>
    </div>
  );
}
