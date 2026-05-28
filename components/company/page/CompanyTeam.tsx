"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { TEAM } from "./data";
import { TeamCard3D } from "./TeamCard3D";

export const CompanyTeam = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-team-row"), {
        y: 50, opacity: 0, rotateX: 6,
        duration: 0.85, ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: root, start: "top 80%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="team"
      className="relative z-[1] pt-[clamp(60px,7vw,100px)] pb-[clamp(60px,8vw,120px)]"
    >
      <Container>
        <div className="mb-12 flex flex-col items-start justify-between gap-6 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <Kicker className="mb-4">{"// THE TEAM"}</Kicker>
            <h2
              className="m-0 max-w-[720px] font-display font-medium tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.8vw, 56px)", lineHeight: 1.05 }}
            >
              Forty-two people.
              <br />
              <span className="grad-soft">No middle layer.</span>
            </h2>
          </div>
          <p className="max-w-[440px] text-[14px] leading-[1.55] text-ink-2">
            Every customer works directly with the team that builds their platform. No account
            managers, no offshore handoffs — the people you meet on the sales call ship your code.
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-1 gap-[clamp(16px,1.6vw,20px)] sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="js-team-row">
              <TeamCard3D member={m} />
            </div>
          ))}
        </div>

        {/* Hiring CTA */}
        <div
          className="mt-12 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-[20px] border p-[clamp(24px,2.5vw,40px)] sm:flex-row sm:items-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.20 0.018 260 / 0.7), oklch(0.13 0.012 260 / 0.6))",
            borderColor: "color-mix(in oklch, oklch(0.85 0.16 145) 25%, var(--line))",
          }}
        >
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: "oklch(0.85 0.16 145)" }}>
              We&apos;re hiring · 6 open roles
            </div>
            <h3 className="m-0 mt-1 font-display text-[clamp(20px,2vw,26px)] font-medium tracking-[-0.02em] leading-[1.15]">
              Engineering, design, and customer ops.{" "}
              <span className="text-ink-2">Mostly senior, remote everywhere.</span>
            </h3>
          </div>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-[10px] rounded-full px-5 py-3 text-[14px] font-medium text-white transition-transform duration-200 hover:-translate-y-[1px]"
            style={{
              background: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
              boxShadow: "0 10px 24px oklch(0.65 0.18 145 / 0.32)",
            }}
          >
            See open roles
            <span
              className="grid h-[20px] w-[20px] place-items-center rounded-full"
              style={{ background: "oklch(1 0 0 / 0.2)" }}
            >
              <Icon name="arrow" size={10} stroke={2.4} />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
};
