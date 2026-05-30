"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MILESTONES } from "./data";

export const CompanyStory = () => {
  const ref = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const photoRafRef = useRef<number>(0);
  const [idx, setIdx] = useState(0);

  /* Desktop: scroll-cycled milestone reveal via CSS sticky. Mobile: stacked timeline. */
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
            progressBarRef.current.style.height = `${p * 100}%`;
          }
          const newIdx = Math.min(MILESTONES.length - 1, Math.floor(p * MILESTONES.length));
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

  /* Mouse-tracked tilt on the active photo panel */
  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = photoWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(photoRafRef.current);
    photoRafRef.current = requestAnimationFrame(() => {
      wrap.style.setProperty("--p-ry", `${x * 6}deg`);
      wrap.style.setProperty("--p-rx", `${-y * 5}deg`);
    });
  };
  const handlePhotoLeave = () => {
    const wrap = photoWrapRef.current;
    if (!wrap) return;
    cancelAnimationFrame(photoRafRef.current);
    wrap.style.setProperty("--p-ry", "0deg");
    wrap.style.setProperty("--p-rx", "0deg");
  };

  const active = MILESTONES[idx];

  return (
    <section
      ref={ref}
      id="story"
      className="cs-wrap relative z-[1] mx-[clamp(8px,2vw,40px)] my-0 lg:h-[320vh]"
      style={{
        borderRadius: "clamp(20px, 3vw, 40px)",
        background: "linear-gradient(180deg, oklch(0.16 0.014 260), oklch(0.13 0.014 260))",
        boxShadow: "0 40px 100px oklch(0 0 0 / 0.4), 0 1px 0 oklch(1 0 0 / 0.04) inset",
      }}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <Container className="py-[clamp(60px,8vw,100px)] lg:py-[clamp(20px,2.4vw,40px)]">
          {/* Header */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 lg:mb-7 lg:flex-row lg:items-end lg:gap-8">
            <div>
              <Kicker className="mb-3">{"// FIVE YEARS · ONE THESIS"}</Kicker>
              <h2
                className="m-0 max-w-[720px] font-display font-medium tracking-[-0.03em]"
                style={{ fontSize: "clamp(22px, 2.6vw, 38px)", lineHeight: 1.05 }}
              >
                From one operator
                <br />
                <em className="serif-italic text-ink-2">to a platform 380+ run on.</em>
              </h2>
            </div>
            <p className="max-w-[380px] text-[13px] leading-[1.55] text-ink-2 lg:text-[13.5px]">
              The honest version — no &ldquo;founded by serial entrepreneurs in a garage&rdquo;
              theatre. Just the milestones with the metric that mattered at each one.
            </p>
          </div>

          {/* Mobile: stacked timeline */}
          <div className="flex flex-col gap-10 lg:hidden">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="reveal flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className="font-display text-[13px] font-medium tracking-[-0.01em]"
                    style={{ color: "oklch(0.85 0.16 145)" }}
                  >
                    {m.year}
                  </div>
                  <div className="mt-2 h-full w-px flex-1" style={{ background: "var(--line)" }} />
                </div>
                <div className="flex-1 pb-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
                    {m.tagline}
                  </div>
                  <h3 className="m-0 mt-1 font-display text-[18px] font-medium tracking-[-0.02em] leading-[1.15]">
                    {m.title}
                  </h3>
                  <div
                    className="relative mt-3 w-full overflow-hidden rounded-[14px] border border-line"
                    style={{ aspectRatio: "16/10" }}
                  >
                    <Image src={m.image} alt={`${m.title} — ZypherWorks ${m.year}`} fill sizes="(max-width: 1024px) 90vw, 0px" className="object-cover" />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "linear-gradient(180deg, transparent 60%, oklch(0 0 0 / 0.5))" }}
                    />
                    <div
                      className="absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/85"
                    >
                      {m.metric.value} · {m.metric.label}
                    </div>
                  </div>
                  <p className="m-0 mt-3 text-[13.5px] leading-[1.55] text-ink-2">{m.description}</p>
                  {i !== MILESTONES.length - 1 && (
                    <div className="mt-4 h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--line), transparent)" }} />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: pinned timeline with vertical milestone rail + active photo */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1.45fr] lg:gap-12 lg:items-center">
            {/* Left: milestone rail */}
            <div className="relative flex gap-5">
              {/* Vertical track line */}
              <div className="relative w-px flex-shrink-0">
                <div className="absolute inset-0" style={{ background: "var(--line)" }} />
                <i
                  ref={progressBarRef}
                  className="absolute left-0 top-0 w-full"
                  style={{
                    height: "0%",
                    background: "linear-gradient(180deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
                    boxShadow: "0 0 12px oklch(0.78 0.17 155 / 0.5)",
                    transition: "height 0.12s linear",
                  }}
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                {MILESTONES.map((m, i) => {
                  const a = i === idx;
                  return (
                    <button
                      key={m.year}
                      onClick={() => setIdx(i)}
                      className="group flex items-start gap-3 rounded-[12px] border border-transparent p-2.5 text-left transition-all duration-400"
                      style={{
                        background: a ? "oklch(1 0 0 / 0.04)" : "transparent",
                        borderColor: a ? "oklch(0.85 0.16 145 / 0.3)" : "transparent",
                      }}
                    >
                      <div
                        className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-[9px] font-display text-[10.5px] font-medium tracking-[-0.01em] transition-all duration-400"
                        style={{
                          background: a
                            ? "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))"
                            : "oklch(1 0 0 / 0.04)",
                          color: a ? "white" : "oklch(0.78 0.01 260)",
                          border: a ? "none" : "1px solid var(--line)",
                          boxShadow: a ? "0 8px 18px oklch(0.65 0.18 145 / 0.35)" : undefined,
                        }}
                      >
                        {m.year}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-300"
                          style={{ color: a ? "oklch(0.85 0.16 145)" : "var(--ink-3)" }}
                        >
                          {m.tagline}
                        </div>
                        <div
                          className="mt-0.5 font-display text-[14px] font-medium tracking-[-0.005em] transition-colors duration-300 line-clamp-1"
                          style={{ color: a ? "var(--ink)" : "var(--ink-2)" }}
                        >
                          {m.title}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: active milestone — photo + description */}
            <div key={active.year}>
              {/* Photo with mouse tilt */}
              <div
                ref={photoWrapRef}
                onMouseMove={handlePhotoMove}
                onMouseLeave={handlePhotoLeave}
                className="group relative mb-5"
                style={{ perspective: 1400 }}
              >
                <div
                  className="relative w-full overflow-hidden rounded-[18px] border border-line"
                  style={{
                    aspectRatio: "16/9",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(var(--p-rx, 0deg)) rotateY(var(--p-ry, 0deg))",
                    transition: "transform 0.5s cubic-bezier(.2,.7,.2,1)",
                    boxShadow: "0 30px 60px oklch(0 0 0 / 0.45), 0 0 0 1px oklch(1 0 0 / 0.06) inset",
                  }}
                >
                  <Image
                    key={active.year}
                    src={active.image}
                    alt={`${active.title} — ZypherWorks ${active.year}`}
                    fill
                    sizes="(max-width: 1024px) 0px, 45vw"
                    className="object-cover ef-fade-in"
                    style={{ filter: "saturate(1.05)" }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, oklch(0 0 0 / 0.7))",
                    }}
                  />
                  {/* Year tag overlaid */}
                  <div
                    className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white"
                    style={{ background: "oklch(0 0 0 / 0.5)", backdropFilter: "blur(6px)" }}
                  >
                    <span
                      className="inline-block"
                      style={{
                        width: 5, height: 5, borderRadius: 99,
                        background: "oklch(0.85 0.16 145)",
                        boxShadow: "0 0 8px oklch(0.85 0.16 145)",
                      }}
                    />
                    {active.year}
                  </div>
                  {/* Metric overlaid */}
                  <div className="absolute bottom-4 left-5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
                      {active.metric.label}
                    </div>
                    <div className="font-display text-[28px] font-medium tracking-[-0.02em] text-white" style={{ lineHeight: 1 }}>
                      {active.metric.value}
                    </div>
                  </div>
                </div>
              </div>

              {/* Text content */}
              <div className="ef-fade-up font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: "oklch(0.85 0.16 145)", animationDelay: "60ms" }}>
                Chapter {idx + 1} · {active.tagline}
              </div>
              <h3
                className="ef-fade-up m-0 mt-1.5 font-display font-medium tracking-[-0.025em] leading-[1.1]"
                style={{ fontSize: "clamp(20px, 2vw, 28px)", animationDelay: "140ms" }}
              >
                {active.title}
              </h3>
              <p
                className="ef-fade-up m-0 mt-3 text-[13.5px] leading-[1.55] text-ink-2"
                style={{ animationDelay: "220ms" }}
              >
                {active.description}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
