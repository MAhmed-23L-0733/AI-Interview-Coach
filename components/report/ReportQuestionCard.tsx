"use client";

import * as React from "react";
import { Check, User, Sparkles } from "lucide-react";
import type { QuestionAnalysis } from "@/lib/validations/report";

interface ReportQuestionCardProps {
  question: QuestionAnalysis;
}

export function ReportQuestionCard({ question }: ReportQuestionCardProps): React.JSX.Element {
  const statusColorMap = {
    Strong: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    Good: "border-blue-500/30 bg-blue-500/10 text-blue-400",
    Developing: "border-amber-500/30 bg-amber-500/10 text-amber-400",
  } as const;

  return (
    <article className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6 transition-colors hover:border-[#334155]">
      {/* Top Meta Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#334155] bg-[#1E293B] font-mono text-xs font-bold text-blue-400">
            {question.id}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
            {question.topic}
          </span>
        </div>

        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            statusColorMap[question.status]
          }`}
        >
          {question.status}
        </span>
      </div>

      {/* Question Prompt */}
      <h3 className="mt-4 text-base font-bold text-white sm:text-lg">
        {question.prompt}
      </h3>

      {/* Expected vs User Response Grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            <span>Expected response</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {question.expectedResponse}
          </p>
        </div>

        <div className="rounded-xl border border-[#1F2937] bg-[#0B0F17]/60 p-4">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-400">
            <User className="h-3.5 w-3.5" />
            <span>Your response</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-300">
            {question.userResponse}
          </p>
        </div>
      </div>

      {/* Coach Assessment Banner */}
      <div className="mt-4 rounded-xl border border-[#332a1f] border-l-4 border-l-amber-500 bg-[#1c160e]/50 p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Coach assessment</span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-slate-300">
          {question.coachAssessment}
        </p>
      </div>
    </article>
  );
}
