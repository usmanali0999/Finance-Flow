"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { categoryBreakdown } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

interface TooltipPayload {
  name: string;
  value: number;
  payload: {
    percentage: number;
  };
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) return null;

  const item = payload[0];

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/95 p-3 shadow-xl">
      <p className="text-sm font-medium text-white">{item.name}</p>
      <p className="mt-1 text-xs text-slate-300">
        {formatCurrency(item.value)}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {item.payload.percentage}% of spending
      </p>
    </div>
  );
}

export default function SpendingBreakdownChart() {
  const total = categoryBreakdown.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
      <div className="relative h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryBreakdown}
              dataKey="amount"
              nameKey="category"
              innerRadius={58}
              outerRadius={86}
              paddingAngle={3}
            >
              {categoryBreakdown.map((item) => (
                <Cell key={item.category} fill={item.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-slate-400">Total</span>
          <span className="text-sm font-semibold text-white">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {categoryBreakdown.map((item) => (
          <div key={item.category} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-300">{item.category}</span>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-white">
                {formatCurrency(item.amount)}
              </p>
              <p className="text-xs text-slate-500">{item.percentage}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}