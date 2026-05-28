"use client";

import { useRef } from "react";
import { Icon } from "../../ui/Icon";
import { PhaseVisual } from "./PhaseVisual";
import type { Phase } from "./data";

type Props = { phase: Phase };

export const PhaseCard3D = ({ phase }: Props) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--ry", `${x * 10}deg`);
      card.style.setProperty("--rx", `${-y * 8}deg`);
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    cancelAnimationFrame(rafRef.current);
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full overflow-hidden rounded-[24px] border border-line p-[clamp(20px,2vw,28px)]"
        style={{
          background: "linear-gradient(180deg, oklch(0.20 0.014 260 / 0.7), oklch(0.14 0.012 260 / 0.5))",
          boxShadow: "0 30px 70px oklch(0 0 0 / 0.35), 0 1px 0 oklch(1 0 0 / 0.05) inset",
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.35s cubic-bezier(.2,.7,.2,1)",
          ["--phase-accent" as string]: phase.accent,
          ["--p-accent" as string]: phase.accent,
        } as React.CSSProperties}
      >
        {/* Mouse-follow glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--p-accent) 28%, transparent), transparent 60%)",
          }}
        />

        {/* Top row */}
        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
          <div
            className="grid place-items-center font-display font-semibold text-white"
            style={{
              width: 50, height: 50, borderRadius: 14, fontSize: 22,
              background: phase.gradient,
              boxShadow: `0 0 0 1px oklch(1 0 0 / 0.08), 0 12px 24px color-mix(in oklch, ${phase.accent} 30%, transparent)`,
            }}
          >
            <Icon name={phase.icon} size={22} stroke={2} />
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{phase.number}</div>
            <div
              className="mt-0.5 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em]"
              style={{
                color: phase.accent,
                background: `color-mix(in oklch, ${phase.accent} 14%, transparent)`,
                border: `1px solid color-mix(in oklch, ${phase.accent} 30%, transparent)`,
              }}
            >
              {phase.duration}
            </div>
          </div>
        </div>

        {/* Phase visual */}
        <div
          className="relative my-5 grid h-[150px] place-items-center overflow-hidden rounded-[14px] border border-line p-2"
          style={{
            background: "oklch(1 0 0 / 0.025)",
            transform: "translateZ(30px)",
          }}
        >
          <PhaseVisual kind={phase.visual} />
        </div>

        {/* Copy */}
        <div className="relative" style={{ transform: "translateZ(28px)" }}>
          <h3 className="m-0 mb-1 font-display text-[clamp(20px,1.7vw,24px)] font-medium tracking-[-0.02em] leading-[1.1]">
            {phase.name} · <em className="serif-italic text-ink-2">{phase.tagline}</em>
          </h3>
          <p className="m-0 text-[clamp(12px,0.95vw,13.5px)] leading-[1.55] text-ink-2">
            {phase.description}
          </p>
        </div>

        {/* Activities — tags */}
        <div
          className="relative mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4"
          style={{ transform: "translateZ(20px)" }}
        >
          {phase.activities.map((a) => (
            <span
              key={a}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink-2"
              style={{ background: "oklch(1 0 0 / 0.04)" }}
            >
              {a}
            </span>
          ))}
        </div>

        {/* Metric */}
        <div className="relative mt-4 flex items-baseline gap-2" style={{ transform: "translateZ(20px)" }}>
          <div className="font-display text-[18px] font-medium tracking-[-0.01em]" style={{ color: phase.accent }}>
            {phase.metric.value}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
            {phase.metric.label}
          </div>
        </div>

        {/* Edge sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            border: "1px solid color-mix(in oklch, var(--p-accent) 40%, transparent)",
            boxShadow: "0 0 60px color-mix(in oklch, var(--p-accent) 18%, transparent)",
          }}
        />
      </div>
    </div>
  );
};
