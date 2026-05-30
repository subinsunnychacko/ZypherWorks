"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Forces every route change to start at the top of the page.
 *
 * Why this needs more than a single `scrollTop = 0`:
 *
 * 1. GSAP ScrollTrigger caches the scroll position. Several pages
 *    (ProductsFeatured, CompanyStory, ProcessDeepDive) call
 *    ScrollTrigger.refresh() on a setTimeout 120ms and 600ms AFTER mount.
 *    That delayed refresh restores GSAP's remembered scroll position —
 *    yanking the new page back down to where the PREVIOUS page was scrolled.
 *    `clearScrollMemory()` wipes that cache so the refresh has nothing stale
 *    to restore.
 *
 * 2. The browser's native history scroll restoration can also re-apply the
 *    old position. Setting it to "manual" hands control to us.
 *
 * 3. We re-assert top on the next animation frame to defeat any layout shift
 *    from dynamically-imported below-fold content settling in after paint.
 *
 * Direct `scrollTop` assignment (not window.scrollTo) is used so the global
 * `scroll-behavior: smooth` doesn't animate the jump.
 */
export const ScrollReset = () => {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const toTop = () => {
      ScrollTrigger.clearScrollMemory?.();
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0; // Safari
    };

    toTop();
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
};
