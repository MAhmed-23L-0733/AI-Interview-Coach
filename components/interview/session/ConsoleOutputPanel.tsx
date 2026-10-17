"use client";

import { Terminal, CheckCircle2, Clock } from "lucide-react";
import type { CodeExecutionResult } from "@/components/interview/types";

interface ConsoleOutputPanelProps {
  result: CodeExecutionResult;
}

export function ConsoleOutputPanel({
  result,
}: ConsoleOutputPanelProps): React.JSX.Element {
  return (
    <div className="flex flex-col border-t border-[#1F2937] bg-[#0F172A]">
      <div className="flex items-center justify-between border-b border-[#1F2937]/80 px-4 py-2 text-xs">
        <div className="flex items-center gap-2 font-mono text-slate-400">
          <Terminal className="h-3.5 w-3.5 text-blue-400" />
          <span>Output Console</span>
        </div>

        {result.status === "success" && (
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="h-3 w-3" />
              {result.testsPassed}/{result.testsTotal} tests passed
            </span>
            {result.executionTimeMs && (
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="h-3 w-3" />
                {result.executionTimeMs}ms
              </span>
            )}
          </div>
        )}
      </div>

      <div className="h-36 overflow-y-auto p-4 font-mono text-xs leading-relaxed">
        {result.status === "idle" && (
          <p className="text-slate-500">
            Click &quot;Run code&quot; above to execute your solution against test cases.
          </p>
        )}
        {result.status === "running" && (
          <p className="animate-pulse text-blue-400">{result.output}</p>
        )}
        {result.status === "success" && (
          <pre className="whitespace-pre-wrap text-emerald-300">
            {result.output}
          </pre>
        )}
        {result.status === "error" && (
          <pre className="whitespace-pre-wrap text-red-400">
            {result.output}
          </pre>
        )}
      </div>
    </div>
  );
}
