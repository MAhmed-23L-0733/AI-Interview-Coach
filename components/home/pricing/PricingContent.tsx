"use client";

import { useState } from "react";
import { BillingToggle } from "./BillingToggle";
import { PricingCard } from "./PricingCard";
import { PRICING_TIERS } from "./pricingData";
import type { BillingCycle } from "./types";

export function PricingContent(): React.JSX.Element {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("annually");

  return (
    <div className="space-y-10">
      <BillingToggle
        billingCycle={billingCycle}
        onToggle={setBillingCycle}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
        {PRICING_TIERS.map((tier) => (
          <PricingCard
            key={tier.id}
            tier={tier}
            billingCycle={billingCycle}
          />
        ))}
      </div>
    </div>
  );
}
