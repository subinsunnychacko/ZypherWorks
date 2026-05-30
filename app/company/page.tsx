import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CompanyPageHero } from "@/components/company/page/CompanyPageHero";
import { CompanyStory } from "@/components/company/page/CompanyStory";
import { CompanyTeam } from "@/components/company/page/CompanyTeam";
import { CompanyValues } from "@/components/company/page/CompanyValues";
import { CompanyGallery } from "@/components/company/page/CompanyGallery";
import { CompanyPageCTA } from "@/components/company/page/CompanyPageCTA";

export const metadata: Metadata = {
  title: "About ZypherWorks — Operator-Led Team",
  alternates: { canonical: `${SITE_URL}/company` },
  description:
    "Remote-first business automation startup, founded 2021. Built by operators, for operators — 380+ businesses trust ZypherWorks to automate what slows them down.",
  openGraph: {
    title: "About ZypherWorks — Operator-Led Team | ZypherWorks",
    description:
      "Remote-first business automation startup, founded 2021. Built by operators, for operators — 380+ businesses trust ZypherWorks to automate what slows them down.",
    url: `${SITE_URL}/company`,
    siteName: "ZypherWorks",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/company.png", width: 1200, height: 630, alt: "ZypherWorks — Operator-Led Business Automation Team" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zypherworks",
    creator: "@zypherworks",
    title: "About ZypherWorks — Operator-Led Team | ZypherWorks",
    description:
      "Remote-first business automation startup, founded 2021. Built by operators, for operators — 380+ businesses trust ZypherWorks to automate what slows them down.",
    images: ["/og/company.png"],
  },
};

export default function CompanyPage() {
  return (
    <>
      <Atmosphere />
      <Nav />
      <CompanyPageHero />
      <CompanyStory />
      <CompanyTeam />
      <CompanyValues />
      <CompanyGallery />
      <CompanyPageCTA />
      <Footer />
    </>
  );
}
