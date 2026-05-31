"use client";

import { useEffect, useRef } from "react";
import { Icon } from "../../ui/Icon";
import { gsap } from "@/lib/gsap";

const MODULES = [
  { label: "Bookings engine", note: "core" },
  { label: "Member CRM", note: "core" },
  { label: "Automation runtime", note: "add-on" },
];

const Check = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M2.5 6.5L5 9l4.5-5" />
  </svg>
);

export const PricingHeroScene = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
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
      card.style.setProperty("--ry", `${x * 10}deg`);
      card.style.setProperty("--rx", `${-y * 8}deg`);
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

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const ctx = gsap.context(() => {
      gsap.from(scene, { autoAlpha: 0, y: 24, duration: 0.9, ease: "power3.out" });
      gsap.to(".js-qp-float", {
        y: "+=10",
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, scene);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative mx-auto flex h-[clamp(440px,42vw,560px)] w-full max-w-[460px] items-center justify-center pt-8"
      style={{ perspective: "1500px" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(48% 48% at 50% 45%, oklch(0.45 0.14 235 / 0.25), transparent 72%)",
          filter: "blur(24px)",
        }}
      />

      {/* Ghost card behind — adds depth */}
      <div
        aria-hidden
        className="absolute h-[78%] w-[84%] rounded-[24px] border"
        style={{
          borderColor: "oklch(1 0 0 / 0.06)",
          background: "oklch(0.18 0.02 260 / 0.4)",
          transform: "translate(7%, 9%) rotate(5deg)",
        }}
      />

      <div className="js-qp-float relative w-full">
        <div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="group relative overflow-hidden rounded-[24px] border preserve-3d"
          style={{
            borderColor: "oklch(1 0 0 / 0.14)",
            background: "linear-gradient(165deg, oklch(0.21 0.025 258 / 0.96), oklch(0.15 0.016 260 / 0.94))",
            boxShadow: "0 50px 100px oklch(0 0 0 / 0.55), inset 0 1px 0 oklch(1 0 0 / 0.1)",
            backdropFilter: "blur(8px)",
            transform: "rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
            transition: "transform .5s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          {/* Cursor glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: "radial-gradient(300px circle at var(--mx) var(--my), oklch(0.78 0.17 220 / 0.12), transparent 65%)",
            }}
          />
          {/* Top sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.3), transparent)" }}
          />

          <div className="relative p-6 sm:p-7">
            {/* Header */}
            <div className="flex items-center justify-between" style={{ transform: "translateZ(40px)" }}>
              <div className="flex items-center gap-2.5">
                <span
                  className="grid h-9 w-9 place-items-center rounded-[11px]"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                    boxShadow: "0 8px 20px var(--accent-glow)",
                  }}
                >
                  <Icon name="spark" size={17} />
                </span>
                <div>
                  <div className="font-display text-[14px] font-medium tracking-[-0.01em] text-ink">
                    Your scoped quote
                  </div>
                  <div className="font-mono text-[10.5px] text-ink-3">ZypherWorks · estimate</div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.1em] text-ink-2">
                <span className="h-[6px] w-[6px] rounded-full" style={{ background: "var(--accent-2)", boxShadow: "0 0 8px var(--accent-2)" }} />
                Live
              </span>
            </div>

            {/* Fee */}
            <div
              className="mt-6 rounded-[16px] border p-5"
              style={{
                transform: "translateZ(30px)",
                borderColor: "oklch(1 0 0 / 0.08)",
                background: "linear-gradient(135deg, oklch(0.78 0.17 220 / 0.1), transparent)",
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                Platform fee
              </div>
              <div className="mt-1 flex items-end justify-between">
                <div
                  className="font-display text-[46px] font-medium leading-none tracking-[-0.04em]"
                  style={{
                    background: "linear-gradient(135deg, var(--ink), var(--accent-2))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Custom
                </div>
                <div className="mb-1 font-mono text-[10.5px] text-ink-3">scoped to you</div>
              </div>
            </div>

            {/* Modules */}
            <div className="mt-5" style={{ transform: "translateZ(20px)" }}>
              <div className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                Included modules
              </div>
              <div className="flex flex-col gap-2">
                {MODULES.map((m) => (
                  <div
                    key={m.label}
                    className="flex items-center justify-between rounded-[11px] border px-3 py-2.5"
                    style={{ borderColor: "oklch(1 0 0 / 0.06)", background: "oklch(1 0 0 / 0.02)" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="grid h-5 w-5 place-items-center rounded-full"
                        style={{ background: "oklch(0.78 0.17 220 / 0.16)", color: "var(--accent)" }}
                      >
                        <Check />
                      </span>
                      <span className="text-[13px] text-ink">{m.label}</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-3">
                      {m.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              className="mt-5 flex items-center justify-between border-t border-line pt-4"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full border-2 font-display text-[10px] font-semibold text-white"
                    style={{ borderColor: "oklch(0.16 0.016 260)", background: "linear-gradient(135deg, oklch(0.72 0.18 25), oklch(0.6 0.2 350))" }}
                  >
                    A
                  </span>
                  <span
                    className="grid h-7 w-7 place-items-center rounded-full border-2 font-display text-[10px] font-semibold text-white"
                    style={{ borderColor: "oklch(0.16 0.016 260)", background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}
                  >
                    D
                  </span>
                </div>
                <span className="font-mono text-[10.5px] text-ink-3">built by 2 founders</span>
              </div>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-accent">
                ~2 day turnaround
                <Icon name="arrow" size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
