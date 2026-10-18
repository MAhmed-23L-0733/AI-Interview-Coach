import { Badge } from "@/components/ui/badge";

export function PricingHeader(): React.JSX.Element {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10">
      <Badge
        variant="outline"
        className="border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase px-3 py-1 mb-4"
      >
        Simple, Transparent Pricing
      </Badge>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
        Invest in Your Next Level
      </h2>
      <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
        Realistic AI voice technical screens with live feedback, deep behavioral rubric evaluations, and code execution. Land your dream offer with confidence.
      </p>
    </div>
  );
}
