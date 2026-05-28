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
    metric: { value: "120+", label: "studios on day one" },
  },
  {
    year: "2023",
    title: "The platform comes together",
    tagline: "Composable cores",
    description:
      "We crystallized the platform primitives — bookings, CRM, billing, comms, automation, ML — into a shared spine. New products went from quarters to weeks.",
    image: PICSUM("zw-mile-2023", 1200, 720),
    metric: { value: "12", label: "platform modules shipped" },
  },
  {
    year: "2024",
    title: "Series A · $14M",
    tagline: "Building the team",
    description:
      "Led by Sequoia with participation from Y Combinator and a handful of operator-investors. The team grew from 8 to 32 — and we opened our second office in Lisbon.",
    image: PICSUM("zw-mile-2024", 1200, 720),
    metric: { value: "$14M", label: "Series A · operator-led" },
  },
  {
    year: "2025",
    title: "Six products. One stack.",
    tagline: "Multiplying impact",
    description:
      "Vega CRM, Forge Ops, Lume Insight, Nova Billing, and Pulse Inbox all shipped on top of the same platform — proving the composable thesis at scale.",
    image: PICSUM("zw-mile-2025", 1200, 720),
    metric: { value: "11k+", label: "operators on the platform" },
  },
  {
    year: "2026",
    title: "Today, and onward",
    tagline: "The next decade",
    description:
      "ZypherWorks now powers $48M+ of customer revenue flowing through our automation, with a remote-first team of 42 across 9 timezones — and we're just getting started.",
    image: PICSUM("zw-mile-2026", 1200, 720),
    metric: { value: "$48M", label: "customer revenue · automated" },
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
  { name: "Aria Chen",       role: "Co-founder · CEO",         bio: "Previously product at Stripe and shipped two acquired SaaS companies before ZW.",                            image: PICSUM("zw-team-aria",    480, 600), location: "San Francisco" },
  { name: "Devon Hart",      role: "Co-founder · CTO",         bio: "Built distributed systems at Vercel and Cloudflare. Believes platforms should be boring on purpose.",         image: PICSUM("zw-team-devon",   480, 600), location: "Lisbon" },
  { name: "Priya Reddy",     role: "Head of Design",           bio: "Led design at Linear's enterprise team. Quietly the most opinionated person about typography in the building.", image: PICSUM("zw-team-priya",   480, 600), location: "London" },
  { name: "Marcus Yates",    role: "Head of Engineering",      bio: "Ex-Airbnb · scaled the host platform. Spent his weekends building synth patches.",                              image: PICSUM("zw-team-marcus",  480, 600), location: "Berlin" },
  { name: "Elena Park",      role: "Head of Customer Ops",     bio: "Ran the customer success team at Notion through Series C. Treats every onboarding like opening night.",        image: PICSUM("zw-team-elena",   480, 600), location: "New York" },
  { name: "Sam Okafor",      role: "Principal ML Engineer",    bio: "PhD from CMU. Made our scoring models behave on real-world operator data — not just academic benchmarks.",     image: PICSUM("zw-team-sam",     480, 600), location: "Toronto" },
  { name: "Nina Volkov",     role: "Head of Sales",            bio: "Sold enterprise platforms at Datadog. Genuinely believes ZW's pricing model is the right one — rare in sales.", image: PICSUM("zw-team-nina",    480, 600), location: "Amsterdam" },
  { name: "Theo Marchetti",  role: "Founding Designer",        bio: "First design hire. Drew every illustration on this site by hand at the cafe across from the Lisbon office.",   image: PICSUM("zw-team-theo",    480, 600), location: "Lisbon" },
];

export type Value = {
  ic: IconName;
  title: string;
  description: string;
  accent: string;
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
    description: "The platform should be the calmest part of your operation. Multi-region, observable, SOC 2 II — designed to never make the news.",
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
    description: "Implementation is the start, not the finish. Every platform we ship has a named team running it alongside the customer — indefinitely.",
    accent: "oklch(0.78 0.16 280)",
  },
];

export const COMPANY_STATS = [
  { value: "2021", label: "founded · remote-first" },
  { value: "42",   label: "team across 9 timezones" },
  { value: "11k+", label: "operators served daily" },
  { value: "$48M", label: "of revenue automated" },
];

export type GalleryPhoto = {
  src: string;
  caption: string;
  span?: "tall" | "wide";
};

export const GALLERY: GalleryPhoto[] = [
  { src: PICSUM("zw-culture-1",  900, 600),  caption: "Annual offsite · Lisbon 2025",      span: "wide" },
  { src: PICSUM("zw-culture-2",  600, 800),  caption: "The build room · SF HQ",            span: "tall" },
  { src: PICSUM("zw-culture-3",  600, 500),  caption: "Quarterly platform review" },
  { src: PICSUM("zw-culture-4",  600, 500),  caption: "Customer dinner · NYC" },
  { src: PICSUM("zw-culture-5",  900, 500),  caption: "Demo day · Berlin office",          span: "wide" },
  { src: PICSUM("zw-culture-6",  600, 700),  caption: "Whiteboards, always",               span: "tall" },
  { src: PICSUM("zw-culture-7",  600, 500),  caption: "Lisbon team retreat" },
  { src: PICSUM("zw-culture-8",  600, 500),  caption: "First customer launch party" },
];

export const HERO_PHOTOS = [
  PICSUM("zw-hero-team",   720, 900),
  PICSUM("zw-hero-office", 600, 480),
  PICSUM("zw-hero-screen", 600, 480),
];
