"use client";

import { useRef } from "react";
import { Icon } from "../../ui/Icon";
import type { Tier } from "./data";

type Props = { tier: Tier };

export const TierCard3D = ({ tier }: Props) => {
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
      card.style.setProperty("--ry", `${x * 8}deg`);
      card.style.setProperty("--rx", `${-y * 7}deg`);
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
        className="group relative h-full overflow-hidden rounded-[24px] border p-[clamp(22px,2vw,32px)]"
        style={{
          background: tier.popular
            ? "linear-gradient(180deg, oklch(0.22 0.018 260 / 0.85), oklch(0.14 0.012 260 / 0.5))"
            : "linear-gradient(180deg, oklch(0.20 0.014 260 / 0.65), oklch(0.14 0.012 260 / 0.45))",
          borderColor: tier.popular
            ? `color-mix(in oklch, ${tier.accent} 45%, transparent)`
            : "var(--line)",
          boxShadow: tier.popular
            ? `0 30px 70px oklch(0 0 0 / 0.35), 0 0 60px color-mix(in oklch, ${tier.accent} 22%, transparent), 0 1px 0 oklch(1 0 0 / 0.05) inset`
            : "0 30px 70px oklch(0 0 0 / 0.35), 0 1px 0 oklch(1 0 0 / 0.05) inset",
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s",
          ["--p-accent" as string]: tier.accent,
        } as React.CSSProperties}
      >
        {/* Top accent strip */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
          style={{ background: tier.gradient, opacity: tier.popular ? 1 : 0.35 }}
        />

        {/* Mouse-follow glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--p-accent) 22%, transparent), transparent 60%)",
          }}
        />

        {/* Popular badge */}
        {tier.popular && (
          <div
            className="mb-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]"
            style={{
              background: `color-mix(in oklch, ${tier.accent} 18%, transparent)`,
              color: tier.accent,
              border: `1px solid color-mix(in oklch, ${tier.accent} 40%, transparent)`,
              transform: "translateZ(20px)",
            }}
          >
            <span
              className="inline-block"
              style={{ width: 5, height: 5, borderRadius: 99, background: tier.accent, boxShadow: `0 0 8px ${tier.accent}` }}
            />
            {tier.popularLabel}
          </div>
        )}

        {/* Header */}
        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
          <div>
            <div className="font-display text-[15px] font-medium tracking-[-0.01em] text-ink-2">
              {tier.name}
            </div>
            <div className="mt-1 font-mono text-[11px] text-ink-3">{tier.tagline}</div>
          </div>
          <div
            className="grid place-items-center font-display font-semibold text-white"
            style={{
              width: 44, height: 44, borderRadius: 12, fontSize: 20,
              background: tier.gradient,
              boxShadow: `0 0 0 1px oklch(1 0 0 / 0.08), 0 10px 22px color-mix(in oklch, ${tier.accent} 35%, transparent)`,
            }}
          >
            {tier.name.charAt(0)}
          </div>
        </div>

        {/* Price */}
        <div className="relative mt-6" style={{ transform: "translateZ(28px)" }}>
          <div className="flex items-baseline gap-2">
            <span
              className="font-display font-medium tracking-[-0.035em]"
              style={{
                fontSize: tier.priceLabel === "Tailored" ? 44 : 56,
                lineHeight: 1,
                color: tier.popular ? tier.accent : "var(--ink)",
              }}
            >
              {tier.priceLabel}
            </span>
            {tier.priceUnit && (
              <span className="font-mono text-[13px] text-ink-3">{tier.priceUnit}</span>
            )}
          </div>
          {tier.priceCaption && (
            <div className="mt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-3">
              {tier.priceCaption}
            </div>
          )}
        </div>

        {/* Description */}
        <p
          className="relative m-0 mt-5 text-[13.5px] leading-[1.55] text-ink-2"
          style={{ transform: "translateZ(20px)" }}
        >
          {tier.description}
        </p>

        {/* Features list */}
        <ul
          className="relative m-0 mt-6 flex flex-col gap-2 border-t border-line p-0 pt-5"
          style={{ transform: "translateZ(20px)" }}
        >
          {tier.features.map((f) => (
            <li key={f.label} className="flex items-start gap-2.5 list-none text-[13px] leading-[1.5]">
              <span
                className={"mt-[2px] grid h-[16px] w-[16px] flex-shrink-0 place-items-center rounded-full " + (f.included ? "" : "")}
                style={{
                  background: f.included
                    ? `color-mix(in oklch, ${tier.accent} 18%, transparent)`
                    : "oklch(1 0 0 / 0.04)",
                  color: f.included ? tier.accent : "var(--ink-3)",
                }}
              >
                {f.included ? (
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M2.5 6.5L5 9l4.5-5" />
                  </svg>
                ) : (
                  <svg width="7" height="7" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M3 6h6" />
                  </svg>
                )}
              </span>
              <span className={f.included ? "text-ink-2" : "text-ink-3 line-through decoration-ink-3/30"}>
                {f.label}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="relative mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-[13.5px] font-medium transition-transform duration-200 hover:-translate-y-[1px]"
          style={{
            background: tier.popular ? tier.gradient : "var(--ink)",
            color: tier.popular ? "white" : "var(--bg)",
            transform: "translateZ(20px)",
            boxShadow: tier.popular
              ? `0 10px 26px color-mix(in oklch, ${tier.accent} 38%, transparent)`
              : "0 10px 26px oklch(0 0 0 / 0.4)",
          }}
        >
          {tier.cta}
          <span
            className="grid h-[20px] w-[20px] place-items-center rounded-full"
            style={{
              background: tier.popular ? "oklch(1 0 0 / 0.2)" : tier.accent,
              color: tier.popular ? "white" : "var(--bg)",
            }}
          >
            <Icon name="arrow" size={10} stroke={2.4} />
          </span>
        </a>

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
