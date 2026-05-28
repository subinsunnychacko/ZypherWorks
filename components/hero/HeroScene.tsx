"use client";

import { forwardRef, useEffect, useRef, type ReactNode, type Ref } from "react";
import { Icon } from "../ui/Icon";
import { gsap } from "@/lib/gsap";

/**
 * 3D parallax scene used in the Hero. Drives perspective rings, an orbital core,
 * and four floating glass cards. Mouse position parallaxes the stage; scroll
 * progressively pushes/translates the cards via GSAP-tweened CSS custom
 * properties (no React re-renders).
 */
export const HeroScene = ({ scrollDepth = 1 }: { scrollDepth?: number }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const scene = sceneRef.current;
    const stage = stageRef.current;
    if (!scene || !stage) return;

    /* Mouse parallax — rAF throttled. */
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = scene.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const ry = -18 + cx * 14;
        const rx = 14 - cy * 10;
        stage.style.setProperty("--ry", `${ry}deg`);
        stage.style.setProperty("--rx", `${rx}deg`);
      });
    };

    /* Scroll-driven card translation. */
    const onScroll = () => {
      const y = window.scrollY;
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const factor = (i + 1) * 0.06 * scrollDepth;
        const tz = 40 + i * 30;
        const tx = (i % 2 === 0 ? -1 : 1) * y * factor;
        const ty = y * factor * 0.6;
        const yRot = (i % 2 === 0 ? 8 : -10) - y * 0.01;
        el.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateY(${yRot}deg)`;
      });
    };

    /* Stagger card entrance. */
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        scale: 0.85,
        y: 30,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.4,
      });
    }, stage);

    onScroll();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [scrollDepth]);

  const setCard = (i: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[i] = el;
  };

  return (
    <div
      ref={sceneRef}
      className="relative h-[min(560px,70vh)]"
      style={{ perspective: "1400px", perspectiveOrigin: "50% 35%" }}
    >
      <div
        ref={stageRef}
        className="absolute inset-0 preserve-3d"
        style={{
          transform:
            "rotateX(var(--rx, 14deg)) rotateY(var(--ry, -18deg)) rotateZ(var(--rz, 0deg))",
          transition: "transform 0.4s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <Ring />
        <Ring className="!h-[360px] !w-[360px] !-ml-[180px] !-mt-[180px]" rotateZ={45} />
        <Ring
          className="!h-[220px] !w-[220px] !-ml-[110px] !-mt-[110px]"
          solid
        />
        <Core />

        <Card ref={setCard(0)} className="left-[-20px] top-[50px] w-[220px]" initial="t1">
          <div className="flex items-center gap-[10px]">
            <CardIcon name="bolt" />
            <div>
              <div className="text-[13px] font-medium text-ink">Workflow · auto</div>
              <div className="font-mono text-[11px] text-ink-3">trigger · webhook</div>
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-[6px] font-mono text-[11px] text-ink-3">Throughput</div>
            <div className="h-[6px] overflow-hidden rounded-[3px] bg-[oklch(1_0_0_/_0.06)]">
              <i
                className="block h-full rounded-[3px]"
                style={{
                  width: "78%",
                  background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                }}
              />
            </div>
          </div>
        </Card>

        <Card ref={setCard(1)} className="right-[-10px] top-[30px] w-[200px]" initial="t2">
          <div className="flex items-center gap-[10px]">
            <CardIcon name="chart" />
            <div className="text-[13px] font-medium text-ink">Pipeline · live</div>
          </div>
          <div
            className="mt-[10px] grid grid-cols-12 items-end gap-[3px]"
            style={{ height: 36 }}
          >
            {[12, 18, 14, 22, 28, 20, 32, 38, 30, 42, 48, 52].map((v, i) => (
              <i
                key={i}
                className="block rounded-[2px]"
                style={{
                  height: `${v * 0.6}px`,
                  background: "var(--accent)",
                  opacity: 0.5 + i * 0.04,
                }}
              />
            ))}
          </div>
        </Card>

        <Card ref={setCard(2)} className="bottom-[60px] left-[30px] w-[250px]" initial="t3">
          <div className="flex items-center gap-[10px]">
            <CardIcon name="shield" />
            <div>
              <div className="text-[13px] font-medium text-ink">Trust score · 98</div>
              <div className="font-mono text-[11px] text-ink-3">soc 2 · type ii</div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-8 gap-[3px]">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 8,
                  borderRadius: 2,
                  background: i < 22 ? "var(--accent)" : "oklch(1 0 0 / 0.08)",
                  boxShadow: i < 22 ? "0 0 6px var(--accent-glow)" : undefined,
                }}
              />
            ))}
          </div>
        </Card>

        <Card
          ref={setCard(3)}
          className="bottom-[100px] right-[20px] w-[180px]"
          initial="t4"
        >
          <div className="flex items-center gap-[10px]">
            <CardIcon name="cube" />
            <div className="text-[13px] font-medium text-ink">Deploys · 24h</div>
          </div>
          <div className="mt-[10px] font-mono text-[11px] text-ink-3 leading-[1.55]">
            <div>✓ api-gateway · 2m ago</div>
            <div>✓ ml-router · 18m ago</div>
            <div>✓ webhooks · 1h ago</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Ring = ({
  className = "",
  rotateZ = 0,
  solid = false,
}: {
  className?: string;
  rotateZ?: number;
  solid?: boolean;
}) => (
  <div
    className={
      "absolute left-1/2 top-1/2 -ml-[250px] -mt-[250px] h-[500px] w-[500px] rounded-full preserve-3d " +
      className
    }
    style={{
      border: solid ? "1px solid var(--accent-soft)" : "1px dashed var(--line-strong)",
      transform: `rotateX(75deg) rotateZ(${rotateZ}deg)`,
    }}
  />
);

const Core = () => (
  <div
    className="absolute left-1/2 top-1/2 -ml-[60px] -mt-[60px] h-[120px] w-[120px] preserve-3d"
    style={{
      borderRadius: 26,
      background:
        "linear-gradient(135deg, oklch(0.85 0.16 195), oklch(0.55 0.2 250))",
      boxShadow:
        "0 0 60px var(--accent-glow), 0 0 120px oklch(0.55 0.2 250 / 0.4), inset 0 1px 0 oklch(1 0 0 / 0.4)",
      transform: "translateZ(20px) rotateX(-10deg) rotateY(20deg)",
      animation: "coreSpin 18s linear infinite",
    }}
  >
    <span
      aria-hidden
      className="absolute grid place-items-center"
      style={{ inset: 18, borderRadius: 16, background: "var(--bg)" }}
    />
    <span
      aria-hidden
      className="absolute"
      style={{
        inset: 30,
        borderRadius: 10,
        background:
          "conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))",
        filter: "blur(2px)",
        animation: "coreInner 6s linear infinite reverse",
      }}
    />
  </div>
);

const CardIcon = ({ name }: { name: Parameters<typeof Icon>[0]["name"] }) => (
  <span
    className="grid h-7 w-7 place-items-center rounded-[8px] border border-line"
    style={{ background: "oklch(1 0 0 / 0.06)", color: "var(--accent)" }}
  >
    <Icon name={name} size={14} />
  </span>
);

type CardProps = {
  children: ReactNode;
  className?: string;
  initial: "t1" | "t2" | "t3" | "t4";
};

const INIT_TRANSFORMS: Record<CardProps["initial"], string> = {
  t1: "translate3d(-40px, 0, 100px) rotateY(8deg)",
  t2: "translate3d(30px, 0, 60px) rotateY(-10deg)",
  t3: "translate3d(-10px, 30px, 140px) rotateY(6deg)",
  t4: "translate3d(20px, 10px, 90px) rotateY(-6deg)",
};

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className = "", initial },
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={
        "absolute rounded-[14px] border border-line-strong p-[14px] text-[12px] text-ink-2 preserve-3d will-3d " +
        className
      }
      style={{
        background: "oklch(0.22 0.014 260 / 0.7)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        boxShadow:
          "0 30px 60px oklch(0 0 0 / 0.5), 0 1px 0 oklch(1 0 0 / 0.08) inset",
        transform: INIT_TRANSFORMS[initial],
      }}
    >
      {children}
    </div>
  );
});
