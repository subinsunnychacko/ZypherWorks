import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-2": "var(--bg-2)",
        "bg-paper": "var(--bg-paper)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        "ink-dark": "var(--ink-dark)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "accent-soft": "var(--accent-soft)",
        "accent-glow": "var(--accent-glow)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        serif: "var(--font-serif)",
        mono: "var(--font-mono)",
      },
      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "22px",
        xl: "32px",
      },
      keyframes: {
        pulse: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        coreSpin: {
          to: { transform: "translateZ(20px) rotateX(-10deg) rotateY(380deg)" },
        },
        coreInner: {
          to: { transform: "rotate(360deg)" },
        },
        fiWord: {
          to: { opacity: "1", transform: "none", filter: "blur(0)" },
        },
        hsArr: {
          "0%, 100%": { transform: "translateX(0)", opacity: "0.7" },
          "50%": { transform: "translateX(8px)", opacity: "1" },
        },
      },
      animation: {
        pulse: "pulse 2s ease-out infinite",
        marquee: "marquee 38s linear infinite",
        coreSpin: "coreSpin 18s linear infinite",
        coreInner: "coreInner 6s linear infinite reverse",
        fiWord: "fiWord 1.1s cubic-bezier(.2,.7,.2,1) forwards",
        hsArr: "hsArr 1.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
