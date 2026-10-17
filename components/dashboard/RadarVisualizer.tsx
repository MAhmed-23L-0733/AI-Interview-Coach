import * as React from "react";

export function RadarVisualizer(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center select-none">
      {/* Concentric Radar Rings */}
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-blue-500/10">
        {/* Intermediate Ring with subtle pulse */}
        <div className="flex h-32 w-32 items-center justify-center rounded-full border border-blue-500/20 bg-blue-950/20 animate-radar-pulse">
          {/* Inner Core with glow */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-blue-500/40 bg-[#121c2e] shadow-[0_0_30px_rgba(59,130,246,0.25)]">
            {/* Animated Waveform Bars */}
            <div className="flex items-center gap-1 h-8">
              <span className="w-1 rounded-full bg-[#3B82F6] wave-anim-1" />
              <span className="w-1 rounded-full bg-[#3B82F6] wave-anim-2" />
              <span className="w-1 rounded-full bg-[#3B82F6] wave-anim-3" />
              <span className="w-1 rounded-full bg-[#3B82F6] wave-anim-4" />
              <span className="w-1 rounded-full bg-[#3B82F6] wave-anim-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Online Status Pill */}
      <div className="mt-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <span className="text-xs font-medium text-slate-400">
          AI-coach online
        </span>
      </div>
    </div>
  );
}
