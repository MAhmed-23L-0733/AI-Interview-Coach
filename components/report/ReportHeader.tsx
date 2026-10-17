"use client";

import * as React from "react";
import { Download, Share2 } from "lucide-react";

interface ReportHeaderProps {
  topicsCount: number;
  date: string;
  duration: string;
  onDownload: () => void;
  onShare: () => void;
}

export function ReportHeader({
  topicsCount,
  date,
  duration,
  onDownload,
  onShare,
}: ReportHeaderProps): React.JSX.Element {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          Interview report
        </h1>
        <p className="mt-1 font-mono text-xs text-slate-400 sm:text-sm">
          {topicsCount} topics • {date} • {duration}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDownload}
          className="flex h-10 items-center gap-2 rounded-xl border border-[#334155] bg-[#111827] px-4 text-xs font-medium text-slate-300 transition-colors hover:border-slate-500 hover:bg-[#1E293B] hover:text-white"
        >
          <Download className="h-4 w-4 text-slate-400" />
          <span>Download report</span>
        </button>

        <button
          type="button"
          onClick={onShare}
          className="flex h-10 items-center gap-2 rounded-xl border border-[#334155] bg-[#111827] px-4 text-xs font-medium text-slate-300 transition-colors hover:border-slate-500 hover:bg-[#1E293B] hover:text-white"
        >
          <Share2 className="h-4 w-4 text-slate-400" />
          <span>Share report</span>
        </button>
      </div>
    </header>
  );
}
