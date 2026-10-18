"use client";

import * as React from "react";
import { Lock } from "lucide-react";

export function SettingsHeader(): React.JSX.Element {
  return (
    <section className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1F2937] pb-6 w-full min-w-0 max-w-full">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">Settings</h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Live Sync
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
          Manage your AI coach preferences, audio devices, and coding environment.
        </p>
      </div>

      <div className="flex items-center gap-2 bg-[#111827] px-3 sm:px-3.5 py-2 rounded-xl border border-[#1F2937] text-xs text-slate-400 self-start md:self-auto shrink-0 max-w-full">
        <Lock className="text-[#3B82F6] w-3.5 h-3.5 shrink-0" />
        <span className="truncate">Config stored locally & encrypted</span>
      </div>
    </section>
  );
}
