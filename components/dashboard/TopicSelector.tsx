"use client";

import * as React from "react";
import { TOPIC_ITEMS, useTopicStore } from "@/lib/stores/useTopicStore";
import { TopicCard } from "@/components/dashboard/TopicCard";
import { TopicSummaryBar } from "@/components/dashboard/TopicSummaryBar";

export function TopicSelector(): React.JSX.Element {
  const { selectedIds, toggleTopic, keepFirstOnly, selectAll } = useTopicStore();

  const isAllSelected = selectedIds.length === TOPIC_ITEMS.length;

  return (
    <section aria-label="Topic Selection" className="space-y-4">
      {/* Header with Quick Action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Choose your topics
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Select one or more areas. At least one topic is required.
          </p>
        </div>

        <button
          type="button"
          onClick={isAllSelected ? keepFirstOnly : selectAll}
          className="text-xs font-medium text-[#3B82F6] transition-colors hover:text-blue-400 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
        >
          {isAllSelected ? "Keep first only" : "Select all"}
        </button>
      </div>

      {/* Responsive 7-Card Grid: 4 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {TOPIC_ITEMS.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            isSelected={selectedIds.includes(topic.id)}
            onToggle={toggleTopic}
          />
        ))}
      </div>

      {/* Selected Topics Summary Strip */}
      <TopicSummaryBar selectedIds={selectedIds} />
    </section>
  );
}
