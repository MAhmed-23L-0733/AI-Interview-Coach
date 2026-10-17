"use client";

import * as React from "react";
import { Shield, ChevronDown } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { UserSettingsInput } from "@/lib/validations/settings";
import { HistoryExportSection } from "./HistoryExportSection";

interface PrivacyDataCardProps {
  form: UseFormReturn<UserSettingsInput>;
  onExportHistory: () => void;
}

export function PrivacyDataCard({
  form,
  onExportHistory,
}: PrivacyDataCardProps): React.JSX.Element {
  const { register, watch, setValue } = form;
  const postInterviewSummary = watch("postInterviewSummary");

  return (
    <section className="bg-[#111827] rounded-xl border border-[#1F2937] p-6 lg:p-7 shadow-sm">
      <div className="flex items-start justify-between border-b border-[#1F2937] pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#3B82F6]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Account & Data Privacy</h2>
            <p className="text-xs text-slate-400">Control recording retention, exported performance dossiers, and credentials.</p>
          </div>
        </div>
        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">SEC-03</span>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start justify-between bg-[#1E293B]/70 p-4 rounded-xl border border-[#1F2937]">
            <div className="pr-3">
              <span className="text-sm font-semibold text-white block">Post-Interview PDF Summary</span>
              <p className="text-xs text-slate-400 mt-1">
                Receive full algorithmic breakdown and interview transcript delivered to{" "}
                <span className="text-[#3B82F6] font-mono text-xs">alex.m@devs.corp</span>.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={postInterviewSummary}
              onClick={() => setValue("postInterviewSummary", !postInterviewSummary, { shouldDirty: true })}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors shadow-inner flex-shrink-0 mt-1 ${
                postInterviewSummary ? "bg-[#3B82F6]" : "bg-slate-700"
              }`}
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                postInterviewSummary ? "translate-x-6" : "translate-x-0"
              }`} />
            </button>
          </div>

          <div className="bg-[#1E293B]/70 p-4 rounded-xl border border-[#1F2937] flex flex-col justify-between">
            <div>
              <label htmlFor="retention-policy" className="block text-sm font-semibold text-white mb-1">
                Audio Recording Retention Policy
              </label>
              <p className="text-xs text-slate-400 mb-2">Automated purging cycle for raw microphone audio waveforms.</p>
            </div>
            <div className="relative">
              <select
                id="retention-policy"
                {...register("retentionPolicy")}
                className="w-full bg-[#111827] rounded-lg border border-[#334155] text-white text-sm px-3.5 py-2 pr-9 focus:outline-none focus:border-[#3B82F6] appearance-none cursor-pointer"
              >
                <option value="immediate">Delete immediately after transcript generation</option>
                <option value="30_days">Store for 30 days (Recommended for replay review)</option>
                <option value="indefinitely">Keep indefinitely on encrypted volume</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            </div>
          </div>
        </div>

        <HistoryExportSection onExport={onExportHistory} />
      </div>
    </section>
  );
}
