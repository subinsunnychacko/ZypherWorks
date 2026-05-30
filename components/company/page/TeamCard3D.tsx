"use client";

import { useRef } from "react";
import Image from "next/image";
import { Icon } from "../../ui/Icon";
import type { TeamMember } from "./data";

type Props = { member: TeamMember };

export const TeamCard3D = ({ member }: Props) => {
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
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative h-full overflow-hidden rounded-[20px] border border-line"
        style={{
          background: "linear-gradient(180deg, oklch(0.20 0.014 260 / 0.65), oklch(0.14 0.012 260 / 0.45))",
          boxShadow: "0 30px 60px oklch(0 0 0 / 0.35), 0 1px 0 oklch(1 0 0 / 0.05) inset",
          transformStyle: "preserve-3d",
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transition: "transform 0.35s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        {/* Photo with overlay gradient */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5", transform: "translateZ(20px)" }}>
          <Image
            src={member.image}
            alt={`${member.name} — ${member.role} at ZypherWorks`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            style={{ filter: "saturate(0.95) contrast(1.02)" }}
          />
          {/* Bottom gradient for legibility */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 45%, oklch(0.13 0.012 260 / 0.85) 80%, oklch(0.13 0.012 260) 100%)",
            }}
          />
          {/* Location tag top */}
          <div
            className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white"
            style={{ background: "oklch(0 0 0 / 0.5)", backdropFilter: "blur(6px)", transform: "translateZ(30px)" }}
          >
            <span
              className="inline-block"
              style={{ width: 5, height: 5, borderRadius: 99, background: "oklch(0.85 0.16 145)", boxShadow: "0 0 6px oklch(0.85 0.16 145)" }}
            />
            {member.location}
          </div>

          {/* Mouse-follow glow on photo */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), oklch(0.85 0.16 145 / 0.25), transparent 60%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Name + role overlaid on bottom */}
          <div className="absolute bottom-4 left-5 right-5" style={{ transform: "translateZ(36px)" }}>
            <div className="font-display text-[17px] font-medium tracking-[-0.01em] text-white">
              {member.name}
            </div>
            <div className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.12em]" style={{ color: "oklch(0.85 0.16 145)" }}>
              {member.role}
            </div>
          </div>
        </div>

        {/* Bio reveals on hover */}
        <div
          className="overflow-hidden border-t border-line transition-[max-height,padding] duration-500 ease-out"
          style={{ maxHeight: 0, transform: "translateZ(15px)" }}
          aria-hidden
        >
          <p className="m-0 px-5 py-4 text-[12.5px] leading-[1.55] text-ink-2">{member.bio}</p>
        </div>

        {/* Persistent bio that fades in on hover (works without needing max-height tricks) */}
        <div className="border-t border-line px-5 py-4 transition-colors duration-300">
          <p className="m-0 text-[12.5px] leading-[1.55] text-ink-2">{member.bio}</p>
          <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: "oklch(0.85 0.16 145)" }}>
            View profile
            <Icon name="arrow" size={10} stroke={2.4} />
          </div>
        </div>

        {/* Edge sheen on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            border: "1px solid oklch(0.85 0.16 145 / 0.4)",
            boxShadow: "0 0 60px oklch(0.85 0.16 145 / 0.18)",
          }}
        />
      </div>
    </div>
  );
};
