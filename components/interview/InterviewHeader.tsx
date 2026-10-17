"use client";

import * as React from "react";
import Link from "next/link";
import { useState } from "react";
import { AudioLines, Clock, PhoneOff } from "lucide-react";
import { EndInterviewModal } from "./EndInterviewModal";

interface InterviewHeaderProps {
  topic: string;
  formattedTime: string;
}

export function InterviewHeader({
  topic,
  formattedTime,
}: InterviewHeaderProps): React.JSX.Element {
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);

  return (
    <>
      <header className="flex h-16 w-full items-center justify-between border-b border-[#1F2937] bg-[#0B0F17] px-4 lg:px-6">
        {/* Left: Brand + Session Status */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/dashboard"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3B82F6] shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-transform hover:scale-105"
            title="Return to dashboard"
          >
            <AudioLines className="h-5 w-5 text-white" strokeWidth={2.2} />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
              Technical Interview
            </span>
            <div className="flex items-center gap-1.5 rounded-full border border-[#1F2937] bg-[#111827] px-2.5 py-0.5 text-xs text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="font-medium text-slate-200">Live</span>
            </div>
          </div>
        </div>

        {/* Right: Timer, Topic Badge, End Interview Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1.5 rounded-lg border border-[#1F2937] bg-[#111827] px-3 py-1.5 sm:flex">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-mono text-xs font-medium text-slate-200">
              {formattedTime}
            </span>
          </div>

          <div className="hidden rounded-full border border-[#1F2937] bg-[#111827] px-3 py-1 text-xs font-medium text-slate-300 md:block">
            {topic}
          </div>

          <button
            type="button"
            onClick={() => setIsEndModalOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-semibold text-rose-400 transition-colors hover:bg-rose-500/20 sm:text-sm"
          >
            <PhoneOff className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>End interview</span>
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
