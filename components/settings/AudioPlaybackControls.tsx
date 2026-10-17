"use client";

import * as React from "react";

interface AudioPlaybackControlsProps {
  speechRate: number;
  noiseCancellation: boolean;
  onRateChange: (rate: number) => void;
  onNoiseToggle: (val: boolean) => void;
}

export function AudioPlaybackControls({
  speechRate,
  noiseCancellation,
  onRateChange,
  onNoiseToggle,
}: AudioPlaybackControlsProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1F2937]">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="speech-slider" className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Speech Rate (Playback speed)
          </label>
          <span className="font-mono text-xs font-semibold text-[#3B82F6] bg-[#3B82F6]/10 px-2 py-0.5 rounded border border-[#3B82F6]/30">
            {speechRate.toFixed(1)}x {speechRate === 1.0 ? "(Normal)" : ""}
          </span>
        </div>
        <input
          id="speech-slider"
          type="range"
          min="0.8"
          max="1.5"
          step="0.1"
          value={speechRate}
          onChange={(e) => onRateChange(parseFloat(e.target.value))}
          className="w-full accent-[#3B82F6] bg-[#1E293B] h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1.5">
          <span>0.8x</span>
          <span>1.0x</span>
          <span>1.2x</span>
          <span>1.5x</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-[#1E293B]/70 p-4 rounded-xl border border-[#1F2937]">
        <div className="pr-4">
          <span className="text-sm font-semibold text-white block">Neural Noise Cancellation</span>
          <p className="text-xs text-slate-400 mt-0.5">Filter mechanical keyboard clatter and ambient fan rumble automatically.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={noiseCancellation}
          onClick={() => onNoiseToggle(!noiseCancellation)}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shadow-inner flex-shrink-0 ${
            noiseCancellation ? "bg-[#3B82F6]" : "bg-slate-700"
          }`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            noiseCancellation ? "translate-x-6" : "translate-x-0"
          }`} />
        </button>
      </div>
    </div>
  );
}
