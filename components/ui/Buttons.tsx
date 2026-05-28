import * as React from "react";
import { Icon, type IconName } from "./Icon";

type PrimaryProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  arrow?: IconName | false;
};

/** Solid pill button — dark page version (light ink on bg). */
export const ButtonPrimary = React.forwardRef<HTMLButtonElement, PrimaryProps>(
  ({ children, className = "", arrow = "arrow", ...rest }, ref) => (
    <button
      ref={ref}
      {...rest}
      className={
        "group inline-flex items-center gap-[10px] rounded-full px-[22px] py-[14px] " +
        "text-[14.5px] font-medium text-bg bg-ink border-0 transition-[transform,box-shadow] " +
        "duration-200 hover:-translate-y-[2px] " +
        "shadow-[0_0_0_1px_oklch(1_0_0_/_0.1),0_10px_30px_oklch(0_0_0_/_0.3)] " +
        "hover:shadow-[0_0_0_1px_oklch(1_0_0_/_0.15),0_18px_40px_oklch(0_0_0_/_0.4)] " +
        className
      }
    >
      <span>{children}</span>
      {arrow !== false && (
        <span
          className="grid h-[22px] w-[22px] place-items-center rounded-full text-bg"
          style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent-glow)" }}
        >
          <Icon name={arrow} size={11} stroke={2.4} />
        </span>
      )}
    </button>
  ),
);
ButtonPrimary.displayName = "ButtonPrimary";

/** Outline pill button used alongside primary. */
export const ButtonGhost = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, className = "", ...rest }, ref) => (
  <button
    ref={ref}
    {...rest}
    className={
      "inline-flex items-center gap-[10px] rounded-full border border-line-strong px-5 py-[14px] " +
      "text-[14.5px] text-ink transition-colors duration-200 " +
      "hover:bg-[oklch(1_0_0_/_0.04)] hover:border-[oklch(1_0_0_/_0.25)] " +
      className
    }
  >
    {children}
  </button>
));
ButtonGhost.displayName = "ButtonGhost";
