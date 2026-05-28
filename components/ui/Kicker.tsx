type KickerProps = { children: React.ReactNode; className?: string };

/** Mono accent kicker with leading hairline. */
export const Kicker = ({ children, className = "" }: KickerProps) => (
  <div
    className={
      "flex items-center gap-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-accent " +
      "before:block before:h-px before:w-[22px] before:bg-[var(--accent)] " +
      className
    }
  >
    {children}
  </div>
);
