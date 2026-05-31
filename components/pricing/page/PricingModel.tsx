"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "../../ui/Icon";
import { gsap } from "@/lib/gsap";
import { PRINCIPLES, type Principle } from "./data";

const PrincipleCard = ({ p }: { p: Principle }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  const handleMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--ry", `${x * 12}deg`);
      card.style.setProperty("--rx", `${-y * 10}deg`);
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  };

  return (
    <div className="js-pm-card" style={{ perspective: "1100px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full overflow-hidden rounded-[24px] border p-7 lg:p-8"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
          transition: "transform .4s cubic-bezier(.2,.7,.2,1)",
          borderColor: "oklch(1 0 0 / 0.1)",
          background: "linear-gradient(165deg, oklch(0.2 0.02 260 / 0.7), oklch(0.15 0.015 260 / 0.6))",
          boxShadow: "0 30px 70px oklch(0 0 0 / 0.35)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(220px 220px at var(--mx) var(--my), oklch(0.78 0.17 220 / 0.14), transparent 70%)",
          }}
        />

        <div
          className="mb-6 grid h-14 w-14 place-items-center rounded-[16px]"
          style={{
            transform: "translateZ(50px)",
            background: p.gradient,
            boxShadow: `0 14px 30px ${p.accent.replace(")", " / 0.35)")}`,
          }}
        >
          <Icon name={p.ic} size={24} />
        </div>

        <div style={{ transform: "translateZ(30px)" }}>
          <div className="font-mono text-[12px] tracking-[0.12em]" style={{ color: p.accent }}>
            {p.step}
          </div>
          <h3 className="mt-2 font-display text-[21px] font-medium leading-[1.15] tracking-[-0.02em]">
            {p.title}
          </h3>
          <p className="mt-3 text-[14.5px] leading-[1.55] text-ink-2">{p.description}</p>
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: p.gradient }}
        />
      </div>
    </div>
  );
};

export const PricingModel = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-pm-head"), {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 78%" },
      });
      gsap.from(root.querySelectorAll<HTMLElement>(".js-pm-card"), {
        y: 44,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root, start: "top 72%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="how-pricing-works"
      className="relative z-[1] scroll-mt-24 px-[clamp(20px,5vw,96px)] py-[clamp(40px,6vw,90px)]"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 text-center">
          <div className="js-pm-head mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] font-mono text-[11.5px] tracking-[0.02em] text-ink-2">
            <Icon name="layers" size={13} />
            How pricing works
          </div>
          <h2
            className="js-pm-head m-0 font-display font-medium tracking-[-0.03em]"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            Simple by design.
          </h2>
          <p className="js-pm-head mx-auto mt-4 max-w-[540px] text-[15px] leading-[1.6] text-ink-2">
            No tiers to decode, no feature gates to compare. Three principles — then a
            number scoped to exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {PRINCIPLES.map((p) => (
            <PrincipleCard key={p.step} p={p} />
          ))}
        </div>

        <div className="js-pm-head mt-12 text-center">
          <p className="mx-auto mb-5 max-w-[460px] text-[15px] leading-[1.6] text-ink-2">
            Every engagement is scoped to your operation — so pricing is too.
          </p>
          <Link href="/contact">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.03)] px-6 py-3 font-medium text-ink transition-colors duration-200 hover:border-[var(--line-strong)]">
              Contact founders for a tailored quote
              <Icon name="arrow" size={15} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
