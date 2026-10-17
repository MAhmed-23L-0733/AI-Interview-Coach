import Link from "next/link";
import { Mic, PlayCircle, Star } from "lucide-react";
import { HeroInterviewPreview } from "@/components/home/HeroInterviewPreview";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function HeroSection(): React.JSX.Element {
  return (
    <section className="relative pt-12 md:pt-20 pb-20 md:pb-28 overflow-hidden">
      {/* Background Ambient Glow Rings */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[380px] h-[380px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal direction="up" distance={20} delay={0.05}>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            {/* Category Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111827] border border-[#1F2937] mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10B981]" />
              <span className="text-[11px] font-bold tracking-wider text-slate-200 uppercase">
                Voice-Powered Practice
              </span>
            </div>

            {/* Main Hero Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight mb-6 leading-tight">
              Think clearly. Speak confidently.
              <br className="hidden sm:inline" />{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
                Interview better.
              </span>
            </h1>

            {/* Body Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed">
              Practice realistic, voice-led technical and behavioral interviews with an AI coach that listens, challenges, and helps you master your next tech role.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                href="/signup"
                className="w-full sm:w-auto min-h-[44px] inline-flex justify-center items-center gap-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-[0_4px_24px_rgba(59,130,246,0.35)] active:scale-[0.98] transition-all"
              >
                <span>Start Free Interview</span>
                <Mic className="w-4 h-4" />
              </Link>
              <a
                href="#demo"
                className="w-full sm:w-auto min-h-[44px] inline-flex justify-center items-center gap-2 bg-[#111827] hover:bg-[#1E293B] text-slate-200 border border-[#1F2937] font-semibold text-sm px-7 py-3.5 rounded-xl active:scale-[0.98] transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                <span>View Demo</span>
              </a>
            </div>

            {/* Social Proof Badges */}
            <div className="mt-12 pt-8 border-t border-[#1F2937] w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">4.9/5 rating</span>
                <span className="text-sm text-slate-500">• from 10,000+ sessions</span>
              </div>

              <div className="flex items-center gap-3 md:gap-5 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <span>Google</span>
                <span>•</span>
                <span>Meta</span>
                <span>•</span>
                <span>Amazon</span>
                <span>•</span>
                <span>Stripe</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Hero Visual Live Preview */}
        <ScrollReveal direction="up" distance={30} delay={0.2} duration={0.6}>
          <HeroInterviewPreview />
        </ScrollReveal>
      </div>
    </section>
  );
}
