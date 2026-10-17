"use client";

import * as React from "react";
import Link from "next/link";
import { Mic, ArrowLeft } from "lucide-react";

interface ReportBottomActionsProps {
  topic?: string;
}

export function ReportBottomActions({
  topic = "Data Structures",
}: ReportBottomActionsProps): React.JSX.Element {
  const topicSlug = topic.toLowerCase().replace(/\s+/g, "-");

  return (
    <nav
      aria-label="Report navigation"
      className="flex flex-col gap-4 pt-4 pb-12 sm:flex-row sm:items-center sm:justify-between"
    >
      <Link
        href="/history"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#1F2937] bg-[#111827] px-5 text-xs font-medium text-slate-300 transition-colors hover:border-[#334155] hover:bg-[#1E293B] hover:text-white sm:text-sm"
      >
        <ArrowLeft className="h-4 w-4 text-slate-400" />
        <span>Back to history</span>
      </Link>

      <Link
        href={`/dashboard?practice=${topicSlug}`}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 text-xs font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-500 sm:text-sm"
      >
        <Mic className="h-4 w-4" />
        <span>Practice this topic again</span>
      </Link>
    </nav>
  );
}
