"use client";

import { Code, Globe } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";

export function DeveloperLinksBlock(): React.JSX.Element {
  const { profile, setField } = useProfileStore();

  return (
    <div className="mt-6 pt-5 border-t border-[#1F2937] grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
          <Code className="w-3.5 h-3.5 text-blue-400" />
          GitHub Profile URL
        </label>
        <input
          type="url"
          value={profile.githubUrl}
          onChange={(e) => setField("githubUrl", e.target.value)}
          className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500 transition-all"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          Portfolio / Tech Blog
        </label>
        <input
          type="url"
          value={profile.portfolioUrl}
          onChange={(e) => setField("portfolioUrl", e.target.value)}
          className="w-full bg-[#0B0F17] border border-[#1F2937] rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-blue-500 transition-all"
        />
      </div>
    </div>
  );
}
