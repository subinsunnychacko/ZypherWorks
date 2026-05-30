import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { buildFaqSchema } from "@/lib/schema";
import { PRICING_FAQ } from "@/components/pricing/page/data";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PricingPageHero } from "@/components/pricing/page/PricingPageHero";
import { PricingTiers } from "@/components/pricing/page/PricingTiers";
import { PricingCalculator } from "@/components/pricing/page/PricingCalculator";
import { PricingFAQ } from "@/components/pricing/page/PricingFAQ";
import { PricingPageCTA } from "@/components/pricing/page/PricingPageCTA";

export const metadata: Metadata = {
  title: "Pricing Plans — Business Automation Tiers",
  alternates: { canonical: `${SITE_URL}/pricing` },
  description:
    "Transparent business automation pricing from $1.2k/mo. No seat counts, no hidden fees. Start with a risk-free 60-day pilot — ROI visible before you commit.",
  openGraph: {
    title: "Pricing Plans — Business Automation Tiers | ZypherWorks",
    description:
      "Transparent business automation pricing from $1.2k/mo. No seat counts, no hidden fees. Start with a risk-free 60-day pilot — ROI visible before you commit.",
    url: `${SITE_URL}/pricing`,
    siteName: "ZypherWorks",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/pricing.png", width: 1200, height: 630, alt: "ZypherWorks — Transparent Business Automation Pricing Plans" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zypherworks",
    creator: "@zypherworks",
    title: "Pricing Plans — Business Automation Tiers | ZypherWorks",
    description:
      "Transparent business automation pricing from $1.2k/mo. No seat counts, no hidden fees. Start with a risk-free 60-day pilot — ROI visible before you commit.",
    images: ["/og/pricing.png"],
  },
};

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(PRICING_FAQ)) }}
      />
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
