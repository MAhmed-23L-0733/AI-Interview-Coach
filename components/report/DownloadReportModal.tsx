"use client";

import * as React from "react";
import { Download, X, Check } from "lucide-react";
import type { SessionReport } from "@/lib/validations/report";
import { exportReport } from "@/lib/utils/report-export";

interface DownloadReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: SessionReport;
}

const DOWNLOAD_OPTIONS = [
  { id: "pdf" as const, badge: "PDF", title: "Full diagnostic report", sub: "Scores, feedback, and question analysis • PDF" },
  { id: "txt" as const, badge: "TXT", title: "Interview transcript", sub: "Complete question and response transcript • TXT" },
  { id: "json" as const, badge: "JSON", title: "Structured report data", sub: "Machine-readable score and topic data • JSON" },
] as const;

export function DownloadReportModal({
  isOpen,
  onClose,
  report,
}: DownloadReportModalProps): React.JSX.Element | null {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-400">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Download your report</h2>
              <p className="text-xs text-slate-400">Choose the format you would like to save.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-[#1E293B] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {DOWNLOAD_OPTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => exportReport(item.id, report)}
              className="flex w-full items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F17]/50 p-3.5 text-left transition-colors hover:border-[#334155] hover:bg-[#1E293B]/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-11 items-center justify-center rounded-lg border border-[#334155] bg-[#1E293B] font-mono text-xs font-bold text-blue-400">
                  {item.badge}
                </span>
                <div>
                  <h3 className="text-xs font-semibold text-white">{item.title}</h3>
                  <p className="text-[11px] text-slate-400">{item.sub}</p>
                </div>
              </div>
              <Download className="h-4 w-4 text-slate-400" />
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-1.5 text-[11px] text-slate-500">
          <Check className="h-3.5 w-3.5 text-slate-400" />
          <span>Only people you share the report with can access it.</span>
        </div>
      </div>
    </div>
  );
}
