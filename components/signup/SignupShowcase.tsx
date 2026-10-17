import * as React from "react";
import Link from "next/link";
import { AudioLines } from "lucide-react";

/**
 * Server component rendering the left branded showcase hero panel for signup.
 * Designed to be identical to the login showcase adhering to the Stitch Design System.
 */
export function SignupShowcase(): React.JSX.Element {
  return (
    <aside className="relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-[#1F2937]/70 bg-[#0B0F17] p-10 lg:flex xl:p-14">
      {/* Concentric rings & ambient radial luminescence */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <div className="absolute right-[-10%] top-1/2 h-[760px] w-[760px] -translate-y-1/2 rounded-full border border-slate-800/30" />
        <div className="absolute right-[-2%] top-1/2 h-[540px] w-[540px] -translate-y-1/2 rounded-full border border-slate-800/40" />
        <div className="absolute right-[6%] top-1/2 h-[340px] w-[340px] -translate-y-1/2 rounded-full border border-blue-500/15" />
        <div className="absolute right-[12%] top-1/2 h-[160px] w-[160px] -translate-y-1/2 rounded-full border border-blue-500/20 bg-blue-500/5 blur-xs" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_50%,rgba(59,130,246,0.12)_0%,transparent_65%)]" />
      </div>

      {/* Top Brand Mark (Links to homepage) */}
      <Link
        href="/"
        className="group relative z-10 flex w-fit items-center gap-3 transition-opacity hover:opacity-90"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6] shadow-[0_0_16px_rgba(59,130,246,0.4)] transition-transform group-hover:scale-105">
          <AudioLines className="h-5 w-5 text-white" strokeWidth={2.2} />
        </div>
        <span className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
          AI Interviewing Coach
        </span>
      </Link>

      {/* Middle Hero Content */}
      <div className="relative z-10 my-auto max-w-lg space-y-6 py-12">
        {/* Status Tag Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[11px] font-bold tracking-widest text-[#10B981] uppercase">
            VOICE-POWERED PRACTICE
          </span>
        </div>

        {/* Stacked Display Headline */}
        <h1 className="space-y-1 text-4xl font-extrabold tracking-tight leading-[1.12] xl:text-5xl">
          <span className="block text-white">Think clearly.</span>
          <span className="block text-white">Speak confidently.</span>
          <span className="block text-[#3B82F6]">Interview better.</span>
        </h1>

        {/* Descriptive Subtext */}
        <p className="text-base text-slate-400 leading-relaxed xl:text-lg">
          Practice realistic technical interviews with an AI coach that listens,
          challenges, and helps you improve.
        </p>
      </div>

      {/* Floating Footer Pill Badge */}
      <div className="relative z-10 inline-flex w-fit items-center gap-3 rounded-full border border-[#1F2937] bg-[#111827] px-4 py-2.5 shadow-xl">
        <div className="flex h-4 items-center gap-1">
          <span className="h-2 w-0.5 rounded-full bg-[#3B82F6] animate-pulse" />
          <span className="h-4 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:150ms]" />
          <span className="h-3 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:300ms]" />
          <span className="h-4.5 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:75ms]" />
          <span className="h-3 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:225ms]" />
          <span className="h-4 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:375ms]" />
          <span className="h-2 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:100ms]" />
        </div>
        <span className="font-mono text-xs font-medium tracking-wide text-slate-300">
          AI Interviewer ready
        </span>
      </div>
    </aside>
  );
}
