import type { IconName } from "../../ui/Icon";

export type Channel = {
  id: string;
  ic: IconName;
  label: string;
  value: string;
  description: string;
  href: string;
  accent: string;
  gradient: string;
  responseTime: string;
};

export const CHANNELS: Channel[] = [
  {
    id: "email",
    ic: "msg",
    label: "Email us",
    value: "hello@zypherworks.io",
    description: "For project inquiries, partnerships, or just to say hi. Always read by a founding team member.",
    href: "mailto:hello@zypherworks.io",
    accent: "oklch(0.85 0.16 145)",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
    responseTime: "~4 hours",
  },
  {
    id: "call",
    ic: "cal",
    label: "Book a call",
    value: "30 minutes · video",
    description: "Get on a call with a founder — no sales script, no slide deck, just a real conversation about what you're trying to build.",
    href: "#form",
    accent: "oklch(0.78 0.17 220)",
    gradient: "linear-gradient(135deg, oklch(0.72 0.18 240), oklch(0.55 0.2 260))",
    responseTime: "next-day",
  },
  {
    id: "sales",
    ic: "spark",
    label: "Enterprise sales",
    value: "sales@zypherworks.io",
    description: "For teams with custom requirements or larger operational scope. Talk directly to our founders.",
    href: "mailto:sales@zypherworks.io",
    accent: "oklch(0.85 0.16 70)",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 70), oklch(0.65 0.2 50))",
    responseTime: "same-day",
  },
  {
    id: "press",
    ic: "bell",
    label: "Press & media",
    value: "press@zypherworks.io",
    description: "For interviews, podcast appearances, or feature stories. We respond to journalists within 24 hours.",
    href: "mailto:press@zypherworks.io",
    accent: "oklch(0.78 0.17 195)",
    gradient: "linear-gradient(135deg, oklch(0.78 0.17 195), oklch(0.55 0.2 215))",
    responseTime: "24h",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  meta: string;
  ic: IconName;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "We read every message",
    description:
      "Every form submission is read by a founding team member — not a sales rep, not an AI auto-responder. Usually within four hours of you sending it.",
    meta: "~4 hours · always a real person",
    ic: "eye",
  },
  {
    number: "02",
    title: "You get a first-draft answer",
    description:
      "Same day, you get a real response to your actual question — not a calendar link with a generic blurb. If we have an opinion, we share it.",
    meta: "Same day · real reply",
    ic: "bolt",
  },
  {
    number: "03",
    title: "If there's a fit, we schedule a call",
    description:
      "30-minute discovery call with a founder. No slide deck, no sales script. We&apos;ll come in with informed questions about your operation, and a point of view.",
    meta: "Within 48 hours · 30 min",
    ic: "cal",
  },
  {
    number: "04",
    title: "A 2-week scoped proposal",
    description:
      "If we're a fit, we send a concrete shape of Phase 01 within two weeks — written for your team, with the operational model already adjusted to your numbers.",
    meta: "Two weeks · no commitment",
    ic: "shield",
  },
];

export type InquiryType = {
  id: string;
  label: string;
  description: string;
  ic: IconName;
};

export const INQUIRY_TYPES: InquiryType[] = [
  { id: "project",  label: "New project",     description: "I want to build something",       ic: "cube" },
  { id: "platform", label: "Platform talk",   description: "Architecture / integration q's",  ic: "layers" },
  { id: "careers",  label: "Careers",         description: "I'd like to work at ZypherWorks", ic: "users" },
  { id: "press",    label: "Press / media",   description: "I'm a journalist or researcher",  ic: "bell" },
  { id: "other",    label: "Just saying hi",  description: "No agenda · happy to hear from you", ic: "spark" },
];

export const CONTACT_STATS = [
  { value: "~4h",  label: "first response · weekdays" },
  { value: "100%", label: "replied to by a real person" },
  { value: "2",    label: "founders · SF & Lisbon" },
];

export const HERO_RESPONDERS = [
  { name: "Aria",  role: "Co-founder · CEO", color: "oklch(0.72 0.18 25)" },
  { name: "Devon", role: "Co-founder · CTO", color: "oklch(0.78 0.17 220)" },
];
