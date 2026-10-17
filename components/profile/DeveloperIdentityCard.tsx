"use client";

import { CheckCircle2, ChevronDown, Info } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { TARGET_ROLE_OPTIONS, SENIORITY_OPTIONS } from "@/lib/constants/profile";
import { ProfileAvatarBlock } from "@/components/profile/ProfileAvatarBlock";

export function DeveloperIdentityCard(): React.JSX.Element {
  const { profile, setField } = useProfileStore();

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-sm">
      <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1F2937] pb-4 mb-6">
        <h2 className="text-lg font-semibold text-white">Developer Identity</h2>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
          Personal info
        </span>
      </div>

      {/* Avatar Section */}
      <ProfileAvatarBlock
        name={profile.name}
        avatarInitials={profile.avatarInitials || "AM"}
        verifiedCandidate={profile.verifiedCandidate}
      />

      {/* Editable Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setField("name", e.target.value)}
            className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setField("email", e.target.value)}
              className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all pr-9"
            />
            <CheckCircle2 className="w-4 h-4 text-emerald-400 absolute right-3 top-3" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">Target Role</label>
          <div className="relative">
            <select
              value={profile.targetRole}
              onChange={(e) => setField("targetRole", e.target.value)}
              className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer pr-9"
            >
              {TARGET_ROLE_OPTIONS.map((role) => (
                <option key={role} value={role} className="bg-[#111827] text-white">
                  {role}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-slate-300">Seniority Calibration</label>
          <div className="relative">
            <select
              value={profile.seniority}
              onChange={(e) => setField("seniority", e.target.value)}
              className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer pr-9"
            >
              {SENIORITY_OPTIONS.map((level) => (
                <option key={level} value={level} className="bg-[#111827] text-white">
                  {level}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        AI Interviewer uses this seniority calibration to adjust rubric strictness and system design follow-ups.
      </p>
    </div>
  );
}
