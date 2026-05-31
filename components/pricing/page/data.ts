import type { IconName } from "../../ui/Icon";

/* ─────────────────────────────────────────────────────────────
   Pricing is custom — scoped per engagement. No public tiers.
   These drive the 3D spotlight + "how pricing works" cards.
   ───────────────────────────────────────────────────────────── */

/** Value props shown beneath the spotlight CTA. */
export const VALUE_PROPS: { ic: IconName; value: string; label: string }[] = [
  { ic: "shield", value: "30d", label: "commitment, max" },
  { ic: "refresh", value: "60d", label: "risk-free pilot" },
  { ic: "cube", value: "100%", label: "data portability" },
];

/** "How pricing works" — the model, not tiers. Drives the 3D-tilt cards. */
export type Principle = {
  ic: IconName;
  step: string;
  title: string;
  description: string;
  accent: string;
  gradient: string;
};

export const PRINCIPLES: Principle[] = [
  {
    ic: "spark",
    step: "01",
    title: "Start with a pilot",
    description:
      "A focused 60-day engagement on one real workflow. You see the lift before committing to anything bigger.",
    accent: "oklch(0.78 0.17 220)",
    gradient: "linear-gradient(135deg, oklch(0.72 0.18 240), oklch(0.55 0.2 260))",
  },
  {
    ic: "cube",
    step: "02",
    title: "Pay for the platform, not seats",
    description:
      "One fixed monthly fee plus the modules you actually use. No per-user math, no surprise overages.",
    accent: "oklch(0.85 0.16 145)",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
  },
  {
    ic: "layers",
    step: "03",
    title: "Scale on your terms",
    description:
      "Add modules or step up scope at any month boundary. Your data and workflows carry over untouched.",
    accent: "oklch(0.85 0.16 70)",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 70), oklch(0.65 0.2 50))",
  },
];

export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: "Why don't you list prices?",
    a: "Because every engagement is scoped to your operation — the workflows, the modules, the integrations. A fixed price list would either overcharge a small operator or undersell a complex build. We'd rather show you a real number for your real situation, usually within two days of talking.",
  },
  {
    q: "How is pricing actually structured?",
    a: "A fixed monthly platform fee plus the modules you use. No seat counts, no per-user pricing. Once we understand your scope, the number is transparent and laid out in full in your quote.",
  },
  {
    q: "Can I start small and scale up later?",
    a: "Yes. Most teams start with a 60-day pilot on a single workflow, then expand once they've seen the lift. Your data, workflows, and integrations carry over unchanged — no re-platforming.",
  },
  {
    q: "What's the typical project timeline?",
    a: "Around six weeks from kickoff to first ship for a pilot. Larger builds take eight to twelve weeks — but the first phase always ships in under eight weeks, regardless of scope.",
  },
  {
    q: "What if it doesn't work out?",
    a: "If we haven't measurably moved an operational KPI in 60 days, we refund the platform fee and you keep everything we built. We're a two-person team and our reputation is the whole business — so we mean it.",
  },
  {
    q: "Who actually builds the platform?",
    a: "The two founders. The same people who built our flagship Ease Fit platform. There's no sales handoff and no junior contractors — you work directly with the people designing and writing the system.",
  },
];
