"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { TranscriptItem } from "./TranscriptItem";
import type { TranscriptMessage } from "./types";

interface LiveTranscriptProps {
  messages: TranscriptMessage[];
  isTranscribing: boolean;
}

export function LiveTranscript({
  messages,
  isTranscribing,
}: LiveTranscriptProps): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] p-4 shadow-sm">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-[#1F2937]/70 pb-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-white">
            Live transcript
          </h3>
          <p className="text-[11px] text-slate-400">
            Conversation is transcribed in real time
          </p>
        </div>

        {isTranscribing && (
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Transcribing</span>
          </div>
        )}
      </div>

      {/* Scrollable Conversation Stream */}
      <div
        ref={scrollRef}
        className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800"
      >
        {messages.map((msg) => (
          <TranscriptItem key={msg.id} message={msg} />
        ))}
      </div>
    </div>
  );
}
