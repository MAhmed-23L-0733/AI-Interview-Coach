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
  return (
    <Link
      href={href}
      aria-label={label}
      title={label}
      className={cn(
        "group flex h-10 w-full items-center rounded-xl transition-colors duration-200",
        isActive
          ? "bg-[#1E293B] text-[#3B82F6] shadow-sm ring-1 ring-blue-500/30 font-semibold"
          : "text-slate-400 hover:bg-[#1E293B]/60 hover:text-white"
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        <Icon className="h-5 w-5 shrink-0" />
      </div>
      <span
        className={cn(
          "overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ease-in-out",
          isExpanded ? "max-w-[140px] opacity-100 ml-2.5" : "max-w-0 opacity-0 ml-0"
        )}
      >
        {label}
      </span>
      {isActive && (
        <span
          className={cn(
            "ml-auto mr-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B82F6] shadow-[0_0_6px_#3B82F6] transition-all duration-300 ease-in-out",
            isExpanded ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
          )}
          aria-hidden="true"
        />
      )}
    </Link>
  );
}
