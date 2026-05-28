"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap } from "@/lib/gsap";
import { PHASES, PROCESS_STATS } from "./data";

export const ProcessPageHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".js-pp-stagger", {
        y: 22, opacity: 0, duration: 0.95, ease: "power3.out",
        stagger: 0.08, delay: 0.25,
      });
    }, root);

    const glow = glowRef.current;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (!glow) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 80;
        const y = (e.clientY / window.innerHeight - 0.5) * 60;
        glow.style.transform = `translate(${x}px, ${y}px)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative z-[1] overflow-hidden pt-[120px] pb-[32px] lg:pt-[130px] lg:pb-[48px]"
    >
      {/* Subtle animated grid layer */}
      <div className="zwp-grid pointer-events-none absolute inset-0 z-[0]" aria-hidden />

      {/* Drifting radial accent */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[35%] -z-[0] -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          width: "min(1100px, 90vw)",
          height: "640px",
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.16 145 / 0.16), oklch(0.78 0.17 220 / 0.07) 40%, transparent 70%)",
          filter: "blur(50px)",
          transition: "transform 0.8s cubic-bezier(.2,.7,.2,1)",
        }}
      />

      <Container className="relative z-[1] text-center">
        {/* Eyebrow */}
        <div className="js-pp-stagger mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] pl-2 font-mono text-[11px] tracking-[0.04em] text-ink-2">
          <span
            className="pulse-dot relative inline-block flex-shrink-0"
            style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
          />
          ZW PROCESS · {PHASES.length} PHASES · ~6 WEEKS END-TO-END
        </div>

        <Kicker className="js-pp-stagger mx-auto mb-6 w-fit">{"// HOW WE BUILD"}</Kicker>

        <h1
          className="js-pp-stagger mx-auto m-0 max-w-[1100px] font-display font-medium tracking-[-0.04em]"
          style={{ fontSize: "clamp(40px, 6vw, 96px)", lineHeight: 0.98 }}
        >
          From conversation
          <br />
          <span className="grad">to platform.</span>
        </h1>

        <p className="js-pp-stagger mx-auto mt-9 max-w-[680px] text-[16px] leading-[1.65] text-ink-2 sm:text-[17px]">
          A short, opinionated path from problem to platform — designed so the time between
          &ldquo;we have a problem&rdquo; and &ldquo;the platform is shipping value&rdquo; is measured in
          weeks, not quarters.
        </p>

        <div className="js-pp-stagger mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#phases"
            className="inline-flex items-center gap-[10px] rounded-full border-0 bg-ink px-5 py-3 text-[14px] font-medium text-bg transition-transform duration-200 hover:-translate-y-[1px]"
            style={{ boxShadow: "0 10px 30px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(1 0 0 / 0.1)" }}
          >
            Walk the four phases
            <span
              className="grid h-[20px] w-[20px] place-items-center rounded-full"
              style={{ background: "var(--accent)", color: "var(--bg)", boxShadow: "0 0 10px var(--accent-glow)" }}
            >
              <Icon name="arrow" size={10} stroke={2.4} />
            </span>
          </a>
          <a
            href="#deep-dive"
            className="inline-flex items-center gap-[10px] rounded-full border border-line-strong bg-[oklch(1_0_0_/_0.02)] px-5 py-3 text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-[oklch(1_0_0_/_0.06)]"
          >
            <Icon name="play" size={11} />
            See it in motion
          </a>
        </div>

        {/* Stats row */}
        <div className="js-pp-stagger mx-auto mt-14 flex flex-wrap items-center justify-center gap-[clamp(28px,4vw,64px)] border-t border-line pt-8 sm:pt-9">
          {PROCESS_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-[22px] font-medium tracking-[-0.02em] sm:text-[26px]">{s.value}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3 sm:text-[10.5px]">{s.label}</div>
            </div>
          ))}
        </div>
      </Container>

      {/* Phase journey strip — connected timeline */}
      <Container className="relative z-[1] mt-[clamp(48px,5vw,72px)]">
        <div className="mb-5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
          <span>{"// THE JOURNEY · CLICK TO JUMP"}</span>
          <span>04 / 04</span>
        </div>

        {/* Desktop: horizontal connected timeline. Mobile: vertical stack */}
        <div className="relative">
          {/* Connecting line (desktop only) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent 4%, oklch(0.72 0.18 240 / 0.5) 18%, oklch(0.85 0.16 145 / 0.5) 60%, oklch(0.85 0.16 70 / 0.5) 96%, transparent)",
            }}
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {PHASES.map((p) => (
              <a
                key={p.id}
                href="#deep-dive"
                className="reveal group relative flex flex-col gap-3 overflow-hidden rounded-[18px] border border-line p-4 transition-all duration-400"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(0.20 0.014 260 / 0.65), oklch(0.14 0.012 260 / 0.4))",
                }}
              >
                {/* Hover accent line at top */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: p.gradient }}
                />

                {/* Number circle on top of the connecting line */}
                <div className="flex items-center justify-between">
                  <div
                    className="grid place-items-center font-display font-semibold text-white transition-transform duration-500 group-hover:scale-110"
                    style={{
                      width: 56, height: 56, borderRadius: 16, fontSize: 22,
                      background: p.gradient,
                      boxShadow: `0 0 0 4px oklch(0.14 0.012 260), 0 0 0 5px color-mix(in oklch, ${p.accent} 30%, transparent), 0 10px 22px color-mix(in oklch, ${p.accent} 35%, transparent)`,
                    }}
                  >
                    <Icon name={p.icon} size={22} stroke={2} />
                  </div>
                  <div className="text-right font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                    <div>{p.number}</div>
                    <div className="mt-0.5" style={{ color: p.accent }}>{p.duration}</div>
                  </div>
                </div>

                <div>
                  <div className="font-display text-[15px] font-medium tracking-[-0.01em]">{p.name}</div>
                  <div className="mt-1 text-[12px] leading-[1.5] text-ink-2">{p.tagline}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
