"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mic } from "lucide-react";
import { useTopicStore } from "@/lib/stores/useTopicStore";
import { RadarVisualizer } from "@/components/dashboard/RadarVisualizer";

export function NextSessionCard(): React.JSX.Element {
  const router = useRouter();
  const selectedIds = useTopicStore((state) => state.selectedIds);
  const selectedCount = selectedIds.length;
  const primaryTopicId = selectedIds[0] ?? "data-structures";

  const handleStartInterview = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const newSessionId = `${primaryTopicId}-${Date.now()}`;
    router.push(`/interview/${newSessionId}`);
  };

  return (
    <section
      aria-label="Your Next Session"
      className="relative flex flex-col justify-between gap-8 rounded-2xl border border-[#1F2937] bg-[#111827] p-6 sm:p-8 md:flex-row md:items-center"
    >
      {/* Left Content Column */}
      <div className="max-w-xl space-y-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.1em] text-[#3B82F6] uppercase">
            YOUR NEXT SESSION
          </span>
          <h2 className="mt-1 text-2xl font-bold text-white tracking-tight sm:text-3xl">
            Practice with purpose
          </h2>
        </div>

        <p className="text-sm leading-relaxed text-slate-400">
          Choose a topic and begin a realistic, voice-led technical interview
          with targeted feedback when you&apos;re done.
        </p>

        <div className="hidden md:block pt-2">
          <Link
            href={`/interview/${primaryTopicId}`}
            onClick={handleStartInterview}
            className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-[#3B82F6] px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(37,99,235,0.35)] transition-all hover:bg-[#2563EB] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
          >
            <Mic className="h-4 w-4 stroke-[2.5]" />
            <span>Start interview - {selectedCount} topics</span>
          </Link>
        </div>
      </div>

      {/* Right Column: Audio Radar & Online Status */}
      <div className="flex justify-center md:justify-end">
        <RadarVisualizer />
      </div>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Link
          href={`/interview/${primaryTopicId}`}
          onClick={handleStartInterview}
          aria-label="Start Interview Session"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3B82F6] text-white shadow-[0_4px_24px_rgba(37,99,235,0.45)] transition-transform hover:bg-[#2563EB] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17]"
        >
          <Mic className="h-6 w-6 stroke-[2.5]" />
        </Link>
      </div>
    </section>
  );
}
