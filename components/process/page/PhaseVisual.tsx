"use client";

import type { PhaseVisualKind } from "./data";

type Props = { kind: PhaseVisualKind };

export const PhaseVisual = ({ kind }: Props) => {
  switch (kind) {
    case "discover": return <DiscoverVisual />;
    case "compose":  return <ComposeVisual />;
    case "automate": return <AutomateVisual />;
    case "operate":  return <OperateVisual />;
    default:         return null;
  }
};

/* ─── Discover · network of nodes being mapped ─────────────── */
const DiscoverVisual = () => {
  const nodes = [
    { x: 50,  y: 50,  r: 8,  delay: 0 },
    { x: 150, y: 30,  r: 6,  delay: 0.3 },
    { x: 260, y: 60,  r: 7,  delay: 0.6 },
    { x: 100, y: 130, r: 6,  delay: 0.9 },
    { x: 220, y: 150, r: 7,  delay: 1.2 },
    { x: 320, y: 110, r: 6,  delay: 1.5 },
    { x: 180, y: 90,  r: 9,  delay: 0.45 },
  ];
  const lines = [
    "M50,50 L180,90",
    "M180,90 L150,30",
    "M180,90 L260,60",
    "M180,90 L100,130",
    "M180,90 L220,150",
    "M260,60 L320,110",
    "M220,150 L320,110",
  ];
  return (
    <svg viewBox="0 0 360 180" width="100%" height="100%" className="phase-visual-svg">
      <defs>
        <linearGradient id="discoverLine" x1="0" x2="1">
          <stop offset="0" stopColor="var(--phase-accent, var(--accent))" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="var(--phase-accent, var(--accent))" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--phase-accent, var(--accent))" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {lines.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="url(#discoverLine)"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="200"
          strokeDashoffset="200"
          style={{ animation: `phaseLineDraw 2.4s cubic-bezier(.2,.7,.2,1) ${i * 0.2}s forwards` }}
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x} cy={n.y} r={n.r + 6}
            fill="var(--phase-accent, var(--accent))"
            opacity="0"
            style={{ animation: `phaseNodePulse 2.8s ease-out ${n.delay}s infinite` }}
          />
          <circle
            cx={n.x} cy={n.y} r={n.r}
            fill="oklch(0.16 0.012 260)"
            stroke="var(--phase-accent, var(--accent))"
            strokeWidth="2"
            opacity="0"
            style={{ animation: `phaseFadeIn 0.6s ease-out ${n.delay}s forwards` }}
          />
        </g>
      ))}
      {/* Cursor / scanner */}
      <g style={{ animation: "phaseScanner 6s linear infinite" }}>
        <circle r="3" fill="var(--phase-accent, var(--accent))" cx="0" cy="0" />
        <circle r="14" fill="none" stroke="var(--phase-accent, var(--accent))" strokeWidth="1" opacity="0.4" cx="0" cy="0" />
      </g>
    </svg>
  );
};

/* ─── Compose · modules snapping into a stack ─────────────── */
const ComposeVisual = () => {
  const modules = [
    { x: 20,  y: 20,  w: 90, h: 32, label: "bookings", delay: 0 },
    { x: 130, y: 20,  w: 90, h: 32, label: "crm",      delay: 0.15 },
    { x: 240, y: 20,  w: 90, h: 32, label: "billing",  delay: 0.3 },
    { x: 20,  y: 70,  w: 90, h: 32, label: "comms",    delay: 0.45 },
    { x: 130, y: 70,  w: 90, h: 32, label: "analytics", delay: 0.6 },
    { x: 240, y: 70,  w: 90, h: 32, label: "ml",       delay: 0.75 },
    { x: 20,  y: 120, w: 90, h: 32, label: "events",   delay: 0.9 },
    { x: 130, y: 120, w: 90, h: 32, label: "webhooks", delay: 1.05 },
    { x: 240, y: 120, w: 90, h: 32, label: "sdk",      delay: 1.2 },
  ];
  return (
    <svg viewBox="0 0 360 180" width="100%" height="100%" className="phase-visual-svg">
      {modules.map((m, i) => (
        <g
          key={i}
          style={{ animation: `phaseModuleIn 0.7s cubic-bezier(.2,.7,.2,1) ${m.delay}s backwards` }}
        >
          <rect
            x={m.x} y={m.y} width={m.w} height={m.h}
            rx="6"
            fill="oklch(1 0 0 / 0.04)"
            stroke="var(--phase-accent, var(--accent))"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <text
            x={m.x + m.w / 2}
            y={m.y + m.h / 2 + 3}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="10"
            fill="oklch(0.78 0.01 260)"
            letterSpacing="0.05em"
          >
            {m.label}
          </text>
        </g>
      ))}
      {/* Highlighted connection: spine wiring through modules */}
      <path
        d="M65 36 L175 36 L285 36 M65 86 L175 86 L285 86 M65 136 L175 136 L285 136"
        stroke="var(--phase-accent, var(--accent))"
        strokeWidth="2"
        fill="none"
        strokeDasharray="700"
        strokeDashoffset="700"
        style={{ animation: "phaseLineDraw 1.8s cubic-bezier(.2,.7,.2,1) 1.4s forwards" }}
        opacity="0.6"
      />
    </svg>
  );
};

/* ─── Automate · workflow with flowing energy ─────────────── */
const AutomateVisual = () => (
  <svg viewBox="0 0 360 180" width="100%" height="100%" className="phase-visual-svg">
    <defs>
      <linearGradient id="autoFlow" x1="0" x2="1">
        <stop offset="0" stopColor="var(--phase-accent, var(--accent))" />
        <stop offset="1" stopColor="var(--phase-accent, var(--accent))" stopOpacity="0.3" />
      </linearGradient>
    </defs>

    {/* Connection paths */}
    <path
      id="autoPath1"
      d="M40,90 C90,90 110,40 180,40 C250,40 270,60 320,60"
      stroke="url(#autoFlow)" strokeWidth="1.6" fill="none"
      strokeDasharray="6 6"
      style={{ animation: "phaseFlowDash 1.8s linear infinite" }}
    />
    <path
      id="autoPath2"
      d="M40,90 L180,90 L320,90"
      stroke="url(#autoFlow)" strokeWidth="1.6" fill="none"
      strokeDasharray="6 6"
      style={{ animation: "phaseFlowDash 1.8s linear infinite 0.3s" }}
    />
    <path
      id="autoPath3"
      d="M40,90 C90,90 110,140 180,140 C250,140 270,120 320,120"
      stroke="url(#autoFlow)" strokeWidth="1.6" fill="none"
      strokeDasharray="6 6"
      style={{ animation: "phaseFlowDash 1.8s linear infinite 0.6s" }}
    />

    {/* Source node */}
    <g>
      <circle cx="40" cy="90" r="16" fill="var(--phase-accent, var(--accent))" opacity="0.15" />
      <circle cx="40" cy="90" r="10" fill="oklch(0.16 0.012 260)" stroke="var(--phase-accent, var(--accent))" strokeWidth="2" />
      <text x="40" y="93" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="oklch(0.85 0.01 260)">in</text>
    </g>

    {/* Branch node */}
    <g>
      <circle cx="180" cy="90" r="12" fill="oklch(0.16 0.012 260)" stroke="var(--phase-accent, var(--accent))" strokeWidth="2" />
      <text x="180" y="93" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="oklch(0.85 0.01 260)">if</text>
    </g>

    {/* Destination nodes */}
    {[
      { x: 320, y: 60, label: "ok" },
      { x: 320, y: 90, label: "log" },
      { x: 320, y: 120, label: "esc" },
    ].map((n, i) => (
      <g key={i}>
        <rect x={n.x - 14} y={n.y - 9} width="28" height="18" rx="4"
          fill="oklch(1 0 0 / 0.06)" stroke="var(--phase-accent, var(--accent))" strokeOpacity="0.4" strokeWidth="1" />
        <text x={n.x} y={n.y + 3} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="oklch(0.85 0.01 260)">{n.label}</text>
      </g>
    ))}

    {/* Energy particles flowing along paths */}
    {[
      { delay: 0,   d: "M40,90 C90,90 110,40 180,40 C250,40 270,60 320,60" },
      { delay: 0.6, d: "M40,90 L180,90 L320,90" },
      { delay: 1.2, d: "M40,90 C90,90 110,140 180,140 C250,140 270,120 320,120" },
    ].map((p, i) => (
      <circle key={i} r="3" fill="var(--phase-accent, var(--accent))" style={{ filter: "drop-shadow(0 0 4px var(--phase-accent))" }}>
        <animateMotion dur="2.4s" begin={`${p.delay}s`} repeatCount="indefinite" path={p.d} />
      </circle>
    ))}
  </svg>
);

/* ─── Operate · live monitoring dashboard ─────────────── */
const OperateVisual = () => {
  const bars = [22, 28, 24, 32, 38, 30, 42, 48, 40, 52, 46, 58, 54, 64];
  return (
    <svg viewBox="0 0 360 180" width="100%" height="100%" className="phase-visual-svg">
      <defs>
        <linearGradient id="opBar" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--phase-accent, var(--accent))" />
          <stop offset="1" stopColor="var(--phase-accent, var(--accent))" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Top status row */}
      <g style={{ animation: "phaseFadeIn 0.6s ease-out backwards" }}>
        {["live", "soc 2", "p95 42ms"].map((s, i) => (
          <g key={s}>
            <rect x={20 + i * 80} y={18} width="68" height="20" rx="4"
              fill="oklch(1 0 0 / 0.04)" stroke="var(--phase-accent, var(--accent))" strokeOpacity="0.3" strokeWidth="1" />
            <circle cx={32 + i * 80} cy={28} r="3" fill="var(--phase-accent, var(--accent))"
              style={{ animation: `phaseDotPulse 1.6s ease-in-out ${i * 0.25}s infinite` }} />
            <text x={42 + i * 80} y={31} fontFamily="var(--font-mono)" fontSize="8.5" fill="oklch(0.85 0.01 260)" letterSpacing="0.05em">
              {s.toUpperCase()}
            </text>
          </g>
        ))}
      </g>

      {/* Live bars chart */}
      <g style={{ animation: "phaseFadeIn 0.6s ease-out 0.2s backwards" }}>
        {bars.map((v, i) => (
          <rect
            key={i}
            x={20 + i * 24}
            y={170 - v * 1.4}
            width="16"
            height={v * 1.4}
            rx="2"
            fill="url(#opBar)"
            style={{ animation: `phaseBarGrow 0.6s cubic-bezier(.2,.7,.2,1) ${0.4 + i * 0.05}s backwards` }}
          />
        ))}
      </g>

      {/* Live cursor indicator */}
      <g>
        <line
          x1="20" y1="60" x2="340" y2="60"
          stroke="oklch(1 0 0 / 0.06)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <text x="340" y="56" textAnchor="end" fontFamily="var(--font-mono)" fontSize="8"
          fill="oklch(0.65 0.012 260)" letterSpacing="0.06em">SLA</text>
      </g>
    </svg>
  );
};
