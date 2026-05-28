"use client";

import { useEffect, useRef } from "react";
import { Icon } from "../ui/Icon";
import { ButtonPrimary } from "../ui/Buttons";
import { Kicker } from "../ui/Kicker";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PillarVisual, type PillarVisualKind, type PillarVisualHandle } from "./PillarVisual";

type Pillar = {
  ic: "bolt" | "cube" | "spark" | "chart" | "shield" | "layers";
  t: string;
  d: string;
  m: string[];
  visual: PillarVisualKind;
};

const PILLARS: Pillar[] = [
  {
    ic: "bolt",
    t: "Automation-first",
    d: "Replace manual cycles with event-driven workflows that adapt as your business changes. Triggers, branches and humans in one runtime.",
    m: ["200+ triggers", "Sub-second", "Branching DSL"],
    visual: "flow",
  },
  {
    ic: "cube",
    t: "Composable cores",
    d: "Modular product blocks — bookings, CRM, billing, comms — that snap together cleanly. Build a platform, not a monolith.",
    m: ["12 modules", "Typed APIs", "Versioned"],
    visual: "modules",
  },
  {
    ic: "spark",
    t: "Intelligent assist",
    d: "Embedded ML scores leads, predicts churn, surfaces next-best-actions. Tuned per tenant, never a black box.",
    m: ["GPT-class", "Per-tenant", "Explainable"],
    visual: "score",
  },
  {
    ic: "chart",
    t: "Realtime insight",
    d: "Operator-grade analytics pipeline. Streams events to dashboards, automations and your data warehouse in parallel.",
    m: ["< 200ms", "Native warehouse sync", "Anomaly aware"],
    visual: "chart",
  },
  {
    ic: "shield",
    t: "Built to scale",
    d: "Multi-region infrastructure, observability and SOC 2 controls — quietly handling the load while you focus on customers.",
    m: ["SOC 2 · II", "99.99%", "Multi-region"],
    visual: "shield",
  },
  {
    ic: "layers",
    t: "Developer surface",
    d: "Typed SDKs, webhooks, an event log you can replay, and a CLI that respects your time. Build on top, don't fight it.",
    m: ["TS / Py SDKs", "Replayable events", "OpenAPI"],
    visual: "code",
  },
];

export const Pillars = () => {
  const wrapRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const glowRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const visualRefs = useRef<(PillarVisualHandle | null)[]>([]);

  /* DOM refs for HUD elements — updated directly, no React state */
  const progressBarRef = useRef<HTMLElement>(null);
  const scrollNumRef = useRef<HTMLSpanElement>(null);
  const pillarNumRef = useRef<HTMLSpanElement>(null);

  /* Horizontal pinned scroll — desktop only (≥1024px) */
  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track || window.innerWidth < 1024) return;

    /* Pre-compute once — avoids layout read (scrollWidth) inside the hot path */
    let cachedDist = track.scrollWidth - window.innerWidth;

    let st: ScrollTrigger | undefined;
    const ctx = gsap.context(() => {
      st = ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: () => {
          /* Refresh dist on resize / invalidate — still just one read per resize */
          cachedDist = track.scrollWidth - window.innerWidth;
          return `+=${wrap.offsetHeight - window.innerHeight}`;
        },
        scrub: true,          /* Direct scroll mapping — no ticker cold-start on activation */
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          /* Translate the track — no layout read, pure compositor write */
          track.style.transform = `translate3d(${-p * cachedDist}px, 0, 0)`;

          /* HUD: progress bar + text */
          if (progressBarRef.current) progressBarRef.current.style.width = `${p * 100}%`;
          if (scrollNumRef.current)
            scrollNumRef.current.textContent = `${Math.round(p * 100).toString().padStart(2, "0")} / 100`;
          const activeIdx = Math.min(PILLARS.length, Math.max(1, Math.ceil(p * PILLARS.length))) - 1;
          if (pillarNumRef.current)
            pillarNumRef.current.textContent = `${String(activeIdx + 1).padStart(2, "0")} / ${String(PILLARS.length).padStart(2, "0")}`;

          /* Per-card transform + visual — zero React re-renders */
          PILLARS.forEach((_, i) => {
            const local = Math.max(0, Math.min(1, (p - i / PILLARS.length) * PILLARS.length * 1.6));
            const card = cardsRef.current[i];
            if (card) {
              card.style.transform = `translateY(${(1 - local) * 30}px) scale(${0.94 + local * 0.06})`;
              card.style.opacity = String(0.4 + local * 0.6);
            }
            const glow = glowRefs.current[i];
            if (glow) glow.style.opacity = String(local * 0.9);
            visualRefs.current[i]?.update(local);
          });
        },
      });
    }, wrap);

    return () => { st?.kill(); ctx.revert(); };
  }, []);

  /* Hover lift — desktop only */
  useEffect(() => {
    if (window.innerWidth < 1024) return;
    const targets = cardsRef.current.filter(Boolean) as HTMLElement[];
    const enter = (e: Event) =>
      gsap.to(e.currentTarget as HTMLElement, { y: -6, duration: 0.45, ease: "power3.out" });
    const leave = (e: Event) =>
      gsap.to(e.currentTarget as HTMLElement, { y: 0, duration: 0.6, ease: "power3.out" });
    targets.forEach((t) => { t.addEventListener("mouseenter", enter); t.addEventListener("mouseleave", leave); });
    return () => targets.forEach((t) => { t.removeEventListener("mouseenter", enter); t.removeEventListener("mouseleave", leave); });
  }, []);

  /* Mobile: animate each visual from t=0 to t=1 when its card enters the viewport */
  useEffect(() => {
    if (window.innerWidth >= 1024) return;
    const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (cards.length === 0) return;

    const rafs: number[] = [];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = cards.indexOf(entry.target as HTMLElement);
          if (idx < 0) return;
          const visual = visualRefs.current[idx];
          if (!visual) return;

          /* Animate t from 0 to 1 with easeOutCubic over 1.2s */
          const start = performance.now();
          const duration = 1200;
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            visual.update(eased);
            if (t < 1) rafs[idx] = requestAnimationFrame(tick);
          };
          rafs[idx] = requestAnimationFrame(tick);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" },
    );

    cards.forEach((c) => obs.observe(c));
    return () => {
      obs.disconnect();
      rafs.forEach((id) => id && cancelAnimationFrame(id));
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      id="platform"
      className="pillars-wrap relative z-[1]"
      style={{ height: "520vh" }}
    >
      <div className="pillars-sticky sticky top-0 flex h-screen flex-col overflow-hidden" style={{ willChange: "transform" }}>
        {/* Header */}
        <div className="grid flex-shrink-0 grid-cols-1 items-end gap-8 px-[clamp(20px,5vw,96px)] pt-[90px] pb-7 lg:grid-cols-[1.4fr_1fr] lg:gap-[60px]">
          <div>
            <Kicker className="mb-[18px]">{"// PLATFORM · SECTION 02 OF 05"}</Kicker>
            <h2
              className="m-0 max-w-[720px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Four primitives.
              <br />
              <span className="grad-soft">One coherent platform.</span>
            </h2>
          </div>
          <div className="w-full max-w-[360px] justify-self-end">
            <div className="flex justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
              <span>SCROLL</span>
              <span ref={scrollNumRef}>00 / 100</span>
            </div>
            <div className="relative my-[10px] h-[2px] overflow-hidden bg-line">
              <i
                ref={progressBarRef}
                className="block h-full"
                style={{
                  width: "0%",
                  background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                  boxShadow: "0 0 12px var(--accent-glow)",
                }}
              />
            </div>
            <div className="flex justify-between font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
              <span>06 PILLARS</span>
              <span ref={pillarNumRef}>01 / 06</span>
            </div>
          </div>
        </div>

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="pillars-track flex w-max flex-1 items-center gap-[clamp(12px,1.4vw,20px)] px-[clamp(20px,5vw,96px)] pb-[clamp(60px,7vh,100px)] will-3d"
        >
          {/* Intro card */}
          <article
            className="pillars-card relative flex flex-col gap-4 overflow-hidden rounded-[24px] border border-line p-[clamp(20px,2.2vw,36px)] flex-[0_0_clamp(300px,26vw,480px)]"
            style={{
              height: "min(58vh, 460px)",
              justifyContent: "space-between",
              background: "linear-gradient(180deg, oklch(0.20 0.018 260 / 0.6), oklch(0.14 0.012 260 / 0.3))",
            }}
          >
            <Kicker>{"// PLATFORM PILLARS"}</Kicker>
            <h3
              className="m-0 mt-4 mb-3 font-display font-medium tracking-[-0.02em] leading-[1.1]"
              style={{ fontSize: "clamp(18px, 1.7vw, 26px)" }}
            >
              We build with a small set of well-shaped primitives — and let everything grow from there.
            </h3>
            <p className="m-0 text-[clamp(12px,1vw,14px)] leading-[1.55] text-ink-2">
              Scroll horizontally to walk through the six building blocks every ZypherWorks product is composed from.
            </p>
            <div className="mt-auto flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-accent">
              <span>SCROLL</span>
              <span className="hs-arrow-anim"><Icon name="arrow" size={14} stroke={2.2} /></span>
            </div>
          </article>

          {/* Pillar cards */}
          {PILLARS.map((p, i) => (
            <article
              key={p.t}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="pillars-card relative flex flex-col gap-[clamp(12px,1.4vh,18px)] overflow-hidden rounded-[24px] border border-line p-[clamp(16px,1.8vw,28px)] flex-[0_0_clamp(260px,20vw,360px)]"
              style={{
                height: "min(58vh, 460px)",
                background: "linear-gradient(180deg, oklch(0.20 0.014 260 / 0.75), oklch(0.14 0.012 260 / 0.5))",
                boxShadow: "0 30px 70px oklch(0 0 0 / 0.35), 0 1px 0 oklch(1 0 0 / 0.05) inset",
                transform: "translateY(30px) scale(0.94)",
                opacity: 0.4,
                willChange: "transform, opacity",
              }}
            >
              <span
                ref={(el) => { glowRefs.current[i] = el; }}
                aria-hidden
                className="pointer-events-none absolute -inset-px"
                style={{
                  background: "radial-gradient(60% 80% at 50% 0%, var(--accent-soft), transparent 70%)",
                  opacity: 0,
                }}
              />
              <div className="flex items-center justify-between">
                <div
                  className="grid h-10 w-10 place-items-center rounded-xl border border-line text-accent"
                  style={{ background: "oklch(1 0 0 / 0.05)" }}
                >
                  <Icon name={p.ic} size={18} />
                </div>
                <div className="font-mono text-[10px] tracking-[0.14em] text-ink-3">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div
                className="grid place-items-center overflow-hidden rounded-[14px] border border-line p-3"
                style={{ height: "clamp(100px, 13vh, 148px)", background: "oklch(1 0 0 / 0.025)" }}
              >
                <PillarVisual
                  kind={p.visual}
                  ref={(el) => { visualRefs.current[i] = el; }}
                />
              </div>
              <div>
                <h3
                  className="m-0 mb-[8px] font-display font-medium tracking-[-0.02em] leading-[1.1]"
                  style={{ fontSize: "clamp(16px, 1.4vw, 21px)" }}
                >{p.t}</h3>
                <p className="m-0 text-[clamp(11px,0.85vw,13px)] leading-[1.55] text-ink-2">{p.d}</p>
              </div>
              <div className="mt-auto flex flex-wrap gap-[5px]">
                {p.m.map((x) => (
                  <span
                    key={x}
                    className="rounded-full border border-line px-[8px] py-[3px] font-mono text-[9px] uppercase tracking-[0.08em] text-ink-2"
                    style={{ background: "oklch(1 0 0 / 0.04)" }}
                  >
                    {x}
                  </span>
                ))}
              </div>
            </article>
          ))}

          {/* End card */}
          <article
            className="pillars-card relative flex flex-col gap-4 overflow-hidden rounded-[24px] border border-line-strong p-[clamp(20px,2.2vw,36px)] flex-[0_0_clamp(300px,26vw,480px)]"
            style={{
              height: "min(58vh, 460px)",
              justifyContent: "space-between",
              background: "linear-gradient(180deg, oklch(0.32 0.1 235 / 0.5), oklch(0.18 0.04 250 / 0.3))",
            }}
          >
            <Kicker>{"// END · PILLARS"}</Kicker>
            <h3
              className="m-0 mt-4 mb-3 font-display font-medium tracking-[-0.02em] leading-[1.1]"
              style={{ fontSize: "clamp(18px, 1.7vw, 26px)" }}
            >
              Six primitives, infinite compositions.
            </h3>
            <p className="m-0 text-[clamp(12px,1vw,14px)] leading-[1.55] text-ink-2">
              Every ZypherWorks product — including Ease Fit — is composed from these blocks. Continue scrolling to see one in production.
            </p>
            <div className="mt-auto"><ButtonPrimary>See it in a product</ButtonPrimary></div>
          </article>
        </div>
      </div>
    </section>
  );
};
