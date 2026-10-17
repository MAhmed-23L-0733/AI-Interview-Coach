"use client";

import * as React from "react";
import { Send, X, Check, ChevronRight, Mail, MessageCircle, Share2, Link as LinkIcon } from "lucide-react";
import type { SessionReport } from "@/lib/validations/report";
import { shareReportChannel, type ShareChannel } from "@/lib/utils/report-share";

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: SessionReport;
}

const CHANNELS = [
  { id: "gmail" as ShareChannel, title: "Gmail", sub: "Send by email", icon: Mail, color: "bg-red-500/15 border-red-500/30 text-red-400" },
  { id: "whatsapp" as ShareChannel, title: "WhatsApp", sub: "Share in a chat", icon: MessageCircle, color: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" },
  { id: "linkedin" as ShareChannel, title: "LinkedIn", sub: "Share with your network", icon: Share2, color: "bg-blue-500/15 border-blue-500/30 text-blue-400" },
  { id: "copy" as ShareChannel, title: "Copy link", sub: "Copy a private report link", icon: LinkIcon, color: "bg-slate-700/30 border-slate-600 text-slate-300" },
] as const;

export function ShareReportModal({ isOpen, onClose, report }: ShareReportModalProps): React.JSX.Element | null {
  const [copied, setCopied] = React.useState(false);
  if (!isOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out my AI Interview Coach diagnostic report (${report.score}/100 in ${report.title})!`;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-md rounded-2xl border border-[#1F2937] bg-[#111827] p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-2.5 text-blue-400">
              <Send className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Share your report</h2>
              <p className="text-xs text-slate-400">Choose where you would like to share your interview results.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-[#1E293B] hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const isCopy = ch.id === "copy";
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => shareReportChannel(ch.id, shareText, currentUrl, () => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2500);
                })}
                className="flex w-full items-center justify-between rounded-xl border border-[#1F2937] bg-[#0B0F17]/50 p-3.5 text-left transition-colors hover:border-[#334155] hover:bg-[#1E293B]/40"
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-lg border ${ch.color}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <h3 className="text-xs font-semibold text-white">{isCopy && copied ? "Copied to clipboard!" : ch.title}</h3>
                    <p className="text-[11px] text-slate-400">{ch.sub}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center gap-1.5 text-[11px] text-slate-500">
          <Check className="h-3.5 w-3.5 text-slate-400" />
          <span>Only people you share the report with can access it.</span>
        </div>
      </div>
    </div>
  );
}
