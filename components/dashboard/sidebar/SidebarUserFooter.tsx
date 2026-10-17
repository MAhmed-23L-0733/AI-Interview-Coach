"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SidebarUserFooterProps {
  initials?: string;
  name?: string | null;
  isExpanded: boolean;
  isActive: boolean;
}

export function SidebarUserFooter({
  initials = "AM",
  name = "Alex",
  isExpanded,
  isActive,
}: SidebarUserFooterProps): React.JSX.Element {
  const displayName = name?.trim() || "Alex";

  if (!isExpanded) {
    return (
      <Link
        href="/profile"
        aria-label={`User profile for ${displayName}`}
        title={`View Profile (${displayName})`}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full border border-[#334155] bg-[#1E293B] text-xs font-bold text-slate-200 shadow-sm transition-all hover:scale-105",
          isActive && "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0B0F17]"
        )}
      >
        {initials}
      </Link>
    );
  }

  return (
    <Link
      href="/profile"
      aria-label={`User profile for ${displayName}`}
      title="View Profile"
      className={cn(
        "flex w-full items-center gap-3 rounded-xl p-2 transition-all duration-200",
        isActive
          ? "bg-[#1E293B] ring-1 ring-blue-500/30"
          : "hover:bg-[#1E293B]/60"
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
        <span className="truncate text-sm font-medium text-slate-200">
          {displayName}
        </span>
        <span className="truncate text-xs text-slate-400">View Profile</span>
      </div>
    </Link>
  );
}
