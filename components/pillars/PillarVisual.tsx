"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { Icon } from "../ui/Icon";

export type PillarVisualKind = "flow" | "modules" | "score" | "chart" | "shield" | "code";
export type PillarVisualHandle = { update: (t: number) => void };

type Props = { kind: PillarVisualKind };

export const PillarVisual = forwardRef<PillarVisualHandle, Props>(
  function PillarVisual({ kind }, ref) {
    switch (kind) {
      case "flow":    return <FlowVisual ref={ref} />;
      case "modules": return <ModulesVisual ref={ref} />;
      case "score":   return <ScoreVisual ref={ref} />;
      case "chart":   return <ChartVisual ref={ref} />;
      case "shield":  return <ShieldVisual ref={ref} />;
      case "code":    return <CodeVisual ref={ref} />;
      default:        return null;
    }
  }
);

/* ─── Flow ─────────────────────────────────────────────────── */
const FlowVisual = forwardRef<PillarVisualHandle>(function FlowVisual(_, ref) {
  const pathRef = useRef<SVGPathElement>(null);
  useImperativeHandle(ref, () => ({
    update(t) {
      if (pathRef.current) pathRef.current.style.strokeDashoffset = String((1 - t) * 200);
    },
  }));
  return (
    <svg viewBox="0 0 220 110" width="100%" height="100%">
      <defs>
        <linearGradient id="fl" x1="0" x2="1">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      {[[20, 30], [20, 80]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="6" fill="var(--accent)" />
      ))}
      <circle cx="110" cy="55" r="9" fill="none" stroke="url(#fl)" strokeWidth="2" />
      {[[200, 20], [200, 55], [200, 90]].map(([x, y], i) => (
        <rect key={i} x={x - 9} y={y - 6} width="18" height="12" rx="3"
          fill="oklch(1 0 0 / 0.08)" stroke="var(--line-strong)" />
      ))}
      <path
        ref={pathRef}
        d="M26,30 C70,30 70,55 110,55 M26,80 C70,80 70,55 110,55 M119,55 C160,55 160,20 191,20 M119,55 L191,55 M119,55 C160,55 160,90 191,90"
        stroke="url(#fl)" strokeWidth="1.4" fill="none"
        strokeDasharray="200" strokeDashoffset="200"
      />
    </svg>
  );
});

/* ─── Modules ───────────────────────────────────────────────── */
const ModulesVisual = forwardRef<PillarVisualHandle>(function ModulesVisual(_, ref) {
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const labels = ["bk", "cm", "cr", "bl", "ai", "tr", "ev", "wh", "an"];
  useImperativeHandle(ref, () => ({
    update(t) {
      const col = Math.floor((t * 3) % 3);
      cellsRef.current.forEach((cell, i) => {
        if (!cell) return;
        cell.style.background = i % 3 === col ? "var(--accent-soft)" : "oklch(1 0 0 / 0.04)";
        cell.style.transform = `translateY(${Math.sin(t * Math.PI * 2 + i) * 3}px)`;
      });
    },
  }));
  return (
    <div className="grid h-full w-full grid-cols-3 gap-[5px]">
      {labels.map((label, i) => (
        <div
          key={i}
          ref={(el) => { cellsRef.current[i] = el; }}
          className="grid place-items-center rounded-[6px] border font-mono text-[9.5px] text-ink-2"
          style={{
            background: "oklch(1 0 0 / 0.04)",
            borderColor: i % 4 === 0 ? "var(--line-strong)" : "var(--line)",
          }}
        >
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
});

/* ─── Score ─────────────────────────────────────────────────── */
const ScoreVisual = forwardRef<PillarVisualHandle>(function ScoreVisual(_, ref) {
  const arcRef = useRef<SVGCircleElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const r = 42;
  const circ = r * 2 * Math.PI;
  useImperativeHandle(ref, () => ({
    update(t) {
      const pct = Math.round(20 + t * 72);
      if (arcRef.current) arcRef.current.style.strokeDashoffset = String((1 - pct / 100) * circ);
      if (pctRef.current) pctRef.current.textContent = String(pct);
    },
  }));
  return (
    <div className="flex items-center gap-[14px]">
      <svg viewBox="0 0 100 100" width="96" height="96">
        <circle cx="50" cy="50" r={r} fill="none" stroke="oklch(1 0 0 / 0.08)" strokeWidth="6" />
        <circle
          ref={arcRef}
          cx="50" cy="50" r={r} fill="none" stroke="var(--accent)"
          strokeWidth="6" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={circ}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div>
        <div ref={pctRef} className="font-display font-medium text-accent"
          style={{ fontSize: 32, letterSpacing: "-0.02em" }}>
          20
        </div>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
          Lead score · live
        </div>
      </div>
    </div>
  );
});

/* ─── Chart ─────────────────────────────────────────────────── */
const ChartVisual = forwardRef<PillarVisualHandle>(function ChartVisual(_, ref) {
  const barsRef = useRef<(HTMLElement | null)[]>([]);
  const bars = [12, 18, 14, 22, 28, 20, 32, 38, 30, 42, 48, 52, 46, 58, 64];
  useImperativeHandle(ref, () => ({
    update(t) {
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        bar.style.height = `${bars[i] * (0.4 + t * 0.6)}%`;
        bar.style.background = i > bars.length * t
          ? "oklch(1 0 0 / 0.08)"
          : "linear-gradient(180deg, var(--accent-2), var(--accent))";
      });
    },
  }));
  return (
    <div className="flex h-full w-full items-end gap-1">
      {bars.map((v, i) => (
        <i
          key={i}
          ref={(el) => { barsRef.current[i] = el; }}
          className="flex-1 rounded-t-[3px]"
          style={{ height: `${v * 0.4}%`, background: "oklch(1 0 0 / 0.08)", minHeight: "4%" }}
        />
      ))}
    </div>
  );
});

/* ─── Shield ────────────────────────────────────────────────── */
const ShieldVisual = forwardRef<PillarVisualHandle>(function ShieldVisual(_, ref) {
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const items = ["SOC 2 · II", "ISO 27001", "GDPR ready", "Multi-region"];
  useImperativeHandle(ref, () => ({
    update(t) {
      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        dot.style.background = i < t * 4 ? "var(--accent)" : "oklch(1 0 0 / 0.15)";
      });
    },
  }));
  return (
    <div className="flex items-center gap-[14px]">
      <div
        className="grid h-[72px] w-[72px] place-items-center rounded-2xl border border-line-strong text-accent"
        style={{ background: "linear-gradient(135deg, var(--accent-soft), transparent)" }}
      >
        <Icon name="shield" size={48} stroke={1.2} />
      </div>
      <div className="flex flex-col gap-[6px] font-mono text-[10.5px] text-ink-2">
        {items.map((x, i) => (
          <div key={x} className="flex items-center gap-2">
            <span
              ref={(el) => { dotsRef.current[i] = el; }}
              className="inline-block"
              style={{ width: 7, height: 7, borderRadius: "50%", background: "oklch(1 0 0 / 0.15)" }}
            />
            {x}
          </div>
        ))}
      </div>
    </div>
  );
});

/* ─── Code ──────────────────────────────────────────────────── */
const CodeVisual = forwardRef<PillarVisualHandle>(function CodeVisual(_, ref) {
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const lines: { c?: string; t: string }[][] = [
    [{ c: "k", t: "const" }, { t: " run = " }, { c: "f", t: "await zw" }, { t: "." }, { c: "m", t: "workflow" }, { t: ".run(" }],
    [{ t: "  " }, { c: "k", t: "name" }, { t: ": " }, { c: "s", t: "'lead-intake'" }, { t: "," }],
    [{ t: "  " }, { c: "k", t: "input" }, { t: ": { source, payload }," }],
    [{ t: "  " }, { c: "k", t: "on" }, { t: ": { " }, { c: "m", t: "completed" }, { t: ": notify }," }],
    [{ t: ")" }],
  ];
  useImperativeHandle(ref, () => ({
    update(t) {
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        line.style.opacity = i / lines.length <= t ? "1" : "0.15";
      });
    },
  }));
  return (
    <pre className="pv-code m-0 w-full font-mono text-[10.5px] leading-[1.6] text-ink-2">
      {lines.map((ln, i) => (
        <div
          key={i}
          ref={(el) => { linesRef.current[i] = el; }}
          className="flex gap-[10px]"
          style={{ opacity: 0.15 }}
        >
          <span className="ln">{String(i + 1).padStart(2, "0")}</span>
          {ln.map((s, j) => <span key={j} className={s.c}>{s.t}</span>)}
        </div>
      ))}
    </pre>
  );
});
