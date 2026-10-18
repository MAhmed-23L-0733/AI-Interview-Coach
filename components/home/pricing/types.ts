export type BillingCycle = "monthly" | "annually";

export interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  badge?: string;
  ctaText: string;
  ctaHref: string;
  features: PricingFeature[];
}
