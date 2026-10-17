"use client";

import * as React from "react";
import { Code2, ChevronDown } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { UserSettingsInput } from "@/lib/validations/settings";
import { LanguagePills } from "./LanguagePills";
import { FeedbackStrictnessControl } from "./FeedbackStrictnessControl";

interface InterviewPreferencesCardProps {
  form: UseFormReturn<UserSettingsInput>;
}

export function InterviewPreferencesCard({
  form,
}: InterviewPreferencesCardProps): React.JSX.Element {
  const { register, watch, setValue } = form;
  const currentLang = watch("programmingLanguage");
  const currentStrictness = watch("feedbackStrictness");
  const proactiveHints = watch("proactiveHints");

  return (
    <section className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 lg:p-7 shadow-sm">
      <div className="flex items-start justify-between border-b border-[#1F2937] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#3B82F6]">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Interview & Coding Preferences</h2>
            <p className="text-xs text-slate-400">Default syntax environment, critique rigor, and intervention mechanisms.</p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">SEC-02</span>
      </div>

      <div className="space-y-6">
        <LanguagePills
          value={currentLang}
          onChange={(lang) => setValue("programmingLanguage", lang, { shouldDirty: true })}
        />

        <FeedbackStrictnessControl
          value={currentStrictness}
          onChange={(val) => setValue("feedbackStrictness", val, { shouldDirty: true })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1F2937]">
          <div className="flex items-start justify-between bg-[#1E293B]/70 p-4 rounded-xl border border-[#1F2937]">
            <div className="pr-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">Real-time Proactive Hints</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 font-mono">Dynamic</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Allow the AI coach to interject when silence exceeds 45s or stalls occur.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={proactiveHints}
              onClick={() => setValue("proactiveHints", !proactiveHints, { shouldDirty: true })}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shadow-inner flex-shrink-0 mt-1 ${proactiveHints ? "bg-[#3B82F6]" : "bg-slate-700"}`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${proactiveHints ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="bg-[#1E293B]/70 p-4 rounded-xl border border-[#1F2937] flex flex-col justify-between">
            <div>
              <label htmlFor="editor-theme" className="block text-sm font-semibold text-white mb-1">Code Editor Keybindings & Theme</label>
              <p className="text-xs text-slate-400 mb-3">Emulate standard editor keymap shortcuts inside mock screens.</p>
            </div>
            <div className="relative">
              <select
                id="editor-theme"
                {...register("editorTheme")}
                className="w-full bg-[#111827] rounded-lg border border-[#334155] text-white text-sm px-3.5 py-2 pr-9 focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
              >
                <option value="vs-code-dark">VS Code Dark Modern (Standard)</option>
                <option value="vim">Vim Mode (Classic keybindings)</option>
                <option value="emacs">Emacs Keymap</option>
                <option value="sublime">Sublime Text Minimal</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
