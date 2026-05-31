"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon, type IconName } from "../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EaseFitDashboard, type EFTab } from "./EaseFitDashboard";

const TABS: { id: EFTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "bookings", label: "Bookings" },
  { id: "leads", label: "Leads" },
  { id: "members", label: "Engagement" },
];

const FEATURES: { ic: IconName; t: string; d: string }[] = [
  { ic: "spark", t: "Lead capture", d: "Multi-channel intake — forms, IG, walk-ins — into one auto-scored pipeline." },
  { ic: "cal", t: "Smart bookings", d: "Class scheduling, waitlists and rules. No more double-bookings or empty floors." },
  { ic: "users", t: "Member engagement", d: "Adaptive comms — auto-DMs, retention nudges and renewal sequences." },
  { ic: "chart", t: "Operator analytics", d: "Real-time KPIs across revenue, attendance, churn and staff utilization." },
  { ic: "msg", t: "Unified inbox", d: "Whatsapp, SMS, email and in-app — every conversation, one thread." },
  { ic: "layers", t: "Centralized workflow", d: "Replace the spreadsheet sprawl with one operational source of truth." },
];

const OTHER = [
  { l: "v", t: "Vega CRM",     d: "Relationship intelligence for sales teams who treat every conversation as data.", c: "linear-gradient(135deg, oklch(0.7 0.18 25), oklch(0.55 0.2 350))", s: "Live" },
  { l: "f", t: "Forge Ops",    d: "Headless workflow engine — triggers, branches and humans in one runtime.",       c: "linear-gradient(135deg, oklch(0.7 0.18 60), oklch(0.55 0.2 30))",  s: "Early access" },
  { l: "l", t: "Lume Insight", d: "Operator-grade analytics with built-in anomaly detection — no extra setup.",    c: "linear-gradient(135deg, oklch(0.7 0.16 280), oklch(0.5 0.2 250))", s: "Q3 26 · Beta" },
];

export const Products = () => {
  const [tab, setTab] = useState<EFTab>("overview");
  const laptopRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  /* Scroll-driven laptop tilt */
  useEffect(() => {
    const root = laptopRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.set(root, { "--lap-rx": "10deg" } as Record<string, string>);
      gsap.to(root, {
        "--lap-rx": "0deg",
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "center center", scrub: 0.6 },
      } as Record<string, unknown>);
    }, root);
    return () => ctx.revert();
  }, []);

  /* Feature card stagger reveal */
  useEffect(() => {
    const root = featuresRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-feat"), {
        y: 24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.07,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      className="relative z-[1] mx-[clamp(8px,2vw,40px)] my-0 overflow-hidden"
      style={{
        borderRadius: "clamp(20px, 3vw, 40px)",
        background: "var(--bg-paper)",
        color: "var(--ink-dark)",
        boxShadow: "0 40px 100px oklch(0 0 0 / 0.4)",
      }}
    >
      <div className="px-[clamp(20px,5vw,80px)] py-[clamp(60px,8vw,100px)]">
        {/* Header */}
        <div className="reveal mb-10 flex flex-col gap-6 sm:mb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div>
            <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] sm:text-[11.5px]" style={{ color: "oklch(0.45 0.012 260)" }}>
              <span className="block h-px w-[22px]" style={{ background: "oklch(0.45 0.012 260)" }} />
              {"// THE ZYPHERWORKS ECOSYSTEM"}
            </div>
            <h2
              className="m-0 max-w-[800px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.8vw, 58px)", lineHeight: 1.05, color: "var(--ink-dark)" }}
            >
              Products built for the operators
              <br />
              <em className="serif-italic" style={{ color: "oklch(0.35 0.012 260)" }}>
                running tomorrow&apos;s businesses.
              </em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-6 text-[13px]" style={{ color: "oklch(0.35 0.012 260)" }}>
            {[["2", "live products"], ["45+", "operators"], ["87%", "retention · yr 1"]].map(([b, l]) => (
              <div key={l}>
                <b className="mb-1 block font-display text-[16px] font-medium" style={{ color: "var(--ink-dark)" }}>{b}</b>
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* Ease Fit card */}
        <article
          className="reveal relative overflow-hidden rounded-[24px] border"
          style={{ background: "oklch(1 0 0)", borderColor: "oklch(0 0 0 / 0.06)", boxShadow: "0 30px 80px oklch(0 0 0 / 0.08)" }}
        >
          <div className="p-6 sm:p-8 lg:p-9">
            <div className="mb-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-14">
              {/* Copy */}
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <div
                    className="grid flex-shrink-0 place-items-center font-display font-semibold text-white"
                    style={{ width: 44, height: 44, borderRadius: 14, fontSize: 20, background: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))", boxShadow: "0 0 0 1px oklch(0 0 0 / 0.06), 0 10px 20px oklch(0.7 0.18 155 / 0.3)" }}
                  >e</div>
                  <span className="font-display text-[20px] font-semibold tracking-[-0.01em]">Ease Fit</span>
                  <span className="rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: "oklch(0.5 0.012 260)", background: "oklch(0 0 0 / 0.05)" }}>
                    Flagship · Fitness Ops
                  </span>
                </div>
                <h3
                  className="m-0 mb-4 font-display font-medium tracking-[-0.025em] leading-[1.08]"
                  style={{ fontSize: "clamp(22px, 2.8vw, 36px)" }}
                >
                  The fitness business platform — bookings, leads &amp; engagement on one rail.
                </h3>
                <p className="m-0 mb-6 text-[15px] leading-[1.55]" style={{ color: "oklch(0.35 0.012 260)" }}>
                  Ease Fit gives gym, studio and wellness operators a single workspace to run
                  their day-to-day: capture leads from every channel, automate bookings, and
                  keep members engaged with adaptive comms — all wired into one operational view.
                </p>
                <a
                  href="https://www.ease.fit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[10px] rounded-full px-5 py-3 text-[14px] font-medium text-white transition-transform duration-200 hover:-translate-y-[1px]"
                  style={{ background: "var(--ink-dark)" }}
                >
                  Visit ease.fit
                  <span className="grid h-[22px] w-[22px] place-items-center rounded-full" style={{ background: "oklch(0.85 0.16 145)", color: "var(--ink-dark)" }}>
                    <Icon name="arrowUp" size={11} stroke={2.4} />
                  </span>
                </a>
              </div>

              {/* Laptop mockup */}
              <div ref={laptopRef} className="w-full preserve-3d" style={{ perspective: 1200 }}>
                <div className="relative w-full" style={{ aspectRatio: "16 / 10.5" }}>
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: "16 / 10",
                      background: "oklch(0.16 0.012 260)",
                      borderRadius: "14px 14px 4px 4px",
                      border: "8px solid oklch(0.22 0.012 260)",
                      borderBottomWidth: 14,
                      boxShadow: "0 0 0 1px oklch(0 0 0 / 0.4), 0 30px 60px oklch(0 0 0 / 0.25), inset 0 0 0 1px oklch(1 0 0 / 0.05)",
                      transform: "rotateX(var(--lap-rx, 4deg))",
                      transformOrigin: "bottom",
                      transition: "transform .5s cubic-bezier(.2,.7,.2,1)",
                    }}
                  >
                    <EaseFitDashboard tab={tab} />
                  </div>
                  <div
                    className="relative -mx-[5%]"
                    style={{ height: 14, width: "110%", background: "linear-gradient(180deg, oklch(0.28 0.012 260), oklch(0.18 0.012 260))", borderRadius: "0 0 18px 18px", boxShadow: "0 14px 30px oklch(0 0 0 / 0.3)" }}
                  >
                    <span aria-hidden className="absolute left-1/2 top-0 -translate-x-1/2" style={{ width: "22%", height: 5, background: "oklch(0.14 0.012 260)", borderRadius: "0 0 8px 8px" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 flex flex-wrap gap-[6px] rounded-full p-1 w-fit" style={{ background: "oklch(0 0 0 / 0.04)" }} role="tablist">
              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTab(t.id)}
                    className="rounded-full border-0 px-3 py-2 text-[12px] font-medium transition-all duration-200 sm:px-4 sm:text-[13px]"
                    style={{
                      background: active ? "var(--ink-dark)" : "transparent",
                      color: active ? "white" : "oklch(0.4 0.012 260)",
                      boxShadow: active ? "0 4px 10px oklch(0 0 0 / 0.15)" : undefined,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* Feature grid */}
            <div ref={featuresRef} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div
                  key={f.t}
                  className="js-feat rounded-2xl border p-4 sm:p-[18px]"
                  style={{ background: "oklch(0.97 0.005 80)", borderColor: "oklch(0 0 0 / 0.05)" }}
                >
                  <div
                    className="mb-3 grid place-items-center rounded-[9px] border"
                    style={{ width: 32, height: 32, background: "oklch(1 0 0)", borderColor: "oklch(0 0 0 / 0.05)", color: "oklch(0.5 0.16 145)" }}
                  >
                    <Icon name={f.ic} size={16} />
                  </div>
                  <b className="mb-1 block font-display text-[13px] font-medium sm:text-[14px]">{f.t}</b>
                  <span className="text-[11.5px] leading-[1.45] sm:text-[12px]" style={{ color: "oklch(0.4 0.012 260)" }}>{f.d}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Other products */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER.map((p) => (
            <Link
              key={p.t}
              href="/products"
              className="reveal flex min-h-[180px] flex-col justify-between rounded-[22px] border p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_oklch(0_0_0_/_0.08)]"
              style={{ background: "oklch(1 0 0)", borderColor: "oklch(0 0 0 / 0.06)" }}
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="grid place-items-center font-display font-semibold text-white"
                  style={{ width: 38, height: 38, borderRadius: 11, fontSize: 16, background: p.c }}
                >
                  {p.l}
                </div>
                <div className="rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: "oklch(0.5 0.012 260)", background: "oklch(0 0 0 / 0.04)" }}>
                  {p.s}
                </div>
              </div>
              <div>
                <h4 className="m-0 mb-[6px] font-display text-[18px] font-medium tracking-[-0.015em]">{p.t}</h4>
                <p className="m-0 text-[13px] leading-[1.45]" style={{ color: "oklch(0.4 0.012 260)" }}>{p.d}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA — links to /products page */}
        <Link
          href="/products"
          className="reveal mt-6 flex items-center justify-between rounded-[22px] border p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[2px] hover:border-[oklch(0_0_0_/_0.18)] hover:shadow-[0_20px_40px_oklch(0_0_0_/_0.08)]"
          style={{ background: "oklch(0.99 0.005 80)", borderColor: "oklch(0 0 0 / 0.06)" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="grid place-items-center text-white"
              style={{
                width: 42, height: 42, borderRadius: 12,
                background: "linear-gradient(135deg, var(--ink-dark), oklch(0.32 0.012 260))",
              }}
            >
              <Icon name="grid" size={18} stroke={2} />
            </div>
            <div>
              <div className="font-display text-[16px] font-medium tracking-[-0.01em]" style={{ color: "var(--ink-dark)" }}>
                See all products
              </div>
              <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.1em]" style={{ color: "oklch(0.5 0.012 260)" }}>
                Operations · Sales · Automation · Analytics
              </div>
            </div>
          </div>
          <span
            className="grid h-[36px] w-[36px] place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
            style={{ background: "var(--ink-dark)", color: "white" }}
          >
            <Icon name="arrow" size={14} stroke={2.2} />
          </span>
        </Link>
      </div>
    </section>
  );
};
