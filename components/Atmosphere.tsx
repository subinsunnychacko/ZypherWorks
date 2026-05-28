"use client";

import { useReveal } from "@/lib/hooks";

/**
 * Fixed atmospheric layers — film grain + ambient gradient blobs — plus
 * activation of the global `.reveal` intersection observer.
 */
export const Atmosphere = () => {
  useReveal();
  return (
    <>
      <div className="zw-ambient" aria-hidden />
      <div className="zw-grain pointer-events-none fixed inset-0 z-[2]" aria-hidden />
    </>
  );
};
