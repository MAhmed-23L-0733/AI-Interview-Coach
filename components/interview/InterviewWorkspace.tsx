"use client";

import * as React from "react";
import { useState } from "react";
import { MessageSquare, Code } from "lucide-react";
import { VoiceAudioHub } from "./VoiceAudioHub";
import { LiveTranscript } from "./LiveTranscript";
import { VoiceResponseDock } from "./VoiceResponseDock";
import { CodeEditorPanel } from "./CodeEditorPanel";
import { useInterviewSession } from "./useInterviewSession";
import { cn } from "@/lib/utils";

interface InterviewWorkspaceProps {
  sessionState: ReturnType<typeof useInterviewSession>;
}

export function InterviewWorkspace({
  sessionState,
}: InterviewWorkspaceProps): React.JSX.Element {
  const [activeMobileTab, setActiveMobileTab] = useState<"voice" | "code">("voice");

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#0B0F17]">
      {/* Mobile / Tablet Tab Switcher (< 1024px) */}
      <div className="flex border-b border-[#1F2937] bg-[#111827] px-4 py-2 lg:hidden">
        <button
          type="button"
          onClick={() => setActiveMobileTab("voice")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-colors",
            activeMobileTab === "voice"
              ? "bg-[#1E293B] text-blue-400 border border-[#1F2937]"
              : "text-slate-400 hover:text-white"
          )}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Voice & Transcript</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveMobileTab("code")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-xs font-semibold transition-colors",
            activeMobileTab === "code"
              ? "bg-[#1E293B] text-blue-400 border border-[#1F2937]"
              : "text-slate-400 hover:text-white"
          )}
        >
          <Code className="h-4 w-4" />
          <span>Code Editor</span>
        </button>
      </div>

      {/* Dual-Pane Layout on Desktop; Tab-swapped on Mobile */}
      <div className="flex flex-1 overflow-hidden p-3 sm:p-4 lg:p-6 lg:gap-6">
        {/* Left Pane: Voice & Conversation Stream (48% on desktop) */}
        <section
          className={cn(
            "flex h-full flex-col gap-3 lg:flex lg:w-[48%] xl:w-[46%]",
            activeMobileTab === "voice" ? "flex flex-1" : "hidden"
          )}
        >
          <VoiceAudioHub isSpeaking={sessionState.isSpeaking} />
          <LiveTranscript
            messages={sessionState.messages}
            isTranscribing={sessionState.isTranscribing}
          />
          <VoiceResponseDock
            isListening={sessionState.isListening}
            onToggleListening={sessionState.toggleListening}
          />
        </section>

        {/* Right Pane: Code Editor & Execution Surface (52% on desktop) */}
        <section
          className={cn(
            "h-full lg:flex lg:flex-1",
            activeMobileTab === "code" ? "flex flex-1" : "hidden"
          )}
        >
          <CodeEditorPanel
            language={sessionState.language}
            setLanguage={sessionState.setLanguage}
            code={sessionState.code}
            setCode={sessionState.setCode}
            executionResult={sessionState.executionResult}
            onRunCode={sessionState.runCode}
          />
        </section>
      </div>
    </div>
  );
}
