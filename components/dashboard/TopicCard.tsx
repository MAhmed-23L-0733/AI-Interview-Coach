"use client";

import * as React from "react";
import {
  Network,
  Activity,
  Boxes,
  Cpu,
  Globe,
  Sparkles,
  Code2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TopicItem } from "@/lib/stores/useTopicStore";

const ICONS = {
  Network,
  Activity,
  Boxes,
  Cpu,
  Globe,
  Sparkles,
  Code2,
} as const;

interface TopicCardProps {
  topic: TopicItem;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export function TopicCard({
  topic,
  isSelected,
  onToggle,
}: TopicCardProps): React.JSX.Element {
  const IconComponent = ICONS[topic.iconName];

  return (
    <button
      type="button"
      onClick={() => onToggle(topic.id)}
      className={cn(
        "group relative flex min-h-[108px] flex-col justify-between rounded-xl p-4 text-left transition-all duration-200 select-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F17]",
        isSelected
          ? "border-[1.5px] border-[#3B82F6] bg-[#111827] shadow-[0_0_20px_rgba(59,130,246,0.15)]"
          : "border border-[#1F2937] bg-[#111827] hover:border-slate-700 hover:bg-[#131b2e]"
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
            isSelected
              ? "bg-[#1E293B] text-[#3B82F6]"
              : "bg-[#1E293B]/70 text-slate-400 group-hover:text-slate-300"
          )}
        >
          <IconComponent className="h-4 w-4" />
        </div>

        {isSelected ? (
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#3B82F6] text-white shadow-sm">
            <Check className="h-3 w-3 stroke-[3]" />
          </div>
        ) : (
          <div className="h-5 w-5 rounded-full border border-slate-700/60 transition-colors group-hover:border-slate-600" />
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-sm font-semibold text-white tracking-tight">
          {topic.title}
        </h3>
        <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">
          {topic.subtitle}
        </p>
      </div>
    </button>
  );
}
