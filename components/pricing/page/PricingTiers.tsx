"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TIERS } from "./data";
import { TierCard3D } from "./TierCard3D";

export const PricingTiers = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-tier-row"), {
        y: 50, opacity: 0, rotateX: 6,
        duration: 0.9, ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="tiers"
      className="relative z-[1] pt-[clamp(60px,7vw,100px)] pb-[clamp(60px,8vw,120px)]"
    >
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <Kicker className="mb-4">{"// PICK YOUR STARTING SHAPE"}</Kicker>
            <h2
              className="m-0 max-w-[720px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.8vw, 56px)", lineHeight: 1.05 }}
            >
              Three tiers.
              <br />
              <span className="grad-soft">All upgradeable mid-month.</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-[14px] leading-[1.55] text-ink-2">
            Pick the tier that matches today&apos;s reality — not the one you want to be at next year.
            You can graduate at any month boundary with zero re-platforming.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-[clamp(16px,1.6vw,24px)] lg:grid-cols-3">
          {TIERS.map((t) => (
            <div key={t.id} className="js-tier-row">
              <TierCard3D tier={t} />
            </div>
          ))}
        </div>

        <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3">
          {"// All plans include typed SDK · warehouse sync · SOC 2 II · multi-region · unlimited operators on Scale and Custom"}
        </p>
      </Container>
    </section>
  );
};
