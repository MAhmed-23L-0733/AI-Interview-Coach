"use client";

import { Play, Loader2 } from "lucide-react";
import type { SupportedLanguage } from "@/components/interview/types";

interface CodeEditorHeaderProps {
  language: SupportedLanguage;
  isRunning: boolean;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onRunCode: () => void;
}

export function CodeEditorHeader({
  language,
  isRunning,
  onLanguageChange,
  onRunCode,
}: CodeEditorHeaderProps): React.JSX.Element {
  return (
    <div className="flex items-center justify-between border-b border-[#1F2937] bg-[#111827] px-4 py-3">
      <div className="flex items-center gap-3">
        <label htmlFor="language-select" className="sr-only">
          Select programming language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
          className="rounded-lg border border-[#1F2937] bg-[#0F172A] px-3 py-1.5 font-mono text-xs text-slate-200 outline-none transition-colors focus:border-blue-500"
        >
          <option value="python">Python 3.11</option>
          <option value="typescript">TypeScript 5.0</option>
          <option value="javascript">JavaScript (ES2024)</option>
          <option value="go">Go 1.22</option>
        </select>
        <span className="hidden font-mono text-xs text-slate-500 sm:inline">
          first_duplicate.py
        </span>
      </div>

      <button
        type="button"
        disabled={isRunning}
        onClick={onRunCode}
        className="flex items-center gap-2 rounded-lg bg-[#3B82F6] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all hover:bg-[#2563EB] disabled:opacity-50"
      >
        {isRunning ? (
          <>
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Running...</span>
          </>
        ) : (
          <>
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>Run code</span>
          </>
        )}
      </button>
    </div>
  );
}
