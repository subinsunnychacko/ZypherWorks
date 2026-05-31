"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon, type IconName } from "../../ui/Icon";
import { gsap } from "@/lib/gsap";
import { VALUE_PROPS } from "./data";

type Step = {
  ic: IconName | "check";
  title: string;
  desc: string;
  meta: string;
};

const STEPS: Step[] = [
  {
    ic: "msg",
    title: "Tell us your workflows",
    desc: "A 30-min call about how your operation actually runs.",
    meta: "Day 0 · 30 min",
  },
  {
    ic: "cube",
    title: "We scope the build",
    desc: "We map modules to your workflows and price only what you need.",
    meta: "Day 1–2",
  },
  {
    ic: "check",
    title: "You get a real number",
    desc: "A tailored quote — no seat math, no padding.",
    meta: "~2 days · delivered",
  },
];

const Check = () => (
  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2.5 6.5L5 9l4.5-5" />
  </svg>
);

export const PricingSpotlight = () => {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--ry", `${x * 6}deg`);
      card.style.setProperty("--rx", `${-y * 5}deg`);
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  };

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".js-sp-copy", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ".js-spot-rise", start: "top 80%" },
        defaults: { ease: "power3.out" },
      });
      tl.from(".js-spot-rise", { autoAlpha: 0, y: 28, duration: 0.7 })
        .from(".js-node", { opacity: 0, x: -10, duration: 0.5, stagger: 0.16 }, "-=0.2")
        .fromTo(
          ".js-seg-fill",
          { scaleY: 0 },
          { scaleY: 1, transformOrigin: "top", duration: 0.55, stagger: 0.18, ease: "power2.out" },
          "-=0.55",
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-[1] overflow-hidden px-[clamp(20px,5vw,96px)] py-[clamp(50px,7vw,110px)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(60% 60% at 70% 40%, oklch(0.4 0.13 235 / 0.22), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-[clamp(40px,6vw,80px)] lg:grid-cols-[0.95fr_1.05fr]">
        {/* ── Left: copy ── */}
        <div>
          <div className="js-sp-copy mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] font-mono text-[11.5px] tracking-[0.02em] text-ink-2">
            <span
              className="inline-block h-[7px] w-[7px] rounded-full"
              style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
            />
            Pricing · scoped to you
          </div>

          <h2
            className="js-sp-copy m-0 font-display font-medium leading-[0.98] tracking-[-0.035em]"
            style={{ fontSize: "clamp(34px, 5vw, 66px)" }}
          >
            Custom work deserves
            <br />
            <em className="serif-italic" style={{ color: "var(--accent-2)" }}>
              custom pricing.
            </em>
          </h2>

          <p className="js-sp-copy mt-6 max-w-[480px] text-[16px] leading-[1.6] text-ink-2">
            We don&apos;t do one-size-fits-all plans. Every build is scoped to your
            operation — so the price is too. Tell us what you&apos;re running, and
            we&apos;ll come back with a real number, usually within two days.
          </p>

          <div className="js-sp-copy mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-[var(--bg)] transition-transform duration-200 hover:-translate-y-[1px]">
                Contact the founders for pricing
                <Icon name="arrow" size={15} />
              </span>
            </Link>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors duration-200 hover:border-[var(--line-strong)]">
                <Icon name="cal" size={14} />
                Book a 30-min call
              </span>
            </Link>
          </div>

          <div className="js-sp-copy mt-9 flex flex-wrap gap-7 border-t border-line pt-6">
            {VALUE_PROPS.map((v) => (
              <div key={v.label}>
                <div className="font-display text-[24px] font-medium tracking-[-0.02em]">
                  {v.value}
                </div>
                <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                  {v.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: "Path to your number" timeline card ── */}
        <div className="relative flex w-full justify-center">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
            style={{
              background: "radial-gradient(closest-side, oklch(0.78 0.17 220 / 0.16), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          <div className="js-spot-rise relative w-full max-w-[440px]" style={{ perspective: "1400px" }}>
            <div
              ref={cardRef}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
              className="group relative overflow-hidden rounded-[24px] border"
              style={{
                borderColor: "oklch(1 0 0 / 0.14)",
                background: "linear-gradient(165deg, oklch(0.21 0.025 258 / 0.9), oklch(0.15 0.016 260 / 0.85))",
                boxShadow: "0 40px 90px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.1)",
                backdropFilter: "blur(8px)",
                transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
                transition: "transform .5s cubic-bezier(.2,.7,.2,1)",
              }}
            >
              {/* Cursor glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(320px circle at var(--mx) var(--my), oklch(0.78 0.17 220 / 0.1), transparent 65%)",
                }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.3), transparent)" }}
              />

              <div className="relative p-[clamp(26px,3vw,38px)]">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[11px]"
                    style={{
                      background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                      boxShadow: "0 8px 20px var(--accent-glow)",
                    }}
                  >
                    <Icon name="spark" size={17} />
                  </span>
                  <div>
                    <div className="font-display text-[15px] font-medium tracking-[-0.01em] text-ink">
                      The path to your number
                    </div>
                    <div className="font-mono text-[10.5px] text-ink-3">three steps · ~2 days</div>
                  </div>
                </div>

                <div className="my-6 h-px w-full" style={{ background: "var(--line)" }} />

                {/* Timeline rail */}
                <div className="flex flex-col">
                  {STEPS.map((s, i) => {
                    const last = i === STEPS.length - 1;
                    return (
                      <div key={s.title} className="js-node flex items-stretch gap-4">
                        <div className="flex flex-shrink-0 flex-col items-center">
                          <span
                            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full"
                            style={
                              last
                                ? {
                                    background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                                    color: "var(--bg)",
                                    boxShadow: "0 0 18px var(--accent-glow)",
                                  }
                                : {
                                    border: "1px solid oklch(1 0 0 / 0.14)",
                                    background: "oklch(0.18 0.02 260)",
                                    color: "var(--accent)",
                                    boxShadow: "0 0 12px oklch(0.78 0.17 220 / 0.18)",
                                  }
                            }
                          >
                            {s.ic === "check" ? <Check /> : <Icon name={s.ic as IconName} size={15} />}
                          </span>
                          {!last && (
                            <div
                              className="relative mt-2 min-h-[30px] w-[2px] flex-1 rounded-full"
                              style={{ background: "oklch(1 0 0 / 0.1)" }}
                            >
                              <div
                                className="js-seg-fill absolute inset-0 rounded-full"
                                style={{
                                  background: "linear-gradient(180deg, var(--accent), var(--accent-2))",
                                  transformOrigin: "top",
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div className={last ? "pb-0" : "pb-7"}>
                          <div className="font-display text-[15px] font-medium leading-tight tracking-[-0.01em] text-ink">
                            {s.title}
                          </div>
                          <p className="mt-1.5 text-[12.5px] leading-[1.5] text-ink-2">{s.desc}</p>
                          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
                            {s.meta}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-5 mt-1 h-px w-full" style={{ background: "var(--line)" }} />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
                    100% scoped to you
                  </span>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-accent transition-opacity duration-200 hover:opacity-80"
                  >
                    Contact founders
                    <Icon name="arrow" size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
