"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { PRODUCTS, type ProductStatus } from "./data";
import { ProductCard3D } from "./ProductCard3D";

type Filter = "all" | ProductStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all",  label: "All products" },
  { id: "live", label: "Live" },
  { id: "beta", label: "In beta" },
  { id: "soon", label: "Coming soon" },
];

export const ProductsShowcase = () => {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.status === filter)),
    [filter],
  );

  /* Scroll-triggered stagger on cards */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-card-row"), {
        y: 50, opacity: 0, rotateX: 8,
        duration: 0.9, ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, [visible]);

  return (
    <section
      ref={ref}
      id="showcase"
      className="relative z-[1] pt-[clamp(40px,4.5vw,72px)] pb-[clamp(60px,8vw,120px)]"
    >
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <Kicker className="mb-4">{"// THE FULL FAMILY"}</Kicker>
            <h2
              className="m-0 max-w-[640px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.8vw, 56px)", lineHeight: 1.05 }}
            >
              Built different,
              <br />
              <span className="grad-soft">composed the same.</span>
            </h2>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-[6px] rounded-full border border-line bg-[oklch(1_0_0_/_0.02)] p-1" role="tablist">
            {FILTERS.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f.id)}
                  className="rounded-full border-0 px-3.5 py-2 text-[12px] font-medium transition-all duration-200 sm:text-[12.5px]"
                  style={{
                    background: active ? "var(--ink)" : "transparent",
                    color: active ? "var(--bg)" : "var(--ink-2)",
                    boxShadow: active ? "0 4px 12px oklch(0 0 0 / 0.4)" : undefined,
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D tilt card grid */}
        <div className="grid grid-cols-1 gap-[clamp(16px,1.6vw,24px)] sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <div key={p.id} className="js-card-row">
              <ProductCard3D product={p} index={PRODUCTS.indexOf(p)} />
            </div>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="rounded-[20px] border border-line p-10 text-center font-mono text-[12.5px] uppercase tracking-[0.15em] text-ink-3">
            No products in this stage yet — check back soon.
          </div>
        )}
      </Container>
    </section>
  );
};
