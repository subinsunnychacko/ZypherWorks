import type { IconName } from "../../ui/Icon";

export type PhaseVisualKind = "discover" | "compose" | "automate" | "operate";

export type Phase = {
  id: string;
  number: string;
  name: string;
  duration: string;
  tagline: string;
  description: string;
  activities: string[];
  deliverables: string[];
  metric: { value: string; label: string };
  visual: PhaseVisualKind;
  accent: string;
  gradient: string;
  icon: IconName;
};

export const PHASES: Phase[] = [
  {
    id: "discover",
    number: "01",
    name: "Discover",
    duration: "1–2 weeks",
    tagline: "Map the operation",
    description:
      "We embed with your team to map the workflows that actually run the business — including the messy ones the spreadsheet hides.",
    activities: [
      "Stakeholder interviews",
      "Workflow shadowing",
      "Data + systems audit",
      "Friction inventory",
    ],
    deliverables: [
      "Operation map",
      "Priority backlog",
      "Risk register",
    ],
    metric: { value: "30+", label: "workflows mapped on avg" },
    visual: "discover",
    accent: "oklch(0.72 0.18 240)",
    gradient: "linear-gradient(135deg, oklch(0.72 0.18 240), oklch(0.55 0.2 260))",
    icon: "search",
  },
  {
    id: "compose",
    number: "02",
    name: "Compose",
    duration: "2–3 weeks",
    tagline: "Assemble the spine",
    description:
      "We compose a tailored stack from our platform blocks instead of starting from scratch. Standard primitives, custom surfaces.",
    activities: [
      "Module selection",
      "Schema + API design",
      "Auth & tenancy setup",
      "Operator UI scaffolding",
    ],
    deliverables: [
      "Working platform skeleton",
      "Typed SDK",
      "Admin dashboard",
    ],
    metric: { value: "12", label: "platform modules to pick from" },
    visual: "compose",
    accent: "oklch(0.78 0.17 195)",
    gradient: "linear-gradient(135deg, oklch(0.82 0.16 195), oklch(0.55 0.2 215))",
    icon: "cube",
  },
  {
    id: "automate",
    number: "03",
    name: "Automate",
    duration: "2–4 weeks",
    tagline: "Wire intelligence",
    description:
      "Adaptive automation gets layered onto the core: routing, scoring, predictions, comms. ML tuned per tenant — never a black box.",
    activities: [
      "Workflow design",
      "Per-tenant ML training",
      "Integration wiring",
      "Adaptive comms templates",
    ],
    deliverables: [
      "Automated workflows",
      "ML scoring API",
      "Integration suite",
    ],
    metric: { value: "200+", label: "triggers ready out-of-the-box" },
    visual: "automate",
    accent: "oklch(0.85 0.16 145)",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
    icon: "bolt",
  },
  {
    id: "operate",
    number: "04",
    name: "Operate",
    duration: "Ongoing",
    tagline: "Run it with you",
    description:
      "We don't disappear at launch — your platform is a service. Monitored 24/7, evolved quarterly, and scaled with your business.",
    activities: [
      "24/7 monitoring",
      "Quarterly platform reviews",
      "Iterative feature delivery",
      "Capacity & cost planning",
    ],
    deliverables: [
      "99.99% uptime SLA",
      "Quarterly roadmap",
      "Dedicated platform team",
    ],
    metric: { value: "99.99%", label: "uptime SLA · multi-region" },
    visual: "operate",
    accent: "oklch(0.85 0.16 70)",
    gradient: "linear-gradient(135deg, oklch(0.85 0.16 70), oklch(0.65 0.2 50))",
    icon: "refresh",
  },
];

export const PROCESS_STATS = [
  { value: "4", label: "phases · end-to-end" },
  { value: "~6 wk", label: "from kickoff to first ship" },
  { value: "14×", label: "ops throughput · 90 days" },
  { value: "100%", label: "of clients retained yr 1" },
];
