"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const METRICS = [
  { n: "2×+",   l: "avg ops throughput lift reported by clients at 90 days" },
  { n: "95 ms", l: "p95 API latency across all production tenants" },
  { n: "$1.2M", l: "in customer revenue flowing through our automation" },
  { n: "45+",   l: "operators running their business on a ZypherWorks product" },
];

export const Metrics = () => {
  const ref = useRef<HTMLElement>(null);

  /** Count-on-enter for numerals where the value is purely numeric. */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-metric"), {
        opacity: 0,
        y: 24,
        duration: 0.8,
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
      id="metrics"
      className="relative z-[1] px-[clamp(20px,5vw,96px)] pt-0 pb-16 lg:pb-[120px]"
      style={{
        background:
          "radial-gradient(80% 100% at 50% 130%, oklch(0.32 0.1 235 / 0.55), transparent 70%), linear-gradient(180deg, transparent 0%, oklch(0.18 0.04 250 / 0.25) 100%)",
      }}
    >
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <div
            key={m.l}
            className={
              "js-metric border-t border-line p-8 lg:p-[50px_30px] " +
              (i < METRICS.length - 1 ? "lg:border-r lg:border-line " : "") +
              (i % 2 === 0 ? "md:border-r md:border-line lg:border-r-0 " : "")
            }
          >
            <div
              className="font-display font-medium tracking-[-0.04em]"
              style={{
                fontSize: "clamp(48px, 5vw, 72px)",
                lineHeight: 1,
                background: "linear-gradient(180deg, var(--ink) 50%, var(--ink-3))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {m.n}
            </div>
            <div className="mt-3 max-w-[240px] text-[13px] leading-[1.45] text-ink-2">
              {m.l}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
