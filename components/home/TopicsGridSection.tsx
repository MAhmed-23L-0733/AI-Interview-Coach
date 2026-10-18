import type { JSX } from "react";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { MagicBento } from "@/components/ui/MagicBento";
import { TOPICS_BENTO_ITEMS } from "@/components/home/topicsBentoData";

export function TopicsGridSection(): JSX.Element {
  return (
    <section className="py-20 bg-[#051424]/60 border-y border-[#1F2937]" id="topics">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal direction="up" distance={20}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <div className="text-xs font-bold text-blue-400 tracking-wider uppercase mb-2">
                AI Technical Interview Coach
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Spoken Questions, Live Coding &amp; Detailed Scores
              </h2>
              <p className="text-sm text-slate-400 mt-2">
                Practice realistic voice interviews, write code in an interactive workspace, and receive rubric-based scoring to help you get better every session.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Voice &amp; Coding Ready</span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]" />
            </div>
          </div>
        </ScrollReveal>

        <MagicBento
          items={TOPICS_BENTO_ITEMS}
          columns={4}
          rowHeight={210}
          gap={16}
          radius={20}
          theme="dark"
          glowColor="#3B82F6"
          enableBorderGlow={true}
          enableSpotlight={true}
          spotlightRadius={320}
          enableStars={true}
          particleCount={20}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
        />
      </div>
    </section>
  );
}
