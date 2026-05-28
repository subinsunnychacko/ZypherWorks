"use client";

import type { PreviewKind } from "./data";

type Props = { kind: PreviewKind };

export const ProductMini = ({ kind }: Props) => {
  switch (kind) {
    case "ease":  return <EaseMini />;
    case "vega":  return <VegaMini />;
    case "forge": return <ForgeMini />;
    case "lume":  return <LumeMini />;
    case "nova":  return <NovaMini />;
    case "pulse": return <PulseMini />;
    default:      return null;
  }
};

/* ─── Ease Fit · booking grid filling ─────────────────────── */
const EaseMini = () => {
  const cells = Array.from({ length: 28 });
  return (
    <div className="grid h-full w-full grid-cols-7 gap-[3px] p-1">
      {cells.map((_, i) => {
        const filled = [3, 4, 5, 10, 11, 12, 17, 18, 23, 24, 25, 26];
        const isFilled = filled.includes(i);
        return (
          <span
            key={i}
            className="rounded-[3px]"
            style={{
              background: isFilled
                ? "var(--p-accent, var(--accent))"
                : "oklch(1 0 0 / 0.06)",
              animation: isFilled
                ? `easeFill 3.4s ease-in-out ${(i % 7) * 0.18}s infinite alternate`
                : undefined,
              opacity: isFilled ? 0.85 : 1,
            }}
          />
        );
      })}
    </div>
  );
};

/* ─── Vega · funnel with descending cards ─────────────────── */
const VegaMini = () => (
  <svg viewBox="0 0 220 100" width="100%" height="100%">
    <defs>
      <linearGradient id="vg" x1="0" x2="1">
        <stop offset="0" stopColor="var(--p-accent, var(--accent))" stopOpacity="0.9" />
        <stop offset="1" stopColor="var(--p-accent, var(--accent))" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {[
      { w: 200, y: 14, label: "discovery" },
      { w: 150, y: 36, label: "qualified" },
      { w: 100, y: 58, label: "negotiation" },
      { w: 56,  y: 80, label: "closed" },
    ].map((row, i) => (
      <g key={i}>
        <rect
          x={(220 - row.w) / 2}
          y={row.y}
          width={row.w}
          height="14"
          rx="3"
          fill="url(#vg)"
          opacity={0.3 + i * 0.18}
        />
        <text x="110" y={row.y + 10} textAnchor="middle" fontSize="6.5"
          fontFamily="var(--font-mono)" fill="oklch(1 0 0 / 0.7)" letterSpacing="0.1em">
          {row.label.toUpperCase()}
        </text>
      </g>
    ))}
    {/* Moving deal dots */}
    {[0, 1, 2].map((i) => (
      <circle
        key={i}
        cx="110"
        cy="0"
        r="2.5"
        fill="var(--p-accent, var(--accent))"
        style={{ animation: `vegaDrop 3.6s ease-in ${i * 0.9}s infinite` }}
      />
    ))}
  </svg>
);

/* ─── Forge · workflow nodes with pulse ─────────────────── */
const ForgeMini = () => (
  <svg viewBox="0 0 220 100" width="100%" height="100%">
    <defs>
      <linearGradient id="fg" x1="0" x2="1">
        <stop offset="0" stopColor="var(--p-accent, var(--accent))" />
        <stop offset="1" stopColor="var(--p-accent, var(--accent))" stopOpacity="0.3" />
      </linearGradient>
    </defs>
    {/* Connections */}
    <path
      d="M30,50 C60,50 70,28 110,28 M30,50 C60,50 70,72 110,72 M120,28 C150,28 160,50 190,50 M120,72 C150,72 160,50 190,50"
      stroke="url(#fg)" strokeWidth="1.6" fill="none"
      strokeDasharray="4 4"
      style={{ animation: "forgeFlow 2s linear infinite" }}
    />
    {/* Nodes */}
    {[
      { x: 30, y: 50, r: 7 },
      { x: 115, y: 28, r: 5 },
      { x: 115, y: 72, r: 5 },
      { x: 190, y: 50, r: 7 },
    ].map((n, i) => (
      <g key={i}>
        <circle cx={n.x} cy={n.y} r={n.r + 3} fill="var(--p-accent, var(--accent))" opacity="0.15"
          style={{ animation: `forgePulse 2s ease-out ${i * 0.5}s infinite` }} />
        <circle cx={n.x} cy={n.y} r={n.r} fill="oklch(0.14 0.012 260)" stroke="var(--p-accent, var(--accent))" strokeWidth="1.5" />
      </g>
    ))}
  </svg>
);

/* ─── Lume · sparkline with anomaly spike ─────────────────── */
const LumeMini = () => (
  <svg viewBox="0 0 220 100" width="100%" height="100%">
    <defs>
      <linearGradient id="lm" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="var(--p-accent, var(--accent))" stopOpacity="0.4" />
        <stop offset="1" stopColor="var(--p-accent, var(--accent))" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0,70 L20,64 L40,68 L60,60 L80,56 L100,58 L120,30 L140,52 L160,46 L180,42 L200,38 L220,32 L220,100 L0,100 Z"
      fill="url(#lm)"
    />
    <path
      d="M0,70 L20,64 L40,68 L60,60 L80,56 L100,58 L120,30 L140,52 L160,46 L180,42 L200,38 L220,32"
      stroke="var(--p-accent, var(--accent))" strokeWidth="1.6" fill="none"
      strokeDasharray="280" strokeDashoffset="280"
      style={{ animation: "lumeDraw 3.2s ease-out infinite" }}
    />
    {/* Anomaly marker */}
    <g style={{ animation: "lumePulse 2.4s ease-out infinite" }}>
      <circle cx="120" cy="30" r="10" fill="var(--p-accent, var(--accent))" opacity="0.2" />
      <circle cx="120" cy="30" r="3.5" fill="var(--p-accent, var(--accent))" />
    </g>
    <text x="128" y="22" fontSize="6.5" fontFamily="var(--font-mono)"
      fill="oklch(1 0 0 / 0.6)" letterSpacing="0.1em">ANOMALY</text>
  </svg>
);

/* ─── Nova · revenue ring filling ─────────────────── */
const NovaMini = () => (
  <div className="flex h-full w-full items-center justify-center gap-3 p-2">
    <svg viewBox="0 0 100 100" width="70" height="70">
      <circle cx="50" cy="50" r="38" fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="6" />
      <circle
        cx="50" cy="50" r="38" fill="none"
        stroke="var(--p-accent, var(--accent))" strokeWidth="6" strokeLinecap="round"
        strokeDasharray="238" strokeDashoffset="55" transform="rotate(-90 50 50)"
        style={{ animation: "novaFill 3.2s ease-out infinite" }}
      />
      <text x="50" y="54" textAnchor="middle" fontSize="14" fontFamily="var(--font-display)"
        fill="var(--p-accent, var(--accent))" fontWeight="500">$48M</text>
    </svg>
    <div className="flex flex-col gap-[5px] font-mono text-[8.5px] uppercase tracking-[0.1em] text-ink-3">
      <div className="flex items-center gap-1.5">
        <span style={{ width: 5, height: 5, borderRadius: 99, background: "var(--p-accent, var(--accent))" }} />
        MRR · live
      </div>
      <div className="flex items-center gap-1.5">
        <span style={{ width: 5, height: 5, borderRadius: 99, background: "oklch(1 0 0 / 0.2)" }} />
        usage metered
      </div>
      <div className="flex items-center gap-1.5">
        <span style={{ width: 5, height: 5, borderRadius: 99, background: "oklch(1 0 0 / 0.2)" }} />
        dunning auto
      </div>
    </div>
  </div>
);

/* ─── Pulse · chat bubbles cascading ─────────────────── */
const PulseMini = () => {
  const msgs: { side: "l" | "r"; w: number; tone: string }[] = [
    { side: "l", w: 60, tone: "wa" },
    { side: "r", w: 80, tone: "us" },
    { side: "l", w: 40, tone: "sms" },
    { side: "r", w: 56, tone: "us" },
  ];
  return (
    <div className="flex h-full w-full flex-col justify-center gap-[5px] p-2">
      {msgs.map((m, i) => (
        <div
          key={i}
          className={"flex " + (m.side === "r" ? "justify-end" : "justify-start")}
          style={{ animation: `pulseIn 3.4s ease-out ${i * 0.4}s infinite` }}
        >
          <div
            className="flex items-center gap-1.5 rounded-[8px] px-2 py-1"
            style={{
              background: m.side === "r"
                ? "var(--p-accent, var(--accent))"
                : "oklch(1 0 0 / 0.08)",
              color: m.side === "r" ? "oklch(0.14 0.012 260)" : "oklch(0.78 0.01 260)",
              width: m.w,
              opacity: m.side === "r" ? 0.9 : 1,
            }}
          >
            <span style={{ width: 3, height: 3, borderRadius: 99, background: "currentColor", opacity: 0.6 }} />
            <span style={{ width: m.w - 28, height: 3, borderRadius: 99, background: "currentColor", opacity: 0.5 }} />
          </div>
        </div>
      ))}
    </div>
  );
};
