"use client";

import { useEffect, useRef } from "react";
import { Icon } from "../ui/Icon";
import { ButtonPrimary, ButtonGhost } from "../ui/Buttons";
import { Container } from "../ui/Container";
import { gsap } from "@/lib/gsap";
import { FadeInHeadline } from "./FadeInHeadline";
import { HeroScene } from "./HeroScene";

const STATS = [
  { n: "3.2M+", l: "events / day" },
  { n: "99.99%", l: "platform uptime" },
  { n: "42 ms", l: "avg API latency" },
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
      className="relative z-[1] min-h-screen w-full"
    >
      <Container className="grid min-h-screen items-center gap-10 pt-[100px] pb-12 lg:grid-cols-2 lg:pt-[120px] lg:pb-[48px] lg:gap-[60px]">
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

          {/* Headline — font size capped so it never overflows its column */}
          <h1
            className="m-0 mb-5 font-display font-medium tracking-[-0.035em]"
            style={{
              fontSize: "clamp(40px, min(4vw, 72px), 76px)",
              lineHeight: 1.0,
              /* Let the browser wrap at word boundaries, never mid-word */
              overflowWrap: "break-word",
              wordBreak: "normal",
            }}
          >
            <FadeInHeadline
              charStagger={0.026}
              baseDelay={0.3}
              lines={[
                { parts: [{ text: "Intelligent software" }] },
                { parts: [{ text: "for businesses that" }] },
                { parts: [{ text: "scale on autopilot.", className: "grad" }] },
              ]}
            />
          </h1>

          <p className="js-hero-stagger m-0 mb-7 max-w-[520px] text-[15px] leading-[1.6] text-ink-2 sm:text-[16px]">
            ZypherWorks builds adaptive, AI-native platforms that automate the
            operational work modern businesses get stuck on — so teams can grow
            without growing the overhead.
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
