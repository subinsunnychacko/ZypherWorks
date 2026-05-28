import type { IconName } from "../../ui/Icon";

export type TierFeature = { label: string; included: boolean };

export type Tier = {
  id: string;
  name: string;
  tagline: string;
  priceLabel: string;
  priceUnit?: string;
  priceCaption?: string;
  description: string;
  features: TierFeature[];
  cta: string;
  ctaHref?: string;
  accent: string;
  gradient: string;
  popular?: boolean;
  popularLabel?: string;
};

export const TIERS: Tier[] = [
  {
    id: "launch",
    name: "Launch",
    tagline: "Pilot one workflow, prove the lift.",
    priceLabel: "$2.4k",
    priceUnit: "/mo",
    priceCaption: "starting · 60-day pilot",
    description:
      "Get a tailored platform skeleton with one core workflow automated. Perfect for proving value before scaling up.",
    features: [
      { label: "1 platform module", included: true },
      { label: "Up to 5 operators", included: true },
      { label: "Typed SDK + REST API", included: true },
      { label: "Email support · 24h SLA", included: true },
      { label: "Quarterly platform review", included: true },
      { label: "Per-tenant ML scoring", included: false },
      { label: "Multi-region deployment", included: false },
    ],
    cta: "Start a pilot",
    accent: "oklch(0.78 0.17 220)",
    gradient: "linear-gradient(135deg, oklch(0.72 0.18 240), oklch(0.55 0.2 260))",
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "The full platform, run alongside you.",
    priceLabel: "$7.8k",
    priceUnit: "/mo",
    priceCaption: "starting · most teams ship here",
    description:
      "The full ZypherWorks platform with multiple modules, per-tenant ML, and a dedicated team running it alongside you.",
    features: [
      { label: "Up to 5 platform modules", included: true },
      { label: "Unlimited operators", included: true },
      { label: "Per-tenant ML scoring", included: true },
      { label: "Priority support · 4h SLA", included: true },
      { label: "Monthly platform reviews", included: true },
      { label: "Custom integrations included", included: true },
      { label: "Dedicated success lead", included: true },
    ],
    cta: "Book a Scale call",
    accent: "oklch(0.85 0.16 145)",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
    popular: true,
    popularLabel: "Most teams ship here",
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "Built for operations that don't fit a tier.",
    priceLabel: "Tailored",
    priceCaption: "based on operational scope",
    description:
      "Multi-region deployment, dedicated infra, modules built specifically for your operational shape, and a named platform team.",
    features: [
      { label: "Unlimited platform modules", included: true },
      { label: "Custom-built modules", included: true },
      { label: "Multi-region · single-tenant", included: true },
      { label: "24/7 phone support · 30m SLA", included: true },
      { label: "Quarterly on-site reviews", included: true },
      { label: "SOC 2 + ISO 27001 + BAA", included: true },
      { label: "Named platform engineering team", included: true },
    ],
    cta: "Talk to founders",
    accent: "oklch(0.85 0.16 70)",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 70), oklch(0.65 0.2 50))",
  },
];

export const VALUE_PROPS: { ic: IconName; label: string }[] = [
  { ic: "shield", label: "No commitment beyond 30 days" },
  { ic: "refresh", label: "60-day risk-free pilot" },
  { ic: "spark",  label: "Average payback in 4 months" },
];

export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: "How is pricing actually structured?",
    a: "Every plan is a fixed monthly fee plus usage-based modules. There are no seat counts. The number above is the platform fee — usage tiers are transparent and listed in our quote.",
  },
  {
    q: "Can I start small and scale up later?",
    a: "Yes. The Launch tier is designed as a pilot — you can graduate to Scale or Custom at any month boundary without re-platforming. Your data, workflows, and integrations carry over unchanged.",
  },
  {
    q: "What's the typical project timeline?",
    a: "Six weeks from kickoff to first ship for Launch. Eight to twelve weeks for the full Scale platform. Custom timelines depend on scope — but the first phase always ships in under 8 weeks regardless of tier.",
  },
  {
    q: "What if it doesn't work out?",
    a: "If we haven't measurably moved an operational KPI in 60 days, we refund the platform fee and you keep everything we built. We've never had to invoke this.",
  },
  {
    q: "Who actually builds the platform?",
    a: "The same founding engineering team that built our flagship Ease Fit platform. You're not handed off to junior contractors after the sales call — you work directly with the people designing the system.",
  },
  {
    q: "What about data ownership and security?",
    a: "Your data lives in your cloud account on Scale and Custom, or our SOC 2 II infra on Launch. You retain full ownership at every tier and can export at any time via the typed SDK.",
  },
];

export const ROI_DEFAULTS = {
  teamSize: 12,
  monthlyOps: 1800,
  hoursPerOp: 0.5,
  hourlyCost: 60,
};
