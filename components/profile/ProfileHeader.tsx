"use client";

import * as React from "react";
import { Bell, Sliders } from "lucide-react";

export function ProfileHeader(): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 hidden md:flex w-full items-center justify-between border-b border-[#1F2937]/80 bg-[#0B0F17]/90 px-8 py-3.5 backdrop-blur-md">
      {/* Brand / Breadcrumb Area */}
      <div className="flex items-center gap-3">
        <span className="font-bold text-white tracking-tight text-lg">Syntropic Coach</span>
        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/30">
          PRO
        </span>
        <span className="text-slate-600">/</span>
        <span className="font-medium text-slate-300 text-sm">Profile & Account</span>
      </div>

      {/* Top Right Actions */}
      <div className="flex items-center gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1F2937] text-slate-400 transition-colors hover:bg-[#1E293B] hover:text-white"
          title="Notifications"
          type="button"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1F2937] text-slate-400 transition-colors hover:bg-[#1E293B] hover:text-white"
          title="Configure session audio"
          type="button"
        >
          <Sliders className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
