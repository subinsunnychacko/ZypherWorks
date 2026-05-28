"use client";

import { Fragment } from "react";
import { Icon, type IconName } from "../ui/Icon";
import { Sparkline } from "../ui/Sparkline";

export type EFTab = "overview" | "bookings" | "leads" | "members";

const TITLES: Record<EFTab, string> = {
  overview: "Studio Overview",
  bookings: "Bookings & Schedule",
  leads: "Leads Pipeline",
  members: "Member Engagement",
};

const SIDE: { id: EFTab | null; ic: IconName }[] = [
  { id: "overview", ic: "home" },
  { id: "bookings", ic: "cal" },
  { id: "leads", ic: "spark" },
  { id: "members", ic: "users" },
  { id: null, ic: "chart" },
  { id: null, ic: "msg" },
];

export const EaseFitDashboard = ({ tab = "overview" }: { tab?: EFTab }) => (
  <div
    className="grid h-full font-body text-[11px]"
    style={{
      gridTemplateColumns: "56px 1fr",
      background: "oklch(0.98 0.005 80)",
      color: "oklch(0.18 0.012 260)",
    }}
  >
    <div
      className="flex flex-col items-center gap-2 p-[12px_8px]"
      style={{ background: "oklch(0.16 0.012 260)" }}
    >
      <div
        className="mb-[10px] grid h-8 w-8 place-items-center rounded-[10px] font-display text-[14px] font-bold text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.85 0.16 145), oklch(0.65 0.18 165))",
        }}
      >
        e
      </div>
      {SIDE.map((s, i) => (
        <SideIcon key={i} active={s.id ? s.id === tab : false} name={s.ic} />
      ))}
      <div className="flex-1" />
      <SideIcon name="cog" />
    </div>

    <div className="flex min-h-0 flex-col gap-[10px] overflow-hidden p-[12px_16px]">
      <div className="flex items-center justify-between gap-[10px]">
        <h4 className="m-0 font-display text-[14px] font-semibold tracking-[-0.01em]">
          {TITLES[tab]}
        </h4>
        <div
          className="flex max-w-[200px] flex-1 items-center gap-[6px] rounded-[8px] p-[6px_10px] text-[10px]"
          style={{ background: "oklch(0 0 0 / 0.04)", color: "oklch(0.45 0.012 260)" }}
        >
          <Icon name="search" size={11} />
          <span>Search members, classes…</span>
        </div>
        <div className="flex items-center gap-[6px]">
          <div
            className="grid place-items-center"
            style={{ width: 26, height: 26, color: "oklch(0.4 0.012 260)" }}
          >
            <Icon name="bell" size={13} />
          </div>
          <div
            className="h-[26px] w-[26px] rounded-full"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.7 0.15 30), oklch(0.55 0.18 350))",
            }}
          />
        </div>
      </div>

      <div key={tab} className="ef-tab-content flex min-h-0 flex-1 flex-col gap-[10px]">
        {tab === "overview" && <EFOverview />}
        {tab === "bookings" && <EFBookings />}
        {tab === "leads" && <EFLeads />}
        {tab === "members" && <EFMembers />}
      </div>
    </div>
  </div>
);

const SideIcon = ({ active = false, name }: { active?: boolean; name: IconName }) => (
  <div
    className="grid place-items-center rounded-[10px] transition-colors duration-200"
    style={{
      width: 36,
      height: 36,
      color: active ? "oklch(0.85 0.16 145)" : "oklch(0.7 0.01 260)",
      background: active ? "oklch(1 0 0 / 0.08)" : "transparent",
    }}
  >
    <Icon name={name} size={16} />
  </div>
);

const Kpi = ({ l, v, d, dn }: { l: string; v: string; d?: string; dn?: boolean }) => (
  <div
    className="rounded-[10px] border p-[10px]"
    style={{ background: "oklch(1 0 0)", borderColor: "oklch(0 0 0 / 0.06)" }}
  >
    <div className="text-[9px] uppercase tracking-[0.06em]" style={{ color: "oklch(0.5 0.012 260)" }}>
      {l}
    </div>
    <div className="mt-[2px] font-display text-[18px] font-semibold tracking-[-0.02em]">
      {v}
    </div>
    {d && (
      <div
        className="mt-[2px] text-[9px]"
        style={{ color: dn ? "oklch(0.6 0.16 25)" : "oklch(0.55 0.15 145)" }}
      >
        {d}
      </div>
    )}
  </div>
);

const Panel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={"flex flex-col gap-2 overflow-hidden rounded-[10px] border p-[10px] " + className}
    style={{ background: "oklch(1 0 0)", borderColor: "oklch(0 0 0 / 0.06)" }}
  >
    {children}
  </div>
);

const ListItem = ({
  name,
  time,
  status,
  warn,
  dotColor,
}: {
  name: string;
  time: string;
  status: string;
  warn?: boolean;
  dotColor?: string;
}) => (
  <div
    className="flex items-center gap-2 border-b py-[6px] text-[10px] last:border-0"
    style={{ borderColor: "oklch(0 0 0 / 0.04)" }}
  >
    <span
      className="inline-block"
      style={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: dotColor ?? "oklch(0.85 0.16 145)",
      }}
    />
    <span className="flex-1 font-medium">{name}</span>
    <span
      className="font-mono text-[9px]"
      style={{ color: "oklch(0.5 0.012 260)" }}
    >
      {time}
    </span>
    <span
      className="rounded-full px-[6px] py-[2px] text-[9px] font-medium"
      style={
        warn
          ? {
              background: "oklch(0.85 0.16 70 / 0.18)",
              color: "oklch(0.4 0.14 70)",
            }
          : {
              background: "oklch(0.85 0.16 145 / 0.15)",
              color: "oklch(0.4 0.16 145)",
            }
      }
    >
      {status}
    </span>
  </div>
);

const EFOverview = () => (
  <>
    <div className="grid grid-cols-4 gap-2">
      {[
        { l: "Active Members", v: "1,284", d: "+8.2% MoM" },
        { l: "Bookings · 7d",  v: "412",   d: "+12%" },
        { l: "New Leads",      v: "87",    d: "+24%" },
        { l: "MRR",            v: "$42.6k", d: "+5.7%" },
      ].map((k, i) => (
        <div key={k.l} className="ef-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
          <Kpi l={k.l} v={k.v} d={k.d} />
        </div>
      ))}
    </div>
    <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-2">
      <div className="ef-fade-up flex" style={{ animationDelay: "260ms" }}>
        <Panel className="flex-1">
          <div className="flex items-center justify-between">
            <h5 className="m-0 flex items-center gap-1.5 font-display text-[11px] font-semibold tracking-[-0.005em]">
              <span
                className="ef-live-dot inline-block"
                style={{ width: 6, height: 6, borderRadius: 99, background: "oklch(0.55 0.16 145)" }}
              />
              Revenue · last 30 days
            </h5>
            <span className="font-mono text-[9px]" style={{ color: "oklch(0.5 0.012 260)" }}>
              USD
            </span>
          </div>
          <div className="relative min-h-[80px] flex-1">
            <Sparkline animate data={[12, 16, 14, 22, 18, 26, 24, 31, 28, 36, 33, 42, 38, 45, 52]} />
          </div>
        </Panel>
      </div>
      <div className="ef-fade-up flex" style={{ animationDelay: "340ms" }}>
        <Panel className="flex-1">
          <h5 className="m-0 font-display text-[11px] font-semibold tracking-[-0.005em]">
            Today&apos;s classes
          </h5>
          <div className="flex flex-col gap-[5px]">
            {[
              { name: "HIIT Express",  time: "07:00", status: "Full" },
              { name: "Yoga Flow",     time: "09:30", status: "14/16" },
              { name: "Strength 101",  time: "11:00", status: "3 left", warn: true, dotColor: "oklch(0.85 0.16 70)" },
              { name: "Spin Studio",   time: "18:00", status: "Open" },
            ].map((c, i) => (
              <div key={c.name} className="ef-fade-up" style={{ animationDelay: `${440 + i * 60}ms` }}>
                <ListItem name={c.name} time={c.time} status={c.status} warn={c.warn} dotColor={c.dotColor} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  </>
);

const EFBookings = () => {
  const slots = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "17:00", "18:00", "19:00"];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const states = ["full", "full", "mid", "open", "mid", "full", "open", "mid", "open", "full"] as const;
  const stateColor = {
    full: "oklch(0.85 0.16 145)",
    mid: "oklch(0.85 0.16 70)",
    open: "oklch(0 0 0 / 0.06)",
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: "Today's bookings", v: "78", d: "+6 vs avg" },
          { l: "No-show rate", v: "3.1%", d: "-1.2%", dn: true },
          { l: "Waitlist", v: "22", d: "+4" },
        ].map((k, i) => (
          <div key={k.l} className="ef-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
            <Kpi l={k.l} v={k.v} d={k.d} dn={k.dn} />
          </div>
        ))}
      </div>
      <div className="ef-fade-up flex flex-1" style={{ animationDelay: "260ms" }}>
        <Panel className="flex-1">
          <h5 className="m-0 flex items-center gap-1.5 font-display text-[11px] font-semibold tracking-[-0.005em]">
            <span className="ef-live-dot inline-block" style={{ width: 6, height: 6, borderRadius: 99, background: "oklch(0.55 0.16 145)" }} />
            This week · capacity heatmap
          </h5>
          <div
            className="grid gap-[3px] text-[9px]"
            style={{ gridTemplateColumns: `44px repeat(${days.length}, 1fr)` }}
          >
            <div />
            {days.map((d) => (
              <div key={d} className="text-center" style={{ color: "oklch(0.5 0.012 260)" }}>
                {d}
              </div>
            ))}
            {slots.map((s, i) => (
              <Fragment key={s}>
                <div className="font-mono" style={{ color: "oklch(0.5 0.012 260)" }}>{s}</div>
                {days.map((d, j) => {
                  const st = states[(i + j) % states.length];
                  return (
                    <div
                      key={d}
                      className="ef-fade-in"
                      style={{
                        background: stateColor[st],
                        borderRadius: 3,
                        height: 16,
                        animationDelay: `${400 + (i + j) * 25}ms`,
                      }}
                    />
                  );
                })}
              </Fragment>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
};

const LEAD_NAMES = ["S. Patel", "M. Cruz", "A. Lee", "J. Wong", "R. Khan", "T. Yates", "D. Park", "N. Reed", "E. Kim"];

const EFLeads = () => {
  const cols = [
    { title: "New", count: 4, color: "oklch(0.65 0.15 235)" },
    { title: "Trial", count: 3, color: "oklch(0.85 0.16 70)" },
    { title: "Converted", count: 3, color: "oklch(0.55 0.16 145)" },
  ];
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {[
          { l: "New", v: "42", d: "+18%" },
          { l: "Contacted", v: "31" },
          { l: "Trial", v: "19" },
          { l: "Converted", v: "11", d: "26% rate" },
        ].map((k, i) => (
          <div key={k.l} className="ef-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
            <Kpi l={k.l} v={k.v} d={k.d} />
          </div>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-3 gap-2">
        {cols.map((col, ci) => (
          <div key={col.title} className="ef-fade-up flex" style={{ animationDelay: `${280 + ci * 80}ms` }}>
            <Panel className="flex-1">
              <h5 className="m-0 flex items-center gap-[6px] font-display text-[11px] font-semibold tracking-[-0.005em]">
                <span
                  className="ef-live-dot"
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 50,
                    background: col.color,
                  }}
                />
                {col.title}
                <span className="ml-auto font-mono text-[9px]" style={{ color: "oklch(0.5 0.012 260)" }}>
                  {col.count}
                </span>
              </h5>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="ef-fade-up rounded-[8px] border p-2 text-[9.5px]"
                  style={{
                    background: "oklch(0.97 0.005 80)",
                    borderColor: "oklch(0 0 0 / 0.04)",
                    animationDelay: `${500 + ci * 80 + i * 70}ms`,
                  }}
                >
                  <div className="mb-1 flex justify-between">
                    <b className="font-semibold">
                      {LEAD_NAMES[i + (col.title.length % 3) * 3]}
                    </b>
                    <span className="font-mono" style={{ color: "oklch(0.5 0.012 260)" }}>
                      {["IG", "FB", "REF"][i]}
                    </span>
                  </div>
                  <div style={{ color: "oklch(0.5 0.012 260)" }}>
                    {["Pilates trial · 7d", "Class pack · monthly", "Personal training", "Open gym pass"][i]}
                  </div>
                </div>
              ))}
            </Panel>
          </div>
        ))}
      </div>
    </>
  );
};

const EFMembers = () => (
  <>
    <div className="grid grid-cols-4 gap-2">
      {[
        { l: "Retention · 90d", v: "94%", d: "+2pt" },
        { l: "Avg visits / week", v: "3.4" },
        { l: "NPS", v: "62", d: "+5" },
        { l: "Auto-messages", v: "1.2k" },
      ].map((k, i) => (
        <div key={k.l} className="ef-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
          <Kpi l={k.l} v={k.v} d={k.d} />
        </div>
      ))}
    </div>
    <div className="grid min-h-0 flex-1 grid-cols-[1.4fr_1fr] gap-2">
      <div className="ef-fade-up flex" style={{ animationDelay: "260ms" }}>
        <Panel className="flex-1">
          <h5 className="m-0 flex items-center gap-1.5 font-display text-[11px] font-semibold tracking-[-0.005em]">
            <span className="ef-live-dot inline-block" style={{ width: 6, height: 6, borderRadius: 99, background: "oklch(0.6 0.16 235)" }} />
            Engagement cohorts · 12 wk
          </h5>
          <div className="relative min-h-[80px] flex-1">
            <Sparkline
              animate
              data={[60, 62, 65, 64, 68, 72, 71, 75, 78, 80, 82, 84]}
              stroke="oklch(0.6 0.16 235)"
              fill="oklch(0.6 0.16 235 / 0.15)"
            />
          </div>
        </Panel>
      </div>
      <div className="ef-fade-up flex" style={{ animationDelay: "340ms" }}>
        <Panel className="flex-1">
          <h5 className="m-0 font-display text-[11px] font-semibold tracking-[-0.005em]">
            At-risk members
          </h5>
          <div className="flex flex-col gap-[5px]">
            {[
              { name: "Olivia M.", time: "14d gap", status: "Auto-DM", warn: true, dotColor: "oklch(0.6 0.16 25)" },
              { name: "Devon R.",  time: "11d gap", status: "Auto-DM", warn: true, dotColor: "oklch(0.6 0.16 25)" },
              { name: "Priya S.",  time: "9d gap",  status: "Nudged", dotColor: "oklch(0.85 0.16 70)" },
              { name: "Marc T.",   time: "8d gap",  status: "Nudged", dotColor: "oklch(0.85 0.16 70)" },
            ].map((m, i) => (
              <div key={m.name} className="ef-fade-up" style={{ animationDelay: `${440 + i * 60}ms` }}>
                <ListItem name={m.name} time={m.time} status={m.status} warn={m.warn} dotColor={m.dotColor} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  </>
);
