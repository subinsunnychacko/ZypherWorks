"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./ui/Icon";
import { gsap } from "@/lib/gsap";

type NavLink = { label: string; href: string };

const ITEMS: NavLink[] = [
	{ label: "Home", href: "/" },
	{ label: "Products", href: "/products" },
	{ label: "Process", href: "/process" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "Company", href: "/company" },
];

const isActiveLink = (href: string, pathname: string): boolean => {
	if (href === "/products") return pathname.startsWith("/products");
	if (href === "/process") return pathname.startsWith("/process");
	if (href === "/pricing") return pathname.startsWith("/pricing");
	if (href === "/company") return pathname.startsWith("/company");
	if (href === "/#home" || href === "/") return pathname === "/";
	return false;
};

export const Nav = () => {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);
	const wrapRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const sidebarItemsRef = useRef<HTMLDivElement>(null);

	/* ── Desktop pill entrance + scroll compaction ── */
	useEffect(() => {
		const wrap = wrapRef.current;
		const nav = navRef.current;
		if (!wrap || !nav) return;
		const ctx = gsap.context(() => {
			gsap.from(wrap, {
				y: -24,
				opacity: 0,
				duration: 0.9,
				ease: "power3.out",
				delay: 0.15,
			});
		}, wrap);
		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				const compact = Math.min(1, window.scrollY / 200);
				nav.style.setProperty("--nav-scale", `${1 - compact * 0.04}`);
				nav.style.setProperty("--nav-bg-a", `${0.55 + compact * 0.35}`);
			});
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			ctx.revert();
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(raf);
		};
	}, []);

	/* ── Sidebar open / close GSAP animation ── */
	const openSidebar = useCallback(() => {
		setMobileOpen(true);
		const sidebar = sidebarRef.current;
		const overlay = overlayRef.current;
		const itemsEl = sidebarItemsRef.current;
		if (!sidebar || !overlay) return;
		document.body.style.overflow = "hidden";

		/* Clear any in-flight tweens so we never inherit a half-finished state */
		gsap.killTweensOf([sidebar, overlay]);

		gsap.set(sidebar, { x: "100%" });
		gsap.set(overlay, { opacity: 0, pointerEvents: "auto" });
		gsap.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" });
		gsap.to(sidebar, { x: "0%", duration: 0.45, ease: "power3.out" });

		if (itemsEl) {
			const items = Array.from(itemsEl.children) as HTMLElement[];
			gsap.killTweensOf(items);
			/* fromTo with explicit opacity:1 target — survives interruption / repeated opens */
			gsap.fromTo(
				items,
				{ x: 32, opacity: 0 },
				{
					x: 0,
					opacity: 1,
					duration: 0.5,
					ease: "power3.out",
					stagger: 0.055,
					delay: 0.18,
					overwrite: "auto",
				},
			);
		}
	}, []);

	const closeSidebar = useCallback(() => {
		const sidebar = sidebarRef.current;
		const overlay = overlayRef.current;
		const itemsEl = sidebarItemsRef.current;
		if (!sidebar || !overlay) return;
		gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in" });
		gsap.to(sidebar, {
			x: "100%",
			duration: 0.38,
			ease: "power3.in",
			onComplete: () => {
				setMobileOpen(false);
				document.body.style.overflow = "";
				overlay.style.pointerEvents = "none";
				/* Reset items to visible so the next open animates from a clean slate */
				if (itemsEl) {
					const items = Array.from(itemsEl.children) as HTMLElement[];
					gsap.killTweensOf(items);
					gsap.set(items, { opacity: 1, x: 0, clearProps: "transform,opacity" });
				}
			},
		});
	}, []);

	/* Close sidebar on ESC */
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && mobileOpen) closeSidebar();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [mobileOpen, closeSidebar]);

	return (
		<>
			{/* ─── DESKTOP PILL NAV ─── */}
			<div
				ref={wrapRef}
				className="pointer-events-none fixed left-1/2 top-[18px] z-[100] hidden -translate-x-1/2 lg:block">
				<nav
					ref={navRef}
					className="pointer-events-auto flex items-center gap-7 rounded-full border border-line px-[14px] py-[10px] pl-[22px] text-[13.5px] tracking-[-0.005em]"
					style={{
						transform: "scale(var(--nav-scale, 1))",
						background:
							"color-mix(in oklch, var(--bg) calc(var(--nav-bg-a, 0.55) * 100%), transparent)",
						backdropFilter: "blur(20px) saturate(160%)",
						WebkitBackdropFilter: "blur(20px) saturate(160%)",
						boxShadow:
							"0 8px 30px oklch(0 0 0 / 0.4), 0 1px 0 oklch(1 0 0 / 0.06) inset",
						transition:
							"transform 0.4s cubic-bezier(.2,.7,.2,1), background 0.3s linear",
					}}>
					<Link
						href="/"
						className="flex items-center gap-[9px] font-display font-semibold">
						<LogoMark />
						<span>ZypherWorks</span>
					</Link>
					<ul className="m-0 flex list-none gap-[22px] p-0 text-ink-2">
						{ITEMS.map((i) => {
							const active = isActiveLink(i.href, pathname);
							return (
								<li key={i.label} className="relative">
									<Link
										href={i.href}
										className={
											"cursor-pointer transition-colors duration-200 hover:text-ink " +
											(active ? "text-ink" : "")
										}>
										{i.label}
									</Link>
									{active && (
										<span
											aria-hidden
											className="absolute left-1/2 -translate-x-1/2"
											style={{
												bottom: -6,
												width: 4,
												height: 4,
												borderRadius: "50%",
												background: "var(--accent)",
												boxShadow: "0 0 8px var(--accent)",
											}}
										/>
									)}
								</li>
							);
						})}
					</ul>
					<Link
						href="/contact"
						className="inline-flex items-center gap-2 rounded-full border-0 bg-ink px-[14px] py-2 text-[13px] font-medium text-bg transition-transform duration-200 hover:-translate-y-[1px]">
						Book a call
						<span className="grid h-[14px] w-[14px] place-items-center rounded-full bg-bg text-ink">
							<Icon name="arrow" size={10} stroke={2.2} />
						</span>
					</Link>
				</nav>
			</div>

			{/* ─── MOBILE TOP BAR ─── */}
			<header
				className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-5 py-4 lg:hidden"
				style={{
					background: "oklch(0.14 0.012 260 / 0.85)",
					backdropFilter: "blur(20px) saturate(160%)",
					WebkitBackdropFilter: "blur(20px) saturate(160%)",
					borderBottom: "1px solid var(--line)",
				}}>
				<Link
					href="/"
					className="flex items-center gap-2 font-display text-[15px] font-semibold">
					<LogoMark />
					<span>ZypherWorks</span>
				</Link>
				<button
					onClick={openSidebar}
					aria-label="Open navigation menu"
					aria-expanded={mobileOpen}
					aria-controls="mobile-sidebar"
					className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-xl border border-line bg-[oklch(1_0_0_/_0.04)] transition-colors hover:bg-[oklch(1_0_0_/_0.08)]">
					<span className="block h-px w-5 bg-ink" />
					<span className="block h-px w-5 bg-ink" />
					<span className="block h-px w-3 self-start ml-1 bg-ink" />
				</button>
			</header>

			{/* ─── MOBILE OVERLAY ─── */}
			<div
				ref={overlayRef}
				onClick={closeSidebar}
				className="fixed inset-0 z-[110] opacity-0"
				style={{
					background: "oklch(0 0 0 / 0.6)",
					backdropFilter: "blur(4px)",
					WebkitBackdropFilter: "blur(4px)",
					pointerEvents: "none",
				}}
				aria-hidden
			/>

			{/* ─── MOBILE SIDEBAR ─── */}
			<div
				ref={sidebarRef}
				id="mobile-sidebar"
				role="dialog"
				aria-modal="true"
				aria-label="Navigation menu"
				className="fixed bottom-0 right-0 top-0 z-[120] flex w-[min(320px,85vw)] flex-col"
				style={{
					background: "oklch(0.12 0.014 260)",
					borderLeft: "1px solid var(--line-strong)",
					boxShadow: "-30px 0 80px oklch(0 0 0 / 0.6)",
					transform: "translateX(100%)",
				}}>
				{/* Sidebar header */}
				<div className="flex items-center justify-between border-b border-line px-6 py-5">
					<Link
						href="/"
						onClick={closeSidebar}
						className="flex items-center gap-2 font-display text-[15px] font-semibold">
						<LogoMark />
						<span>ZypherWorks</span>
					</Link>
					<button
						onClick={closeSidebar}
						aria-label="Close menu"
						className="grid h-11 w-11 place-items-center rounded-lg border border-line bg-[oklch(1_0_0_/_0.04)] text-ink-2 transition-colors hover:bg-[oklch(1_0_0_/_0.08)] hover:text-ink">
						<svg
							width="14"
							height="14"
							viewBox="0 0 14 14"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round">
							<path d="M1 1l12 12M13 1L1 13" />
						</svg>
					</button>
				</div>

				{/* Nav items */}
				<div
					ref={sidebarItemsRef}
					className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
					{ITEMS.map((item) => {
						const active = isActiveLink(item.href, pathname);
						return (
							<Link
								key={item.label}
								href={item.href}
								onClick={closeSidebar}
								className={
									"flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-all duration-200 " +
									(active
										? "bg-accent/10 text-accent"
										: "text-ink-2 hover:bg-[oklch(1_0_0_/_0.06)] hover:text-ink")
								}>
								{item.label}
								{active && (
									<span
										className="inline-block"
										style={{
											width: 6,
											height: 6,
											borderRadius: "50%",
											background: "var(--accent)",
											boxShadow: "0 0 8px var(--accent)",
										}}
									/>
								)}
							</Link>
						);
					})}
				</div>

				{/* Sidebar footer */}
				<div className="border-t border-line px-4 py-6 space-y-3">
					<Link
						href="/contact"
						onClick={closeSidebar}
						className="block w-full rounded-full border-0 bg-ink py-3 text-center text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
					>
						Book a call
					</Link>
					<p className="text-center font-mono text-[10.5px] tracking-[0.08em] text-ink-3">
						© 2026 ZypherWorks Inc.
					</p>
				</div>

				{/* Decorative glow */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-0 opacity-40"
					style={{
						background:
							"radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-soft), transparent 70%)",
					}}
				/>
			</div>
		</>
	);
};

const LogoMark = () => (
	<span
		aria-hidden
		className="relative inline-block flex-shrink-0"
		style={{
			width: 22,
			height: 22,
			background:
				"conic-gradient(from 220deg, var(--accent), var(--accent-2), var(--accent))",
			borderRadius: 7,
			boxShadow: "0 0 12px var(--accent-glow)",
		}}>
		<span
			className="absolute"
			style={{ inset: 4, background: "var(--bg)", borderRadius: 4 }}
		/>
		<span
			className="absolute"
			style={{
				inset: 7,
				background: "var(--accent)",
				borderRadius: 2,
				boxShadow: "0 0 8px var(--accent)",
			}}
		/>
	</span>
);
