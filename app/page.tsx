import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Atmosphere } from "@/components/Atmosphere";

export const metadata: Metadata = {
  title: { absolute: "ZypherWorks | Business Automation Platform for Operators" },
  alternates: { canonical: SITE_URL },
  description:
    "ZypherWorks automates operational workflows, bookings, CRM, and billing — so operators can scale their business without scaling the overhead.",
  openGraph: {
    title: "ZypherWorks | Business Automation Platform for Operators",
    description:
      "ZypherWorks automates operational workflows, bookings, CRM, and billing — so operators can scale their business without scaling the overhead.",
    url: SITE_URL,
    siteName: "ZypherWorks",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "ZypherWorks — Business Automation Platform for Operators" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@zypherworks",
    creator: "@zypherworks",
    title: "ZypherWorks | Business Automation Platform for Operators",
    description:
      "ZypherWorks automates operational workflows, bookings, CRM, and billing — so operators can scale their business without scaling the overhead.",
    images: ["/og/home.png"],
  },
};
import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/hero/Hero";
import { Marquee } from "@/components/Marquee";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

/* Below-fold heavy components — code-split into separate chunks so the
   initial JS payload only includes above-fold content. SSR stays on so
   the HTML is complete (no layout shift), only the JS is deferred. */
const Pillars = dynamic(() =>
  import("@/components/pillars/Pillars").then((m) => ({ default: m.Pillars })),
);
const Products = dynamic(() =>
  import("@/components/products/Products").then((m) => ({ default: m.Products })),
);
const Process = dynamic(() =>
  import("@/components/Process").then((m) => ({ default: m.Process })),
);
const Metrics = dynamic(() =>
  import("@/components/Metrics").then((m) => ({ default: m.Metrics })),
);

export default function Page() {
	return (
		<>
			<Atmosphere />
			<Nav />
			<Hero />
			<Marquee />
			<Pillars />
			<Products />
			<Process />
			<Metrics />
			<CTA />
			<Footer />
		</>
	);
}
