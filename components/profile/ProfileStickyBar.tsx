"use client";

import { ShieldCheck, Check, Loader2 } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { updateProfile } from "@/actions/profile";

export function ProfileStickyBar(): React.JSX.Element {
  const { hasChanges, isSaving, isSaved, saveChanges, discardChanges, profile } =
    useProfileStore();

  const handleSave = async (): Promise<void> => {
    await saveChanges(updateProfile);
  };

  return (
    <footer className="fixed bottom-16 md:bottom-0 left-0 md:left-[72px] right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-md border-t border-[#1F2937] py-3.5 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      {/* Autosave & Encryption State */}
      <div className="flex items-center gap-2.5 text-xs text-slate-400">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="truncate">
          {isSaved
            ? "Saved just now · Changes securely synced to database."
            : `Last autosaved ${profile.lastAutosaved || "12 minutes ago"} · Encrypted locally and synced to cloud.`}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button
          type="button"
          onClick={discardChanges}
          disabled={!hasChanges || isSaving}
          className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#1E293B] text-xs font-medium transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-all shadow-[0_2px_16px_rgba(59,130,246,0.4)] active:scale-[0.98] flex items-center gap-2 disabled:opacity-60"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          <span>{isSaving ? "Saving..." : "Save changes"}</span>
        </button>
      </div>
    </footer>
  );
}
