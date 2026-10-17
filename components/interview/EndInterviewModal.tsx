"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, X } from "lucide-react";

interface EndInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EndInterviewModal({
  isOpen,
  onClose,
}: EndInterviewModalProps): React.JSX.Element | null {
  const router = useRouter();

  if (!isOpen) return null;

  const handleConfirmEnd = (): void => {
    onClose();
    router.push("/dashboard");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F17]/80 p-4 backdrop-blur-md"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-500">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white">End Interview Session?</h3>
            <p className="text-xs text-slate-400">Save progress and generate report</p>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
          Are you sure you want to end this interview? Your code and conversational answers will be preserved for your diagnostic evaluation.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#1F2937] px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-[#1E293B]"
          >
            Keep Practicing
          </button>
          <button
            type="button"
            onClick={handleConfirmEnd}
            className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_0_12px_rgba(239,68,68,0.3)] hover:bg-rose-700"
          >
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
}
