"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TranscriptMessage } from "./types";

interface TranscriptItemProps {
  message: TranscriptMessage;
}

export function TranscriptItem({
  message,
}: TranscriptItemProps): React.JSX.Element {
  const isAi = message.speaker === "ai";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "group relative flex items-start gap-3 rounded-xl py-2 transition-all",
        message.isActive && "border-l-2 border-[#3B82F6] pl-3.5 bg-blue-500/[0.03]"
      )}
    >
      {/* Avatar Container */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold tracking-wider",
          isAi
            ? "border border-blue-500/30 bg-[#1E293B] text-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.2)]"
            : "border border-slate-700 bg-[#1E293B] text-slate-300"
        )}
      >
        {message.avatar}
      </div>

      {/* Message Content & Speaker Metadata */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-white sm:text-sm">
            {message.name}
          </span>
          <span className="font-mono text-[11px] text-slate-500">
            {message.timestamp}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed sm:text-sm">
          {message.content}
        </p>
      </div>
    </motion.div>
  );
}
