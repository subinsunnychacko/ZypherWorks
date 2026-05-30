"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { gsap } from "@/lib/gsap";
import { VALUE_PROPS } from "./data";
import { HeroCardStack } from "./HeroCardStack";

export const PricingPageHero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".js-pr-stagger", {
        y: 22, opacity: 0, duration: 0.95, ease: "power3.out",
        stagger: 0.08, delay: 0.25,
      });
      gsap.from(".js-stack", {
        scale: 0.9, opacity: 0, duration: 1.1, ease: "power3.out", delay: 0.6,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative z-[1] overflow-hidden pt-[120px] pb-[60px] lg:pt-[150px] lg:pb-[100px]"
    >
      {/* Atmospheric grid */}
      <div className="zwp-grid pointer-events-none absolute inset-0 z-[0]" aria-hidden />

      {/* Off-center accent glow on the right */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 z-[0]"
        style={{
          width: "min(900px, 70vw)",
          height: 560,
          transform: "translate(20%, -50%)",
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.16 145 / 0.18), oklch(0.78 0.17 220 / 0.08) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <Container className="relative z-[1]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT — conversion-focused copy */}
          <div>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Pricing" }]} />
            {/* Eyebrow */}
            <div className="js-pr-stagger mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] pl-2 font-mono text-[11px] tracking-[0.04em] text-ink-2">
              <span
                className="pulse-dot relative inline-block flex-shrink-0"
                style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent-2)", boxShadow: "0 0 10px var(--accent-2)" }}
              />
              TRUSTED BY 380+ OPERATORS · 60-DAY RISK-FREE PILOT
            </div>

            <Kicker className="js-pr-stagger mb-6 w-fit">{"// PRICING THAT PAYS BACK"}</Kicker>

            <h1
              className="js-pr-stagger m-0 font-display font-medium tracking-[-0.04em]"
              style={{ fontSize: "clamp(38px, 5.4vw, 88px)", lineHeight: 0.98 }}
            >
              Pay for outcomes,
              <br />
              <span className="grad">not seat counts.</span>
            </h1>

            <p className="js-pr-stagger mt-7 max-w-[560px] text-[16px] leading-[1.6] text-ink-2 sm:text-[17px]">
              No seat counts. No hidden tiers. A fixed platform fee plus transparent module usage —
              priced so the first 90 days deliver more value than you spend.
            </p>

            {/* CTAs */}
            <div className="js-pr-stagger mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-[10px] rounded-full border-0 bg-ink px-5 py-3 text-[14px] font-medium text-bg transition-transform duration-200 hover:-translate-y-[1px]"
                style={{ boxShadow: "0 10px 30px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(1 0 0 / 0.1)" }}
              >
                Calculate your ROI
                <span
                  className="grid h-[20px] w-[20px] place-items-center rounded-full"
                  style={{ background: "var(--accent)", color: "var(--bg)", boxShadow: "0 0 10px var(--accent-glow)" }}
                >
                  <Icon name="arrow" size={10} stroke={2.4} />
                </span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-[10px] rounded-full border border-line-strong bg-[oklch(1_0_0_/_0.02)] px-5 py-3 text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-[oklch(1_0_0_/_0.06)]"
              >
                <Icon name="msg" size={11} />
                Talk to founders
              </a>
            </div>

            {/* Trust strip */}
            <div className="js-pr-stagger mt-10 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:flex-wrap sm:gap-6">
              {VALUE_PROPS.map((v) => (
                <div key={v.label} className="flex items-center gap-2.5">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full border border-line text-accent"
                    style={{ background: "oklch(0.85 0.16 145 / 0.1)" }}
                  >
                    <Icon name={v.ic} size={12} stroke={2.2} />
                  </span>
                  <span className="text-[12.5px] text-ink-2">{v.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — interactive 3D fanned pricing card stack */}
          <div className="relative">
            <HeroCardStack />
          </div>
        </div>
      </Container>
    </section>
  );
};
