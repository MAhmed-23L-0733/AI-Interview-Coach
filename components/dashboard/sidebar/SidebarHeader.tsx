"use client";

import * as React from "react";
import Link from "next/link";
import { Activity, PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function SidebarHeader({
  isExpanded,
  onToggle,
}: SidebarHeaderProps): React.JSX.Element {
  if (!isExpanded) {
    return (
      <div className="relative group flex h-10 w-10 shrink-0 items-center justify-center">
        <Link
          href="/dashboard"
          aria-label="AI Interview Coach Home"
          title="AI Interview Coach"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)] transition-transform hover:scale-105 active:scale-95"
        >
          <Activity className="h-5 w-5 stroke-[2.5]" />
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-label="Expand sidebar"
          title="Expand sidebar"
          className="absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-blue-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md backdrop-blur-xs cursor-pointer"
        >
          <PanelLeftOpen className="h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/dashboard" className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)]">
          <Activity className="h-5 w-5 stroke-[2.5]" />
        </div>
        <div className="flex min-w-0 flex-col text-left">
          <span className="truncate text-sm font-bold tracking-tight text-white">Interview Coach</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400">PRO MOCK</span>
        </div>
      </Link>
      <button
        type="button"
        onClick={onToggle}
        aria-label="Retract sidebar"
        title="Retract sidebar"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-[#1E293B] hover:text-white"
      >
        <PanelLeftClose className="h-4 w-4" />
      </button>
    </div>
  );
}
