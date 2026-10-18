import type { JSX } from "react";
import { FeatureValueCard } from "@/components/home/FeatureValueCard";
import { FEATURES_DATA } from "@/components/home/featuresData";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function FeaturesSection(): JSX.Element {
  return (
    <section className="py-24 relative overflow-hidden" id="features">
      {/* Ambient background glow accents */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal direction="up" distance={20}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-bold text-blue-400 tracking-wider uppercase mb-3">
              Master Every Dimension
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Engineered for High-Stakes Technical Screens
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Standard coding problems don&apos;t replicate the cognitive load of talking while coding. Our multi-modal engine trains both simultaneously.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature, index) => (
            <ScrollReveal
              key={feature.id}
              delay={index * 0.12}
              distance={24}
              className="h-full"
            >
              <FeatureValueCard {...feature} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
