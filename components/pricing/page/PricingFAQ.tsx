"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PRICING_FAQ } from "./data";

export const PricingFAQ = () => {
  const ref = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-faq-row"), {
        opacity: 0, y: 18,
        duration: 0.6, ease: "power3.out", stagger: 0.05,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="faq" className="relative z-[1] pt-[clamp(40px,5vw,72px)] pb-[clamp(60px,8vw,120px)]">
      <Container>
        <div className="mb-12 grid grid-cols-1 gap-8 lg:mb-14 lg:grid-cols-[0.55fr_0.45fr] lg:gap-16">
          <div>
            <Kicker className="mb-4">{"// QUESTIONS"}</Kicker>
            <h2
              className="m-0 font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 50px)", lineHeight: 1.05 }}
            >
              The honest pricing FAQ —
              <br />
              <span className="grad-soft">no asterisks.</span>
            </h2>
          </div>
          <p className="self-end max-w-[420px] text-[14px] leading-[1.55] text-ink-2">
            If something below isn&apos;t clear, ping us directly — we&apos;d rather answer the awkward
            question now than have it surface mid-implementation.
          </p>
        </div>

        <div className="mx-auto max-w-[920px] overflow-hidden rounded-[20px] border border-line"
          style={{ background: "linear-gradient(180deg, oklch(0.18 0.014 260 / 0.5), oklch(0.14 0.012 260 / 0.4))" }}>
          {PRICING_FAQ.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={item.q} className={"js-faq-row border-line " + (i !== PRICING_FAQ.length - 1 ? "border-b" : "")}>
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="group flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-[oklch(1_0_0_/_0.02)] sm:p-6"
                >
                  <span className="font-display text-[14.5px] font-medium tracking-[-0.005em] sm:text-[16px]">
                    {item.q}
                  </span>
                  <span
                    className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-line text-accent transition-all duration-300"
                    style={{
                      background: open ? "color-mix(in oklch, var(--accent) 18%, transparent)" : "oklch(1 0 0 / 0.03)",
                      transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                      <path d="M6 1.5v9M1.5 6h9" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="m-0 px-5 pb-6 text-[13.5px] leading-[1.65] text-ink-2 sm:px-6 sm:text-[14.5px]">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
