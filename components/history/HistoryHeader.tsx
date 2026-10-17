"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";

export function HistoryHeader(): React.JSX.Element {
  const router = useRouter();

  const handleStartInterview = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    router.push(`/interview/session-${Date.now()}`);
  };

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Interview history
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Track your progress across every practice session.
        </p>
      </div>

      <Link
        href="/interview/setup"
        onClick={handleStartInterview}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#3B82F6] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)] transition-all hover:bg-[#2563EB] hover:shadow-[0_6px_20px_rgba(59,130,246,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17]"
      >
        <Mic className="h-4 w-4" />
        <span>Start interview</span>
      </Link>
    </header>
  );
}
