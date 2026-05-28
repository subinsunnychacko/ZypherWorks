"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export type HeadlinePart = { text: string; className?: string };
export type HeadlineLine = { parts: HeadlinePart[] };

type Props = {
  lines: HeadlineLine[];
  baseDelay?: number;
  charStagger?: number;
};

/**
 * Character-by-character typing fade-in. Each character slides up a few pixels,
 * clears its blur, and fades in staggered left-to-right — creating a smooth
 * "being written" feel without a mechanical cursor.
 *
 * Gradient spans are preserved by wrapping the gradient class around a container
 * whose children are the character spans; the background-clip applies through.
 */
export const FadeInHeadline = ({
  lines,
  baseDelay = 0.3,
  charStagger = 0.028,
}: Props) => {
  const rootRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const chars = root.querySelectorAll<HTMLSpanElement>(".fi-char");
    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0, y: "0.22em", filter: "blur(4px)" });
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        ease: "power2.out",
        stagger: charStagger,
        delay: baseDelay,
      });
    }, root);
    return () => ctx.revert();
  }, [baseDelay, charStagger]);

  return (
    <span ref={rootRef}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.parts.map((part, pi) => (
            <span key={pi} className={part.className}>
              {part.text.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="fi-char inline-block"
                  /* Preserve kerning — don't collapse whitespace characters */
                  style={char === " " ? { whiteSpace: "pre" } : undefined}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};
