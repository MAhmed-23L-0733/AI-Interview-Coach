"use client";

import * as React from "react";
import { CheckCircle2, Loader2, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/lib/stores/useSidebarStore";
import { cn } from "@/lib/utils";

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
  const { isExpanded } = useSidebarStore();

  return (
    <>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn(
              "fixed left-4 right-4 sm:left-auto sm:right-6 bottom-24 sm:bottom-20 z-50 flex items-center justify-between sm:justify-start gap-3 max-w-md mx-auto sm:mx-0 px-4 py-3 rounded-xl border shadow-xl bg-[#1E293B] border-[#3B82F6] text-white text-sm"
            )}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <CheckCircle2 className={`w-4 h-4 shrink-0 ${toast.type === "success" ? "text-[#10B981]" : "text-amber-400"}`} />
              <span className="truncate">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={onClearToast}
              className="text-slate-400 hover:text-white shrink-0 ml-2 p-1 rounded-md"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer
        className={cn(
          "fixed bottom-0 right-0 z-30 bg-[#0B0F17]/95 backdrop-blur-md border-t border-[#1F2937] py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 transition-[left] duration-300 ease-in-out",
          isExpanded ? "left-0 md:left-64" : "left-0 md:left-[72px]"
        )}
      >
        <div className="flex items-center justify-between sm:justify-start gap-2 w-full sm:w-auto min-w-0 text-xs text-slate-400">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="text-[#10B981] w-4 h-4 shrink-0" />
            <span className="hidden sm:inline truncate">
              {isDirty ? "Unsaved changes pending." : "All changes stay buffered in session memory."}
            </span>
          </div>
          <span className="text-slate-500 font-mono text-[11px] shrink-0 truncate">(Live Sync Active)</span>
        </div>
        <div className="w-full sm:w-auto grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSaving}
            className="w-full sm:w-auto justify-center min-h-[44px] sm:min-h-0 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-[#1E293B] transition-colors disabled:opacity-50 flex items-center"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="w-full sm:w-auto justify-center min-h-[44px] sm:min-h-0 px-5 py-2.5 rounded-lg bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-semibold shadow-[0_0_16px_rgba(59,130,246,0.35)] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : <Save className="w-4 h-4 shrink-0" />}
            <span>{isSaving ? "Saving..." : "Save changes"}</span>
          </button>
        </div>
      </footer>
    </>
  );
}
