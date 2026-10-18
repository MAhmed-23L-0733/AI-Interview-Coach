import { ShieldCheck, CreditCard, RotateCcw, Lock } from "lucide-react";

export function PricingGuarantee(): React.JSX.Element {
  const guarantees = [
    {
      icon: ShieldCheck,
      text: "14-Day Money-Back Guarantee",
    },
    {
      icon: CreditCard,
      text: "No Credit Card Needed for Starter",
    },
    {
      icon: RotateCcw,
      text: "Cancel or Pause Anytime in 1-Click",
    },
    {
      icon: Lock,
      text: "Private & Encrypted Audio Sessions",
    },
  ];

  return (
    <div className="mt-16 pt-8 border-t border-[#1F2937]/80">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {guarantees.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-400 text-xs"
            >
              <Icon className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium text-slate-300">{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
