"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PROCESS_STEPS } from "./data";

export const ContactProcess = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-cp-step"), {
        opacity: 0, y: 30,
        duration: 0.8, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
      /* Animated connecting line draws as the section enters view */
      gsap.fromTo(".js-cp-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: { trigger: root, start: "top 75%" },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="what-happens"
      className="relative z-[1] mx-[clamp(8px,2vw,40px)] my-0 overflow-hidden"
      style={{
        borderRadius: "clamp(20px, 3vw, 40px)",
        background:
          "radial-gradient(120% 100% at 50% 0%, oklch(0.20 0.018 260), oklch(0.13 0.012 260) 70%)",
        boxShadow: "0 40px 100px oklch(0 0 0 / 0.45), 0 1px 0 oklch(1 0 0 / 0.05) inset",
      }}
    >
      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)",
        }}
      />
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(900px, 80%)",
          height: 480,
          background: "radial-gradient(ellipse at center, oklch(0.85 0.16 145 / 0.16), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <Container className="relative z-[1] py-[clamp(60px,8vw,110px)]">
        {/* Header */}
        <div className="mb-14 text-center lg:mb-20">
          <Kicker className="mx-auto mb-5 w-fit">{"// WHAT HAPPENS NEXT"}</Kicker>
          <h2
            className="m-0 mx-auto max-w-[820px] font-display font-medium tracking-[-0.03em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 54px)", lineHeight: 1.05 }}
          >
            From inbox to first ship.
            <br />
            <span className="grad">Roughly two weeks.</span>
          </h2>
          <p className="mx-auto mt-7 max-w-[560px] text-[15px] leading-[1.6] text-ink-2 sm:text-[16px]">
            Most product pages stop at &ldquo;contact us&rdquo;. Here&apos;s the actual sequence — so
            you know what to expect after you click send.
          </p>
        </div>

        {/* Timeline: 4 steps */}
        <div className="relative">
          {/* Horizontal connecting line — desktop only */}
          <div
            className="js-cp-line absolute left-0 right-0 top-[28px] hidden h-px origin-left lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent 4%, oklch(0.85 0.16 145 / 0.5) 18%, oklch(0.78 0.17 220 / 0.5) 60%, oklch(0.85 0.16 70 / 0.5) 96%, transparent)",
            }}
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.number} className="js-cp-step relative flex flex-col">
                {/* Number node */}
                <div className="relative mb-5 flex items-center">
                  <div
                    className="grid place-items-center font-display text-[14px] font-medium tracking-[-0.01em] text-white"
                    style={{
                      width: 56, height: 56, borderRadius: 18,
                      background: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
                      boxShadow:
                        "0 0 0 4px oklch(0.13 0.012 260), 0 0 0 5px oklch(0.85 0.16 145 / 0.3), 0 12px 24px oklch(0.65 0.18 145 / 0.4)",
                    }}
                  >
                    {step.number}
                  </div>
                </div>

                {/* Icon + meta strip */}
                <div className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "oklch(0.85 0.16 145)" }}>
                  <Icon name={step.ic} size={12} stroke={2.2} />
                  {step.meta}
                </div>

                {/* Title */}
                <h3 className="m-0 mb-3 font-display text-[clamp(17px,1.5vw,21px)] font-medium tracking-[-0.015em] leading-[1.2]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="m-0 text-[13px] leading-[1.55] text-ink-2" dangerouslySetInnerHTML={{ __html: step.description }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-16 flex flex-col items-start justify-between gap-5 rounded-[20px] border p-[clamp(20px,2.2vw,32px)] sm:flex-row sm:items-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.85 0.16 145 / 0.1), oklch(0.78 0.17 220 / 0.05))",
            borderColor: "color-mix(in oklch, oklch(0.85 0.16 145) 30%, transparent)",
          }}
        >
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: "oklch(0.85 0.16 145)" }}>
              We don&apos;t ghost
            </div>
            <h3 className="m-0 mt-1 font-display text-[clamp(18px,1.7vw,22px)] font-medium tracking-[-0.015em]">
              If we can&apos;t help, we&apos;ll say so —{" "}
              <span className="text-ink-2">and usually point you to someone who can.</span>
            </h3>
          </div>
          <a
            href="#form"
            className="inline-flex shrink-0 items-center gap-[10px] rounded-full px-5 py-3 text-[14px] font-medium text-white transition-transform duration-200 hover:-translate-y-[1px]"
            style={{
              background: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
              boxShadow: "0 10px 26px oklch(0.65 0.18 145 / 0.35)",
            }}
          >
            Send a message
            <span className="grid h-[20px] w-[20px] place-items-center rounded-full" style={{ background: "oklch(1 0 0 / 0.2)" }}>
              <Icon name="arrow" size={10} stroke={2.4} />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
};
