"use client";

import * as React from "react";

export function AudioMeterVisualizer(): React.JSX.Element {
  const [heights, setHeights] = React.useState<number[]>([
    8, 12, 20, 24, 28, 20, 16, 24, 28, 20, 16, 24, 28, 32, 24, 12, 8, 4,
  ]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setHeights((prev) =>
        prev.map(() => Math.floor(Math.random() * 24) + 6)
      );
    }, 180);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#111827] rounded-lg border border-[#1F2937] p-3 sm:p-3.5 flex flex-col justify-between w-full min-w-0 max-w-full">
      <div className="flex items-center justify-between text-xs mb-2 gap-2 min-w-0">
        <span className="text-slate-400 flex items-center gap-1.5 font-medium truncate text-[11px] sm:text-xs">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
          <span className="truncate">Microphone Input Level</span>
        </span>
        <span className="font-mono text-[#10B981] text-[11px] shrink-0">-14 dB (Active)</span>
      </div>
      <div
        className="flex items-end justify-between gap-1 sm:gap-1.5 h-8 px-2 py-0.5 bg-[#0B0F17]/80 rounded border border-[#1F2937]/50 overflow-hidden w-full min-w-0 max-w-full"
        aria-label="Active decibel meter visualizer"
      >
        {heights.map((h, i) => {
          const isEmerald = (i >= 3 && i <= 6) || (i >= 11 && i <= 13);
          return (
            <div
              key={i}
              className={`flex-1 max-w-[6px] min-w-[2px] rounded-full transition-all duration-150 shrink ${
                isEmerald ? "bg-[#10B981]" : "bg-[#3B82F6]"
              }`}
              style={{ height: `${h}px` }}
            />
          );
        })}
      </div>
    </div>
  );
}
