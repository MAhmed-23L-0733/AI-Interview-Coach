"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoggingOut?: boolean;
}

export function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoggingOut = false,
}: LogoutConfirmModalProps): React.JSX.Element {
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen && !isLoggingOut) onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoggingOut, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoggingOut ? undefined : onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-sm rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isLoggingOut}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-[#1E293B] hover:text-white"
              aria-label="Close dialog"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
                <LogOut className="h-6 w-6 stroke-[2.25]" />
              </div>

              <h2 id="logout-dialog-title" className="text-lg font-bold text-white tracking-tight">
                Sign out of your account?
              </h2>

              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Are you sure you want to log out? You will need to sign back in to start or review interview sessions.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoggingOut}
                className="flex-1 rounded-xl border border-[#334155] bg-[#1E293B] px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-[#334155] hover:text-white transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoggingOut}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-red-600/30 hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoggingOut ? "Signing out..." : "Log out"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
