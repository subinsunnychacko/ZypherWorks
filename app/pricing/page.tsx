import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { buildFaqSchema } from "@/lib/schema";
import { PRICING_FAQ } from "@/components/pricing/page/data";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PricingPageHero } from "@/components/pricing/page/PricingPageHero";
import { PricingSpotlight } from "@/components/pricing/page/PricingSpotlight";
import { PricingModel } from "@/components/pricing/page/PricingModel";
import { PricingFAQ } from "@/components/pricing/page/PricingFAQ";
import { PricingPageCTA } from "@/components/pricing/page/PricingPageCTA";

const DESC =
  "No tiers, no seat math. ZypherWorks pricing is scoped to your operation — talk directly to the two founders and get a tailored quote, usually within two days.";

export const metadata: Metadata = {
  title: "Pricing — Scoped to Your Operation",
  alternates: { canonical: `${SITE_URL}/pricing` },
  description: DESC,
  openGraph: {
    title: "Pricing — Scoped to Your Operation | ZypherWorks",
    description: DESC,
    url: `${SITE_URL}/pricing`,
    siteName: "ZypherWorks",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/pricing.png", width: 1200, height: 630, alt: "ZypherWorks — Custom Business Automation Pricing" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zypherworks",
    creator: "@zypherworks",
    title: "Pricing — Scoped to Your Operation | ZypherWorks",
    description: DESC,
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
      <PricingSpotlight />
      <PricingModel />
      <PricingFAQ />
      <PricingPageCTA />
      <Footer />
    </>
  );
}
