"use client";

import { motion } from "framer-motion";

interface VoiceAudioHubProps {
  isAISpeaking: boolean;
  isListening: boolean;
}

const WAVEFORM_BAR_HEIGHTS = [
  [8, 22, 12, 28, 14],
  [14, 30, 18, 10, 24],
  [10, 24, 32, 16, 20],
  [16, 32, 24, 36, 12],
  [22, 16, 30, 22, 28],
  [28, 36, 16, 32, 18],
  [18, 24, 34, 18, 30],
  [12, 20, 28, 14, 22],
  [20, 32, 18, 26, 14],
  [14, 26, 32, 20, 28],
  [24, 36, 20, 34, 16],
  [10, 18, 26, 12, 22],
  [18, 28, 16, 30, 14],
  [14, 22, 30, 18, 24],
];

export function VoiceAudioHub({ isAISpeaking, isListening }: VoiceAudioHubProps): React.JSX.Element {
  const isAudioActive = isAISpeaking || isListening;
  const statusLabel = isAISpeaking
    ? "Interviewer is speaking"
    : isListening
      ? "Listening to candidate..."
      : "Interviewer is listening";

  return (
    <div className="flex items-center justify-between rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#1E293B]">
          {isAudioActive && (
            <motion.div
              className="absolute inset-0 rounded-full border border-blue-500/40"
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          )}
          <div className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{statusLabel}</p>
          <p className="text-xs text-slate-400">Technical Assessment Session</p>
        </div>
      </div>

      <div className="flex h-9 items-center gap-1">
        {WAVEFORM_BAR_HEIGHTS.map((heights, idx) => (
          <motion.div
            key={idx}
            className="w-[3px] rounded-full bg-[#3B82F6]"
            animate={{
              height: isAudioActive ? heights : [8, 8],
              opacity: isAudioActive ? [0.6, 1, 0.8] : 0.35,
            }}
            transition={{
              repeat: Infinity,
              duration: 1.1 + (idx % 4) * 0.2,
              ease: "easeInOut",
            }}
            style={{ minHeight: "6px" }}
          />
        ))}
      </div>
    </div>
  );
}
