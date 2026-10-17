"use client";

import * as React from "react";
import { useMemo } from "react";

interface CodeEditorSurfaceProps {
  code: string;
  onChange: (value: string) => void;
}

export function CodeEditorSurface({
  code,
  onChange,
}: CodeEditorSurfaceProps): React.JSX.Element {
  const lineCount = useMemo(() => {
    return Math.max(code.split("\n").length, 14);
  }, [code]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const updated = code.substring(0, start) + "    " + code.substring(end);
      onChange(updated);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div className="relative flex flex-1 overflow-hidden bg-[#0B0F17] font-mono text-xs leading-6 sm:text-[13px]">
      {/* Line Numbers Gutter */}
      <div
        className="flex w-11 shrink-0 select-none flex-col items-end border-r border-[#1F2937]/50 bg-[#0B0F17] py-4 pr-3 text-slate-600"
        aria-hidden="true"
      >
        {Array.from({ length: lineCount }).map((_, i) => (
          <span key={i} className="leading-6">
            {i + 1}
          </span>
        ))}
      </div>

      {/* Code Textarea Input */}
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        className="flex-1 resize-none bg-transparent p-4 font-mono leading-6 text-slate-100 outline-none scrollbar-thin scrollbar-thumb-slate-800"
        aria-label="Code editor"
      />
    </div>
  );
}
