"use client";

import * as React from "react";
import { ShieldCheck, Check, Loader2 } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { useSidebarStore } from "@/lib/stores/useSidebarStore";
import { updateProfile } from "@/actions/profile";
import { cn } from "@/lib/utils";

export function ProfileStickyBar(): React.JSX.Element {
  const { hasChanges, isSaving, isSaved, saveChanges, discardChanges, profile } =
    useProfileStore();
  const { isExpanded } = useSidebarStore();

  const handleSave = async (): Promise<void> => {
    await saveChanges(updateProfile);
  };

  return (
    <footer
      className={cn(
        "fixed bottom-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-t border-[#1F2937] py-3.5 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))] px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] transition-[left] duration-300 ease-in-out",
        isExpanded ? "left-0 md:left-64" : "left-0 md:left-[72px]"
      )}
    >
      {/* Autosave & Encryption State */}
      <div className="w-full sm:w-auto min-w-0 flex items-center gap-2 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="min-w-0 flex-1 truncate">
          {isSaved
            ? "Saved just now · Changes securely synced to database."
            : `Last autosaved ${profile.lastAutosaved || "12 minutes ago"} · Encrypted locally and synced to cloud.`}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:w-auto sm:justify-end sm:items-center">
        <button
          type="button"
          onClick={discardChanges}
          disabled={!hasChanges || isSaving}
          className="w-full sm:w-auto justify-center min-h-[44px] sm:min-h-0 px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E293B] text-xs font-medium transition-colors disabled:opacity-40 disabled:hover:bg-transparent flex items-center"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="w-full sm:w-auto justify-center min-h-[44px] sm:min-h-0 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-[0_2px_16px_rgba(59,130,246,0.4)] active:scale-[0.98] flex items-center gap-2 disabled:opacity-60"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          ) : (
            <Check className="w-4 h-4 shrink-0" />
          )}
          <span>{isSaving ? "Saving..." : "Save changes"}</span>
        </button>
      </div>
    </footer>
  );
}
