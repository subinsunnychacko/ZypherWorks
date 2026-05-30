import { SITE_URL } from "./site";

/** Organization — brand identity, knowledge panel, contact point. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZypherWorks",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og/default.png`,
    width: 1200,
    height: 630,
  },
  description:
    "ZypherWorks is a business automation platform that helps operators automate workflows, bookings, CRM, billing, and more — so teams can scale without scaling the overhead.",
  foundingDate: "2021",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: 16,
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@zypherworks.io",
    contactType: "customer service",
    availableLanguage: "English",
  },
};

/** WebSite — enables Google sitelinks for the brand. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ZypherWorks",
  url: SITE_URL,
  description:
    "ZypherWorks automates operational workflows, bookings, CRM, and billing for modern businesses.",
};

/** SoftwareApplication — makes the platform eligible for Google's app/software rich results. */
export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ZypherWorks Business Automation Platform",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "Six automation products on one platform — Ease Fit for fitness operations, Vega CRM for sales, Forge Ops for workflow automation, Nova Billing for subscription finance, and more.",
  offers: {
    "@type": "Offer",
    price: "1200",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "1200",
      priceCurrency: "USD",
      unitText: "month",
    },
    availability: "https://schema.org/InStock",
  },
  featureList: [
    "Workflow Automation",
    "CRM & Sales Intelligence",
    "Booking & Scheduling Management",
    "Subscription Billing & Revenue Operations",
    "Operator-grade Analytics",
    "Unified Customer Messaging",
    "Per-tenant ML Scoring",
    "Typed SDK & REST API",
  ],
  provider: {
    "@type": "Organization",
    name: "ZypherWorks",
    url: SITE_URL,
  },
};

/** FAQPage — FAQ rich results in Google Search (most impactful for conversions). */
export function buildFaqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
