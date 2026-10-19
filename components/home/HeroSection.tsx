import Link from "next/link";
import { Mic, PlayCircle, Star } from "lucide-react";
import { HeroInterviewPreview } from "@/components/home/HeroInterviewPreview";
import { HeroMagicRings } from "@/components/home/HeroMagicRings";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function HeroSection(): React.JSX.Element {
  return (
    <section className="relative isolate overflow-hidden">
      {/* First Fold: Full Viewport Hero Landing */}
      <div className="relative min-h-dvh flex flex-col justify-between items-center w-full pt-20">
        {/* Interactive WebGL Magic Rings */}
        <HeroMagicRings />

        {/* Background Ambient Glow Rings */}
        <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none z-0" />
        <div className="absolute top-[44%] left-1/4 w-[380px] h-[380px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none z-0" />

        {/* Content Container - Vertically Centered in Fold */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center items-center pt-8 sm:pt-12">
          <ScrollReveal direction="up" distance={20} delay={0.05}>
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              {/* Main Hero Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-extrabold tracking-tight mb-8 leading-tight">
                Think clearly. Speak confidently.
                <br className="hidden sm:inline" />{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
                  Interview better.
                </span>
              </h1>

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
            </div>
          </ScrollReveal>
        </div>

        {/* Social Proof Badges anchored at bottom of first fold */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-8 sm:pb-12">
          <div className="max-w-3xl mx-auto pt-6 border-t border-[#1F2937]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
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
      </div>

      {/* Hero Visual Live Preview */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-16 pb-20 md:pb-28">
        <ScrollReveal direction="up" distance={30} delay={0.2} duration={0.6}>
          <HeroInterviewPreview />
        </ScrollReveal>
      </div>
    </section>
  );
}
