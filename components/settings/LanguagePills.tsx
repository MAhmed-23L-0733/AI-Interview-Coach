"use client";

import * as React from "react";
import { Terminal, Check } from "lucide-react";
import type { ProgrammingLanguage } from "@/lib/validations/settings";

interface LanguagePillsProps {
  value: ProgrammingLanguage;
  onChange: (language: ProgrammingLanguage) => void;
}

const LANGUAGES: { id: ProgrammingLanguage; label: string }[] = [
  { id: "python", label: "Python 3.12" },
  { id: "typescript", label: "TypeScript 5.4" },
  { id: "javascript", label: "JavaScript (Node 20)" },
  { id: "go", label: "Go 1.22" },
  { id: "cpp", label: "C++ 20" },
  { id: "java", label: "Java 21 LTS" },
];

export function LanguagePills({
  value,
  onChange,
}: LanguagePillsProps): React.JSX.Element {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
        Default Programming Language
      </label>
      <div className="flex flex-wrap gap-2.5">
        {LANGUAGES.map((lang) => {
          const isSelected = value === lang.id;
          return (
            <button
              key={lang.id}
              type="button"
              onClick={() => onChange(lang.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                isSelected
                  ? "bg-[#3B82F6] text-white shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                  : "bg-[#1E293B] hover:bg-[#1E293B]/80 text-slate-300 hover:text-white border border-[#334155]"
              }`}
            >
              <Terminal className="w-4 h-4" />
              {lang.label}
              {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
