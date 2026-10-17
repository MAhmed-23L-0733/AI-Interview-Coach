"use client";

import * as React from "react";
import { Check } from "lucide-react";

interface ReportTopicsCoveredProps {
  topics: readonly string[];
  activeTopic: string;
  onSelectTopic: (topic: string) => void;
}

export function ReportTopicsCovered({
  topics,
  activeTopic,
  onSelectTopic,
}: ReportTopicsCoveredProps): React.JSX.Element {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-[#1F2937] bg-[#111827] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-base font-bold text-white">Topics covered</h2>
        <p className="mt-0.5 text-xs text-slate-400">
          Pick topic to evaluate full details, player stats and verbal transcript view
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {topics.map((topic) => {
          const isActive = activeTopic.toLowerCase() === topic.toLowerCase();
          return (
            <button
              key={topic}
              type="button"
              onClick={() => onSelectTopic(topic)}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? "border border-blue-500/60 bg-blue-500/15 text-blue-400 shadow-xs shadow-blue-500/20"
                  : "border border-[#334155] bg-[#1E293B] text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              <Check
                className={`h-3.5 w-3.5 transition-opacity ${
                  isActive ? "opacity-100 text-blue-400" : "opacity-40 text-slate-500"
                }`}
              />
              <span>{topic}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
