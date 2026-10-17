"use client";

import { Sliders } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";

export function VoicePreferencesCard(): React.JSX.Element {
  const { profile, setField } = useProfileStore();

  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#1F2937] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Voice &amp; Coach Preferences</h2>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
          Multimodal
        </span>
      </div>

      <div className="space-y-4">
        {/* Toggle 1: Live Voice Interruption */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#1E293B]/40 border border-[#1F2937]">
          <div className="pr-4">
            <h4 className="text-sm font-medium text-white">Allow Realistic Interruption</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              AI Coach can gently interrupt if answer exceeds 2 minutes or diverges from prompt scope.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={profile.allowInterruption}
            onClick={() => setField("allowInterruption", !profile.allowInterruption)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              profile.allowInterruption ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                profile.allowInterruption ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Diagnostic Code Telemetry */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#1E293B]/40 border border-[#1F2937]">
          <div className="pr-4">
            <h4 className="text-sm font-medium text-white">Automatic Code Complexity Analysis</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Calculates Big-O time and space metrics in the code execution sandbox after each test case.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={profile.autoComplexityAnalysis}
            onClick={() => setField("autoComplexityAnalysis", !profile.autoComplexityAnalysis)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              profile.autoComplexityAnalysis ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                profile.autoComplexityAnalysis ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
