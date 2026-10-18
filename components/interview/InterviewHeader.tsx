"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { AudioLines, Clock, PhoneOff } from "lucide-react";
import { EndInterviewModal } from "./session/EndInterviewModal";

interface InterviewHeaderProps {
  topic: string;
  formattedTime: string;
}

export function InterviewHeader({
  topic,
  formattedTime,
}: InterviewHeaderProps): React.JSX.Element {
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  React.useEffect(() => {
    setIsEndModalOpen(false);
  }, [topic]);

  return (
    <>
      <header className="flex h-14 sm:h-16 w-full max-w-full items-center justify-between border-b border-[#1F2937] bg-[#0B0F17] px-3 sm:px-4 lg:px-6 min-w-0 overflow-hidden shrink-0">
        {/* Left: Brand + Session Status */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 mr-2">
          <Link
            href="/dashboard"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-transform hover:scale-105 shrink-0"
            title="Return to dashboard"
          >
            <AudioLines className="h-4 w-4 sm:h-5 sm:w-5 text-white" strokeWidth={2.2} />
          </Link>
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0">
            <span className="text-xs sm:text-base font-semibold tracking-tight text-white truncate max-w-[90px] xs:max-w-[130px] sm:max-w-none">
              <span className="hidden xs:inline">Technical </span>Interview
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-xs text-emerald-400 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium">Live</span>
            </div>
          </div>
        </div>

        {/* Right: Timer, Topic Badge, End Interview Button */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 rounded-lg border border-[#1F2937] bg-[#111827] px-2 sm:px-3 py-1 sm:py-1.5 shrink-0">
            <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span className="font-mono text-[11px] sm:text-xs font-medium text-slate-200">
              {formattedTime}
            </span>
          </div>

          <div className="hidden rounded-full border border-[#1F2937] bg-[#111827] px-3 py-1 text-xs font-medium text-slate-300 md:block">
            {topic}
          </div>

          <button
            type="button"
            onClick={() => setIsEndModalOpen(true)}
            aria-label="End interview"
            className="flex items-center gap-1.5 sm:gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/20 sm:text-sm shrink-0"
          >
            <PhoneOff className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
            <span className="hidden sm:inline">End interview</span>
            <span className="sm:hidden">End</span>
          </button>
        </div>
      </header>

      <EndInterviewModal
        isOpen={isEndModalOpen}
        onClose={() => setIsEndModalOpen(false)}
      />
    </>
  );
}
