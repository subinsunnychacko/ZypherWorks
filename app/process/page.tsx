import type { Metadata } from "next";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProcessPageHero } from "@/components/process/page/ProcessPageHero";
import { ProcessPhasesGrid } from "@/components/process/page/ProcessPhasesGrid";
import { ProcessDeepDive } from "@/components/process/page/ProcessDeepDive";
import { ProcessPageCTA } from "@/components/process/page/ProcessPageCTA";

export const metadata: Metadata = {
  title: "Process · ZypherWorks",
  description:
    "From conversation to platform in four phases — Discover, Compose, Automate, Operate. A short, opinionated path from problem to platform.",
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
