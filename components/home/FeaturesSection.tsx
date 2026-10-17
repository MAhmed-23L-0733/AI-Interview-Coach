import { Mic, Terminal, BarChart3, Volume2, Bug, LineChart } from "lucide-react";
import { FeatureValueCard } from "@/components/home/FeatureValueCard";

const FEATURES_DATA = [
  {
    icon: Mic,
    title: "Real-Time Voice Dialogue",
    description:
      "Ultra-low-latency conversational AI with proactive clarification. If you make a sub-optimal assumption or stay silent too long, the interviewer naturally interjects.",
    badgeIcon: Volume2,
    badgeTitle: "Proactive Probing",
    badgeDescription: "Interrupts gently when Big-O isn't properly justified.",
    iconBgClass: "bg-blue-500/15",
    iconTextClass: "text-blue-400",
    badgeTextClass: "text-blue-400",
  },
  {
    icon: Terminal,
    title: "Live Coding Sandbox",
    description:
      "Integrated browser IDE supporting Python, Java, C++, TypeScript, and Go. Write executable logic against hidden unit tests with instant runtime feedback.",
    badgeIcon: Bug,
    badgeTitle: "Automated Test Matrix",
    badgeDescription: "Evaluates edge cases, null checks, and integer overflows.",
    iconBgClass: "bg-emerald-500/15",
    iconTextClass: "text-emerald-400",
    badgeTextClass: "text-emerald-400",
  },
  {
    icon: BarChart3,
    title: "Diagnostic Rubric Reports",
    description:
      "Comprehensive post-session evaluation broken into 5 quantitative pillars: problem solving, accuracy, communication, code quality, and Big-O efficiency.",
    badgeIcon: LineChart,
    badgeTitle: "Cohort Benchmarking",
    badgeDescription: "See where your solution places against top 10% benchmarks.",
    iconBgClass: "bg-amber-500/15",
    iconTextClass: "text-amber-400",
    badgeTextClass: "text-amber-400",
  },
];

export function FeaturesSection(): React.JSX.Element {
  return (
    <section className="py-24" id="features">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature) => (
            <FeatureValueCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
