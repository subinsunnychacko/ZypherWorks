"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PRODUCTS } from "./data";

type Cap = { id: string; label: string; values: Record<string, "yes" | "soon" | "no" | string> };

/* Cross-product capability matrix */
const CAPS: Cap[] = [
  { id: "api",  label: "Typed REST + SDK", values: { "ease-fit": "yes", vega: "yes", forge: "yes", lume: "yes", nova: "yes", pulse: "soon" } },
  { id: "wh",   label: "Warehouse sync",   values: { "ease-fit": "yes", vega: "yes", forge: "yes", lume: "yes", nova: "yes", pulse: "no" } },
  { id: "auto", label: "Workflow triggers",values: { "ease-fit": "yes", vega: "yes", forge: "yes", lume: "soon", nova: "yes", pulse: "yes" } },
  { id: "ai",   label: "Per-tenant ML",    values: { "ease-fit": "yes", vega: "yes", forge: "no", lume: "yes", nova: "soon", pulse: "yes" } },
  { id: "soc",  label: "SOC 2 Type II",    values: { "ease-fit": "yes", vega: "yes", forge: "yes", lume: "soon", nova: "yes", pulse: "soon" } },
  { id: "rgn",  label: "Multi-region",     values: { "ease-fit": "yes", vega: "yes", forge: "yes", lume: "yes", nova: "yes", pulse: "soon" } },
];

const Cell = ({ v }: { v: "yes" | "soon" | "no" | string }) => {
  if (v === "yes") {
    return (
      <span
        className="grid h-[22px] w-[22px] place-items-center rounded-full"
        style={{ background: "oklch(0.78 0.17 155 / 0.16)", color: "oklch(0.78 0.17 155)" }}
      >
        <Icon name="shield" size={11} stroke={2.5} />
      </span>
    );
  }
  if (v === "soon") {
    return (
      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
        soon
      </span>
    );
  }
  if (v === "no") {
    return <span className="text-ink-3">—</span>;
  }
  return <span className="text-ink-2">{v}</span>;
};

export const ProductsMatrix = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-row"), {
        opacity: 0, x: -20,
        duration: 0.6, ease: "power3.out", stagger: 0.05,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="matrix" className="relative z-[1] py-[clamp(60px,8vw,120px)]">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
          <div>
            <Kicker className="mb-4">{"// CAPABILITY MATRIX"}</Kicker>
            <h2
              className="m-0 max-w-[640px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 50px)", lineHeight: 1.05 }}
            >
              The same platform under the hood.
            </h2>
          </div>
          <p className="max-w-[400px] text-[14px] leading-[1.55] text-ink-2">
            Each product inherits typed APIs, warehouse sync, ML primitives and SOC 2 controls from the
            shared platform — never re-implemented per product.
          </p>
        </div>

        <div className="overflow-x-auto rounded-[20px] border border-line"
          style={{ background: "linear-gradient(180deg, oklch(0.18 0.014 260 / 0.6), oklch(0.14 0.012 260 / 0.4))" }}>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="sticky left-0 z-[1] p-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3"
                  style={{ background: "oklch(0.18 0.014 260 / 0.6)", backdropFilter: "blur(8px)" }}>
                  Capability
                </th>
                {PRODUCTS.map((p) => (
                  <th key={p.id} className="min-w-[112px] p-4 text-left">
                    <div className="flex items-center gap-2">
                      <div
                        className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-[8px] font-display text-[12px] font-semibold text-white"
                        style={{ background: p.gradient }}
                      >
                        {p.letter}
                      </div>
                      <div>
                        <div className="font-display text-[13px] font-medium tracking-[-0.01em]">{p.name}</div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.1em]"
                          style={{ color: p.status === "live" ? p.accent : "var(--ink-3)" }}>
                          {p.statusLabel}
                        </div>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CAPS.map((cap) => (
                <tr key={cap.id} className="js-row border-b border-line transition-colors duration-200 hover:bg-[oklch(1_0_0_/_0.02)]">
                  <td className="sticky left-0 z-[1] p-4 text-[13px] font-medium text-ink"
                    style={{ background: "oklch(0.18 0.014 260 / 0.6)", backdropFilter: "blur(8px)" }}>
                    {cap.label}
                  </td>
                  {PRODUCTS.map((p) => (
                    <td key={p.id} className="p-4">
                      <Cell v={cap.values[p.id] ?? "no"} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-ink-3">
          {"// Every product gets the same base — only the operator surface differs."}
        </p>
      </Container>
    </section>
  );
};
