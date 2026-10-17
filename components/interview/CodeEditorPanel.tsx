"use client";

import * as React from "react";
import { Code2, Play, ChevronDown } from "lucide-react";
import { CodeEditorSurface } from "./CodeEditorSurface";
import { ConsoleOutput } from "./ConsoleOutput";
import type { SupportedLanguage, CodeExecutionResult } from "./types";

interface CodeEditorPanelProps {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  code: string;
  setCode: (code: string) => void;
  executionResult: CodeExecutionResult;
  onRunCode: () => void;
}

export function CodeEditorPanel({
  language,
  setLanguage,
  code,
  setCode,
  executionResult,
  onRunCode,
}: CodeEditorPanelProps): React.JSX.Element {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] shadow-sm">
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#111827] px-4 py-3">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-blue-400" />
          <h3 className="text-sm font-semibold tracking-tight text-white">
            Code editor
          </h3>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              aria-label="Select programming language"
              className="appearance-none rounded-lg border border-[#1F2937] bg-[#1E293B] py-1.5 pr-8 pl-3 text-xs font-medium text-slate-200 outline-none hover:bg-[#283548] focus:border-blue-500"
            >
              <option value="python">Python</option>
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="go">Go</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-2.5 right-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

          {/* Run Code Button */}
          <button
            type="button"
            onClick={onRunCode}
            disabled={executionResult.status === "running"}
            className="flex items-center gap-1.5 rounded-lg border border-[#1F2937] bg-[#1E293B] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#283548] disabled:opacity-50"
          >
            <Play className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400" />
            <span>Run code</span>
          </button>
        </div>
      </div>

      {/* Editor Surface */}
      <CodeEditorSurface code={code} onChange={setCode} />

      {/* Output Console Pane */}
      <ConsoleOutput result={executionResult} />
    </div>
  );
}
