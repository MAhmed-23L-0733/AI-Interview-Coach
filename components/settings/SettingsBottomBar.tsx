"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsBottomBarProps {
  isSaving: boolean;
  isDirty: boolean;
  toast: { type: "success" | "error"; message: string } | null;
  onClearToast: () => void;
  onDiscard: () => void;
  onSave: () => void;
}

export function SettingsBottomBar({
  isSaving,
  isDirty,
  toast,
  onClearToast,
  onDiscard,
  onSave,
}: SettingsBottomBarProps): React.JSX.Element {
  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl bg-[#1E293B] border-[#3B82F6] text-white text-sm"
          >
            <CheckCircle2 className={`w-4 h-4 ${toast.type === "success" ? "text-[#10B981]" : "text-amber-400"}`} />
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={onClearToast}
              className="text-slate-400 hover:text-white ml-2 p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-t border-[#1F2937] py-3 px-6 lg:px-12 flex justify-between items-center md:pl-[92px]">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="text-[#10B981] w-4 h-4" />
          <span className="hidden sm:inline">
            {isDirty ? "Unsaved changes pending." : "All changes stay buffered in session memory."}
          </span>
          <span className="text-slate-500 font-mono text-[11px]">(Live Sync Active)</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSaving}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-[#1E293B] transition-colors disabled:opacity-50"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold shadow-[0_0_16px_rgba(59,130,246,0.35)] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </footer>
    </>
  );
}
