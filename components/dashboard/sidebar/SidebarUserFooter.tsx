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

  return (
    <Link
      href="/profile"
      aria-label={`User profile for ${displayName}`}
      title={`View Profile (${displayName})`}
      className={cn(
        "group flex h-11 w-full items-center rounded-xl transition-colors duration-200",
        isActive
          ? "bg-[#1E293B] ring-1 ring-blue-500/30"
          : "hover:bg-[#1E293B]/60"
      )}
    >
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-xs font-bold text-white shadow-sm ring-1 ring-white/10">
        {initials}
        <span
          className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0B0F17]"
          aria-hidden="true"
        />
      </div>
      <div
        className={cn(
          "flex flex-col text-left overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
          isExpanded ? "max-w-[150px] opacity-100 ml-2.5" : "max-w-0 opacity-0 ml-0"
        )}
      >
        <span className="truncate text-sm font-medium text-slate-200">
          {displayName}
        </span>
        <span className="truncate text-xs text-slate-400">View Profile</span>
      </div>
    </Link>
  );
}
