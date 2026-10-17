"use client";

import { Camera, Upload } from "lucide-react";

interface ProfileAvatarBlockProps {
  name: string;
  avatarInitials: string;
  verifiedCandidate?: boolean;
}

export function ProfileAvatarBlock({
  name,
  avatarInitials,
  verifiedCandidate = true,
}: ProfileAvatarBlockProps): React.JSX.Element {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-xl bg-[#1E293B]/40 border border-[#1F2937] mb-6">
      <div className="relative group self-center sm:self-auto">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-[0_0_24px_rgba(59,130,246,0.25)]">
          <div className="w-full h-full rounded-full bg-[#0B0F17] flex items-center justify-center text-blue-400 text-2xl font-bold font-mono">
            {avatarInitials}
          </div>
        </div>
        <button
          type="button"
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          title="Update photo"
        >
          <Camera className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold text-white">{name}</h3>
          {verifiedCandidate && (
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Verified Candidate
            </span>
          )}
        </div>
        <p className="text-xs text-slate-400 mt-1">San Francisco, CA · PST Timezone (UTC-8)</p>
        <div className="flex items-center gap-2 mt-3">
          <button
            type="button"
            className="px-3 py-1 bg-[#1E293B] hover:bg-[#334155] text-slate-200 border border-[#334155] rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload photo
          </button>
          <button
            type="button"
            className="px-3 py-1 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-lg text-xs font-medium transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
