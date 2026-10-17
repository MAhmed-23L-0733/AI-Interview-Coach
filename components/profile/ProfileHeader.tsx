"use client";

import { Bell, Sliders, Check, Loader2 } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { updateProfile } from "@/actions/profile";

export function ProfileHeader(): React.JSX.Element {
  const { hasChanges, isSaving, saveChanges, discardChanges } = useProfileStore();

  const handleSave = async (): Promise<void> => {
    await saveChanges(updateProfile);
  };

  return (
    <header className="sticky top-0 z-40 hidden md:flex w-full items-center justify-between border-b border-[#1F2937]/80 bg-[#0B0F17]/90 px-8 py-3.5 backdrop-blur-md">
      {/* Brand / Breadcrumb Area */}
      <div className="flex items-center gap-3">
        <span className="font-bold text-white tracking-tight text-lg">Syntropic Coach</span>
        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400 border border-blue-500/30">
          PRO
        </span>
        <span className="text-slate-600">/</span>
        <span className="font-medium text-slate-300 text-sm">Profile & Account</span>
      </div>

      {/* Top Right Actions */}
      <div className="flex items-center gap-3">
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1F2937] text-slate-400 transition-colors hover:bg-[#1E293B] hover:text-white"
          title="Notifications"
          type="button"
        >
          <Bell className="h-4 w-4" />
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#1F2937] text-slate-400 transition-colors hover:bg-[#1E293B] hover:text-white"
          title="Configure session audio"
          type="button"
        >
          <Sliders className="h-4 w-4" />
        </button>

        <div className="h-5 w-px bg-[#1F2937] mx-1" />

        <button
          onClick={discardChanges}
          disabled={!hasChanges || isSaving}
          className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-slate-400 transition-colors hover:bg-[#1E293B] hover:text-white disabled:opacity-40 disabled:hover:bg-transparent"
          type="button"
        >
          Discard
        </button>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white shadow-[0_2px_14px_rgba(59,130,246,0.35)] transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-60"
          type="button"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          <span>Save changes</span>
        </button>
      </div>
    </header>
  );
}
