import type { Metadata } from "next";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactPageHero } from "@/components/contact/page/ContactPageHero";
import { ContactChannels } from "@/components/contact/page/ContactChannels";
import { ContactProcess } from "@/components/contact/page/ContactProcess";

export const metadata: Metadata = {
  title: "Contact · ZypherWorks",
  description:
    "Reach a founding team member directly. We read every message within 4 hours and reply the same day — no chatbots, no auto-responders.",
};

export default function ContactPage() {
  return (
    <>
      <Atmosphere />
      <Nav />
      <ContactPageHero />
      <ContactChannels />
      <ContactProcess />
      <Footer />
    </>
  );
}
