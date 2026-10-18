import React from 'react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { HowItWorksInteractive } from './how-it-works';

export function HowItWorksSection(): React.JSX.Element {
  return (
    <section
      className="relative py-20 bg-[#051424]/40 border-t border-[#1F2937]"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <ScrollReveal direction="up" distance={20}>
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
              Simplicity & Speed
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Three steps from zero to realistic interview practice.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" distance={24} delay={0.1}>
          <HowItWorksInteractive />
        </ScrollReveal>
      </div>
    </section>
  );
}

export default HowItWorksSection;
