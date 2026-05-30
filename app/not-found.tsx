import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found · ZypherWorks",
  description: "The page you're looking for doesn't exist. Head back to ZypherWorks.",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/",        label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/pricing",  label: "Pricing" },
  { href: "/process",  label: "Process" },
  { href: "/company",  label: "Company" },
  { href: "/contact",  label: "Contact" },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative z-[1] flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, oklch(0.32 0.1 235 / 0.35), transparent 70%)",
          }}
          aria-hidden
        />

        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">
          404
        </p>

        <h1
          className="m-0 mb-5 font-display font-medium tracking-[-0.035em]"
          style={{ fontSize: "clamp(32px, 5vw, 72px)", lineHeight: 1.05 }}
        >
          Page not found.
        </h1>

        <p className="mb-10 max-w-[440px] text-[15px] leading-[1.6] text-ink-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Here&apos;s
          where you might want to go instead.
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-line px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-2 transition-colors duration-200 hover:border-line-strong hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent transition-colors duration-200 hover:text-ink"
        >
          ← Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
