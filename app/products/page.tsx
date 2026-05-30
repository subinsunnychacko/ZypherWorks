import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { softwareApplicationSchema } from "@/lib/schema";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProductsPageHero } from "@/components/products/page/ProductsPageHero";
import { ProductsShowcase } from "@/components/products/page/ProductsShowcase";
import { ProductsFeatured } from "@/components/products/page/ProductsFeatured";
import { ProductsMatrix } from "@/components/products/page/ProductsMatrix";
import { ProductsPageCTA } from "@/components/products/page/ProductsPageCTA";

export const metadata: Metadata = {
  title: "Business Automation Software Products",
  alternates: { canonical: `${SITE_URL}/products` },
  description:
    "Six automation products on one platform — Ease Fit for fitness ops, Vega CRM for sales, Forge Ops for workflows, and Nova Billing. One stack.",
  openGraph: {
    title: "Business Automation Software Products | ZypherWorks",
    description:
      "Six automation products on one platform — Ease Fit for fitness ops, Vega CRM for sales, Forge Ops for workflows, and Nova Billing. One stack.",
    url: `${SITE_URL}/products`,
    siteName: "ZypherWorks",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/products.png", width: 1200, height: 630, alt: "ZypherWorks — Six Business Automation Products on One Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zypherworks",
    creator: "@zypherworks",
    title: "Business Automation Software Products | ZypherWorks",
    description:
      "Six automation products on one platform — Ease Fit for fitness ops, Vega CRM for sales, Forge Ops for workflows, and Nova Billing. One stack.",
    images: ["/og/products.png"],
  },
};

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <Atmosphere />
      <Nav />
      <ProductsPageHero />
      <ProductsShowcase />
      <ProductsFeatured />
      <ProductsMatrix />
      <ProductsPageCTA />
      <Footer />
    </>
  );
}
