"use client";

import * as React from "react";
import { Download, FileSpreadsheet } from "lucide-react";

interface HistoryExportSectionProps {
  onExport: () => void;
}

export function HistoryExportSection({
  onExport,
}: HistoryExportSectionProps): React.JSX.Element {
  return (
    <div className="pt-4 border-t border-[#1F2937] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full min-w-0">
      <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center text-slate-400 shrink-0">
          <Download className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-white truncate">Export Mock Session History</h3>
          <p className="text-xs text-slate-400">Download 12 completed sessions including code solutions, scores, and coach audits.</p>
        </div>
      </div>
      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
        <button
          type="button"
          onClick={onExport}
          className="w-full sm:w-auto px-4 py-2.5 sm:py-2 rounded-lg bg-[#1E293B] hover:bg-[#1E293B]/80 border border-[#334155] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px] sm:min-h-0"
        >
          <FileSpreadsheet className="w-4 h-4 text-[#3B82F6] shrink-0" />
          <span>Export JSON / CSV</span>
        </button>
      </div>
    </div>
  );
}
