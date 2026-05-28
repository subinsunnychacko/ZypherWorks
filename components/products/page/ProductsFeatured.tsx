"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, type IconName } from "../../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EaseFitDashboard, type EFTab } from "../EaseFitDashboard";

type Callout = { tab: EFTab; ic: IconName; title: string; copy: string };

const CALLOUTS: Callout[] = [
  {
    tab: "overview",
    ic: "home",
    title: "One operational view",
    copy: "Revenue, bookings, leads and members in a single workspace — no spreadsheet sprawl.",
  },
  {
    tab: "bookings",
    ic: "cal",
    title: "Smart bookings & waitlists",
    copy: "Capacity heatmaps, automated waitlist promotion, and rule-based class scheduling.",
  },
  {
    tab: "leads",
    ic: "spark",
    title: "Multi-channel lead pipeline",
    copy: "Auto-score and route leads from IG, walk-ins and forms into a single pipeline.",
  },
  {
    tab: "members",
    ic: "users",
    title: "Adaptive engagement",
    copy: "Auto-DMs, retention nudges and renewal sequences keep at-risk members on the floor.",
  },
];

export const ProductsFeatured = () => {
  const ref = useRef<HTMLElement>(null);
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLElement>(null);
  const laptopWrapRef = useRef<HTMLDivElement>(null);
  const laptopRafRef = useRef<number>(0);
  const [tab, setTab] = useState<EFTab>("overview");

  /* Mouse-tracked 3D tilt + follow-glow — same pattern as ProductCard3D */
  const handleLaptopMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const wrap = laptopWrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(laptopRafRef.current);
    laptopRafRef.current = requestAnimationFrame(() => {
      wrap.style.setProperty("--lap-ry", `${x * 8}deg`);
      wrap.style.setProperty("--lap-rx", `${-y * 5}deg`);
      wrap.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      wrap.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  };

  const handleLaptopLeave = () => {
    const wrap = laptopWrapRef.current;
    if (!wrap) return;
    cancelAnimationFrame(laptopRafRef.current);
    wrap.style.setProperty("--lap-ry", "0deg");
    wrap.style.setProperty("--lap-rx", "0deg");
  };

  /* Desktop only: CSS sticky pins the inner panel; ScrollTrigger only observes scroll progress to cycle tabs.
     No GSAP pin spacer — clean unmount when navigating between routes. */
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
          const idx = Math.min(CALLOUTS.length - 1, Math.floor(p * CALLOUTS.length));
          const newTab = CALLOUTS[idx].tab;
          setTab((cur) => (cur !== newTab ? newTab : cur));
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

  const activeCallout = CALLOUTS.find((c) => c.tab === tab) ?? CALLOUTS[0];

  const activeIdx = CALLOUTS.findIndex((c) => c.tab === tab);

  return (
    <section
      ref={ref}
      id="featured"
      className="pf-wrap relative z-[1] mx-[clamp(8px,2vw,40px)] my-0 lg:h-[220vh]"
      style={{
        borderRadius: "clamp(20px, 3vw, 40px)",
        background: "var(--bg-paper)",
        color: "var(--ink-dark)",
        boxShadow: "0 40px 100px oklch(0 0 0 / 0.4)",
      }}
    >
      <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
        <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,5vw,80px)] py-[clamp(60px,8vw,120px)] lg:py-[clamp(40px,3.6vw,64px)]">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 lg:mb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "oklch(0.45 0.012 260)" }}>
              <span className="block h-px w-[22px]" style={{ background: "oklch(0.45 0.012 260)" }} />
              {"// FLAGSHIP DEEP-DIVE · STAY TO SEE ALL 4"}
            </div>
            <h2
              className="m-0 max-w-[720px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(24px, 2.6vw, 38px)", lineHeight: 1.05, color: "var(--ink-dark)" }}
            >
              Ease Fit — the platform that
              <br />
              <em className="serif-italic" style={{ color: "oklch(0.35 0.012 260)" }}>
                replaces the spreadsheet sprawl.
              </em>
            </h2>
          </div>
          <a
            href="https://www.ease.fit/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-[10px] rounded-full px-5 py-3 text-[14px] font-medium text-white transition-transform duration-200 hover:-translate-y-[1px]"
            style={{ background: "var(--ink-dark)" }}
          >
            Visit ease.fit
            <span className="grid h-[22px] w-[22px] place-items-center rounded-full" style={{ background: "oklch(0.85 0.16 145)", color: "var(--ink-dark)" }}>
              <Icon name="arrowUp" size={11} stroke={2.4} />
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12">
          {/* Callouts — desktop left rail (hidden on mobile) */}
          <div className="hidden flex-col gap-2.5 lg:flex">
            {CALLOUTS.map((c, i) => {
              const active = c.tab === tab;
              return (
                <div
                  key={c.tab}
                  ref={(el) => { calloutRefs.current[i] = el; }}
                  className="reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div
                    className="js-callout relative rounded-[16px] border p-[14px] transition-all duration-500 ease-out"
                    style={{
                      background: active ? "oklch(1 0 0)" : "oklch(0.99 0.005 80)",
                      borderColor: active ? "oklch(0.85 0.16 145 / 0.5)" : "oklch(0 0 0 / 0.06)",
                      boxShadow: active
                        ? "0 12px 30px oklch(0.65 0.18 145 / 0.18), 0 0 0 1px oklch(0.85 0.16 145 / 0.25) inset"
                        : "0 1px 2px oklch(0 0 0 / 0.03)",
                      transform: active ? "translateX(6px)" : "translateX(0)",
                    }}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -left-[3px] top-1/2 -translate-y-1/2"
                        style={{
                          width: 6, height: 32, borderRadius: 99,
                          background: "linear-gradient(180deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
                          boxShadow: "0 0 12px oklch(0.78 0.17 155 / 0.6)",
                        }}
                      />
                    )}
                    <div className="flex items-start gap-3">
                      <div
                        className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-[10px]"
                        style={{
                          background: active
                            ? "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))"
                            : "oklch(0 0 0 / 0.05)",
                          color: active ? "white" : "oklch(0.4 0.012 260)",
                          transition: "all 0.5s",
                        }}
                      >
                        <Icon name={c.ic} size={16} stroke={2} />
                      </div>
                      <div>
                        <h4 className="m-0 mb-0.5 font-display text-[14.5px] font-semibold tracking-[-0.01em]" style={{ color: "var(--ink-dark)" }}>
                          {c.title}
                        </h4>
                        <p className="m-0 text-[12.5px] leading-[1.5]" style={{ color: "oklch(0.4 0.012 260)" }}>
                          {c.copy}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Scroll progress indicator — desktop only */}
            <div className="mt-2 hidden lg:block">
              <div className="mb-[6px] flex justify-between font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "oklch(0.5 0.012 260)" }}>
                <span>SCROLL TO CYCLE</span>
                <span>
                  {String(activeIdx + 1).padStart(2, "0")} / {String(CALLOUTS.length).padStart(2, "0")}
                </span>
              </div>
              <div className="relative h-[2px] overflow-hidden" style={{ background: "oklch(0 0 0 / 0.06)" }}>
                <i
                  ref={progressBarRef}
                  className="block h-full"
                  style={{
                    width: "0%",
                    background: "linear-gradient(90deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
                    boxShadow: "0 0 10px oklch(0.78 0.17 155 / 0.5)",
                    transition: "width 0.12s linear",
                  }}
                />
              </div>
            </div>

            <a
              href="https://www.ease.fit/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-fit items-center gap-[10px] rounded-full px-5 py-3 text-[14px] font-medium text-white transition-transform duration-200 hover:-translate-y-[1px]"
              style={{ background: "var(--ink-dark)" }}
            >
              Start using Ease Fit
              <span className="grid h-[22px] w-[22px] place-items-center rounded-full" style={{ background: "oklch(0.85 0.16 145)", color: "var(--ink-dark)" }}>
                <Icon name="arrow" size={11} stroke={2.4} />
              </span>
            </a>
          </div>

          {/* Laptop mockup — interactive 3D tilt + follow-glow. Mobile: also hosts tab pills + active callout */}
          <div className="flex flex-col gap-5">
            {/* Mobile-only tab strip — tap to switch */}
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
              {CALLOUTS.map((c) => {
                const active = c.tab === tab;
                return (
                  <button
                    key={c.tab}
                    onClick={() => setTab(c.tab)}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-medium transition-all duration-300"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))"
                        : "oklch(0 0 0 / 0.04)",
                      borderColor: active ? "oklch(0.85 0.16 145 / 0.4)" : "oklch(0 0 0 / 0.08)",
                      color: active ? "white" : "oklch(0.35 0.012 260)",
                      boxShadow: active ? "0 6px 16px oklch(0.65 0.18 145 / 0.3)" : undefined,
                    }}
                  >
                    <Icon name={c.ic} size={13} stroke={2.2} />
                    {c.title}
                  </button>
                );
              })}
            </div>

            <div
              ref={laptopWrapRef}
              onMouseMove={handleLaptopMove}
              onMouseLeave={handleLaptopLeave}
              className="group relative mx-auto w-full"
              style={{ perspective: 1400, maxWidth: 720 }}
            >
              <div
                className="relative w-full"
                style={{
                  aspectRatio: "16 / 10.5",
                  transformStyle: "preserve-3d",
                  transform: "rotateX(var(--lap-rx, 0deg)) rotateY(var(--lap-ry, 0deg))",
                  transition: "transform 0.45s cubic-bezier(.2,.7,.2,1)",
                }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    aspectRatio: "16 / 10",
                    background: "oklch(0.16 0.012 260)",
                    borderRadius: "14px 14px 4px 4px",
                    border: "8px solid oklch(0.22 0.012 260)",
                    borderBottomWidth: 14,
                    boxShadow:
                      "0 0 0 1px oklch(0 0 0 / 0.4), 0 40px 80px oklch(0 0 0 / 0.3), inset 0 0 0 1px oklch(1 0 0 / 0.05)",
                    transformOrigin: "bottom",
                  }}
                >
                  <EaseFitDashboard tab={tab} />

                  {/* Mouse-follow accent glow on the screen */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), oklch(0.85 0.16 145 / 0.28), transparent 60%)",
                      mixBlendMode: "screen",
                    }}
                  />

                  {/* Diagonal screen reflection that shifts with cursor */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(115deg, transparent 30%, oklch(1 0 0 / 0.06) 45%, oklch(1 0 0 / 0.12) 50%, oklch(1 0 0 / 0.06) 55%, transparent 70%)",
                      transform: "translateX(calc((var(--mx, 50%) - 50%) * 0.3))",
                      mixBlendMode: "overlay",
                    }}
                  />

                  {/* Live tab badge */}
                  <div
                    className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-white"
                    style={{ background: "oklch(0 0 0 / 0.5)", backdropFilter: "blur(6px)", transform: "translateZ(20px)" }}
                  >
                    <span
                      className="inline-block"
                      style={{ width: 5, height: 5, borderRadius: 99, background: "oklch(0.85 0.16 145)", boxShadow: "0 0 8px oklch(0.85 0.16 145)" }}
                    />
                    {tab.toUpperCase()}
                  </div>
                </div>
                <div
                  className="relative -mx-[5%]"
                  style={{
                    height: 14, width: "110%",
                    background: "linear-gradient(180deg, oklch(0.28 0.012 260), oklch(0.18 0.012 260))",
                    borderRadius: "0 0 18px 18px",
                    boxShadow: "0 14px 30px oklch(0 0 0 / 0.3)",
                  }}
                >
                  <span aria-hidden className="absolute left-1/2 top-0 -translate-x-1/2"
                    style={{ width: "22%", height: 5, background: "oklch(0.14 0.012 260)", borderRadius: "0 0 8px 8px" }} />
                </div>
              </div>

              {/* Edge halo — appears on hover, pulled from accent */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 -inset-y-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(60% 80% at 50% 50%, oklch(0.85 0.16 145 / 0.22), transparent 70%)",
                  filter: "blur(30px)",
                  zIndex: -1,
                }}
              />
            </div>

            {/* Mobile-only active callout summary — updates as user taps tabs */}
            <div
              key={tab}
              className="ef-fade-up relative overflow-hidden rounded-[18px] border p-5 lg:hidden"
              style={{
                background: "oklch(1 0 0)",
                borderColor: "oklch(0.85 0.16 145 / 0.4)",
                boxShadow: "0 12px 30px oklch(0.65 0.18 145 / 0.14), 0 0 0 1px oklch(0.85 0.16 145 / 0.2) inset",
              }}
            >
              <span
                aria-hidden
                className="absolute -left-[3px] top-1/2 -translate-y-1/2"
                style={{
                  width: 6, height: 36, borderRadius: 99,
                  background: "linear-gradient(180deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
                  boxShadow: "0 0 12px oklch(0.78 0.17 155 / 0.6)",
                }}
              />
              <div className="flex items-start gap-3">
                <div
                  className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-[10px] text-white"
                  style={{
                    background: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
                  }}
                >
                  <Icon name={activeCallout.ic} size={18} stroke={2} />
                </div>
                <div>
                  <h4 className="m-0 mb-1 font-display text-[15px] font-semibold tracking-[-0.01em]" style={{ color: "var(--ink-dark)" }}>
                    {activeCallout.title}
                  </h4>
                  <p className="m-0 text-[13px] leading-[1.5]" style={{ color: "oklch(0.4 0.012 260)" }}>
                    {activeCallout.copy}
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile-only "Start using" CTA */}
            <a
              href="https://www.ease.fit/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-[10px] rounded-full px-5 py-3 text-[14px] font-medium text-white transition-transform duration-200 hover:-translate-y-[1px] lg:hidden"
              style={{ background: "var(--ink-dark)" }}
            >
              Start using Ease Fit
              <span className="grid h-[22px] w-[22px] place-items-center rounded-full" style={{ background: "oklch(0.85 0.16 145)", color: "var(--ink-dark)" }}>
                <Icon name="arrow" size={11} stroke={2.4} />
              </span>
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
