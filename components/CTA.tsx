"use client";

import { useEffect, useRef } from "react";
import { ButtonGhost, ButtonPrimary } from "./ui/Buttons";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const CTA = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-cta"), {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
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
        style={{
          background:
            "radial-gradient(circle at 50% -20%, var(--accent-glow), transparent 50%)",
        }}
      />
      {/* Grid background */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          backgroundPosition: "center",
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse 60% 80% at 50% 50%, black, transparent 70%)",
        }}
      />

      <h2
        className="js-cta relative m-0 font-display font-medium tracking-[-0.035em]"
        style={{ fontSize: "clamp(32px, 4vw, 68px)", lineHeight: 1.05 }}
      >
        Software is the leverage.
        <br />
        <em
          className="serif-italic"
          style={{ color: "var(--accent-2)" }}
        >
          We build the leverage.
        </em>
      </h2>
      <p className="js-cta relative mx-auto mb-9 mt-[26px] max-w-[540px] text-[17px] leading-[1.55] text-ink-2">
        Tell us about the operational work slowing your team down. We&apos;ll come back
        with a 2-week shape of what the platform looks like.
      </p>
      <div className="js-cta relative flex flex-wrap justify-center gap-3">
        <ButtonPrimary>Start a project</ButtonPrimary>
        <ButtonGhost>See product pricing</ButtonGhost>
      </div>
    </section>
  );
};
