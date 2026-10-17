"use client";

import { motion } from "framer-motion";
import { Mic, Square } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceResponseDockProps {
  isListening: boolean;
  onToggleMic: () => void;
}

export function VoiceResponseDock({
  isListening,
  onToggleMic,
}: VoiceResponseDockProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-[#1F2937] bg-[#111827] p-4 text-center shadow-lg">
      <div className="relative mb-2 flex items-center justify-center">
        {isListening && (
          <motion.div
            className="absolute h-16 w-16 rounded-full border-2 border-blue-500/60"
            animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        )}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={onToggleMic}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-full text-white transition-all",
            isListening
              ? "bg-red-500 hover:bg-red-600 shadow-[0_0_24px_rgba(239,68,68,0.5)]"
              : "bg-[#3B82F6] hover:bg-[#2563EB] shadow-[0_4px_20px_rgba(59,130,246,0.35)]"
          )}
          aria-label={isListening ? "Stop listening" : "Tap to answer"}
        >
          {isListening ? (
            <Square className="h-6 w-6 fill-white" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </motion.button>
      </div>

      <p className="text-sm font-medium text-white">
        {isListening ? "Listening..." : "Tap to answer"}
      </p>
      <p className="mt-0.5 text-xs text-slate-400">
        Speak naturally — your answer will appear above
      </p>
    </div>
  );
}
