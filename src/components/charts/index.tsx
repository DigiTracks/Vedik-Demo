"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 * Shared Recharts primitives.
 *
 * Every consumer imports this module through `next/dynamic({ ssr: false })`,
 * which does three things:
 *
 *  1. Keeps Recharts (401 KB) out of the initial JS payload for all 28 routes,
 *     including `/login` and the marketing landing page.
 *  2. Collapses what were two identical 401 KB Recharts chunks (`/dashboard`
 *     and `/reports`+`/finance`) into one lazily-fetched module graph.
 *  3. Removes Recharts from the server render pass entirely.
 *
 * Charts carry no crawlable text, so nothing of SEO value is lost. The card
 * titles and captions around them still server-render.
 *
 * `isAnimationActive` is disabled on every series: the default 1500 ms
 * animation replays on each mount and only delays the visual result.
 */

export interface Series {
  dataKey: string;
  name?: string;
  color: string;
}

interface TrendAreaProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: Series[];
  /** "lakh" formats the Y axis as ₹XL for Indian currency amounts. */
  yFormat?: "lakh" | "plain";
  yDomain?: [number, number];
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function TrendArea({
  data,
  xKey,
  series,
  yFormat = "plain",
  yDomain,
  height = 288,
  margin = { top: 10, right: 10, bottom: 0, left: -15 },
}: TrendAreaProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={margin}>
        <defs>
          {series.map((s) => (
            <linearGradient key={s.dataKey} id={`fill-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={s.color} stopOpacity={0.4} />
              <stop offset="95%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.6} />
        <XAxis dataKey={xKey} stroke="#94a3b8" fontSize={11} tickLine={false} />
        <YAxis
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          domain={yDomain}
          tickFormatter={(v: number) => (yFormat === "lakh" ? `₹${(v / 100000).toFixed(0)}L` : String(v))}
        />
        <Tooltip
          formatter={(value) =>
            yFormat === "lakh"
              ? `₹${(Number(value) / 100000).toFixed(1)}L`
              : Number(value).toLocaleString("en-IN")
          }
        />
        <Legend iconType="circle" wrapperStyle={{ paddingTop: 12, fontSize: 12 }} />
        {series.map((s) => (
          <Area
            key={s.dataKey}
            name={s.name ?? s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            stroke={s.color}
            strokeWidth={3}
            fillOpacity={1}
            fill={`url(#fill-${s.dataKey})`}
            isAnimationActive={false}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

interface BarsProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: Series[];
  yFormat?: "lakh" | "plain";
  yDomain?: [number, number];
  height?: number;
  radius?: number | [number, number, number, number];
  /** Show the legend row beneath the plot. Defaults to true when >1 series. */
  legend?: boolean;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export function Bars({
  data,
  xKey,
  series,
  yFormat = "plain",
  yDomain,
  height = 256,
  radius = [4, 4, 0, 0],
  legend,
  margin = { top: 10, right: 5, bottom: 0, left: -25 },
}: BarsProps) {
  const showLegend = legend ?? series.length > 1;
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} opacity={0.6} />
        <XAxis dataKey={xKey} stroke="#94a3b8" fontSize={11} tickLine={false} />
        <YAxis
          stroke="#94a3b8"
          fontSize={11}
          tickLine={false}
          domain={yDomain}
          tickFormatter={(v: number) => (yFormat === "lakh" ? `₹${(v / 100000).toFixed(0)}L` : String(v))}
        />
        <Tooltip
          formatter={(value) =>
            yFormat === "lakh"
              ? `₹${(Number(value) / 100000).toFixed(1)}L`
              : Number(value).toLocaleString("en-IN")
          }
        />
        {showLegend && <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />}
        {series.map((s) => (
          <Bar
            key={s.dataKey}
            name={s.name ?? s.dataKey}
            dataKey={s.dataKey}
            fill={s.color}
            radius={radius}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export interface DonutDatum {
  name: string;
  value: number;
  color: string;
}

interface DonutProps {
  data: DonutDatum[];
  innerRadius?: number;
  outerRadius?: number;
  height?: number;
  /** Format tooltip values as INR. */
  currency?: boolean;
}

export function Donut({
  data,
  innerRadius = 45,
  outerRadius = 70,
  height = 192,
  currency = false,
}: DonutProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={4}
          dataKey="value"
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name ?? index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) =>
            currency
              ? `₹${Number(value).toLocaleString("en-IN")}`
              : Number(value).toLocaleString("en-IN")
          }
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

/** Placeholder shown while the chart chunk downloads. Reserves layout space. */
export function ChartSkeleton({ height = 288 }: { height?: number }) {
  return (
    <div
      style={{ height }}
      className="flex w-full items-center justify-center rounded-lg bg-slate-50 dark:bg-gray-800/40"
    >
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
    </div>
  );
}
