"use client";

import * as React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import type { FeedbackItem } from "@/lib/validations/report";

interface ReportTopicFeedbackProps {
  topicName: string;
  strengths: FeedbackItem[];
  gaps: FeedbackItem[];
}

export function ReportTopicFeedback({
  topicName,
  strengths,
  gaps,
}: ReportTopicFeedbackProps): React.JSX.Element {
  return (
    <section className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Topic-level feedback</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Detailed observations from your interview.
          </p>
        </div>
        <span className="self-start rounded-full border border-[#334155] bg-[#1E293B] px-3 py-1 font-mono text-xs text-slate-400 sm:self-auto">
          {topicName}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Strengths Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Strengths</span>
          </div>

          <div className="space-y-3">
            {strengths.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#1F2937] bg-[#0B0F17]/50 p-3.5"
              >
                <h3 className="text-xs font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Knowledge Gaps Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <span>Knowledge gaps</span>
          </div>

          <div className="space-y-3">
            {gaps.map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#1F2937] bg-[#0B0F17]/50 p-3.5"
              >
                <h3 className="text-xs font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
