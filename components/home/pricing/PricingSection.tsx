import { PricingHeader } from "./PricingHeader";
import { PricingContent } from "./PricingContent";
import { PricingGuarantee } from "./PricingGuarantee";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

export function PricingSection(): React.JSX.Element {
  return (
    <section
      className="pt-24 pb-28 md:pt-32 md:pb-36 relative overflow-hidden bg-[#0B0F17] scroll-mt-28"
      id="pricing"
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-blue-600/10 blur-[140px] rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal direction="up" distance={24} duration={0.5}>
          <PricingHeader />
        </ScrollReveal>

        <ScrollReveal direction="up" distance={32} delay={0.15} duration={0.6}>
          <PricingContent />
        </ScrollReveal>

        <ScrollReveal direction="up" distance={20} delay={0.3} duration={0.5}>
          <PricingGuarantee />
        </ScrollReveal>
      </div>
    </section>
  );
}
