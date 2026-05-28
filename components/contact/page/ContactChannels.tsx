"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { CHANNELS, type Channel } from "./data";

const ChannelCard = ({ ch }: { ch: Channel }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const rafRef = useRef<number>(0);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--ry", `${x * 8}deg`);
      card.style.setProperty("--rx", `${-y * 7}deg`);
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
      <a
        ref={cardRef}
        href={ch.href}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative flex h-full flex-col overflow-hidden rounded-[20px] border border-line p-[clamp(20px,2vw,28px)]"
        style={{
          background: "linear-gradient(180deg, oklch(0.20 0.014 260 / 0.65), oklch(0.14 0.012 260 / 0.45))",
          boxShadow: "0 24px 50px oklch(0 0 0 / 0.3), 0 1px 0 oklch(1 0 0 / 0.05) inset",
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.35s cubic-bezier(.2,.7,.2,1)",
          ["--p-accent" as string]: ch.accent,
        } as React.CSSProperties}
      >
        {/* Top accent strip */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: ch.gradient }}
        />

        {/* Mouse-follow glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--p-accent) 22%, transparent), transparent 60%)",
          }}
        />

        {/* Header — icon + response time */}
        <div className="relative flex items-start justify-between" style={{ transform: "translateZ(28px)" }}>
          <div
            className="grid place-items-center text-white"
            style={{
              width: 46, height: 46, borderRadius: 13,
              background: ch.gradient,
              boxShadow: `0 0 0 1px oklch(1 0 0 / 0.08), 0 10px 22px color-mix(in oklch, ${ch.accent} 35%, transparent)`,
            }}
          >
            <Icon name={ch.ic} size={20} stroke={2} />
          </div>
          <div
            className="rounded-full px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.12em]"
            style={{
              color: ch.accent,
              background: `color-mix(in oklch, ${ch.accent} 14%, transparent)`,
              border: `1px solid color-mix(in oklch, ${ch.accent} 30%, transparent)`,
            }}
          >
            {ch.responseTime}
          </div>
        </div>

        {/* Label + value */}
        <div className="relative mt-5" style={{ transform: "translateZ(24px)" }}>
          <h3 className="m-0 font-display text-[17px] font-medium tracking-[-0.01em] leading-[1.2]">
            {ch.label}
          </h3>
          <div className="mt-1 font-mono text-[11px] tracking-[-0.005em]" style={{ color: ch.accent }}>
            {ch.value}
          </div>
        </div>

        {/* Description */}
        <p
          className="relative m-0 mt-4 flex-1 text-[12.5px] leading-[1.55] text-ink-2"
          style={{ transform: "translateZ(20px)" }}
        >
          {ch.description}
        </p>

        {/* Arrow indicator at bottom */}
        <div
          className="relative mt-5 inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] transition-all duration-300 group-hover:translate-x-1"
          style={{ color: ch.accent, transform: "translateZ(20px)" }}
        >
          {ch.id === "call" ? "Use the form" : "Open in mail"}
          <Icon name={ch.id === "call" ? "arrow" : "arrowUp"} size={11} stroke={2.4} />
        </div>

        {/* Edge sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            border: "1px solid color-mix(in oklch, var(--p-accent) 40%, transparent)",
            boxShadow: "0 0 50px color-mix(in oklch, var(--p-accent) 18%, transparent)",
          }}
        />
      </a>
    </div>
  );
};

export const ContactChannels = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-ch-row"), {
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
      id="channels"
      className="relative z-[1] pt-[clamp(40px,5vw,80px)] pb-[clamp(60px,8vw,120px)]"
    >
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
          <div>
            <Kicker className="mb-4">{"// OTHER WAYS IN"}</Kicker>
            <h2
              className="m-0 max-w-[640px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              Pick the channel
              <br />
              <span className="grad-soft">that fits your moment.</span>
            </h2>
          </div>
          <p className="max-w-[380px] text-[14px] leading-[1.55] text-ink-2">
            All four routes go to the same founding team. The form is fastest if you have a few
            things to say — direct email is best if you have one quick question.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(16px,1.6vw,22px)] sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((ch) => (
            <div key={ch.id} className="js-ch-row">
              <ChannelCard ch={ch} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
