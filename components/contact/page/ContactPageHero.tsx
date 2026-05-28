"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap } from "@/lib/gsap";
import { CONTACT_STATS, HERO_RESPONDERS } from "./data";
import { ContactForm } from "./ContactForm";

export const ContactPageHero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = heroRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(".js-ct-stagger", {
        y: 22, opacity: 0, duration: 0.95, ease: "power3.out",
        stagger: 0.08, delay: 0.25,
      });
      gsap.from(".js-ct-form", {
        scale: 0.97, opacity: 0, duration: 0.95, ease: "power3.out", delay: 0.5,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative z-[1] overflow-hidden pt-[120px] pb-[60px] lg:pt-[150px] lg:pb-[100px]"
    >
      {/* Atmospheric grid */}
      <div className="zwp-grid pointer-events-none absolute inset-0 z-[0]" aria-hidden />

      {/* Off-center accent glow on the right (where the form lives) */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 z-[0]"
        style={{
          width: "min(1000px, 80vw)",
          height: 640,
          transform: "translate(15%, -50%)",
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.16 145 / 0.16), oklch(0.78 0.17 220 / 0.08) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <Container className="relative z-[1]">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* LEFT — warm copy + reassurance */}
          <div className="lg:sticky lg:top-32">
            <div className="js-ct-stagger mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] pl-2 font-mono text-[11px] tracking-[0.04em] text-ink-2">
              <span
                className="pulse-dot relative inline-block flex-shrink-0"
                style={{ width: 12, height: 12, borderRadius: "50%", background: "oklch(0.85 0.16 145)", boxShadow: "0 0 10px oklch(0.85 0.16 145)" }}
              />
              READING NEW MESSAGES · USUALLY REPLY SAME DAY
            </div>

            <Kicker className="js-ct-stagger mb-6 w-fit">{"// SAY HELLO"}</Kicker>

            <h1
              className="js-ct-stagger m-0 font-display font-medium tracking-[-0.04em]"
              style={{ fontSize: "clamp(38px, 5.2vw, 84px)", lineHeight: 0.98 }}
            >
              Let&apos;s start
              <br />
              <span className="grad">a real conversation.</span>
            </h1>

            <p className="js-ct-stagger mt-7 max-w-[520px] text-[16px] leading-[1.65] text-ink-2 sm:text-[17px]">
              No chatbots, no &ldquo;account exec will reach out within 5–7 business days&rdquo;.
              Every message is read by a founding team member, and gets a real reply — usually the same day.
            </p>

            {/* Trust strip — stats */}
            <div className="js-ct-stagger mt-9 grid grid-cols-3 gap-5 border-t border-line pt-7">
              {CONTACT_STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-[22px] font-medium tracking-[-0.02em]" style={{ lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Responders strip — who actually reads your message */}
            <div className="js-ct-stagger mt-9">
              <div className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                {"// Who'll be reading"}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {HERO_RESPONDERS.map((r) => (
                    <div
                      key={r.name}
                      className="grid h-10 w-10 place-items-center rounded-full border-2 font-display text-[12px] font-semibold text-white transition-transform duration-300 hover:-translate-y-1 hover:scale-110"
                      style={{
                        background: r.color,
                        borderColor: "oklch(0.14 0.012 260)",
                        boxShadow: `0 6px 14px color-mix(in oklch, ${r.color} 35%, transparent)`,
                      }}
                      title={`${r.name} · ${r.role}`}
                    >
                      {r.name.charAt(0)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[13px] font-medium text-ink">
                    {HERO_RESPONDERS.map((r) => r.name).join(", ")}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">
                    + 3 more on the founding team
                  </div>
                </div>
              </div>
            </div>

            {/* Direct email shortcut */}
            <div className="js-ct-stagger mt-9 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3">
              Or skip the form —
              <a
                href="mailto:hello@zypherworks.io"
                className="inline-flex items-center gap-1.5 text-accent transition-colors hover:text-ink"
              >
                hello@zypherworks.io
                <Icon name="arrowUp" size={10} stroke={2.4} />
              </a>
            </div>
          </div>

          {/* RIGHT — the form */}
          <div className="js-ct-form">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
};
