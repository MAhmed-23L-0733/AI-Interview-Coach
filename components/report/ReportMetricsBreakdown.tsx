"use client";

import * as React from "react";
import type { ReportDimension, RecommendedFocusItem } from "@/lib/validations/report";

interface ReportMetricsBreakdownProps {
  dimensions: ReportDimension[];
  recommendedFocus: RecommendedFocusItem[];
}

export function ReportMetricsBreakdown({
  dimensions,
  recommendedFocus,
}: ReportMetricsBreakdownProps): React.JSX.Element {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Column 1: Performance Breakdown */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
        <div>
          <h2 className="text-base font-bold text-white">Performance breakdown</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Scores across the key interview dimensions.
          </p>

          <div className="mt-6 space-y-4">
            {dimensions.map((dim) => (
              <div key={dim.label} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-300">{dim.label}</span>
                  <span className="font-mono font-semibold text-slate-400">{dim.score}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1E293B]">
                  <div
                    className="h-full rounded-full bg-blue-500 shadow-xs shadow-blue-500/50"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2: Recommended Focus */}
      <div className="flex flex-col justify-between rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
        <div>
          <h2 className="text-base font-bold text-white">Recommended focus</h2>
          <p className="mt-0.5 text-xs text-slate-400">Your highest-impact next steps.</p>

          <div className="mt-6 space-y-4">
            {recommendedFocus.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3.5 rounded-xl border border-[#1F2937] bg-[#0B0F17]/50 p-3.5 transition-colors hover:border-[#334155]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-blue-500/40 bg-blue-500/10 font-mono text-xs font-bold text-blue-400">
                  {item.id}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-semibold text-white">{item.title}</h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
