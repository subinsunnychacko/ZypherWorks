import * as React from "react";
import Link from "next/link";
import { Icon, type IconName } from "./Icon";

const primaryCls = (extra = "") =>
  "group inline-flex items-center gap-[10px] rounded-full px-[22px] py-[14px] " +
  "text-[14.5px] font-medium text-bg bg-ink border-0 transition-[transform,box-shadow] " +
  "duration-200 hover:-translate-y-[2px] " +
  "shadow-[0_0_0_1px_oklch(1_0_0_/_0.1),0_10px_30px_oklch(0_0_0_/_0.3)] " +
  "hover:shadow-[0_0_0_1px_oklch(1_0_0_/_0.15),0_18px_40px_oklch(0_0_0_/_0.4)] " +
  extra;

const ghostCls = (extra = "") =>
  "inline-flex items-center gap-[10px] rounded-full border border-line-strong px-5 py-[14px] " +
  "text-[14.5px] text-ink transition-colors duration-200 " +
  "hover:bg-[oklch(1_0_0_/_0.04)] hover:border-[oklch(1_0_0_/_0.25)] " +
  extra;

const ArrowBadge = ({ name = "arrow" as IconName }) => (
  <span
    className="grid h-[22px] w-[22px] place-items-center rounded-full text-bg"
    style={{ background: "var(--accent)", boxShadow: "0 0 12px var(--accent-glow)" }}
  >
    <Icon name={name} size={11} stroke={2.4} />
  </span>
);

type PrimaryProps = {
  children?: React.ReactNode;
  className?: string;
  arrow?: IconName | false;
  href?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href">;

/** Solid pill button — renders as <Link> when href is provided. */
export const ButtonPrimary = React.forwardRef<HTMLButtonElement, PrimaryProps>(
  ({ children, className = "", arrow = "arrow", href, ...rest }, ref) => {
    const inner = (
      <>
        <span>{children}</span>
        {arrow !== false && <ArrowBadge name={arrow} />}
      </>
    );
    if (href) {
      return <Link href={href} className={primaryCls(className)}>{inner}</Link>;
    }
    return (
      <button ref={ref} {...rest} className={primaryCls(className)}>
        {inner}
      </button>
    );
  },
);
ButtonPrimary.displayName = "ButtonPrimary";

type GhostProps = {
  children?: React.ReactNode;
  className?: string;
  href?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "href">;

/** Outline pill button — renders as <Link> when href is provided. */
export const ButtonGhost = React.forwardRef<HTMLButtonElement, GhostProps>(
  ({ children, className = "", href, ...rest }, ref) => {
    if (href) {
      return <Link href={href} className={ghostCls(className)}>{children}</Link>;
    }
    return (
      <button ref={ref} {...rest} className={ghostCls(className)}>
        {children}
      </button>
    );
  },
);
ButtonGhost.displayName = "ButtonGhost";
