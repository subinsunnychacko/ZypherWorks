"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PHASES } from "./data";
import { PhaseVisual } from "./PhaseVisual";

export const ProcessDeepDive = () => {
  const ref = useRef<HTMLElement>(null);
  const visualWrapRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLElement>(null);
  const visualRafRef = useRef<number>(0);
  const [idx, setIdx] = useState(0);

  /* Desktop: scroll-driven phase cycling via CSS sticky pin (no DOM mutation). Mobile: tap-based. */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.innerWidth < 1024) return;

    let st: ScrollTrigger | undefined;
    const ctx = gsap.context(() => {
      st = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${p * 100}%`;
          }
          const newIdx = Math.min(PHASES.length - 1, Math.floor(p * PHASES.length));
          setIdx((cur) => (cur !== newIdx ? newIdx : cur));
        },
      });
    }, root);

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 120);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      st?.kill();
      ctx.revert();
    };
  }, []);

  /* Mouse-tracked tilt on the visual panel (desktop, mouse only) */
  const handleVisualMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = visualWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(visualRafRef.current);
    visualRafRef.current = requestAnimationFrame(() => {
      wrap.style.setProperty("--v-ry", `${x * 8}deg`);
      wrap.style.setProperty("--v-rx", `${-y * 6}deg`);
      wrap.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      wrap.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  };

  const handleVisualLeave = () => {
    const wrap = visualWrapRef.current;
    if (!wrap) return;
    cancelAnimationFrame(visualRafRef.current);
    wrap.style.setProperty("--v-ry", "0deg");
    wrap.style.setProperty("--v-rx", "0deg");
  };

  const active = PHASES[idx];

  return (
    <section
      ref={ref}
      id="deep-dive"
      className="pd-wrap relative z-[1] mx-[clamp(8px,2vw,40px)] my-0 lg:h-[280vh]"
      style={{
        borderRadius: "clamp(20px, 3vw, 40px)",
        background: "linear-gradient(180deg, oklch(0.16 0.014 260), oklch(0.13 0.014 260))",
        boxShadow: "0 40px 100px oklch(0 0 0 / 0.4), 0 1px 0 oklch(1 0 0 / 0.04) inset",
      }}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div
          className="mx-auto w-full max-w-[1440px] px-[clamp(20px,5vw,80px)] py-[clamp(60px,8vw,120px)] lg:py-[clamp(32px,3vw,52px)]"
          style={{ ["--phase-accent" as string]: active.accent } as React.CSSProperties}
        >
          {/* Header */}
          <div className="mb-10 flex flex-col items-start justify-between gap-5 lg:mb-12 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                <span className="block h-px w-[22px] bg-accent" />
                {"// PHASE DEEP-DIVE · SCROLL TO ADVANCE"}
              </div>
              <h2
                className="m-0 max-w-[760px] font-display font-medium tracking-[-0.03em]"
                style={{ fontSize: "clamp(26px, 3.2vw, 46px)", lineHeight: 1.05 }}
              >
                Inside the four phases — what we do,
                <br />
                <em className="serif-italic text-ink-2">and what you walk away with.</em>
              </h2>
            </div>
          </div>

          {/* Mobile-only: quick-jump nav to each phase */}
          <div className="-mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
            {PHASES.map((p) => (
              <a
                key={p.id}
                href={`#phase-${p.id}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-medium transition-all duration-300"
                style={{
                  background: "oklch(1 0 0 / 0.04)",
                  borderColor: "oklch(1 0 0 / 0.08)",
                  color: "oklch(0.78 0.01 260)",
                }}
              >
                <Icon name={p.icon} size={13} stroke={2.2} />
                {p.number} · {p.name}
              </a>
            ))}
          </div>

          {/* ─── Mobile-only: ALL phases stacked vertically ─── */}
          <div className="flex flex-col gap-10 lg:hidden">
            {PHASES.map((phase) => (
              <div
                key={phase.id}
                id={`phase-${phase.id}`}
                className="reveal flex flex-col gap-5 scroll-mt-24"
                style={{ ["--phase-accent" as string]: phase.accent } as React.CSSProperties}
              >
                {/* Phase header */}
                <div className="flex items-center gap-3">
                  <div
                    className="grid place-items-center text-white"
                    style={{
                      width: 52, height: 52, borderRadius: 14,
                      background: phase.gradient,
                      boxShadow: `0 0 0 1px oklch(1 0 0 / 0.1), 0 12px 22px color-mix(in oklch, ${phase.accent} 35%, transparent)`,
                    }}
                  >
                    <Icon name={phase.icon} size={24} stroke={2} />
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                      Phase {phase.number} · {phase.duration}
                    </div>
                    <h3 className="m-0 mt-0.5 font-display text-[22px] font-medium tracking-[-0.02em] leading-[1.1]">
                      {phase.name}
                      <span className="ml-1.5 font-normal text-ink-2"><em className="serif-italic">· {phase.tagline}</em></span>
                    </h3>
                  </div>
                </div>

                {/* Phase visual */}
                <div
                  className="relative w-full overflow-hidden rounded-[18px] border border-line"
                  style={{
                    aspectRatio: "16 / 10",
                    background: "linear-gradient(180deg, oklch(0.18 0.014 260), oklch(0.13 0.014 260))",
                    boxShadow: `0 24px 50px oklch(0 0 0 / 0.3), 0 0 50px color-mix(in oklch, ${phase.accent} 14%, transparent)`,
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 75%)",
                      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 75%)",
                    }}
                  />
                  <div className="absolute inset-0 p-5">
                    <PhaseVisual kind={phase.visual} />
                  </div>
                  <div
                    className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white"
                    style={{ background: "oklch(0 0 0 / 0.5)", backdropFilter: "blur(6px)" }}
                  >
                    <span
                      className="inline-block"
                      style={{ width: 5, height: 5, borderRadius: 99, background: phase.accent, boxShadow: `0 0 8px ${phase.accent}` }}
                    />
                    Phase {phase.number}
                  </div>
                </div>

                {/* Description */}
                <p className="m-0 text-[14px] leading-[1.6] text-ink-2">
                  {phase.description}
                </p>

                {/* Activities + Deliverables */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: phase.accent }}>
                      What we do
                    </div>
                    <ul className="m-0 flex flex-col gap-1.5 p-0 text-[13px] leading-[1.5] text-ink-2">
                      {phase.activities.map((a) => (
                        <li key={a} className="flex items-start gap-2 list-none">
                          <span
                            className="mt-[7px] inline-block flex-shrink-0"
                            style={{ width: 5, height: 5, borderRadius: 99, background: phase.accent }}
                          />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                      What you walk away with
                    </div>
                    <ul className="m-0 flex flex-col gap-1.5 p-0 text-[13px] leading-[1.5] text-ink-2">
                      {phase.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-2 list-none">
                          <span className="mt-[6px] inline-block flex-shrink-0 text-accent">
                            <Icon name="shield" size={11} stroke={2.4} />
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Metric */}
                <div
                  className="flex items-baseline gap-3 rounded-[14px] border p-4"
                  style={{
                    background: "oklch(1 0 0 / 0.02)",
                    borderColor: `color-mix(in oklch, ${phase.accent} 22%, var(--line))`,
                  }}
                >
                  <div className="font-display text-[24px] font-medium tracking-[-0.02em]" style={{ color: phase.accent }}>
                    {phase.metric.value}
                  </div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                    {phase.metric.label}
                  </div>
                </div>

                {/* Section divider — between phases, not after the last */}
                {phase.id !== PHASES[PHASES.length - 1].id && (
                  <div className="mt-2 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--line), transparent)" }} />
                )}
              </div>
            ))}
          </div>

          {/* ─── Desktop-only: single active phase, scroll-driven cycling ─── */}
          <div className="hidden lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
            {/* Left rail — phase details */}
            <div
              key={active.id}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className="ef-scale-in grid place-items-center font-display font-semibold text-white"
                  style={{
                    width: 64, height: 64, borderRadius: 18, fontSize: 26,
                    background: active.gradient,
                    boxShadow: `0 0 0 1px oklch(1 0 0 / 0.1), 0 16px 30px color-mix(in oklch, ${active.accent} 35%, transparent)`,
                  }}
                >
                  <Icon name={active.icon} size={28} stroke={2} />
                </div>
                <div>
                  <div className="ef-fade-up font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3" style={{ animationDelay: "60ms" }}>
                    Phase {active.number} · {active.duration}
                  </div>
                  <h3
                    className="ef-fade-up m-0 mt-1 font-display text-[clamp(24px,2.4vw,34px)] font-medium tracking-[-0.02em] leading-[1.05]"
                    style={{ animationDelay: "120ms" }}
                  >
                    {active.name}
                  </h3>
                </div>
              </div>

              <p
                className="ef-fade-up m-0 text-[15px] leading-[1.6] text-ink-2"
                style={{ animationDelay: "180ms" }}
              >
                {active.description}
              </p>

              {/* Activities + Deliverables side by side */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="ef-fade-up" style={{ animationDelay: "240ms" }}>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: active.accent }}>
                    What we do
                  </div>
                  <ul className="m-0 flex flex-col gap-1.5 p-0 text-[13px] leading-[1.5] text-ink-2">
                    {active.activities.map((a) => (
                      <li key={a} className="flex items-start gap-2 list-none">
                        <span
                          className="mt-[7px] inline-block flex-shrink-0"
                          style={{ width: 5, height: 5, borderRadius: 99, background: active.accent }}
                        />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ef-fade-up" style={{ animationDelay: "320ms" }}>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    What you walk away with
                  </div>
                  <ul className="m-0 flex flex-col gap-1.5 p-0 text-[13px] leading-[1.5] text-ink-2">
                    {active.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 list-none">
                        <span className="mt-[6px] inline-block flex-shrink-0 text-accent">
                          <Icon name="shield" size={11} stroke={2.4} />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Metric */}
              <div
                className="ef-fade-up flex items-baseline gap-3 rounded-[14px] border border-line p-4"
                style={{
                  background: "oklch(1 0 0 / 0.02)",
                  borderColor: `color-mix(in oklch, ${active.accent} 22%, var(--line))`,
                  animationDelay: "400ms",
                }}
              >
                <div className="font-display text-[28px] font-medium tracking-[-0.02em]" style={{ color: active.accent }}>
                  {active.metric.value}
                </div>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
                  {active.metric.label}
                </div>
              </div>

              {/* Scroll progress — desktop only */}
              <div className="mt-2 hidden lg:block">
                <div className="mb-[6px] flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                  <span>SCROLL TO ADVANCE</span>
                  <span>
                    {String(idx + 1).padStart(2, "0")} / {String(PHASES.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="relative h-[2px] overflow-hidden bg-line">
                  <i
                    ref={progressBarRef}
                    className="block h-full"
                    style={{
                      width: "0%",
                      background: `linear-gradient(90deg, ${active.accent}, var(--accent-2))`,
                      boxShadow: `0 0 10px color-mix(in oklch, ${active.accent} 50%, transparent)`,
                      transition: "width 0.12s linear, background 0.4s",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right rail — animated visual with mouse tilt */}
            <div>
              <div
                ref={visualWrapRef}
                onMouseMove={handleVisualMove}
                onMouseLeave={handleVisualLeave}
                className="group relative mx-auto w-full"
                style={{ perspective: 1400, maxWidth: 720 }}
              >
                <div
                  className="relative w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: "rotateX(var(--v-rx, 0deg)) rotateY(var(--v-ry, 0deg))",
                    transition: "transform 0.45s cubic-bezier(.2,.7,.2,1)",
                  }}
                >
                  <div
                    key={active.id}
                    className="relative w-full overflow-hidden rounded-[20px] border border-line"
                    style={{
                      aspectRatio: "16 / 9",
                      background: "linear-gradient(180deg, oklch(0.18 0.014 260), oklch(0.13 0.014 260))",
                      boxShadow:
                        "0 0 0 1px oklch(1 0 0 / 0.06) inset, 0 30px 60px oklch(0 0 0 / 0.4), 0 0 60px color-mix(in oklch, var(--phase-accent) 12%, transparent)",
                      ["--phase-accent" as string]: active.accent,
                    } as React.CSSProperties}
                  >
                    {/* Background grid pattern */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 75%)",
                        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent 75%)",
                      }}
                    />

                    {/* Phase visual — fills the panel */}
                    <div className="absolute inset-0 p-6">
                      <PhaseVisual kind={active.visual} />
                    </div>

                    {/* Mouse-follow accent glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--phase-accent) 25%, transparent), transparent 60%)",
                        mixBlendMode: "screen",
                      }}
                    />

                    {/* Phase tag in corner */}
                    <div
                      className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white"
                      style={{
                        background: "oklch(0 0 0 / 0.5)",
                        backdropFilter: "blur(6px)",
                        transform: "translateZ(20px)",
                      }}
                    >
                      <span
                        className="inline-block"
                        style={{ width: 5, height: 5, borderRadius: 99, background: active.accent, boxShadow: `0 0 8px ${active.accent}` }}
                      />
                      Phase {active.number}
                    </div>
                  </div>
                </div>

                {/* Edge halo */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -inset-y-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(60% 80% at 50% 50%, color-mix(in oklch, ${active.accent} 22%, transparent), transparent 70%)`,
                    filter: "blur(30px)",
                    zIndex: -1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
