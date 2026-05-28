"use client";

import { useRef } from "react";
import { Icon } from "../../ui/Icon";
import { TIERS } from "./data";

/**
 * Interactive 3D fanned card stack — three pricing tier cards angled together
 * like a hand of cards. Mouse-tilts as a unit; hover an individual card to
 * bring it forward and slightly raise the others.
 */
export const HeroCardStack = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      wrap.style.setProperty("--stack-ry", `${x * 10}deg`);
      wrap.style.setProperty("--stack-rx", `${-y * 8}deg`);
    });
  };

  const handleLeave = () => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    cancelAnimationFrame(rafRef.current);
    wrap.style.setProperty("--stack-ry", "0deg");
    wrap.style.setProperty("--stack-rx", "0deg");
  };

  /* Positions for the 3 fan cards */
  const positions = [
    { rotY:  16, tx: "-30%", tz: -120, ti: 1 }, // left back
    { rotY:   0, tx: "0",    tz: 40,   ti: 2 }, // center front (popular)
    { rotY: -16, tx: "30%",  tz: -120, ti: 0 }, // right back
  ];

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="js-stack relative mx-auto h-[520px] w-full max-w-[640px]"
      style={{ perspective: 1600 }}
    >
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--stack-rx, 0deg)) rotateY(var(--stack-ry, 0deg))",
          transition: "transform 0.55s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {positions.map((pos, i) => {
          const tier = TIERS[i];
          const isCenter = i === 1;
          return (
            <div
              key={tier.id}
              className="hero-card group absolute left-1/2 top-1/2 w-[290px] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(calc(-50% + ${pos.tx}), -50%) rotateY(${pos.rotY}deg) translateZ(${pos.tz}px)`,
                transformStyle: "preserve-3d",
                transition: "transform 0.5s cubic-bezier(.2,.7,.2,1), box-shadow 0.4s",
                zIndex: pos.ti,
                ["--card-accent" as string]: tier.accent,
              } as React.CSSProperties}
            >
              <div
                className="relative overflow-hidden rounded-[22px] border p-6"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.22 0.016 260 / 0.92), oklch(0.14 0.012 260 / 0.78))",
                  backdropFilter: "blur(12px)",
                  borderColor: isCenter
                    ? `color-mix(in oklch, ${tier.accent} 50%, transparent)`
                    : "var(--line)",
                  boxShadow: isCenter
                    ? `0 30px 60px oklch(0 0 0 / 0.45), 0 0 60px color-mix(in oklch, ${tier.accent} 25%, transparent), 0 0 0 1px oklch(1 0 0 / 0.08) inset`
                    : `0 22px 44px oklch(0 0 0 / 0.4), 0 0 0 1px oklch(1 0 0 / 0.05) inset`,
                }}
              >
                {/* Top accent line */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
                  style={{ background: tier.gradient, opacity: isCenter ? 1 : 0.45 }}
                />

                {/* Popular badge */}
                {tier.popular && (
                  <div
                    className="mb-3 inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em]"
                    style={{
                      background: `color-mix(in oklch, ${tier.accent} 18%, transparent)`,
                      color: tier.accent,
                      border: `1px solid color-mix(in oklch, ${tier.accent} 40%, transparent)`,
                    }}
                  >
                    <span
                      className="inline-block"
                      style={{ width: 4, height: 4, borderRadius: 99, background: tier.accent, boxShadow: `0 0 6px ${tier.accent}` }}
                    />
                    {tier.popularLabel}
                  </div>
                )}

                {/* Tier name */}
                <div className="mb-1 flex items-baseline justify-between">
                  <div className="font-display text-[14px] font-medium tracking-[-0.01em] text-ink-2">
                    {tier.name}
                  </div>
                  <div
                    className="grid h-7 w-7 place-items-center rounded-[8px]"
                    style={{
                      background: tier.gradient,
                      boxShadow: `0 6px 14px color-mix(in oklch, ${tier.accent} 35%, transparent)`,
                    }}
                  >
                    <span className="font-display text-[11px] font-bold text-white">
                      {tier.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Big price */}
                <div className="mb-4 flex items-baseline gap-1.5">
                  <span
                    className="font-display font-medium tracking-[-0.03em]"
                    style={{
                      fontSize: tier.priceLabel === "Tailored" ? 36 : 44,
                      color: isCenter ? tier.accent : "var(--ink)",
                      lineHeight: 1,
                    }}
                  >
                    {tier.priceLabel}
                  </span>
                  {tier.priceUnit && (
                    <span className="font-mono text-[11px] text-ink-3">{tier.priceUnit}</span>
                  )}
                </div>

                {/* Tagline */}
                <p className="m-0 mb-4 text-[12.5px] leading-[1.5] text-ink-2">
                  {tier.tagline}
                </p>

                {/* Top 3 features only */}
                <ul className="m-0 mb-5 flex flex-col gap-1.5 p-0">
                  {tier.features.filter(f => f.included).slice(0, 3).map((f) => (
                    <li key={f.label} className="flex items-start gap-2 list-none text-[12px] leading-[1.5] text-ink-2">
                      <span
                        className="mt-[5px] inline-block flex-shrink-0"
                        style={{ width: 4, height: 4, borderRadius: 99, background: tier.accent }}
                      />
                      {f.label}
                    </li>
                  ))}
                </ul>

                {/* Mini CTA */}
                <div
                  className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em]"
                  style={{ color: tier.accent }}
                >
                  {tier.cta}
                  <Icon name="arrow" size={11} stroke={2.4} />
                </div>

                {/* Mouse-follow shimmer on hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(260px circle at 50% 0%, color-mix(in oklch, var(--card-accent) 18%, transparent), transparent 70%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Ambient backlight halo behind the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 460, height: 360,
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.16 145 / 0.18), oklch(0.78 0.17 220 / 0.08) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
};
