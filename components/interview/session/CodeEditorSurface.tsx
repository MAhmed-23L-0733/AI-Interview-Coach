"use client";

import { useId } from "react";

interface CodeEditorSurfaceProps {
  code: string;
  onChange: (value: string) => void;
}

export function CodeEditorSurface({
  code,
  onChange,
}: CodeEditorSurfaceProps): React.JSX.Element {
  const editorId = useId();
  const lineCount = Math.max(code.split("\n").length, 12);
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      onChange(newCode);
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 4;
      });
    }
  };

  return (
    <div className="relative flex flex-1 overflow-hidden bg-[#111827]">
      <label htmlFor={editorId} className="sr-only">
        Code editor
      </label>
      <div className="select-none border-r border-[#1F2937] bg-[#0B0F17]/50 px-3 py-4 text-right font-mono text-xs text-slate-500">
        {lines.map((ln) => (
          <div key={ln} className="h-6 leading-6">
            {ln}
          </div>
        ))}
      </div>

      <textarea
        id={editorId}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        className="w-full flex-1 resize-none bg-transparent p-4 font-mono text-xs leading-6 text-slate-200 outline-none selection:bg-blue-600/30"
        aria-label="Code editor input surface"
      />
    </div>
  );
}
