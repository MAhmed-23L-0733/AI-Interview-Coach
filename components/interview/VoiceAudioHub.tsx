"use client";

import * as React from "react";
import { Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoiceAudioHubProps {
  isSpeaking: boolean;
  speakerTitle?: string;
  speakerSubtitle?: string;
}

export function VoiceAudioHub({
  isSpeaking,
  speakerTitle = "Interviewer is speaking",
  speakerSubtitle = "Follow-up question",
}: VoiceAudioHubProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#1F2937] bg-[#111827] p-3.5 sm:p-4 shadow-sm">
      {/* Left: Concentric Radar Avatar + Status */}
      <div className="flex items-center gap-3 sm:gap-3.5">
        <div className="relative flex h-11 w-11 items-center justify-center">
          {/* Outer Pulsing Halo */}
          {isSpeaking && (
            <span className="absolute inset-0 rounded-full border border-blue-500/30 bg-blue-500/10 animate-ping opacity-50" />
          )}
          {/* Concentric Border Ring */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#1E293B] bg-[#0B0F17]">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6] shadow-[0_0_14px_rgba(59,130,246,0.5)]">
              <Volume2 className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-tight text-white">
            {speakerTitle}
          </h2>
          <p className="text-xs text-slate-400">{speakerSubtitle}</p>
        </div>
      </div>

      {/* Right: Vertical Waveform Equalizer Bars */}
      <div className="flex h-7 items-center gap-1 px-1" aria-label="Audio waveform indicator">
        {[
          { h: "h-3", anim: "wave-anim-1" },
          { h: "h-5", anim: "wave-anim-2" },
          { h: "h-7", anim: "wave-anim-3" },
          { h: "h-4", anim: "wave-anim-4" },
          { h: "h-6", anim: "wave-anim-5" },
          { h: "h-3", anim: "wave-anim-2" },
          { h: "h-5", anim: "wave-anim-1" },
        ].map((bar, idx) => (
          <span
            key={idx}
            className={cn(
              "w-[3px] rounded-full bg-[#3B82F6] transition-all",
              isSpeaking ? `${bar.h} ${bar.anim}` : "h-1.5 opacity-40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
