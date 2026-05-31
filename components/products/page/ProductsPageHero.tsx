"use client";

import { useEffect, useRef } from "react";
import { Container } from "../../ui/Container";
import { Kicker } from "../../ui/Kicker";
import { Icon } from "../../ui/Icon";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { gsap } from "@/lib/gsap";
import { PRODUCTS } from "./data";

export const ProductsPageHero = () => {
	const heroRef = useRef<HTMLElement>(null);
	const glowRef = useRef<HTMLDivElement>(null);

	const liveCount = PRODUCTS.filter((p) => p.status === "live").length;
	const betaCount = PRODUCTS.filter((p) => p.status === "beta").length;

	useEffect(() => {
		const root = heroRef.current;
		if (!root) return;
		const ctx = gsap.context(() => {
			gsap.from(".js-ph-stagger", {
				y: 22,
				opacity: 0,
				duration: 0.95,
				ease: "power3.out",
				stagger: 0.08,
				delay: 0.25,
			});
		}, root);

		/* Soft mouse-driven glow drift */
		const glow = glowRef.current;
		let raf = 0;
		const onMove = (e: MouseEvent) => {
			if (!glow) return;
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const x = (e.clientX / window.innerWidth - 0.5) * 80;
				const y = (e.clientY / window.innerHeight - 0.5) * 60;
				glow.style.transform = `translate(${x}px, ${y}px)`;
			});
		};
		window.addEventListener("mousemove", onMove);
		return () => {
			ctx.revert();
			window.removeEventListener("mousemove", onMove);
			cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<section
			ref={heroRef}
			id="top"
			className="relative z-[1] overflow-hidden pt-[120px] pb-[32px] lg:pt-[130px] lg:pb-[48px]">
			{/* Subtle animated grid layer */}
			<div
				className="zwp-grid pointer-events-none absolute inset-0 z-[0]"
				aria-hidden
			/>

			{/* Drifting radial accent */}
			<div
				ref={glowRef}
				aria-hidden
				className="pointer-events-none absolute left-1/2 top-[35%] -z-[0] -translate-x-1/2 -translate-y-1/2 will-change-transform"
				style={{
					width: "min(1100px, 90vw)",
					height: "640px",
					background:
						"radial-gradient(ellipse at center, oklch(0.78 0.17 220 / 0.16), oklch(0.85 0.16 195 / 0.07) 40%, transparent 70%)",
					filter: "blur(50px)",
					transition: "transform 0.8s cubic-bezier(.2,.7,.2,1)",
				}}
			/>

			<Container className="relative z-[1] text-center">
				<div className="text-left">
					<Breadcrumb
						items={[{ label: "Home", href: "/" }, { label: "Products" }]}
					/>
				</div>
				{/* Eyebrow pill */}
				<div className="js-ph-stagger mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] pl-2 font-mono text-[11px] tracking-[0.04em] text-ink-2">
					<span
						className="pulse-dot relative inline-block flex-shrink-0"
						style={{
							width: 12,
							height: 12,
							borderRadius: "50%",
							background: "var(--accent)",
							boxShadow: "0 0 10px var(--accent)",
						}}
					/>
					ZW PRODUCTS · {liveCount} LIVE · {betaCount} IN BETA ·{" "}
					{PRODUCTS.length - liveCount - betaCount} INCOMING
				</div>

				{/* Kicker */}
				<Kicker className="js-ph-stagger mx-auto mb-6 w-fit">
					{"// THE ZYPHERWORKS PRODUCT FAMILY"}
				</Kicker>

				{/* Cinematic headline */}
				<h1
					className="js-ph-stagger mx-auto m-0 max-w-[1100px] font-display font-medium tracking-[-0.04em]"
					style={{ fontSize: "clamp(40px, 6vw, 96px)", lineHeight: 0.98 }}>
					Six automation products.
					<br />
					<span className="grad">One coherent platform.</span>
				</h1>

				{/* Subtitle */}
				<p className="js-ph-stagger mx-auto mt-9 max-w-[640px] text-[16px] leading-[1.65] text-ink-2 sm:text-[17px]">
					Every business automation product is built on the same platform
					primitives — bookings, CRM, workflows, billing — so they share
					the same data, the same operator surface, and scale together.
				</p>

				{/* CTAs */}
				<div className="js-ph-stagger mt-10 flex flex-wrap items-center justify-center gap-3">
					<a
						href="#showcase"
						className="inline-flex items-center gap-[10px] rounded-full border-0 bg-ink px-5 py-3 text-[14px] font-medium text-bg transition-transform duration-200 hover:-translate-y-[1px]"
						style={{
							boxShadow:
								"0 10px 30px oklch(0 0 0 / 0.3), 0 0 0 1px oklch(1 0 0 / 0.1)",
						}}>
						Browse the family
						<span
							className="grid h-[20px] w-[20px] place-items-center rounded-full"
							style={{
								background: "var(--accent)",
								color: "var(--bg)",
								boxShadow: "0 0 10px var(--accent-glow)",
							}}>
							<Icon name="arrow" size={10} stroke={2.4} />
						</span>
					</a>
					<a
						href="#featured"
						className="inline-flex items-center gap-[10px] rounded-full border border-line-strong bg-[oklch(1_0_0_/_0.02)] px-5 py-3 text-[14px] font-medium text-ink transition-colors duration-200 hover:bg-[oklch(1_0_0_/_0.06)]">
						<Icon name="play" size={11} />
						See Ease Fit in action
					</a>
				</div>
			</Container>

			{/* ─── Flat product strip — no pyramid, all on the same plane ─── */}
			<Container className="relative z-[1] mt-[clamp(48px,5vw,72px)]">
				<div className="mb-5 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3">
					<span>{"// PRODUCT INDEX · CLICK TO JUMP"}</span>
					<span>
						{String(PRODUCTS.length).padStart(2, "0")} /{" "}
						{String(PRODUCTS.length).padStart(2, "0")}
					</span>
				</div>

				<div className="grid grid-cols-2 gap-[clamp(8px,1vw,14px)] sm:grid-cols-3 lg:grid-cols-6">
					{PRODUCTS.map((p, i) => (
						<a
							key={p.id}
							href="#showcase"
							className="reveal js-pchip group relative flex flex-col items-center gap-3 overflow-hidden rounded-[18px] border border-line p-4"
							style={{
								background:
									"linear-gradient(180deg, oklch(0.20 0.014 260 / 0.5), oklch(0.14 0.012 260 / 0.3))",
								transitionDelay: `${i * 70}ms`,
							}}>
							{/* Hover accent line at top */}
							<span
								aria-hidden
								className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
								style={{ background: p.gradient }}
							/>
							{/* Hover wash */}
							<span
								aria-hidden
								className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
								style={{
									background: `radial-gradient(120% 80% at 50% 0%, color-mix(in oklch, ${p.accent} 18%, transparent), transparent 70%)`,
								}}
							/>

							<div
								className="relative grid place-items-center font-display font-semibold text-white transition-transform duration-500 group-hover:scale-110"
								style={{
									width: 46,
									height: 46,
									borderRadius: 13,
									fontSize: 22,
									background: p.gradient,
									boxShadow: `0 0 0 1px oklch(1 0 0 / 0.08), 0 10px 22px color-mix(in oklch, ${p.accent} 35%, transparent)`,
								}}>
								{p.letter}
							</div>

							<div className="relative text-center">
								<div className="font-display text-[13px] font-medium tracking-[-0.01em]">
									{p.name}
								</div>
								<div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-3">
									{p.category}
								</div>
							</div>

							{/* Status dot top-right */}
							<span
								aria-hidden
								className="absolute right-3 top-3"
								style={{
									width: 6,
									height: 6,
									borderRadius: 99,
									background:
										p.status === "live"
											? p.accent
											: "oklch(1 0 0 / 0.15)",
									boxShadow:
										p.status === "live"
											? `0 0 8px ${p.accent}`
											: undefined,
								}}
							/>
						</a>
					))}
				</div>
			</Container>
		</section>
	);
};

const Stat = ({ n, l }: { n: string; l: string }) => (
	<div className="text-center">
		<div className="font-display text-[22px] font-medium tracking-[-0.02em] sm:text-[26px]">
			{n}
		</div>
		<div className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-3 sm:text-[10.5px]">
			{l}
		</div>
	</div>
);
