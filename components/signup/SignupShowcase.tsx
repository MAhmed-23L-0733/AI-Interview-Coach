import Link from "next/link";
import { AudioWaveform } from "lucide-react";

export function SignupShowcase(): React.JSX.Element {
  return (
    <aside className="relative hidden flex-col justify-between overflow-hidden border-r border-[#1F2937]/50 bg-[#0B0F17] p-10 lg:flex xl:p-16">
      {/* Concentric rings backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-800/30" />
        <div className="absolute top-1/2 left-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-800/40" />
        <div className="absolute top-1/2 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-800/60 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
      </div>

      {/* Top: Logo & Branding (Links to homepage) */}
      <Link
        href="/"
        className="group relative z-10 flex w-fit items-center gap-3 transition-opacity hover:opacity-90"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-transform group-hover:scale-105">
          <AudioWaveform className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-blue-400">
          AI Interviewing Coach
        </span>
      </Link>

      {/* Middle: Brand Headline & Value Proposition */}
      <div className="relative z-10 my-auto max-w-lg py-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-sky-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
          </span>
          <span>VOICE-POWERED PRACTICE</span>
        </div>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl xl:text-[54px] leading-[1.12]">
          Think clearly.
          <br />
          Speak confidently.
          <br />
          <span className="text-[#3B82F6]">Interview better.</span>
        </h1>

        <p className="mt-6 text-base leading-relaxed text-[#94A3B8]">
          Practice realistic technical interviews with an AI coach that listens,
          challenges, and helps you improve.
        </p>
      </div>

      {/* Bottom: Voice Status Badge */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#1F2937] bg-[#111827]/80 px-4 py-2.5 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1" aria-hidden="true">
            <span className="h-2 w-0.5 rounded-full bg-[#3B82F6] animate-pulse" />
            <span className="h-4 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:150ms]" />
            <span className="h-3 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:300ms]" />
            <span className="h-5 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:75ms]" />
            <span className="h-3.5 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:225ms]" />
            <span className="h-2 w-0.5 rounded-full bg-[#3B82F6] animate-pulse [animation-delay:375ms]" />
          </div>
          <span className="text-xs font-medium text-slate-300 sm:text-sm">
            AI Interviewer ready
          </span>
        </div>
      </div>
    </aside>
  );
}
