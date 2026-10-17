"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HistoryIcon } from "@/components/history/HistoryIcon";
import { cn } from "@/lib/utils";
import type { SafeSessionRecord } from "@/lib/validations/history";

interface HistorySessionRowProps {
  session: SafeSessionRecord;
}

const STATUS_STYLES = {
  Strong: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  Good: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  Developing: "border-amber-500/20 bg-amber-500/10 text-amber-400",
} as const;

export function HistorySessionRow({ session }: HistorySessionRowProps): React.JSX.Element {
  const router = useRouter();

  const handleNavigate = (): void => {
    router.push(`/report/${session.id}`);
  };

  return (
    <motion.tr
      onClick={handleNavigate}
      whileHover={{ x: 2 }}
      transition={{ duration: 0.15 }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleNavigate();
        }
      }}
      className="group cursor-pointer border-b border-[#1F2937]/60 transition-colors hover:bg-[#1E293B]/40 focus:bg-[#1E293B]/60 focus:outline-none"
    >
      <td className="py-4 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-[#3B82F6]">
            <HistoryIcon name={session.iconName} className="h-4 w-4" />
          </div>
          <span className="font-medium text-white transition-colors group-hover:text-[#3B82F6]">
            {session.topic}
          </span>
        </div>
      </td>

      <td className="px-3 py-4 font-mono text-sm text-slate-400">
        {session.date}
      </td>

      <td className="px-3 py-4 font-mono text-sm text-slate-400">
        {session.duration}
      </td>

      <td className="px-3 py-4">
        <div className="flex items-baseline gap-0.5 font-mono">
          <span className="text-sm font-bold text-white">{session.score}</span>
          <span className="text-xs text-slate-500">/100</span>
        </div>
      </td>

      <td className="px-3 py-4">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide",
            STATUS_STYLES[session.status]
          )}
        >
          {session.status}
        </span>
      </td>

      <td className="py-4 pl-3 pr-4 text-right">
        <ChevronRight className="inline-block h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-white" />
      </td>
    </motion.tr>
  );
}
