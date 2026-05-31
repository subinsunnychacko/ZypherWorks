import type { IconName } from "../../ui/Icon";

const PICSUM = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export type Milestone = {
  year: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  metric: { value: string; label: string };
};

export const MILESTONES: Milestone[] = [
  {
    year: "2021",
    title: "Two engineers, one operator",
    tagline: "The seed",
    description:
      "ZypherWorks started in a single Slack thread between our founders and a fitness operator who was drowning in spreadsheets. Six weeks later, the first working prototype shipped.",
    image: PICSUM("zw-mile-2021", 1200, 720),
    metric: { value: "1", label: "operator served" },
  },
  {
    year: "2022",
    title: "Ease Fit launches publicly",
    tagline: "The first product",
    description:
      "What started as a single tool became a platform. Ease Fit went live with three modules and a typed SDK — the foundation that every product since has been built on.",
    image: PICSUM("zw-mile-2022", 1200, 720),
    metric: { value: "18", label: "studios in the first month" },
  },
  {
    year: "2023",
    title: "The platform comes together",
    tagline: "Composable cores",
    description:
      "We crystallized the platform primitives — bookings, CRM, billing, comms, automation, ML — into a shared spine. New products went from quarters to weeks.",
    image: PICSUM("zw-mile-2023", 1200, 720),
    metric: { value: "6", label: "platform modules shipped" },
  },
  {
    year: "2024",
    title: "First paying customers",
    tagline: "Proving the model",
    description:
      "Still just the two of us — but with a growing list of operators who were willing to bet on us early. Every client brought a new workflow to untangle.",
    image: PICSUM("zw-mile-2024", 1200, 720),
    metric: { value: "12", label: "paying clients · bootstrapped" },
  },
  {
    year: "2025",
    title: "Two products. One stack.",
    tagline: "Finding our footing",
    description:
      "Vega CRM shipped on top of the same platform spine as Ease Fit. Two products, same two engineers — the composable approach started paying off.",
    image: PICSUM("zw-mile-2025", 1200, 720),
    metric: { value: "45+", label: "operators on the platform" },
  },
  {
    year: "2026",
    title: "Today, and onward",
    tagline: "The next chapter",
    description:
      "Two founders, one shared mission. ZypherWorks now runs $1.2M+ of customer revenue through our automation — and we're building toward the next product.",
    image: PICSUM("zw-mile-2026", 1200, 720),
    metric: { value: "$1.2M", label: "customer revenue · automated" },
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  location: string;
};

export const TEAM: TeamMember[] = [
  { name: "Aria Chen",   role: "Co-founder · CEO", bio: "Started ZypherWorks after watching a fitness operator manage their entire business in a spreadsheet. Obsessed with making software that feels invisible.", image: PICSUM("zw-team-aria",  480, 600), location: "San Francisco" },
  { name: "Devon Hart",  role: "Co-founder · CTO", bio: "Builds things that don't require a manual to run. Believes the best software is the kind you forget is there.",                                          image: PICSUM("zw-team-devon", 480, 600), location: "Lisbon" },
];

export type Value = {
  ic: IconName;
  title: string;
  description: string;
  accent: string;
  externalLink?: { href: string; label: string };
};

export const VALUES: Value[] = [
  {
    ic: "cube",
    title: "Composable, always",
    description: "We build platforms, not point solutions. Every product is composed from the same primitives — so the next one is easier than the last.",
    accent: "oklch(0.72 0.18 240)",
  },
  {
    ic: "users",
    title: "Operator empathy",
    description: "We sit beside operators before we open the editor. The code only matters if the person running the business has more leverage at the end of the week.",
    accent: "oklch(0.85 0.16 145)",
  },
  {
    ic: "chart",
    title: "Show the math",
    description: "Pricing models, projections, on-call dashboards — all in the open. The customer sees the same numbers we do, all the way through.",
    accent: "oklch(0.78 0.17 195)",
  },
  {
    ic: "shield",
    title: "Boring infrastructure",
    description: "The platform should be the calmest part of your operation. Observable, reliable, and designed to never surprise you.",
    accent: "oklch(0.85 0.16 70)",
  },
  {
    ic: "spark",
    title: "Ship in weeks",
    description: "If we can't move a measurable KPI in 60 days, the strategy is wrong. We optimize for the time-to-shipped-value, not for project hours.",
    accent: "oklch(0.78 0.17 25)",
  },
  {
    ic: "layers",
    title: "Stay close after launch",
    description: "Implementation is the start, not the finish. Every platform we ship has one of us running it alongside the customer — indefinitely.",
    accent: "oklch(0.78 0.16 280)",
  },
];

export const COMPANY_STATS = [
  { value: "2021",  label: "founded · remote-first" },
  { value: "2",     label: "founders · SF & Lisbon" },
  { value: "45+",   label: "operators on the platform" },
  { value: "$1.2M", label: "of customer revenue automated" },
];

export type GalleryPhoto = {
  src: string;
  caption: string;
  span?: "tall" | "wide";
};

export const GALLERY: GalleryPhoto[] = [
  { src: PICSUM("zw-culture-1",  900, 600),  caption: "Working from Lisbon · 2025",        span: "wide" },
  { src: PICSUM("zw-culture-2",  600, 800),  caption: "The home office · San Francisco",   span: "tall" },
  { src: PICSUM("zw-culture-3",  600, 500),  caption: "Monthly product sync" },
  { src: PICSUM("zw-culture-4",  600, 500),  caption: "Coffee + customer calls · always" },
  { src: PICSUM("zw-culture-5",  900, 500),  caption: "Community meetup · San Francisco",  span: "wide" },
  { src: PICSUM("zw-culture-6",  600, 700),  caption: "Whiteboards, always",               span: "tall" },
  { src: PICSUM("zw-culture-7",  600, 500),  caption: "Working week in Lisbon" },
  { src: PICSUM("zw-culture-8",  600, 500),  caption: "First customer launch party" },
];

export const HERO_PHOTOS = [
  PICSUM("zw-hero-team",   720, 900),
  PICSUM("zw-hero-office", 600, 480),
  PICSUM("zw-hero-screen", 600, 480),
];
