"use client";

import { useState } from "react";
import { Icon } from "../../ui/Icon";
import { INQUIRY_TYPES } from "./data";

type FormState = {
  name: string;
  email: string;
  company: string;
  inquiry: string;
  message: string;
};

type Status = "idle" | "submitting" | "sent";

export const ContactForm = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    inquiry: "project",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("submitting");
    /* Simulated send — in real life this would POST to /api/contact */
    setTimeout(() => setStatus("sent"), 900);
  };

  const reset = () => {
    setForm({ name: "", email: "", company: "", inquiry: "project", message: "" });
    setStatus("idle");
  };

  /* Success state */
  if (status === "sent") {
    return (
      <div
        id="form"
        className="relative overflow-hidden rounded-[24px] border p-[clamp(24px,3vw,40px)]"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.22 0.018 260 / 0.9), oklch(0.14 0.012 260 / 0.7))",
          borderColor: "color-mix(in oklch, oklch(0.85 0.16 145) 35%, transparent)",
          boxShadow: "0 30px 70px oklch(0 0 0 / 0.4), 0 0 80px oklch(0.85 0.16 145 / 0.22), 0 0 0 1px oklch(1 0 0 / 0.06) inset",
        }}
      >
        <div className="ef-scale-in mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full text-white"
          style={{
            background: "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
            boxShadow: "0 0 0 4px oklch(0.85 0.16 145 / 0.18), 0 0 30px oklch(0.85 0.16 145 / 0.5)",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 11.5L9 15.5L17 7" />
          </svg>
        </div>
        <h3 className="ef-fade-up m-0 mb-2 text-center font-display text-[26px] font-medium tracking-[-0.02em]" style={{ animationDelay: "60ms" }}>
          Message received.
        </h3>
        <p className="ef-fade-up mx-auto mb-6 max-w-[420px] text-center text-[14px] leading-[1.55] text-ink-2" style={{ animationDelay: "140ms" }}>
          Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. A founding team member will be reading this within the next four hours and writing you a real reply.
        </p>
        <div className="ef-fade-up flex flex-wrap justify-center gap-3" style={{ animationDelay: "220ms" }}>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-[oklch(1_0_0_/_0.02)] px-4 py-2.5 text-[13px] font-medium text-ink transition-colors duration-200 hover:bg-[oklch(1_0_0_/_0.06)]"
          >
            Send another
          </button>
          <a
            href="mailto:hello@zypherworks.io"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[13px] font-medium text-bg transition-transform duration-200 hover:-translate-y-[1px]"
          >
            <Icon name="msg" size={11} />
            Or email us directly
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      id="form"
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[24px] border border-line p-[clamp(24px,3vw,40px)]"
      style={{
        background: "linear-gradient(180deg, oklch(0.22 0.018 260 / 0.85), oklch(0.14 0.012 260 / 0.6))",
        backdropFilter: "blur(14px)",
        boxShadow: "0 30px 70px oklch(0 0 0 / 0.4), 0 1px 0 oklch(1 0 0 / 0.06) inset",
      }}
    >
      {/* Top accent strip */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.85 0.16 145), oklch(0.78 0.17 220), transparent)",
        }}
      />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">
            {"// REACH OUT"}
          </div>
          <h3 className="m-0 mt-1 font-display text-[20px] font-medium tracking-[-0.01em] sm:text-[22px]">
            Tell us about your operation
          </h3>
        </div>
        <div
          className="hidden items-center gap-1.5 rounded-full border border-line bg-[oklch(1_0_0_/_0.04)] px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-3 sm:inline-flex"
        >
          <span className="pulse-dot relative inline-block" style={{ width: 8, height: 8, borderRadius: 99, background: "oklch(0.85 0.16 145)" }} />
          Reading live
        </div>
      </div>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FloatingInput
          id="name"
          label="Your name"
          value={form.name}
          onChange={set("name")}
          onFocus={() => setFocused("name")}
          onBlur={() => setFocused(null)}
          isFocused={focused === "name"}
          required
        />
        <FloatingInput
          id="email"
          label="Work email"
          type="email"
          value={form.email}
          onChange={set("email")}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          isFocused={focused === "email"}
          required
        />
      </div>

      <div className="mt-4">
        <FloatingInput
          id="company"
          label="Company · optional"
          value={form.company}
          onChange={set("company")}
          onFocus={() => setFocused("company")}
          onBlur={() => setFocused(null)}
          isFocused={focused === "company"}
        />
      </div>

      {/* Inquiry type — radio pill row */}
      <div className="mt-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
          What&apos;s this about
        </div>
        <div className="-mx-1 flex flex-wrap gap-1.5 overflow-x-auto px-1 pb-1">
          {INQUIRY_TYPES.map((t) => {
            const active = form.inquiry === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setForm({ ...form, inquiry: t.id })}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all duration-300"
                style={{
                  background: active ? "var(--accent)" : "oklch(1 0 0 / 0.03)",
                  borderColor: active ? "var(--accent)" : "var(--line)",
                  color: active ? "var(--bg)" : "var(--ink-2)",
                  boxShadow: active ? "0 6px 14px var(--accent-glow)" : undefined,
                }}
              >
                <Icon name={t.ic} size={11} stroke={2} />
                {t.label}
              </button>
            );
          })}
        </div>
        {/* Active inquiry description */}
        <div className="mt-2 font-mono text-[10.5px] text-ink-3">
          {INQUIRY_TYPES.find((t) => t.id === form.inquiry)?.description}
        </div>
      </div>

      {/* Message */}
      <div className="mt-5">
        <FloatingTextarea
          id="message"
          label="Tell us a bit"
          value={form.message}
          onChange={set("message")}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          isFocused={focused === "message"}
          required
        />
      </div>

      {/* Footer row: privacy + submit */}
      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2 text-[11.5px] leading-[1.5] text-ink-3 sm:max-w-[280px]">
          <Icon name="shield" size={12} stroke={2} className="mt-[3px] flex-shrink-0 text-accent" />
          <span>We never sell or share your details. One thoughtful reply per message.</span>
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[14px] font-medium text-bg transition-transform duration-200 hover:-translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-80"
          style={{
            background: "var(--ink)",
            boxShadow: "0 14px 30px oklch(0 0 0 / 0.4), 0 0 0 1px oklch(1 0 0 / 0.1) inset, 0 0 30px oklch(0.85 0.16 145 / 0.3)",
            minWidth: 200,
          }}
        >
          <span className="relative inline-flex items-center gap-2">
            {status === "submitting" ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden className="animate-spin">
                  <path d="M21 12a9 9 0 1 1-3-6.7" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                Send message
                <span
                  className="grid h-[20px] w-[20px] place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{ background: "var(--accent)", color: "var(--bg)", boxShadow: "0 0 10px var(--accent-glow)" }}
                >
                  <Icon name="arrow" size={10} stroke={2.4} />
                </span>
              </>
            )}
          </span>
        </button>
      </div>
    </form>
  );
};

/* ─── Floating-label input ─────────────────────── */
type FloatingProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  type?: string;
  required?: boolean;
};

const FloatingInput = ({ id, label, value, onChange, onFocus, onBlur, isFocused, type = "text", required = false }: FloatingProps) => {
  const lifted = isFocused || value.length > 0;
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        className="peer w-full appearance-none border-b bg-transparent pt-6 pb-2.5 text-[15px] tracking-[-0.005em] text-ink outline-none transition-colors duration-300"
        style={{
          borderColor: isFocused ? "var(--accent)" : "var(--line)",
        }}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 transition-all duration-300 ease-out"
        style={{
          top: lifted ? 0 : 26,
          fontSize: lifted ? 10.5 : 14,
          letterSpacing: lifted ? "0.14em" : "0",
          textTransform: lifted ? "uppercase" : "none",
          color: lifted ? (isFocused ? "var(--accent)" : "var(--ink-3)") : "var(--ink-3)",
          fontFamily: lifted ? "var(--font-mono)" : "inherit",
        }}
      >
        {label}
      </label>
      {/* Animated underline expanding from center on focus */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-px origin-center -translate-x-1/2 transition-all duration-400"
        style={{
          width: isFocused ? "100%" : "0%",
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          boxShadow: isFocused ? "0 0 8px var(--accent-glow)" : undefined,
        }}
      />
    </div>
  );
};

type FloatingTextareaProps = Omit<FloatingProps, "type" | "onChange"> & {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const FloatingTextarea = ({ id, label, value, onChange, onFocus, onBlur, isFocused, required = false }: FloatingTextareaProps) => {
  const lifted = isFocused || value.length > 0;
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        required={required}
        rows={4}
        className="peer w-full appearance-none resize-none border-b bg-transparent pt-6 pb-2.5 text-[15px] leading-[1.55] tracking-[-0.005em] text-ink outline-none transition-colors duration-300"
        style={{
          borderColor: isFocused ? "var(--accent)" : "var(--line)",
        }}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 transition-all duration-300 ease-out"
        style={{
          top: lifted ? 0 : 26,
          fontSize: lifted ? 10.5 : 14,
          letterSpacing: lifted ? "0.14em" : "0",
          textTransform: lifted ? "uppercase" : "none",
          color: lifted ? (isFocused ? "var(--accent)" : "var(--ink-3)") : "var(--ink-3)",
          fontFamily: lifted ? "var(--font-mono)" : "inherit",
        }}
      >
        {label}
      </label>
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-px origin-center -translate-x-1/2 transition-all duration-400"
        style={{
          width: isFocused ? "100%" : "0%",
          background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          boxShadow: isFocused ? "0 0 8px var(--accent-glow)" : undefined,
        }}
      />
      <div className="absolute bottom-2 right-0 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-3">
        {value.length} / 1000
      </div>
    </div>
  );
};
