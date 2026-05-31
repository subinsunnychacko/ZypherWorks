"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Icon } from "../../ui/Icon";
import { Breadcrumb } from "../../ui/Breadcrumb";
import { gsap } from "@/lib/gsap";
import { PricingHeroScene } from "./PricingHeroScene";

export const PricingPageHero = () => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = ref.current;
		if (!root) return;
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
			tl.from(".js-ph-eyebrow", { y: 20, opacity: 0, duration: 0.6 })
				.from(".js-ph-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
				.from(".js-ph-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
				.from(".js-ph-cta", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
				.from(".js-ph-meta", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3");
		}, root);
		return () => ctx.revert();
	}, []);

	return (
		<header
			ref={ref}
			className="relative overflow-hidden px-[clamp(20px,5vw,96px)] pt-[clamp(72px,8vw,112px)] pb-[clamp(30px,4vw,60px)]">
			<div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-[1fr_1fr]">
				<div>
					<Breadcrumb
						items={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
					/>
					<div className="js-ph-eyebrow mb-5 mt-2 inline-flex items-center gap-2 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-3 py-[6px] font-mono text-[11.5px] tracking-[0.02em] text-ink-2">
						<span
							className="inline-block h-[7px] w-[7px] rounded-full"
							style={{
								background: "var(--accent)",
								boxShadow: "0 0 10px var(--accent)",
							}}
						/>
						Pricing · no plans to pick from
					</div>
					<h1
						className="js-ph-title m-0 font-display font-medium leading-[0.95] tracking-[-0.04em]"
						style={{ fontSize: "clamp(40px, 6vw, 92px)" }}>
						Priced to
						<br />
						<em
							className="serif-italic"
							style={{ color: "var(--accent-2)" }}>
							fit your build.
						</em>
					</h1>
					<p className="js-ph-sub mt-6 max-w-[480px] text-[16px] leading-[1.6] text-ink-2">
						We&apos;re a two-person studio, so we don&apos;t hide behind
						tier tables. You get a real conversation with the founders and
						a number scoped to your operation — nothing more, nothing
						padded.
					</p>
					<div className="js-ph-cta mt-8 flex flex-wrap items-center gap-3">
						<Link href="/contact">
							<span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-[var(--bg)] transition-transform duration-200 hover:-translate-y-[1px]">
								Contact the founders for pricing
								<Icon name="arrow" size={15} />
							</span>
						</Link>
						<a
							href="#how-pricing-works"
							className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-medium text-ink transition-colors duration-200 hover:border-[var(--line-strong)]">
							See how it works
						</a>
					</div>
				</div>

				{/* Premium interactive 3D scene */}
				<div className="hidden overflow-hidden lg:block">
					<PricingHeroScene />
				</div>
			</div>
		</header>
	);
};
