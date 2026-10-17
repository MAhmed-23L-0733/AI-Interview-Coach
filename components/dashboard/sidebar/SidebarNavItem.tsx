"use client";

import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  isExpanded: boolean;
}

export function SidebarNavItem({
  href,
  label,
  icon: Icon,
  isActive,
  isExpanded,
}: SidebarNavItemProps): React.JSX.Element {
  if (!isExpanded) {
    return (
      <Link
        href={href}
        aria-label={label}
        title={label}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200",
          isActive
            ? "bg-[#1E293B] text-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.25)] ring-1 ring-blue-500/40"
            : "text-slate-400 hover:bg-[#1E293B]/70 hover:text-white"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-[#1E293B] text-[#3B82F6] shadow-sm ring-1 ring-blue-500/20 font-semibold"
          : "text-slate-400 hover:bg-[#1E293B]/60 hover:text-white"
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="truncate">{label}</span>
      {isActive && (
        <span
          className="ml-auto h-1.5 w-1.5 rounded-full bg-[#3B82F6] shadow-[0_0_6px_#3B82F6]"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
