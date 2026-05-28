"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PHASES } from "./data";
import { PhaseCard3D } from "./PhaseCard3D";

export const ProcessPhasesGrid = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-phase-row"), {
        y: 50, opacity: 0, rotateX: 8,
        duration: 0.9, ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="phases" className="relative z-[1] pt-[clamp(40px,4.5vw,72px)] pb-[clamp(60px,8vw,120px)]">
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <Kicker className="mb-4">{"// THE FOUR PHASES"}</Kicker>
            <h2
              className="m-0 max-w-[720px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.8vw, 56px)", lineHeight: 1.05 }}
            >
              Each phase has a sharp
              <br />
              <span className="grad-soft">brief, a deliverable, a clock.</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-[14px] leading-[1.55] text-ink-2">
            No open-ended discovery, no &ldquo;phase zero&rdquo; consultancy theatre. Each phase has a
            scoped output and a defined exit — so you always know what week you&apos;re shipping next.
          </p>
        </div>

        {/* 3D tilt card grid */}
        <div className="grid grid-cols-1 gap-[clamp(16px,1.6vw,24px)] sm:grid-cols-2">
          {PHASES.map((p) => (
            <div key={p.id} className="js-phase-row">
              <PhaseCard3D phase={p} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
