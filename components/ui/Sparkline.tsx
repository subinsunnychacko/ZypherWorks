type SparklineProps = {
  data: number[];
  stroke?: string;
  fill?: string;
  animate?: boolean;
};

export const Sparkline = ({
  data,
  stroke = "oklch(0.55 0.16 145)",
  fill = "oklch(0.55 0.16 145 / 0.15)",
  animate = false,
}: SparklineProps) => {
  const w = 100;
  const h = 40;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map<[number, number]>((v, i) => [
    (i / (data.length - 1)) * w,
    h - ((v - min) / (max - min || 1)) * (h - 6) - 3,
  ]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  const fillD = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <path
        d={fillD}
        fill={fill}
        className={animate ? "ef-spark-fill" : ""}
      />
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animate ? "ef-spark-line" : ""}
        style={animate ? { strokeDasharray: 220, strokeDashoffset: 220 } : undefined}
      />
    </svg>
  );
};
