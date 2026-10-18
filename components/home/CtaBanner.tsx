import Link from "next/link";
import { Zap, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function CtaBanner(): React.JSX.Element {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal direction="up" distance={28} duration={0.5} scale={0.98}>
          <div className="relative rounded-3xl bg-[#111827] border border-blue-500/40 p-10 md:p-16 text-center overflow-hidden shadow-2xl">
            {/* Ambient Glow Layer */}
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/15 text-blue-400 text-[11px] font-bold uppercase tracking-wider mb-4 border border-blue-500/30">
                Start Practicing Today
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Ready to land your dream role?
              </h2>
              <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
                Join thousands of engineers practicing with purpose. Start your first voice-powered mock interview in under 60 seconds.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/signup"
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/30 active:scale-[0.98] hover:scale-[1.02] transition-all"
                >
                  <span>Get Started Now</span>
                  <Zap className="w-4 h-4 fill-current" />
                </Link>
                <a
                  href="#topics"
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 bg-[#1C2B3C] hover:bg-[#273647] text-white border border-[#1F2937] font-semibold text-sm px-7 py-3.5 rounded-xl active:scale-[0.98] hover:scale-[1.02] transition-all"
                >
                  <span>Explore Topics</span>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-slate-400 text-xs">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                  <span>No credit card required</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 fill-emerald-500/20" />
                  <span>1 free full session included</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
