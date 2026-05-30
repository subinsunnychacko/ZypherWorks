"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap } from "@/lib/gsap";
import { GALLERY } from "./data";

export const CompanyGallery = () => {
  const ref = useRef<HTMLElement>(null);

  /* Single staggered fade-up — no per-item parallax messing with alignment */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-gal-item"), {
        opacity: 0, y: 32,
        duration: 0.8, ease: "power3.out",
        stagger: 0.06,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="culture"
      className="relative z-[1] pt-[clamp(40px,5vw,72px)] pb-[clamp(60px,8vw,120px)]"
    >
      <Container>
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-14 lg:flex-row lg:items-end">
          <div>
            <Kicker className="mb-4">{"// LIFE AT ZW"}</Kicker>
            <h2
              className="m-0 max-w-[640px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.5vw, 52px)", lineHeight: 1.05 }}
            >
              The unedited
              <br />
              <span className="grad-soft">camera roll.</span>
            </h2>
          </div>
          <div className="flex max-w-[400px] flex-col gap-3 lg:items-end lg:text-right">
            <p className="m-0 text-[14px] leading-[1.55] text-ink-2">
              Three offices, one annual offsite, lots of whiteboards. Remote by default, in-person
              every quarter — usually somewhere with good coffee.
            </p>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
              {String(GALLERY.length).padStart(2, "0")} frames · 2024 → 2026
            </div>
          </div>
        </div>

        {/* Editorial-grade uniform grid — same aspect, same spacing, captions below */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-9">
          {GALLERY.map((photo, i) => (
            <figure key={photo.src} className="js-gal-item group m-0">
              {/* Photo frame */}
              <div
                className="relative overflow-hidden rounded-[14px] border border-line transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:border-[oklch(0.85_0.16_145/_0.35)]"
                style={{
                  aspectRatio: "4 / 5",
                  background: "oklch(0.16 0.014 260)",
                  boxShadow: "0 18px 36px oklch(0 0 0 / 0.32), 0 1px 0 oklch(1 0 0 / 0.05) inset",
                }}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
                  style={{ filter: "saturate(0.95) contrast(1.02)" }}
                />

                {/* Permanent subtle bottom gradient — readability for the corner index */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                  style={{ background: "linear-gradient(180deg, transparent, oklch(0 0 0 / 0.55))" }}
                />

                {/* Numbered chip — bottom left, always visible */}
                <div
                  className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-2 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/90 backdrop-blur-md"
                >
                  Frame · {String(i + 1).padStart(2, "0")}
                </div>

                {/* "Open" icon — top right, fades in on hover */}
                <div
                  className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur-md transition-all duration-400 ease-out group-hover:opacity-100"
                  style={{ transform: "scale(0.85)" }}
                  aria-hidden
                >
                  <Icon name="arrowUp" size={12} stroke={2.2} />
                </div>

                {/* Hover accent glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    boxShadow: "0 0 40px oklch(0.85 0.16 145 / 0.22), 0 0 0 1px oklch(0.85 0.16 145 / 0.18) inset",
                  }}
                />
              </div>

              {/* Caption strip — always visible, editorial style */}
              <figcaption className="mt-3 flex items-start gap-2.5">
                <span
                  className="mt-[6px] inline-block flex-shrink-0 transition-all duration-300"
                  style={{
                    width: 18, height: 1,
                    background: "var(--accent)",
                    boxShadow: "0 0 6px var(--accent-glow)",
                  }}
                />
                <span className="font-mono text-[10.5px] uppercase leading-[1.5] tracking-[0.12em] text-ink-2 transition-colors duration-300 group-hover:text-ink">
                  {photo.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
            {"// SHOT BY THE TEAM · NO STOCK · NO STAGING"}
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent transition-colors duration-200 hover:text-ink"
          >
            See more on our newsroom
            <Icon name="arrow" size={11} stroke={2.4} />
          </a>
        </div>
      </Container>
    </section>
  );
};
