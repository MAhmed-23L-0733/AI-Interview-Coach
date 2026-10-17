"use client";

import { useState } from "react";
import { Mic, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { UseMockInterviewRunnerReturn } from "@/hooks/useMockInterviewRunner";
import { VoiceAudioHub } from "./session/VoiceAudioHub";
import { LiveTranscript } from "./session/LiveTranscript";
import { VoiceResponseDock } from "./session/VoiceResponseDock";
import { CodeEditorHeader } from "./session/CodeEditorHeader";
import { CodeEditorSurface } from "./session/CodeEditorSurface";
import { ConsoleOutputPanel } from "./session/ConsoleOutputPanel";

interface InterviewWorkspaceProps {
  runner: UseMockInterviewRunnerReturn;
}

export function InterviewWorkspace({
  runner,
}: InterviewWorkspaceProps): React.JSX.Element {
  const [mobileTab, setMobileTab] = useState<"voice" | "code">("voice");

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-[#0B0F17]">
      {/* Mobile/Tablet Segmented Switcher */}
      <div className="flex border-b border-[#1F2937] bg-[#111827] p-2 lg:hidden">
        <div className="grid w-full grid-cols-2 gap-2 rounded-lg bg-[#0B0F17] p-1">
          <button
            type="button"
            onClick={() => setMobileTab("voice")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold transition-all",
              mobileTab === "voice"
                ? "bg-[#3B82F6] text-white shadow"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Mic className="h-3.5 w-3.5" />
            <span>Voice & Transcript</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("code")}
            className={cn(
              "flex items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold transition-all",
              mobileTab === "code"
                ? "bg-[#3B82F6] text-white shadow"
                : "text-slate-400 hover:text-white"
            )}
          >
            <Code2 className="h-3.5 w-3.5" />
            <span>Code Editor</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Container */}
      <div className="flex flex-1 overflow-hidden p-3 gap-3 lg:p-4 lg:gap-4">
        {/* Left Pane: Voice & Transcript */}
        <div
          className={cn(
            "flex flex-1 flex-col gap-3 overflow-hidden lg:flex lg:w-[48%] lg:max-w-[48%]",
            mobileTab === "voice" ? "flex" : "hidden"
          )}
        >
          <VoiceAudioHub
            isAISpeaking={runner.isAISpeaking}
            isListening={runner.isListening}
          />
          <LiveTranscript messages={runner.messages} />
          <VoiceResponseDock
            isListening={runner.isListening}
            onToggleMic={runner.handleToggleMic}
          />
        </div>

        {/* Right Pane: Code Editor & Console */}
        <div
          className={cn(
            "flex flex-1 flex-col overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827] shadow-lg lg:flex lg:w-[52%] lg:max-w-[52%]",
            mobileTab === "code" ? "flex" : "hidden"
          )}
        >
          <CodeEditorHeader
            language={runner.activeLanguage}
            isRunning={runner.executionResult.status === "running"}
            onLanguageChange={runner.handleLanguageChange}
            onRunCode={runner.handleRunCode}
          />
          <CodeEditorSurface
            code={runner.code}
            onChange={runner.handleCodeChange}
          />
          <ConsoleOutputPanel result={runner.executionResult} />
        </div>
      </div>
    </div>
  );
}
