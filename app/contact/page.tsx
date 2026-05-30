import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Atmosphere } from "@/components/Atmosphere";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactPageHero } from "@/components/contact/page/ContactPageHero";
import { ContactChannels } from "@/components/contact/page/ContactChannels";
import { ContactProcess } from "@/components/contact/page/ContactProcess";

export const metadata: Metadata = {
  title: "Contact Us — Book a Demo or Start a Pilot",
  alternates: { canonical: `${SITE_URL}/contact` },
  description:
    "Book a demo or start a platform pilot with ZypherWorks. Reach a founder directly — we reply within 4 hours. No chatbots, no sales handoffs.",
  openGraph: {
    title: "Contact Us — Book a Demo or Start a Pilot | ZypherWorks",
    description:
      "Book a demo or start a platform pilot with ZypherWorks. Reach a founder directly — we reply within 4 hours. No chatbots, no sales handoffs.",
    url: `${SITE_URL}/contact`,
    siteName: "ZypherWorks",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/contact.png", width: 1200, height: 630, alt: "ZypherWorks — Book a Demo or Start a Platform Pilot" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zypherworks",
    creator: "@zypherworks",
    title: "Contact Us — Book a Demo or Start a Pilot | ZypherWorks",
    description:
      "Book a demo or start a platform pilot with ZypherWorks. Reach a founder directly — we reply within 4 hours. No chatbots, no sales handoffs.",
    images: ["/og/contact.png"],
  },
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
