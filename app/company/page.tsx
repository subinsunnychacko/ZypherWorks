import type { Metadata } from "next";
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
  title: "Company · ZypherWorks",
  description:
    "Remote-first, operator-led. 42 people across 9 timezones building the platforms that 11,000+ businesses run on every day.",
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
