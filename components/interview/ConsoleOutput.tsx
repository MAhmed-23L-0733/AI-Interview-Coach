"use client";

import * as React from "react";
import { CheckCircle2, Terminal, Loader2 } from "lucide-react";
import type { CodeExecutionResult } from "./types";

interface ConsoleOutputProps {
  result: CodeExecutionResult;
}

export function ConsoleOutput({ result }: ConsoleOutputProps): React.JSX.Element {
  const isRunning = result.status === "running";
  const isSuccess = result.status === "success";

  return (
    <div className="flex h-36 flex-col border-t border-[#1F2937] bg-[#0F172A]">
      {/* Console Header Bar */}
      <div className="flex items-center justify-between border-b border-[#1F2937]/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-mono text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            OUTPUT
          </span>
        </div>

        {isRunning && (
          <div className="flex items-center gap-1.5 text-xs text-blue-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span className="font-mono text-[11px]">Evaluating...</span>
          </div>
        )}

        {isSuccess && result.testsPassed !== undefined && (
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Passed {result.testsPassed}/{result.testsTotal} tests ({result.executionTimeMs}ms)</span>
          </div>
        )}
      </div>

      {/* Console Output Logs Surface */}
      <pre className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-300 scrollbar-thin scrollbar-thumb-slate-800">
        {result.output}
      </pre>
    </div>
  );
}
