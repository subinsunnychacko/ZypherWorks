"use client";

import { useEffect } from "react";

/**
 * Smoothly scrolls to in-page #hash targets on click.
 *
 * We intentionally removed `scroll-behavior: smooth` from <html> because on
 * the root element it also animates route-change scroll-to-top, which gets
 * interrupted by layout shifts mid-navigation and leaves the page parked
 * partway down. This handler restores smooth scrolling, but ONLY for
 * same-page anchor links — route navigation stays instant and reliable.
 */
export const SmoothAnchors = () => {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;

      const anchor = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;

      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
};
