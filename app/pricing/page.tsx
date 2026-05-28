import type { Metadata } from "next";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PricingPageHero } from "@/components/pricing/page/PricingPageHero";
import { PricingTiers } from "@/components/pricing/page/PricingTiers";
import { PricingCalculator } from "@/components/pricing/page/PricingCalculator";
import { PricingFAQ } from "@/components/pricing/page/PricingFAQ";
import { PricingPageCTA } from "@/components/pricing/page/PricingPageCTA";

export const metadata: Metadata = {
  title: "Pricing · ZypherWorks",
  description:
    "Pay for outcomes, not seat counts. Three transparent tiers with a 60-day risk-free pilot and average 4-month payback.",
};

export default function PricingPage() {
  return (
    <>
      <Atmosphere />
      <Nav />
      <PricingPageHero />
      <PricingTiers />
      <PricingCalculator />
      <PricingFAQ />
      <PricingPageCTA />
      <Footer />
    </>
  );
}
