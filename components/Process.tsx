"use client";

import { useEffect, useRef } from "react";
import { Icon, type IconName } from "./ui/Icon";
import { Kicker } from "./ui/Kicker";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const STEPS: { n: string; t: string; d: string; ic: IconName }[] = [
  {
    n: "01 · DISCOVER",
    t: "Map the operation",
    d: "We embed alongside your team, mapping the workflows that actually run the business — the messy ones included.",
    ic: "search",
  },
  {
    n: "02 · COMPOSE",
    t: "Assemble the spine",
    d: "We compose a tailored stack from our platform blocks instead of starting from scratch.",
    ic: "cube",
  },
  {
    n: "03 · AUTOMATE",
    t: "Wire intelligence",
    d: "Adaptive automation gets layered onto the core: routing, scoring, predictions, comms.",
    ic: "bolt",
  },
  {
    n: "04 · OPERATE",
    t: "Run it with you",
    d: "We don't disappear at launch — your platform is a service, monitored and evolving.",
    ic: "refresh",
  },
];

export const Process = () => {
  const ref = useRef<HTMLElement>(null);

  /** Vertical divider rises and steps stagger in. */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-step"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="process"
      className="relative z-[1] px-[clamp(20px,5vw,96px)] pt-16 pb-16 lg:pt-20 lg:pb-[120px]"
    >
      <div className="reveal mb-10 flex flex-col items-start justify-between gap-8 sm:mb-14 lg:flex-row lg:items-end lg:gap-[60px]">
        <div>
          <Kicker className="mb-[18px]">{"// HOW WE BUILD"}</Kicker>
          <h2
            className="m-0 max-w-[720px] font-display font-medium tracking-[-0.03em]"
            style={{ fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.05 }}
          >
            A short, opinionated path from problem to platform.
          </h2>
        </div>
        <p className="max-w-[380px] text-[14px] leading-[1.55] text-ink-2 sm:text-[15px]">
          We&apos;ve shaped our process so the time between &ldquo;we have a
          problem&rdquo; and &ldquo;the platform is shipping value&rdquo; is measured in
          weeks, not quarters.
        </p>
      </div>

      <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className={
              "js-step relative flex min-h-[220px] flex-col justify-between border-b border-line p-6 sm:min-h-[260px] lg:min-h-[280px] lg:border-b-0 lg:p-[36px_26px] " +
              (i < STEPS.length - 1 ? "lg:border-r lg:border-line " : "") +
              (i % 2 === 0 ? "sm:border-r sm:border-line lg:border-r-0 " : "")
            }
          >
            <div>
              <div className="font-mono text-[11px] tracking-[0.1em] text-accent">
                {s.n}
              </div>
              <h3 className="m-0 mb-[14px] mt-4 font-display text-[24px] font-medium tracking-[-0.02em] leading-[1.1]">
                {s.t}
              </h3>
              <p className="m-0 text-[13.5px] leading-[1.55] text-ink-2">{s.d}</p>
            </div>
            <div className="mt-[18px] text-accent">
              <Icon name={s.ic} size={20} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
