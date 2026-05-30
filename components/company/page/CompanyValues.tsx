"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { VALUES } from "./data";

const ValueCard = ({ value, index }: { value: typeof VALUES[number]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--ry", `${x * 7}deg`);
      card.style.setProperty("--rx", `${-y * 6}deg`);
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    cancelAnimationFrame(rafRef.current);
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  };

  return (
    <div style={{ perspective: "1200px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full overflow-hidden rounded-[20px] border border-line p-[clamp(20px,2vw,28px)]"
        style={{
          background: "linear-gradient(180deg, oklch(0.20 0.014 260 / 0.65), oklch(0.14 0.012 260 / 0.45))",
          boxShadow: "0 24px 50px oklch(0 0 0 / 0.3), 0 1px 0 oklch(1 0 0 / 0.05) inset",
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.35s cubic-bezier(.2,.7,.2,1)",
          ["--p-accent" as string]: value.accent,
        } as React.CSSProperties}
      >
        {/* Mouse-follow glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--p-accent) 22%, transparent), transparent 60%)",
          }}
        />

        {/* Number + Icon */}
        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(30px)" }}>
          <div
            className="grid place-items-center"
            style={{
              width: 48, height: 48, borderRadius: 14,
              background: `color-mix(in oklch, ${value.accent} 16%, transparent)`,
              border: `1px solid color-mix(in oklch, ${value.accent} 30%, transparent)`,
              color: value.accent,
            }}
          >
            <Icon name={value.ic} size={22} stroke={2} />
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        {/* Title + body */}
        <h3
          className="relative m-0 mt-5 font-display text-[clamp(18px,1.6vw,22px)] font-medium tracking-[-0.02em] leading-[1.15]"
          style={{ transform: "translateZ(20px)" }}
        >
          {value.title}
        </h3>
        <p
          className="relative m-0 mt-2.5 text-[13.5px] leading-[1.55] text-ink-2"
          style={{ transform: "translateZ(18px)" }}
        >
          {value.description}
        </p>
        {value.externalLink && (
          <a
            href={value.externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-3 inline-flex items-center gap-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-3 transition-colors duration-200 hover:text-accent"
            style={{ transform: "translateZ(18px)" }}
          >
            {value.externalLink.label}
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M2 8L8 2M4 2h4v4" />
            </svg>
          </a>
        )}

        {/* Edge sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            border: "1px solid color-mix(in oklch, var(--p-accent) 40%, transparent)",
            boxShadow: "0 0 50px color-mix(in oklch, var(--p-accent) 18%, transparent)",
          }}
        />
      </div>
    </div>
  );
};

export const CompanyValues = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-value-row"), {
        y: 40, opacity: 0, rotateX: 6,
        duration: 0.85, ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="values"
      className="relative z-[1] pt-[clamp(40px,5vw,72px)] pb-[clamp(60px,8vw,120px)]"
    >
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <Kicker className="mb-4">{"// HOW WE OPERATE"}</Kicker>
            <h2
              className="m-0 max-w-[640px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Six principles
              <br />
              <span className="grad-soft">we actually live by.</span>
            </h2>
          </div>
          <p className="max-w-[400px] text-[14px] leading-[1.55] text-ink-2">
            Not posters on a wall. These are the rules we apply when there&apos;s tension between
            shipping fast and shipping right, between scope and integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(16px,1.6vw,22px)] sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <div key={v.title} className="js-value-row">
              <ValueCard value={v} index={i} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
