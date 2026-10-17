"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TranscriptMessage } from "@/components/interview/types";

interface TranscriptMessageItemProps {
  message: TranscriptMessage;
}

export function TranscriptMessageItem({
  message,
}: TranscriptMessageItemProps): React.JSX.Element {
  const isAI = message.speaker === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "relative rounded-xl p-4 transition-colors",
        isAI
          ? "border-l-2 border-[#3B82F6] bg-[#111827]/90 text-slate-200"
          : "border border-[#1F2937] bg-[#1E293B]/70 text-slate-100"
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold uppercase",
              isAI
                ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                : "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30"
            )}
          >
            {message.avatar}
          </div>
          <span className="text-xs font-medium text-white">{message.name}</span>
        </div>
        <span className="font-mono text-[11px] text-slate-500">
          {message.timestamp}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-300">
        {message.content}
      </p>
    </motion.div>
  );
}
