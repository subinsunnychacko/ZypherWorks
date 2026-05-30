import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProcessPageHero } from "@/components/process/page/ProcessPageHero";
import { ProcessPhasesGrid } from "@/components/process/page/ProcessPhasesGrid";
import { ProcessDeepDive } from "@/components/process/page/ProcessDeepDive";
import { ProcessPageCTA } from "@/components/process/page/ProcessPageCTA";

export const metadata: Metadata = {
  title: "4-Phase Platform Implementation Process",
  alternates: { canonical: `${SITE_URL}/process` },
  description:
    "Our four-phase process — Discover, Compose, Automate, Operate — moves you from problem to live automation platform in six weeks, not quarters.",
  openGraph: {
    title: "4-Phase Platform Implementation Process | ZypherWorks",
    description:
      "Our four-phase process — Discover, Compose, Automate, Operate — moves you from problem to live automation platform in six weeks, not quarters.",
    url: `${SITE_URL}/process`,
    siteName: "ZypherWorks",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/process.png", width: 1200, height: 630, alt: "ZypherWorks — 4-Phase Platform Implementation Process" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zypherworks",
    creator: "@zypherworks",
    title: "4-Phase Platform Implementation Process | ZypherWorks",
    description:
      "Our four-phase process — Discover, Compose, Automate, Operate — moves you from problem to live automation platform in six weeks, not quarters.",
    images: ["/og/process.png"],
  },
};

export default function ProcessPage() {
  return (
    <>
      <Atmosphere />
      <Nav />
      <ProcessPageHero />
      <ProcessPhasesGrid />
      <ProcessDeepDive />
      <ProcessPageCTA />
      <Footer />
    </>
  );
}
