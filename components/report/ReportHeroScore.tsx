"use client";

import * as React from "react";
import { Check, ArrowUpRight } from "lucide-react";

interface ReportHeroScoreProps {
  score: number;
  status: string;
  description: string;
  highlights: string[];
  percentile: string;
  percentileSubtext: string;
}

export function ReportHeroScore({
  score,
  status,
  description,
  highlights,
  percentile,
  percentileSubtext,
}: ReportHeroScoreProps): React.JSX.Element {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] p-6 lg:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: Score + Narrative */}
        <div className="flex flex-1 flex-col gap-6 sm:flex-row sm:items-start">
          {/* Big Score Display */}
          <div className="flex shrink-0 items-baseline gap-1 rounded-2xl border border-[#1F2937] bg-[#0B0F17]/60 px-5 py-4">
            <span className="font-mono text-5xl font-extrabold tracking-tight text-white">
              {score}
            </span>
            <span className="font-mono text-base font-semibold text-slate-500">/100</span>
          </div>

          {/* Performance Narrative */}
          <div className="flex-1">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-blue-400">
              Overall Performance
            </span>
            <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{status}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>

            {/* Highlight Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {highlights.map((item, idx) => {
                const isImprove = item.toLowerCase().includes("improve");
                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border ${
                      isImprove
                        ? "border-blue-500/30 bg-blue-500/10 text-blue-400"
                        : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    {isImprove ? (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    ) : (
                      <Check className="h-3.5 w-3.5" />
                    )}
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Percentile Box */}
        <div className="flex shrink-0 flex-col rounded-2xl border border-[#1F2937] bg-[#0B0F17]/50 p-5 lg:w-48 lg:items-end lg:text-right">
          <span className="font-mono text-2xl font-bold text-white sm:text-3xl">
            {percentile}
          </span>
          <span className="mt-1 text-xs text-slate-400">{percentileSubtext}</span>
          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span
                key={i}
                className={`h-1.5 w-4 rounded-full ${
                  i <= 5 ? "bg-blue-500 shadow-xs shadow-blue-500/50" : "bg-slate-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
