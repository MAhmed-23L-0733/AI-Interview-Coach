import { Check, Minus } from "lucide-react";
import type { PricingFeature } from "./types";

interface PricingFeaturesListProps {
  features: PricingFeature[];
}

export function PricingFeaturesList({
  features,
}: PricingFeaturesListProps): React.JSX.Element {
  return (
    <ul className="space-y-3 text-sm">
      {features.map((feature, idx) => (
        <li
          key={idx}
          className={`flex items-start gap-2.5 transition-colors ${
            feature.included
              ? feature.highlight
                ? "text-blue-300 font-medium"
                : "text-slate-200"
              : "text-slate-500 line-through/40 opacity-60"
          }`}
        >
          {feature.included ? (
            <div className="shrink-0 mt-0.5 rounded-full p-0.5 bg-emerald-500/15 text-emerald-400">
              <Check className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className="shrink-0 mt-0.5 rounded-full p-0.5 bg-slate-800 text-slate-500">
              <Minus className="w-3.5 h-3.5" />
            </div>
          )}
          <span className="leading-snug">{feature.text}</span>
        </li>
      ))}
    </ul>
  );
}
