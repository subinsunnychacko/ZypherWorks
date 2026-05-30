const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Platform",
    links: [
      { label: "Overview",     href: "/" },
      { label: "Automation",   href: "/products" },
      { label: "Intelligence", href: "/products" },
      { label: "Security",     href: "/company" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Ease Fit",     href: "/products" },
      { label: "Vega CRM",     href: "/products" },
      { label: "Forge Ops",    href: "/products" },
      { label: "Lume Insight", href: "/products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",     href: "/company" },
      { label: "Careers",   href: "/contact" },
      { label: "Newsroom",  href: "/company" },
      { label: "Contact",   href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Docs",         href: "#" },
      { label: "Changelog",    href: "#" },
      { label: "Status",       href: "#" },
      { label: "Trust center", href: "#" },
    ],
  },
];

export const Footer = () => (
  <footer className="border-t border-line px-[clamp(20px,5vw,96px)] pb-9 pt-[clamp(40px,6vw,70px)]">
    <div className="mb-[50px] grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-10">
      <div className="col-span-2 max-w-[320px] sm:col-span-2 md:col-span-3 lg:col-span-1 lg:max-w-none">
        <div className="flex items-center gap-[10px] font-display text-[20px] font-semibold">
          <span
            aria-hidden
            className="relative inline-block"
            style={{
              width: 22,
              height: 22,
              background:
                "conic-gradient(from 220deg, var(--accent), var(--accent-2), var(--accent))",
              borderRadius: 7,
              boxShadow: "0 0 12px var(--accent-glow)",
            }}
          >
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
          ZypherWorks
        </div>
        <p className="mt-4 text-[14px] leading-[1.55] text-ink-2">
          Building the intelligent, scalable software primitives that modern businesses
          run on.
        </p>
      </div>
      {COLUMNS.map((col) => (
        <div key={col.title}>
          <p className="m-0 mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-3">
            {col.title}
          </p>
          {col.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block py-[6px] text-[14px] text-ink-2 transition-colors duration-200 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>
      ))}
    </div>
    <div className="flex flex-col items-start gap-2 border-t border-line pt-[26px] font-mono text-[11.5px] text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:text-[12.5px]">
      <span>© 2026 ZypherWorks Inc. · All systems nominal</span>
      <span style={{ color: "var(--accent)" }}>
        ● Status · operational · 99.9% · 30d
      </span>
    </div>
  </footer>
);
