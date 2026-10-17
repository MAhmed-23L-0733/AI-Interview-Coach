"use client";

import * as React from "react";
import { ShieldAlert } from "lucide-react";
import type { FeedbackStrictness } from "@/lib/validations/settings";

interface FeedbackStrictnessControlProps {
  value: FeedbackStrictness;
  onChange: (strictness: FeedbackStrictness) => void;
}

interface StrictnessOption {
  id: FeedbackStrictness;
  title: string;
  description: string;
}

const OPTIONS: StrictnessOption[] = [
  {
    id: "forgiving",
    title: "Forgiving",
    description: "Focuses on high-level design; glosses over minor syntax leaks and micro-optimizations.",
  },
  {
    id: "standard",
    title: "Standard",
    description: "Balanced critique assessing algorithmic complexity and clear modular communication.",
  },
  {
    id: "strict",
    title: "FAANG Strict",
    description: "Zero-tolerance on Big-O space/time omissions, corner edge cases, and unbounded recursion.",
  },
];

export function FeedbackStrictnessControl({
  value,
  onChange,
}: FeedbackStrictnessControlProps): React.JSX.Element {
  return (
    <div className="pt-4 border-t border-[#1F2937]">
      <div className="flex items-center justify-between mb-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          AI Feedback Strictness & Rubric
        </label>
        <span className="text-xs text-[#3B82F6] font-medium flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5" />
          Target: L5 / Senior Level
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#111827] p-1.5 rounded-xl border border-[#1F2937]">
        {OPTIONS.map((opt) => {
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`p-3 text-left rounded-lg transition-all ${
                isSelected
                  ? "bg-[#1E293B] border border-[#3B82F6] text-white shadow-[0_0_12px_rgba(59,130,246,0.25)] relative"
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#1E293B]/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-semibold ${isSelected ? "text-[#3B82F6]" : "text-slate-200"}`}>
                  {opt.title}
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">{opt.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
