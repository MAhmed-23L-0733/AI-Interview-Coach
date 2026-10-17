import { ScrollReveal } from "@/components/shared/ScrollReveal";

const STEPS_DATA = [
  {
    step: "01",
    title: "Select Focus & Difficulty",
    description:
      "Pick your technical domain, target seniority level (L4, L5, Staff), and company style (FAANG, high-frequency trading, fast-growth startup).",
  },
  {
    step: "02",
    title: "Speak and Code in Real Time",
    description:
      "Put on your headset. Discuss your approach out loud, analyze tradeoffs, and implement clean code in the synchronized editor.",
  },
  {
    step: "03",
    title: "Get In-depth Analysis & Report",
    description:
      "Receive line-by-line code reviews, rubric score breakdowns, question-by-question coach assessments, and targeted study recommendations.",
  },
];

export function HowItWorksSection(): React.JSX.Element {
  return (
    <section className="py-20 bg-[#051424]/40 border-t border-[#1F2937]" id="how-it-works">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STEPS_DATA.map((item, index) => (
            <ScrollReveal
              key={item.step}
              delay={index * 0.1}
              distance={24}
            >
              <div
                className="relative flex flex-col items-start p-6 rounded-2xl bg-[#111827] border border-[#1F2937] hover:border-blue-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6] text-white flex items-center justify-center font-bold font-mono text-sm mb-5 shadow-md shadow-blue-500/20">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
