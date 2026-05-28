import type { ReactNode, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & { children: ReactNode };

/**
 * Page-wide content limiter. Keeps content readable on large monitors
 * (≥1920px) while full-bleed section backgrounds remain unclipped.
 */
export const Container = ({ children, className = "", ...rest }: Props) => (
  <div
    className={"mx-auto w-full max-w-[1440px] px-[clamp(20px,5vw,96px)] " + className}
    {...rest}
  >
    {children}
  </div>
);
