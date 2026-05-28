"use client";

import { useEffect, useRef } from "react";

/**
 * Reveal elements with the `.reveal` class as they intersect the viewport.
 * Adds `.in` for the CSS fade/translate animation. Falls back gracefully if
 * IntersectionObserver is unavailable (prerender / hidden iframe / etc).
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const fallback = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("in"));
    }, 1200);
    let io: IntersectionObserver | undefined;
    try {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
      );
      els.forEach((el) => io!.observe(el));
    } catch {
      els.forEach((el) => el.classList.add("in"));
    }
    return () => {
      window.clearTimeout(fallback);
      io?.disconnect();
    };
  }, []);
}

/** Latest-value ref — useful inside long-lived animation frames. */
export function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
