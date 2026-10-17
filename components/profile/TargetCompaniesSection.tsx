"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";
import { DeveloperLinksBlock } from "@/components/profile/DeveloperLinksBlock";

export function TargetCompaniesSection(): React.JSX.Element {
  const { profile, addCompany, removeCompany } = useProfileStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newCompany, setNewCompany] = useState("");

  const handleAdd = (): void => {
    if (newCompany.trim()) {
      addCompany(newCompany.trim());
      setNewCompany("");
      setIsAdding(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-sm">
      <label className="block text-xs font-medium text-slate-300 mb-2.5">
        Target Companies (Custom question flavor and leadership principles)
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <AnimatePresence>
          {profile.targetCompanies.map((company) => (
            <motion.div
              key={company}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-blue-500/40 text-slate-200 text-xs font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>{company}</span>
              <button
                type="button"
                onClick={() => removeCompany(company)}
                className="text-slate-400 hover:text-white transition-colors ml-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {isAdding ? (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              autoFocus
              placeholder="Company name..."
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
                if (e.key === "Escape") setIsAdding(false);
              }}
              className="bg-[#0B0F17] border border-blue-500 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none w-32"
            />
            <button
              type="button"
              onClick={handleAdd}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[#334155] hover:border-blue-500 text-slate-400 hover:text-blue-400 text-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add company</span>
          </button>
        )}
      </div>

      <DeveloperLinksBlock />
    </div>
  );
}
