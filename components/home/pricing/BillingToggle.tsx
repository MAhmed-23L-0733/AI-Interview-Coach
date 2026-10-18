"use client";

import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { BillingCycle } from "./types";

interface BillingToggleProps {
  billingCycle: BillingCycle;
  onToggle: (cycle: BillingCycle) => void;
}

export function BillingToggle({
  billingCycle,
  onToggle,
}: BillingToggleProps): React.JSX.Element {
  const isAnnual = billingCycle === "annually";

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex items-center gap-3.5 sm:gap-4 px-4 py-2 rounded-full bg-[#111827] border border-[#1F2937] shadow-lg shadow-black/30">
        <button
          type="button"
          onClick={() => onToggle("monthly")}
          className={`flex items-center gap-2 text-xs sm:text-sm transition-colors cursor-pointer select-none ${
            !isAnnual ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
              !isAnnual
                ? "border-blue-500 bg-blue-500/20"
                : "border-slate-600 bg-transparent"
            }`}
          >
            {!isAnnual && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
          </span>
          <span>Monthly billing</span>
        </button>

        <Switch
          id="billing-cycle-switch"
          checked={isAnnual}
          onCheckedChange={(checked) => onToggle(checked ? "annually" : "monthly")}
          aria-label="Toggle annual billing discount"
        />

        <button
          type="button"
          onClick={() => onToggle("annually")}
          className={`flex items-center gap-2 text-xs sm:text-sm transition-colors cursor-pointer select-none ${
            isAnnual ? "text-white font-semibold" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors shrink-0 ${
              isAnnual
                ? "border-blue-500 bg-blue-500/20"
                : "border-slate-600 bg-transparent"
            }`}
          >
            {isAnnual && <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
          </span>
          <span>Annual billing</span>
          <Badge
            variant="outline"
            className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 ml-0.5"
          >
            Save 20%
          </Badge>
        </button>
      </div>
    </div>
  );
}
