"use client";

import { useEffect, useRef } from "react";
import { ButtonGhost, ButtonPrimary } from "../../ui/Buttons";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const PricingPageCTA = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-pcta"), {
        opacity: 0, y: 24,
        duration: 0.9, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative mx-[clamp(8px,2vw,40px)] my-6 overflow-hidden rounded-[clamp(20px,3vw,40px)] border border-line-strong px-[clamp(24px,5vw,60px)] py-[clamp(60px,8vw,100px)] text-center"
      style={{
        background:
          "radial-gradient(80% 100% at 50% 0%, oklch(0.32 0.1 235), oklch(0.16 0.02 250) 70%)",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px"
        style={{ background: "radial-gradient(circle at 50% -20%, var(--accent-glow), transparent 50%)" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "center",
          WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent 70%)",
          maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent 70%)",
        }}
      />

      <div className="js-pcta relative mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] pl-2 font-mono text-[11px] tracking-[0.04em] text-ink-2">
        <span
          className="pulse-dot relative inline-block flex-shrink-0"
          style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent-2)", boxShadow: "0 0 10px var(--accent-2)" }}
        />
        WE GET BACK TO EVERY QUOTE REQUEST IN UNDER 48 HOURS
      </div>

      <h2
        className="js-pcta relative m-0 font-display font-medium tracking-[-0.035em]"
        style={{ fontSize: "clamp(32px, 4vw, 68px)", lineHeight: 1.05 }}
      >
        Let&apos;s shape your platform.
        <br />
        <em className="serif-italic" style={{ color: "var(--accent-2)" }}>
          On a call, not in a deck.
        </em>
      </h2>
      <p className="js-pcta relative mx-auto mb-9 mt-[26px] max-w-[580px] text-[16px] leading-[1.55] text-ink-2 sm:text-[17px]">
        Tell us about the operational work slowing your team down. You&apos;ll get a custom quote
        within 48 hours, plus the same operating-cost model we used in the calculator above —
        applied to your numbers.
      </p>
      <div className="js-pcta relative flex flex-wrap justify-center gap-3">
        <ButtonPrimary>Get a custom quote</ButtonPrimary>
        <ButtonGhost>Book founders call</ButtonGhost>
      </div>
    </section>
  );
};
