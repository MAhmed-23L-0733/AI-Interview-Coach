"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceResponseDockProps {
  isListening: boolean;
  onToggleListening: () => void;
}

export function VoiceResponseDock({
  isListening,
  onToggleListening,
}: VoiceResponseDockProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-2 sm:py-3 text-center">
      {/* Interactive Microphone Button with Concentric Glow Waves */}
      <div className="relative flex items-center justify-center">
        {isListening && (
          <span className="absolute h-20 w-20 rounded-full border border-blue-400/40 bg-blue-500/15 animate-ping opacity-75" />
        )}
        <motion.button
          type="button"
          onClick={onToggleListening}
          whileTap={{ scale: 0.96 }}
          aria-label={isListening ? "Stop answering" : "Tap to answer"}
          className={cn(
            "relative flex h-16 w-16 items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
            isListening
              ? "bg-rose-500 shadow-[0_0_24px_rgba(239,68,68,0.5)]"
              : "bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
          )}
        >
          {isListening ? (
            <Square className="h-6 w-6 text-white fill-current" />
          ) : (
            <Mic className="h-7 w-7 text-white" />
          )}
        </motion.button>
      </div>

      {/* Action Title and Instruction Subtext */}
      <div className="mt-3 space-y-0.5">
        <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
          {isListening ? "Listening... click to send" : "Tap to answer"}
        </span>
        <p className="text-[11px] text-slate-400 sm:text-xs">
          Speak naturally — your answer will appear above
        </p>
      </div>
    </div>
  );
}
