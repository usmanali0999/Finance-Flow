"use client";

import { categoryBreakdown } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function AnalyticsPage() {
  const { getTotalIncome, getTotalExpenses, getNetSavings } = useFinanceStore();

  const income = getTotalIncome();
  const expenses = getTotalExpenses();
  const savings = getNetSavings();
  const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-2 text-sm text-slate-400">
          Insights into your income, expenses, and savings behavior.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Income</p>
          <h3 className="mt-2 text-2xl font-bold text-emerald-400">
            {formatCurrency(income)}
          </h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Expenses</p>
          <h3 className="mt-2 text-2xl font-bold">
            {formatCurrency(expenses)}
          </h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Net Savings</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-400">
            {formatCurrency(savings)}
          </h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Savings Rate</p>
          <h3 className="mt-2 text-2xl font-bold text-violet-400">
            {savingsRate}%
          </h3>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Category Breakdown</h2>
          <p className="text-sm text-slate-400">
            Where your money goes this month
          </p>
        </div>

        <div className="space-y-4">
          {categoryBreakdown.map((item) => (
            <div key={item.category}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-300">{item.category}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">{item.percentage}%</span>
                  <span className="w-24 text-right font-medium text-white">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}