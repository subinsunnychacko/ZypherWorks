import type { IconName } from "../../ui/Icon";

export type ProductStatus = "live" | "beta" | "soon";
export type PreviewKind = "ease" | "vega" | "forge" | "lume" | "nova" | "pulse";

export type Product = {
  id: string;
  name: string;
  letter: string;
  tagline: string;
  description: string;
  category: string;
  status: ProductStatus;
  statusLabel: string;
  href?: string;
  gradient: string;
  accent: string;
  metrics: { label: string; value: string }[];
  features: { ic: IconName; label: string }[];
  preview: PreviewKind;
};

export const PRODUCTS: Product[] = [
  {
    id: "ease-fit",
    name: "Ease Fit",
    letter: "e",
    tagline: "The fitness business platform.",
    description:
      "Bookings, leads and engagement on one rail — a single workspace to run gym, studio and wellness operations.",
    category: "Operations",
    status: "live",
    statusLabel: "Live · Flagship",
    href: "https://www.ease.fit/",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
    accent: "oklch(0.78 0.17 155)",
    metrics: [
      { label: "operators", value: "11k+" },
      { label: "bookings · mo", value: "2.4M" },
      { label: "retention · yr 1", value: "92%" },
    ],
    features: [
      { ic: "cal", label: "Smart bookings" },
      { ic: "spark", label: "Lead capture" },
      { ic: "users", label: "Member engagement" },
      { ic: "chart", label: "Operator analytics" },
    ],
    preview: "ease",
  },
  {
    id: "vega",
    name: "Vega CRM",
    letter: "v",
    tagline: "Relationship intelligence for sales.",
    description:
      "Treats every conversation as data. Embedded scoring, next-best-actions and pipeline forecasting tuned per tenant.",
    category: "Sales",
    status: "live",
    statusLabel: "Live",
    gradient: "linear-gradient(135deg, oklch(0.72 0.2 25), oklch(0.55 0.22 350))",
    accent: "oklch(0.72 0.2 25)",
    metrics: [
      { label: "pipelines", value: "8.2k" },
      { label: "forecast accuracy", value: "94%" },
      { label: "conversion lift", value: "+34%" },
    ],
    features: [
      { ic: "users", label: "Pipeline intel" },
      { ic: "spark", label: "Conversation scoring" },
      { ic: "chart", label: "Revenue forecasting" },
      { ic: "eye", label: "Activity replay" },
    ],
    preview: "vega",
  },
  {
    id: "forge",
    name: "Forge Ops",
    letter: "f",
    tagline: "Headless workflow engine.",
    description:
      "Triggers, branches and humans in one runtime. Build internal automation with code-first primitives and typed SDKs.",
    category: "Automation",
    status: "live",
    statusLabel: "Live",
    gradient: "linear-gradient(135deg, oklch(0.78 0.17 60), oklch(0.58 0.22 30))",
    accent: "oklch(0.82 0.17 55)",
    metrics: [
      { label: "workflows", value: "62k" },
      { label: "p95 latency", value: "180ms" },
      { label: "triggers", value: "200+" },
    ],
    features: [
      { ic: "bolt", label: "Event triggers" },
      { ic: "layers", label: "Branching DSL" },
      { ic: "users", label: "Human-in-loop" },
      { ic: "refresh", label: "Replayable runs" },
    ],
    preview: "forge",
  },
  {
    id: "lume",
    name: "Lume Insight",
    letter: "l",
    tagline: "Operator-grade analytics.",
    description:
      "Model-aware anomaly detection out of the box. Stream events to dashboards, automations and your warehouse in parallel.",
    category: "Analytics",
    status: "beta",
    statusLabel: "Q3 26 · Beta",
    gradient: "linear-gradient(135deg, oklch(0.72 0.18 280), oklch(0.52 0.22 250))",
    accent: "oklch(0.72 0.18 280)",
    metrics: [
      { label: "events / day", value: "3.2M" },
      { label: "warehouse sync", value: "Native" },
      { label: "detection", value: "ML" },
    ],
    features: [
      { ic: "chart", label: "Realtime streams" },
      { ic: "spark", label: "Anomaly detection" },
      { ic: "layers", label: "Warehouse sync" },
      { ic: "grid", label: "Dashboard editor" },
    ],
    preview: "lume",
  },
  {
    id: "nova",
    name: "Nova Billing",
    letter: "n",
    tagline: "Subscription & revenue ops.",
    description:
      "Usage-metered billing, automated dunning and revenue recognition — built for product-led pricing models.",
    category: "Finance",
    status: "live",
    statusLabel: "Live",
    gradient: "linear-gradient(135deg, oklch(0.8 0.16 195), oklch(0.55 0.2 220))",
    accent: "oklch(0.8 0.16 195)",
    metrics: [
      { label: "MRR processed", value: "$48M" },
      { label: "failed-pay recovery", value: "+38%" },
      { label: "jurisdictions", value: "42" },
    ],
    features: [
      { ic: "chart", label: "Usage metering" },
      { ic: "refresh", label: "Dunning automation" },
      { ic: "shield", label: "Revenue recognition" },
      { ic: "cube", label: "Multi-currency" },
    ],
    preview: "nova",
  },
  {
    id: "pulse",
    name: "Pulse Inbox",
    letter: "p",
    tagline: "Unified customer messaging.",
    description:
      "WhatsApp, SMS, email, in-app — every conversation in one thread. AI-assist drafting and auto-triage built in.",
    category: "Comms",
    status: "soon",
    statusLabel: "Q4 26",
    gradient: "linear-gradient(135deg, oklch(0.84 0.16 105), oklch(0.6 0.2 145))",
    accent: "oklch(0.82 0.18 110)",
    metrics: [
      { label: "channels", value: "8+" },
      { label: "AI drafting", value: "Built-in" },
      { label: "response time", value: "−62%" },
    ],
    features: [
      { ic: "msg", label: "Channel unification" },
      { ic: "spark", label: "AI drafting" },
      { ic: "bell", label: "Auto-triage" },
      { ic: "users", label: "Team handoff" },
    ],
    preview: "pulse",
  },
];
