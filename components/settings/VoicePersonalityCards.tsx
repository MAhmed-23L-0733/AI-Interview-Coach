"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Play, Volume2 } from "lucide-react";
import type { VoicePersonality } from "@/lib/validations/settings";

interface VoiceOption {
  id: VoicePersonality;
  name: string;
  tagline: string;
  description: string;
}

const VOICES: VoiceOption[] = [
  {
    id: "nova",
    name: "Nova",
    tagline: "Neural 48kHz",
    description: "Calm & Professional. Balanced cadence tailored for architecture walkthroughs.",
  },
  {
    id: "echo",
    name: "Echo",
    tagline: "Neural 48kHz",
    description: "Direct & Technical. Fast-paced, concise questioning for algorithms & logic.",
  },
  {
    id: "alloy",
    name: "Alloy",
    tagline: "Neural 48kHz",
    description: "Energetic & Conversational. Encouraging style geared toward mock warmups.",
  },
];

interface VoicePersonalityCardsProps {
  value: VoicePersonality;
  onChange: (voice: VoicePersonality) => void;
  playingVoice: VoicePersonality | null;
  onPlaySample: (voice: VoicePersonality) => void;
}

export function VoicePersonalityCards({
  value,
  onChange,
  playingVoice,
  onPlaySample,
}: VoicePersonalityCardsProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full min-w-0 max-w-full">
      {VOICES.map((voice) => {
        const isSelected = value === voice.id;
        const isPlaying = playingVoice === voice.id;

        return (
          <motion.div
            key={voice.id}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(voice.id)}
            className={`group cursor-pointer relative rounded-xl p-3.5 sm:p-4 transition-colors min-w-0 w-full ${
              isSelected
                ? "bg-[#1E293B] border-2 border-[#3B82F6] shadow-[0_0_16px_rgba(59,130,246,0.35)]"
                : "bg-[#111827] hover:bg-[#1E293B]/70 border border-[#1F2937]"
            }`}
          >
            <div className="flex items-center justify-between mb-2 gap-2">
              <span className="font-semibold text-white text-base truncate">{voice.name}</span>
              {isSelected ? (
                <CheckCircle2 className="w-5 h-5 text-[#3B82F6] fill-[#3B82F6]/20 shrink-0" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-slate-600 group-hover:border-slate-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed sm:min-h-[36px] break-words">{voice.description}</p>
            <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-[#1F2937] gap-2">
              <span className="text-[11px] font-mono text-slate-500 truncate">{voice.tagline}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onPlaySample(voice.id);
                }}
                className={`text-xs flex items-center gap-1 font-medium transition-colors shrink-0 ${
                  isPlaying ? "text-[#10B981]" : "text-[#3B82F6] hover:text-white"
                }`}
              >
                {isPlaying ? <Volume2 className="w-3.5 h-3.5 animate-bounce shrink-0" /> : <Play className="w-3.5 h-3.5 shrink-0" />}
                {isPlaying ? "Playing..." : "Sample"}
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
