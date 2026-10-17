"use client";

import { useEffect, useRef } from "react";
import type { TranscriptMessage } from "@/components/interview/types";
import { TranscriptMessageItem } from "./TranscriptMessageItem";

interface LiveTranscriptProps {
  messages: TranscriptMessage[];
}

export function LiveTranscript({ messages }: LiveTranscriptProps): React.JSX.Element {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827]">
      <div className="flex items-center justify-between border-b border-[#1F2937] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Live transcript
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
            Transcribing
          </span>
        </div>
        <span className="text-xs text-slate-500">{messages.length} messages</span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800">
        {messages.map((msg) => (
          <TranscriptMessageItem key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
