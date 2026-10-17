"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { TOPIC_ITEMS } from "@/lib/stores/useTopicStore";

interface TopicSummaryBarProps {
  selectedIds: string[];
}

export function TopicSummaryBar({
  selectedIds,
}: TopicSummaryBarProps): React.JSX.Element {
  const selectedTopics = TOPIC_ITEMS.filter((item) =>
    selectedIds.includes(item.id)
  );

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
          <Check className="h-3 w-3 stroke-[3]" />
        </div>
        <span className="text-xs font-semibold text-emerald-400">
          {selectedIds.length} of {TOPIC_ITEMS.length} topics selected
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
        {selectedTopics.map((topic, index) => (
          <span key={topic.id} className="inline-flex items-center gap-1.5">
            {topic.title}
            {index < selectedTopics.length - 1 && (
              <span className="text-slate-600 hidden sm:inline">•</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
