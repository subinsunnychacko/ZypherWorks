"use client";

import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export type BreadcrumbItem = { label: string; href?: string };

export const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-7 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-3"
      >
        {items.map((crumb, i) => (
          <span key={crumb.label} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden className="select-none opacity-40">
                /
              </span>
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="transition-colors duration-200 hover:text-ink"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink-2">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
};
