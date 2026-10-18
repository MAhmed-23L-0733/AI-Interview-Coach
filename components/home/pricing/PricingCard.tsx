import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { PricingFeaturesList } from "./PricingFeaturesList";
import type { PricingTier, BillingCycle } from "./types";

interface PricingCardProps {
  tier: PricingTier;
  billingCycle: BillingCycle;
}

export function PricingCard({ tier, billingCycle }: PricingCardProps): React.JSX.Element {
  const isAnnual = billingCycle === "annually";
  const displayPrice = isAnnual ? tier.annualPrice : tier.monthlyPrice;
  const isFree = tier.monthlyPrice === 0;

  return (
    <Card
      className={`relative flex flex-col justify-between transition-all duration-300 h-full overflow-visible ${
        tier.popular
          ? "border-blue-500/60 bg-gradient-to-b from-[#131d2e] to-[#0d1422] shadow-xl shadow-blue-500/10 scale-[1.02] md:-translate-y-2 z-10"
          : "border-[#1F2937] bg-[#111827]/80 hover:border-slate-700 hover:bg-[#111827]"
      }`}
    >
      {tier.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap">
          <Badge
            className={`px-3 py-1 text-xs font-semibold shadow-lg whitespace-nowrap ${
              tier.popular
                ? "bg-blue-600 text-white border-blue-400 hover:bg-blue-500 shadow-blue-500/20"
                : "bg-slate-800 text-slate-200 border-slate-700"
            }`}
          >
            {tier.popular && <Sparkles className="w-3.5 h-3.5 mr-1 inline fill-current" />}
            {tier.badge}
          </Badge>
        </div>
      )}

      <div>
        <CardHeader className="pt-7 pb-3">
          <CardTitle className="text-xl font-bold text-white tracking-tight">
            {tier.name}
          </CardTitle>
          <CardDescription className="text-xs text-slate-400 min-h-[34px] leading-relaxed">
            {tier.tagline}
          </CardDescription>

          <div className="pt-4 pb-2">
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                ${displayPrice}
              </span>
              <span className="text-sm font-medium text-slate-400">
                {isFree ? "/forever" : "/month"}
              </span>
            </div>
            {!isFree && (
              <p className="text-[11px] text-slate-400 mt-1">
                {isAnnual ? `Billed annually ($${displayPrice * 12}/yr)` : "Billed monthly, cancel anytime"}
              </p>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-2 pb-6 border-t border-[#1F2937]/70">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-3">
            What&apos;s included:
          </span>
          <PricingFeaturesList features={tier.features} />
        </CardContent>
      </div>

      <CardFooter className="pt-4 pb-6 border-t border-[#1F2937]/50">
        <Link
          href={tier.ctaHref}
          className={cn(
            buttonVariants({ variant: tier.popular ? "default" : "outline", size: "lg" }),
            "w-full min-h-[44px] rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2",
            tier.popular
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 active:scale-[0.98]"
              : "border-[#1F2937] hover:border-slate-600 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white"
          )}
        >
          <span>{tier.ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
