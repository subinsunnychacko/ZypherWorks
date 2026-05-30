"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { gsap } from "@/lib/gsap";
import { COMPANY_STATS, HERO_PHOTOS } from "./data";

export const CompanyPageHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  /* Mouse-tracked parallax across the layered photo scene */
  useEffect(() => {
    const root = heroRef.current;
    const scene = sceneRef.current;
    if (!root || !scene) return;

    const ctx = gsap.context(() => {
      gsap.from(".js-co-stagger", {
        y: 22, opacity: 0, duration: 0.95, ease: "power3.out",
        stagger: 0.08, delay: 0.25,
      });
      gsap.from(".js-co-photo", {
        scale: 0.9, opacity: 0, y: 30,
        duration: 1.1, ease: "power3.out",
        stagger: 0.12, delay: 0.55,
      });
    }, root);

    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        scene.style.setProperty("--scene-ry", `${x * 8}deg`);
        scene.style.setProperty("--scene-rx", `${-y * 6}deg`);
        scene.style.setProperty("--scene-tx", `${x * -10}px`);
        scene.style.setProperty("--scene-ty", `${y * -10}px`);
      });
    };
    const onLeave = () => {
      scene.style.setProperty("--scene-ry", "0deg");
      scene.style.setProperty("--scene-rx", "0deg");
      scene.style.setProperty("--scene-tx", "0px");
      scene.style.setProperty("--scene-ty", "0px");
    };
    scene.addEventListener("mousemove", onMove);
    scene.addEventListener("mouseleave", onLeave);
    return () => {
      ctx.revert();
      scene.removeEventListener("mousemove", onMove);
      scene.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative z-[1] overflow-hidden pt-[120px] pb-[60px] lg:pt-[150px] lg:pb-[100px]"
    >
      {/* Atmospheric grid */}
      <div className="zwp-grid pointer-events-none absolute inset-0 z-[0]" aria-hidden />

      {/* Off-center accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-[0]"
        style={{
          width: "min(1000px, 80vw)",
          height: 600,
          transform: "translate(-30%, -50%)",
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.17 220 / 0.16), oklch(0.85 0.16 145 / 0.08) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <Container className="relative z-[1]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {/* LEFT — copy */}
          <div>
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Company" }]} />
            <div className="js-co-stagger mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] pl-2 font-mono text-[11px] tracking-[0.04em] text-ink-2">
              <span
                className="pulse-dot relative inline-block flex-shrink-0"
                style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
              />
              REMOTE-FIRST · 4 TIMEZONES · OPERATOR-LED
            </div>

            <Kicker className="js-co-stagger mb-6 w-fit">{"// WHO WE ARE"}</Kicker>

            <h1
              className="js-co-stagger m-0 font-display font-medium tracking-[-0.04em]"
              style={{ fontSize: "clamp(38px, 5.4vw, 88px)", lineHeight: 0.98 }}
            >
              We build automation platforms
              <br />
              <span className="grad">for the operators running them.</span>
            </h1>

            <p className="js-co-stagger mt-7 max-w-[560px] text-[16px] leading-[1.65] text-ink-2 sm:text-[17px]">
              Sixteen people across four timezones — engineers, designers, and former
              operators — building the business automation software that 380+ companies run on every day.
            </p>

            <div className="js-co-stagger mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#team"
                className="inline-flex items-center gap-[10px] rounded-full border-0 bg-ink px-5 py-3 text-[14px] font-medium text-bg transition-transform duration-200 hover:-translate-y-[1px]"
                style={{ boxShadow: "0 10px 30px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(1 0 0 / 0.1)" }}
              >
                Meet the team
                <span
                  className="grid h-[20px] w-[20px] place-items-center rounded-full"
                  style={{ background: "var(--accent)", color: "var(--bg)", boxShadow: "0 0 10px var(--accent-glow)" }}
                >
                  <Icon name="arrow" size={10} stroke={2.4} />
                </span>
              </a>
              <a
                href="#story"
                className="inline-flex items-center gap-[10px] rounded-full border border-line-strong bg-[oklch(1_0_0_/_0.02)] px-5 py-3 text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-[oklch(1_0_0_/_0.06)]"
              >
                <Icon name="play" size={11} />
                Read our story
              </a>
            </div>

            {/* Stats */}
            <div className="js-co-stagger mt-12 grid grid-cols-2 gap-6 border-t border-line pt-7 sm:grid-cols-4">
              {COMPANY_STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[22px] font-medium tracking-[-0.02em] sm:text-[24px]">{s.value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — layered 3D photo composition */}
          <div
            ref={sceneRef}
            className="relative mx-auto h-[560px] w-full max-w-[560px]"
            style={{ perspective: 1600 }}
          >
            <div
              className="absolute inset-0"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  "rotateX(var(--scene-rx, 0deg)) rotateY(var(--scene-ry, 0deg)) translate(var(--scene-tx, 0), var(--scene-ty, 0))",
                transition: "transform 0.7s cubic-bezier(.2,.7,.2,1)",
              }}
            >
              {/* Photo 1 — large back-center, team */}
              <div
                className="js-co-photo absolute left-[8%] top-[2%] overflow-hidden rounded-[18px] border border-line"
                style={{
                  width: "68%",
                  aspectRatio: "4/5",
                  transform: "translateZ(-60px) rotateY(-4deg)",
                  boxShadow: "0 30px 60px oklch(0 0 0 / 0.45), 0 0 0 1px oklch(1 0 0 / 0.06) inset",
                  animation: "coFloatA 8s ease-in-out infinite alternate",
                }}
              >
                <Image
                  src={HERO_PHOTOS[0]}
                  alt="ZypherWorks founding team — remote-first business automation startup"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 381px"
                  className="object-cover"
                  style={{ filter: "saturate(1.05) contrast(1.02)" }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, oklch(0 0 0 / 0.5) 100%)",
                  }}
                />
                <div className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/85">
                  Lisbon offsite · 2025
                </div>
              </div>

              {/* Photo 2 — top right, front, office */}
              <div
                className="js-co-photo absolute right-[2%] top-[18%] overflow-hidden rounded-[14px] border border-line"
                style={{
                  width: "44%",
                  aspectRatio: "5/4",
                  transform: "translateZ(60px) rotateY(8deg)",
                  boxShadow: "0 24px 50px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.08) inset",
                  animation: "coFloatB 7s ease-in-out infinite alternate",
                }}
              >
                <Image
                  src={HERO_PHOTOS[1]}
                  alt="ZypherWorks remote workspace — platform engineering team"
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 246px"
                  className="object-cover"
                  style={{ filter: "saturate(1.05) contrast(1.05)" }}
                />
                <div
                  className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white"
                  style={{ background: "oklch(0 0 0 / 0.5)", backdropFilter: "blur(6px)" }}
                >
                  <span
                    className="inline-block"
                    style={{ width: 5, height: 5, borderRadius: 99, background: "oklch(0.85 0.16 145)", boxShadow: "0 0 6px oklch(0.85 0.16 145)" }}
                  />
                  Live
                </div>
              </div>

              {/* Photo 3 — bottom left, front, product/screen */}
              <div
                className="js-co-photo absolute bottom-[3%] left-[-4%] overflow-hidden rounded-[14px] border border-line"
                style={{
                  width: "50%",
                  aspectRatio: "5/4",
                  transform: "translateZ(40px) rotateY(-10deg)",
                  boxShadow: "0 24px 50px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.08) inset",
                  animation: "coFloatC 9s ease-in-out infinite alternate",
                }}
              >
                <Image
                  src={HERO_PHOTOS[2]}
                  alt="ZypherWorks business automation platform dashboard"
                  fill
                  priority
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover"
                  style={{ filter: "saturate(1.1) contrast(1.05)" }}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.17 220 / 0.25), transparent 50%)",
                    mixBlendMode: "overlay",
                  }}
                />
              </div>

              {/* Floating accent badge */}
              <div
                className="js-co-photo absolute right-[14%] bottom-[10%] rounded-[16px] border border-line px-4 py-3 backdrop-blur-md"
                style={{
                  background: "oklch(0.16 0.014 260 / 0.8)",
                  transform: "translateZ(120px) rotateY(6deg)",
                  boxShadow: "0 20px 40px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.08) inset, 0 0 40px oklch(0.85 0.16 145 / 0.2)",
                  animation: "coFloatA 6s ease-in-out infinite alternate-reverse",
                }}
              >
                <div className="font-mono text-[9px] uppercase tracking-[0.14em]" style={{ color: "oklch(0.85 0.16 145)" }}>
                  Y/Y growth
                </div>
                <div className="mt-0.5 font-display text-[22px] font-medium tracking-[-0.02em] text-ink">+312%</div>
              </div>
            </div>

            {/* Backlight halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 460, height: 460,
                background:
                  "radial-gradient(ellipse at center, oklch(0.78 0.17 220 / 0.18), oklch(0.85 0.16 145 / 0.08) 50%, transparent 75%)",
                filter: "blur(50px)",
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};
