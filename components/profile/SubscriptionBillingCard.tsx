"use client";

import { CreditCard, ExternalLink, ChevronRight, ShieldCheck, KeyRound } from "lucide-react";
import { useProfileStore } from "@/lib/stores/useProfileStore";

export function SubscriptionBillingCard(): React.JSX.Element {
  const { profile } = useProfileStore();

  return (
    <div className="rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#1F2937] pb-4 mb-5">
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Plan &amp; Billing</h2>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 font-mono">
          Active
        </span>
      </div>

      {/* Subscription Tier Box */}
      <div className="p-4 rounded-xl bg-[#0B0F17] border border-[#1F2937] mb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 font-mono">
              Current Plan
            </span>
            <h4 className="text-base font-bold text-white">{profile.currentPlan || "Pro Developer Tier"}</h4>
          </div>
          <span className="text-xl font-bold text-white font-mono">
            {profile.planPrice || "$29"}
            <span className="text-xs font-normal text-slate-500 font-sans">/mo</span>
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-2">
          Next renewal on <strong className="text-slate-200">{profile.renewalDate || "June 15, 2025"}</strong> via Stripe Card ending in ••4242
        </p>
        <div className="mt-3.5 pt-3 border-t border-[#1F2937] flex items-center justify-between text-xs">
          <span className="text-slate-400">Sessions completed</span>
          <span className="text-white font-medium font-mono">
            {profile.sessionsCompleted || 14} / Unlimited
          </span>
        </div>
      </div>

      {/* Account Security & Quick Actions */}
      <div className="space-y-2.5">
        <a
          href="#billing"
          className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1E293B]/60 transition-colors border border-[#1F2937] group"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span className="text-xs font-medium text-slate-200">Manage billing &amp; invoices</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
        </a>

        <a
          href="#password"
          className="flex items-center justify-between p-3 rounded-xl hover:bg-[#1E293B]/60 transition-colors border border-[#1F2937] group"
        >
          <div className="flex items-center gap-3">
            <KeyRound className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
            <span className="text-xs font-medium text-slate-200">Update account password</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </a>

        <div className="flex items-center justify-between p-3 rounded-xl border border-[#1F2937] bg-[#1E293B]/30">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-xs font-medium text-slate-200 block">Two-Factor Authentication</span>
              <span className="text-[11px] text-emerald-400">Enabled via Authenticator App</span>
            </div>
          </div>
          <button
            type="button"
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white border border-[#334155] hover:bg-[#1E293B] rounded-lg transition-colors"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
