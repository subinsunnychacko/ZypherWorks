"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Icon } from "../ui/Icon";
import { ButtonPrimary, ButtonGhost } from "../ui/Buttons";
import { Container } from "../ui/Container";
import { gsap } from "@/lib/gsap";
import { FadeInHeadline } from "./FadeInHeadline";

/* HeroScene is a pure 3D visual — skip SSR to keep the LCP text fast,
   then load the canvas after hydration. */
const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false, loading: () => null },
);

const STATS = [
  { n: "45K+", l: "events / day" },
  { n: "99.9%", l: "platform uptime" },
  { n: "95 ms", l: "avg API latency" },
];

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".js-hero-stagger", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.8,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative z-[1] w-full lg:min-h-screen"
    >
      <Container className="grid content-start items-start gap-10 pt-[100px] pb-14 lg:min-h-screen lg:grid-cols-2 lg:content-center lg:items-center lg:pt-[120px] lg:pb-[48px] lg:gap-[60px]">
        {/* ── Left: copy ── */}
        <div className="flex flex-col">
          {/* Eyebrow */}
          <div className="js-hero-stagger mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] pl-2 font-mono text-[11px] tracking-[0.02em] text-ink-2 sm:text-[11.5px]">
            <span
              className="pulse-dot relative inline-block flex-shrink-0"
              style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
            />
            <span>ZW · Q2 26 · Platform release 4.1</span>
          </div>

          {/* Headline — small floor for mobile, original curve on desktop */}
          <h1
            className="m-0 mb-5 font-display font-medium tracking-[-0.035em]"
            style={{
              fontSize: "clamp(30px, 4vw, 72px)",
              lineHeight: 1.0,
            }}
          >
            <FadeInHeadline
              charStagger={0.026}
              baseDelay={0.3}
              lines={[
                { parts: [{ text: "Intelligent automation" }] },
                { parts: [{ text: "for businesses that" }] },
                { parts: [{ text: "scale on results.", className: "grad" }] },
              ]}
            />
          </h1>

          <p className="js-hero-stagger m-0 mb-7 max-w-[520px] text-[15px] leading-[1.6] text-ink-2 sm:text-[16px]">
            ZypherWorks is a business automation platform that removes the operational
            drag modern companies get stuck on — bookings, CRM, billing, workflows —
            so teams can grow without growing the overhead.
          </p>

          <div className="js-hero-stagger flex flex-wrap items-center gap-3">
            <ButtonPrimary>Explore the platform</ButtonPrimary>
            <ButtonGhost>
              <Icon name="play" size={12} />
              Watch the 90-sec tour
            </ButtonGhost>
          </div>

          <div className="js-hero-stagger mt-8 flex flex-wrap gap-8 border-t border-line pt-6 sm:gap-10 sm:pt-[22px]">
            {STATS.map((s) => (
              <div key={s.l}>
                <span className="block font-display text-[24px] font-medium tracking-[-0.02em] sm:text-[28px]">
                  {s.n}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3 sm:text-[11px]">
                  {s.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: 3-D scene — hidden on very small screens ── */}
        <div className="hidden sm:block">
          <HeroScene />
        </div>
      </Container>
    </section>
  );
};
