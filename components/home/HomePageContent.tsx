import { HeroSection } from "@/components/home/HeroSection";
import { TopicsGridSection } from "@/components/home/TopicsGridSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { PricingSection } from "@/components/home/pricing/PricingSection";
import { CtaBanner } from "@/components/home/CtaBanner";

export function HomePageContent(): React.JSX.Element {
  return (
    <div className="flex flex-col w-full bg-[#0B0F17] -mt-20">
      <HeroSection />
      <TopicsGridSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <CtaBanner />
    </div>
  );
}
