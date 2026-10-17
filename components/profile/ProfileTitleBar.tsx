"use client";

import { Terminal } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";

export function ProfileTitleBar(): React.JSX.Element {
  const { profile } = useProfileStore();

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Profile &amp; Account
          </h1>
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#111827] border border-[#1F2937] text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10B981]" />
            <span>Syncing across sessions</span>
          </div>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Manage your developer identity, target roles, and interview readiness benchmarks for tailored voice mock interviews.
        </p>
      </div>

      {/* Target Role Session Indicator */}
      <div className="flex items-center gap-3 px-4 py-2 bg-[#111827] border border-[#1F2937] rounded-xl self-start md:self-auto">
        <div className="flex flex-col text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
            Target Role
          </span>
          <span className="text-sm font-semibold text-blue-400">
            {profile.targetRole || "Senior Full-Stack"}
          </span>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#1E293B] border border-[#1F2937] flex items-center justify-center text-blue-400">
          <Terminal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
