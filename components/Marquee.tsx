"use client";

const ITEMS = [
  "AI-native automation",
  "Workflow orchestration",
  "Realtime analytics",
  "Lead intelligence",
  "Booking engines",
  "Member CRM",
  "Predictive ops",
  "Adaptive billing",
  "Event-driven core",
];

export const Marquee = () => (
  <div
    className="relative z-[1] overflow-hidden border-y border-line py-[22px]"
    style={{ background: "oklch(0.12 0.012 260)" }}
  >
    {/* edge fades */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[140px]"
      style={{ background: "linear-gradient(90deg, var(--bg), transparent)" }}
    />
    <span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[140px]"
      style={{ background: "linear-gradient(-90deg, var(--bg), transparent)" }}
    />
    <div
      className="marquee-track flex w-max items-center gap-[56px] font-display text-[22px] tracking-[-0.01em] text-ink-3"
    >
      {[...ITEMS, ...ITEMS].map((t, i) => (
        <span key={i} className="flex items-center gap-[56px] whitespace-nowrap">
          <span>{t}</span>
          <span
            aria-hidden
            className="inline-block"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 10px var(--accent-glow)",
            }}
          />
        </span>
      ))}
    </div>
  </div>
);
