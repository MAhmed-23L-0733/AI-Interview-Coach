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
    <div className="pt-4 border-t border-[#1F2937] flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#1E293B] border border-[#334155] flex items-center justify-center text-slate-400">
          <Download className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-white">Export Mock Session History</h3>
          <p className="text-xs text-slate-400">Download 12 completed sessions including code solutions, scores, and coach audits.</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onExport}
        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#1E293B] hover:bg-[#1E293B]/80 border border-[#334155] text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        <FileSpreadsheet className="w-4 h-4 text-[#3B82F6]" />
        Export JSON / CSV
      </button>
    </div>
  );
}
