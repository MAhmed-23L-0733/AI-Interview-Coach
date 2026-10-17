"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface EndInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EndInterviewModal({
  isOpen,
  onClose,
}: EndInterviewModalProps): React.JSX.Element {
  const router = useRouter();

  const handleConfirmEnd = (): void => {
    onClose();
    router.push("/history");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              <AlertTriangle className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-bold text-white">End Interview Session?</h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Are you sure you want to conclude this interview? Your conversation transcript and code execution logs will be finalized and submitted to your performance report.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-[#1F2937] px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-[#1E293B]"
              >
                Keep practicing
              </button>
              <button
                type="button"
                onClick={handleConfirmEnd}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-600/30 transition-colors hover:bg-red-700"
              >
                End session
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
