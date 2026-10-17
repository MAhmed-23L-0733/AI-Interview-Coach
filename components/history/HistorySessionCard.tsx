"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { HistoryIcon } from "@/components/history/HistoryIcon";
import { cn } from "@/lib/utils";
import type { SafeSessionRecord } from "@/lib/validations/history";

interface HistorySessionCardProps {
  session: SafeSessionRecord;
}

const STATUS_STYLES = {
  Strong: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Good: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Developing: "border-amber-500/20 bg-amber-500/10 text-amber-400",
} as const;

export function HistorySessionCard({ session }: HistorySessionCardProps): React.JSX.Element {
  return (
    <Link
      href={`/report/${session.id}`}
      className="group block min-h-[44px] rounded-xl border border-[#1F2937] bg-[#1E293B]/40 p-4 transition-colors hover:border-[#334155] hover:bg-[#1E293B]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-[#3B82F6]">
            <HistoryIcon name={session.iconName} className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white group-hover:text-[#3B82F6]">
              {session.topic}
            </h4>
            <div className="mt-1 flex items-center gap-2 font-mono text-xs text-slate-400">
              <span>{session.date}</span>
              <span>•</span>
              <span>{session.duration}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <div className="flex items-center gap-1">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                STATUS_STYLES[session.status]
              )}
            >
              {session.status}
            </span>
            <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white" />
          </div>

          <div className="flex items-baseline gap-0.5 font-mono">
            <span className="text-sm font-bold text-white">{session.score}</span>
            <span className="text-xs text-slate-500">/100</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
