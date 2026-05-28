"use client";

import { useRef } from "react";
import { Icon } from "../../ui/Icon";
import { ProductMini } from "./ProductMini";
import type { Product } from "./data";

type Props = { product: Product; index: number };

export const ProductCard3D = ({ product, index }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  /* Mouse-tracked 3D tilt — pure DOM writes, no React state */
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   /* −0.5 → 0.5 */
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      card.style.setProperty("--ry", `${x * 12}deg`);
      card.style.setProperty("--rx", `${-y * 10}deg`);
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      card.style.setProperty("--lift", "1");
    });
  };

  const handleLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    cancelAnimationFrame(rafRef.current);
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--lift", "0");
  };

  const CardInner = (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="js-pcard group relative h-full overflow-hidden rounded-[24px] border border-line p-[clamp(20px,2vw,28px)]"
      style={{
        background: "linear-gradient(180deg, oklch(0.20 0.014 260 / 0.7), oklch(0.14 0.012 260 / 0.5))",
        boxShadow: "0 30px 70px oklch(0 0 0 / 0.35), 0 1px 0 oklch(1 0 0 / 0.05) inset",
        transformStyle: "preserve-3d",
        transform: "perspective(1200px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translateZ(0)",
        transition: "transform 0.35s cubic-bezier(.2,.7,.2,1), border-color 0.3s",
        ["--p-accent" as string]: product.accent,
      } as React.CSSProperties}
    >
      {/* Mouse-follow glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklch, var(--p-accent) 28%, transparent), transparent 60%)",
        }}
      />

      {/* Top row: letter + status */}
      <div className="relative flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
        <div
          className="grid place-items-center font-display font-semibold text-white"
          style={{
            width: 46, height: 46, borderRadius: 14, fontSize: 22,
            background: product.gradient,
            boxShadow: `0 0 0 1px oklch(1 0 0 / 0.08), 0 12px 24px color-mix(in oklch, ${product.accent} 30%, transparent)`,
          }}
        >
          {product.letter}
        </div>
        <span
          className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em]"
          style={{
            color: product.status === "live" ? product.accent : "oklch(0.65 0.012 260)",
            background: product.status === "live"
              ? `color-mix(in oklch, ${product.accent} 14%, transparent)`
              : "oklch(1 0 0 / 0.05)",
            border: product.status === "live"
              ? `1px solid color-mix(in oklch, ${product.accent} 30%, transparent)`
              : "1px solid var(--line)",
          }}
        >
          {product.status === "live" && (
            <span
              className="mr-1.5 inline-block align-middle"
              style={{
                width: 5, height: 5, borderRadius: 99,
                background: product.accent, boxShadow: `0 0 8px ${product.accent}`,
              }}
            />
          )}
          {product.statusLabel}
        </span>
      </div>

      {/* Mini visual */}
      <div
        className="relative my-5 grid h-[120px] place-items-center overflow-hidden rounded-[14px] border border-line"
        style={{
          background: "oklch(1 0 0 / 0.025)",
          transform: "translateZ(30px)",
        }}
      >
        <ProductMini kind={product.preview} />
      </div>

      {/* Copy */}
      <div className="relative" style={{ transform: "translateZ(28px)" }}>
        <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="inline-block h-px w-3 bg-line" />
          <span>{product.category}</span>
        </div>
        <h3 className="m-0 mb-2 font-display text-[clamp(18px,1.6vw,22px)] font-medium tracking-[-0.02em] leading-[1.1]">
          {product.name}
        </h3>
        <p className="m-0 text-[clamp(12px,0.95vw,13.5px)] leading-[1.55] text-ink-2">
          {product.description}
        </p>
      </div>

      {/* Metrics */}
      <div
        className="relative mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4"
        style={{ transform: "translateZ(20px)" }}
      >
        {product.metrics.map((m) => (
          <div key={m.label}>
            <div className="font-display text-[14px] font-medium tracking-[-0.01em]" style={{ color: product.accent }}>
              {m.value}
            </div>
            <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-3">
              {m.label}
            </div>
          </div>
        ))}
      </div>

      {/* Footer link */}
      {product.href ? (
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors"
          style={{ color: product.accent, transform: "translateZ(20px)" }}
        >
          Visit live site
          <span className="grid h-[18px] w-[18px] place-items-center rounded-full" style={{ background: product.accent, color: "oklch(0.14 0.012 260)" }}>
            <Icon name="arrowUp" size={9} stroke={2.4} />
          </span>
        </a>
      ) : (
        <div
          className="relative mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-3"
          style={{ transform: "translateZ(20px)" }}
        >
          {product.status === "soon" ? "Notify me · launching soon" : "Request early access"}
          <Icon name="arrow" size={11} stroke={2} />
        </div>
      )}

      {/* Edge sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          border: "1px solid color-mix(in oklch, var(--p-accent) 40%, transparent)",
          boxShadow: "0 0 60px color-mix(in oklch, var(--p-accent) 18%, transparent)",
        }}
      />
    </div>
  );

  return (
    <div ref={wrapRef} className="js-pcard-wrap" style={{ perspective: "1200px" }}>
      {CardInner}
    </div>
  );
};
