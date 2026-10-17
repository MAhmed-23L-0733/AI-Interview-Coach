"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Inbox, RotateCcw, Mic } from "lucide-react";

export function HistoryEmptyState(): React.JSX.Element {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#1F2937] bg-[#1E293B]/60 text-slate-400">
        <Inbox className="h-7 w-7 stroke-[1.5]" />
      </div>

      <h3 className="mt-4 text-base font-semibold text-white">
        No sessions found
      </h3>
      <p className="mt-1 max-w-sm text-xs text-slate-400">
        No interview records match your filter criteria. You can clear your filters or start a new session.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/history")}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-[#334155]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear filters</span>
        </button>

        <Link
          href="/interview/setup"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#3B82F6] px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)] transition-colors hover:bg-[#2563EB]"
        >
          <Mic className="h-3.5 w-3.5" />
          <span>Start interview</span>
        </Link>
      </div>
    </div>
  );
}
