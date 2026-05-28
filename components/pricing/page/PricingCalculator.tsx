"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ROI_DEFAULTS } from "./data";

const PLATFORM_FEE = 7800; // Scale tier baseline

export const PricingCalculator = () => {
  const ref = useRef<HTMLElement>(null);
  const [teamSize, setTeamSize] = useState(ROI_DEFAULTS.teamSize);
  const [monthlyOps, setMonthlyOps] = useState(ROI_DEFAULTS.monthlyOps);
  const [hoursPerOp, setHoursPerOp] = useState(ROI_DEFAULTS.hoursPerOp);

  /* Calculations */
  const hourlyCost = ROI_DEFAULTS.hourlyCost;
  const hoursSavedPerMonth = monthlyOps * hoursPerOp * 0.65; /* 65% of operational time recovered */
  const dollarsSavedPerMonth = hoursSavedPerMonth * hourlyCost;
  const annualSavings = dollarsSavedPerMonth * 12;
  const annualPlatformCost = PLATFORM_FEE * 12;
  const netAnnualValue = annualSavings - annualPlatformCost;
  const paybackMonths = Math.max(1, Math.round((PLATFORM_FEE / Math.max(dollarsSavedPerMonth, 1)) * 10) / 10);
  const roiMultiple = Math.round((annualSavings / annualPlatformCost) * 10) / 10;

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      gsap.from(root.querySelectorAll<HTMLElement>(".js-calc-row"), {
        y: 40, opacity: 0,
        duration: 0.85, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: root, start: "top 78%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const fmt$ = (n: number) =>
    n >= 1_000_000
      ? `$${(n / 1_000_000).toFixed(1)}M`
      : n >= 1_000
      ? `$${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`
      : `$${Math.round(n)}`;

  return (
    <section
      ref={ref}
      id="calculator"
      className="relative z-[1] mx-[clamp(8px,2vw,40px)] my-0 overflow-hidden"
      style={{
        borderRadius: "clamp(20px, 3vw, 40px)",
        background:
          "radial-gradient(120% 100% at 50% 0%, oklch(0.20 0.018 260), oklch(0.13 0.012 260) 70%)",
        boxShadow: "0 40px 100px oklch(0 0 0 / 0.45), 0 1px 0 oklch(1 0 0 / 0.05) inset",
      }}
    >
      {/* Background grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 75%)",
        }}
      />
      {/* Accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "min(1100px, 90%)",
          height: 520,
          background:
            "radial-gradient(ellipse at center, oklch(0.85 0.16 145 / 0.18), transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      <Container className="relative z-[1] py-[clamp(60px,8vw,110px)]">
        {/* Header */}
        <div className="mb-12 text-center lg:mb-16">
          <div className="js-calc-row mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] pl-2 font-mono text-[11px] tracking-[0.04em] text-ink-2">
            <span
              className="pulse-dot relative inline-block flex-shrink-0"
              style={{ width: 10, height: 10, borderRadius: 99, background: "oklch(0.85 0.16 145)", boxShadow: "0 0 10px oklch(0.85 0.16 145)" }}
            />
            ROI CALCULATOR · LIVE
          </div>
          <Kicker className="js-calc-row mx-auto mb-5 w-fit">{"// SHOW ME THE MATH"}</Kicker>
          <h2
            className="js-calc-row m-0 mx-auto max-w-[820px] font-display font-medium tracking-[-0.03em]"
            style={{ fontSize: "clamp(28px, 3.8vw, 56px)", lineHeight: 1.05 }}
          >
            Move the dials.
            <br />
            <span className="grad">See the payback live.</span>
          </h2>
          <p className="js-calc-row mx-auto mt-7 max-w-[560px] text-[15px] leading-[1.6] text-ink-2 sm:text-[16px]">
            Three honest inputs, real math. Adjust to match your operation — this is the same formula we
            use during discovery to model your first 12 months.
          </p>
        </div>

        {/* Calculator panel */}
        <div
          className="js-calc-row relative mx-auto max-w-[1200px] overflow-hidden rounded-[24px] border border-line"
          style={{
            background: "linear-gradient(180deg, oklch(0.16 0.014 260 / 0.85), oklch(0.13 0.012 260 / 0.85))",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 0 1px oklch(1 0 0 / 0.05) inset, 0 30px 60px oklch(0 0 0 / 0.4)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            {/* LEFT: input sliders */}
            <div className="border-line p-[clamp(28px,3vw,44px)] lg:border-r">
              <div className="mb-6 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
                <Icon name="cog" size={12} stroke={2} />
                Your operation
              </div>

              <SliderControl
                label="Team size"
                hint="Operators using the platform"
                value={teamSize}
                onChange={setTeamSize}
                min={3} max={120} step={1}
                display={`${teamSize}`}
                accent="oklch(0.72 0.18 240)"
              />
              <SliderControl
                label="Monthly operations"
                hint="Bookings, leads, tickets, transactions"
                value={monthlyOps}
                onChange={setMonthlyOps}
                min={200} max={20000} step={100}
                display={monthlyOps.toLocaleString()}
                accent="oklch(0.78 0.17 195)"
              />
              <SliderControl
                label="Time per operation"
                hint="Avg manual time before automation"
                value={hoursPerOp}
                onChange={setHoursPerOp}
                min={0.1} max={3} step={0.1}
                display={`${hoursPerOp.toFixed(1)} hr`}
                accent="oklch(0.85 0.16 145)"
              />

              <div className="mt-2 rounded-[14px] border border-line p-4" style={{ background: "oklch(1 0 0 / 0.02)" }}>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">Assumptions</div>
                <ul className="m-0 flex flex-col gap-1 p-0 text-[12px] leading-[1.5] text-ink-2">
                  <li className="flex items-center justify-between list-none">
                    <span>Fully-loaded hourly cost</span><span className="font-mono">${hourlyCost}/hr</span>
                  </li>
                  <li className="flex items-center justify-between list-none">
                    <span>Operational time recovered</span><span className="font-mono">65%</span>
                  </li>
                  <li className="flex items-center justify-between list-none">
                    <span>Platform fee (Scale tier)</span><span className="font-mono">{fmt$(PLATFORM_FEE)}/mo</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT: live outputs */}
            <div className="p-[clamp(28px,3vw,44px)]" style={{
              background: "linear-gradient(180deg, oklch(0.18 0.018 260 / 0.6), transparent)",
            }}>
              <div className="mb-6 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: "oklch(0.85 0.16 145)" }}>
                <Icon name="chart" size={12} stroke={2} />
                Your projected first year
              </div>

              {/* Primary stat — big */}
              <div
                className="mb-6 rounded-[18px] border p-6"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.85 0.16 145 / 0.12), oklch(0.78 0.17 220 / 0.06))",
                  borderColor: "color-mix(in oklch, oklch(0.85 0.16 145) 30%, transparent)",
                }}
              >
                <div className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: "oklch(0.85 0.16 145)" }}>
                  Net annual value created
                </div>
                <div
                  className="mt-2 font-display font-medium tracking-[-0.04em]"
                  style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.98 }}
                >
                  <AnimatedNumber value={netAnnualValue} format={fmt$} />
                </div>
                <div className="mt-2 font-mono text-[11px] text-ink-3">
                  = savings of <span className="text-ink-2">{fmt$(annualSavings)}</span> · less platform <span className="text-ink-2">{fmt$(annualPlatformCost)}</span>
                </div>
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <StatTile
                  label="ROI multiple"
                  value={`${roiMultiple.toFixed(1)}×`}
                  hint="vs platform spend"
                  accent="oklch(0.78 0.17 220)"
                />
                <StatTile
                  label="Payback time"
                  value={`${paybackMonths < 1 ? "<1" : paybackMonths.toFixed(1)} mo`}
                  hint="break-even moment"
                  accent="oklch(0.78 0.17 195)"
                />
                <StatTile
                  label="Hours / month"
                  value={Math.round(hoursSavedPerMonth).toLocaleString()}
                  hint="team hours saved"
                  accent="oklch(0.85 0.16 145)"
                />
                <StatTile
                  label="Hires avoided"
                  value={`~${Math.round(hoursSavedPerMonth / 160)}`}
                  hint="based on 160 hrs/mo"
                  accent="oklch(0.85 0.16 70)"
                />
              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-medium text-white transition-transform duration-200 hover:-translate-y-[1px]"
                style={{
                  background: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
                  boxShadow: "0 14px 30px oklch(0.65 0.18 145 / 0.35), 0 0 0 1px oklch(1 0 0 / 0.1) inset",
                }}
              >
                Lock in this estimate — get a quote
                <span
                  className="grid h-[22px] w-[22px] place-items-center rounded-full"
                  style={{ background: "oklch(1 0 0 / 0.2)" }}
                >
                  <Icon name="arrow" size={11} stroke={2.4} />
                </span>
              </a>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink-3">
                {"// quote within 48 hours · no commitment to view"}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ─── Slider input control ─────────────────────────────── */
const SliderControl = ({
  label, hint, value, onChange, min, max, step, display, accent,
}: {
  label: string; hint: string; value: number;
  onChange: (v: number) => void;
  min: number; max: number; step: number;
  display: string; accent: string;
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="mb-7">
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <div className="font-display text-[13.5px] font-medium tracking-[-0.005em]">{label}</div>
          <div className="font-mono text-[10.5px] text-ink-3">{hint}</div>
        </div>
        <div
          className="rounded-[8px] px-2.5 py-1 font-display text-[18px] font-medium tracking-[-0.01em]"
          style={{
            background: `color-mix(in oklch, ${accent} 14%, transparent)`,
            color: accent,
            border: `1px solid color-mix(in oklch, ${accent} 30%, transparent)`,
            minWidth: 84,
            textAlign: "right",
          }}
        >
          {display}
        </div>
      </div>
      <div className="relative h-1.5">
        <div className="absolute inset-0 rounded-full" style={{ background: "oklch(1 0 0 / 0.06)" }} />
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${accent}, color-mix(in oklch, ${accent} 80%, white))`,
            boxShadow: `0 0 10px color-mix(in oklch, ${accent} 50%, transparent)`,
            transition: "width 0.15s linear",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 z-[1] w-full cursor-pointer appearance-none bg-transparent"
          style={{
            ["--slider-accent" as string]: accent,
          } as React.CSSProperties}
          aria-label={label}
        />
        {/* Custom thumb via CSS-in-component */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: white;
            border: 2px solid var(--slider-accent);
            box-shadow: 0 0 12px var(--slider-accent), 0 2px 6px oklch(0 0 0 / 0.4);
            cursor: pointer;
            margin-top: 0;
          }
          input[type="range"]::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: white;
            border: 2px solid var(--slider-accent);
            box-shadow: 0 0 12px var(--slider-accent), 0 2px 6px oklch(0 0 0 / 0.4);
            cursor: pointer;
          }
          input[type="range"]::-webkit-slider-runnable-track {
            background: transparent;
            height: 6px;
          }
          input[type="range"]::-moz-range-track {
            background: transparent;
            height: 6px;
          }
        `}</style>
      </div>
    </div>
  );
};

/* ─── Stat tile ─────────────────────────────── */
const StatTile = ({
  label, value, hint, accent,
}: { label: string; value: string; hint: string; accent: string }) => (
  <div
    className="rounded-[14px] border p-4"
    style={{
      background: "oklch(1 0 0 / 0.02)",
      borderColor: `color-mix(in oklch, ${accent} 18%, var(--line))`,
    }}
  >
    <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">{label}</div>
    <div className="mt-1.5 font-display text-[26px] font-medium tracking-[-0.02em]" style={{ color: accent, lineHeight: 1 }}>
      {value}
    </div>
    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3">{hint}</div>
  </div>
);

/* ─── Animated number — tweens between values smoothly ─────────────── */
const AnimatedNumber = ({ value, format }: { value: number; format: (n: number) => string }) => {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    const duration = 600;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{format(display)}</span>;
};
