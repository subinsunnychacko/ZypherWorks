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
 * clears its blur, and fades in staggered left-to-right.
 *
 * Each WORD is wrapped in an inline-block `white-space: nowrap` container so
 * words stay glued together as a unit when the line wraps — only the spaces
 * between words are breakable wrap points. The inner `.fi-char` spans still
 * get the per-character GSAP animation.
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
          {line.parts.map((part, pi) => {
            /* Split on whitespace but keep the spaces as separate tokens */
            const tokens = part.text.split(/(\s+)/).filter((t) => t.length > 0);
            return (
              <span key={pi} className={part.className}>
                {tokens.map((token, ti) => {
                  const isSpace = /^\s+$/.test(token);
                  if (isSpace) {
                    /* Space — single fi-char span, allow wrapping here */
                    return (
                      <span
                        key={ti}
                        className="fi-char inline-block"
                        style={{ whiteSpace: "pre" }}
                      >
                        {token}
                      </span>
                    );
                  }
                  /* Word — wrap chars in a no-break inline-block so the word
                     stays together even when the line wraps */
                  return (
                    <span
                      key={ti}
                      className="inline-block whitespace-nowrap align-baseline"
                    >
                      {token.split("").map((char, ci) => (
                        <span key={ci} className="fi-char inline-block">
                          {char}
                        </span>
                      ))}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};
