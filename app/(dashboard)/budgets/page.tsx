"use client";

import BudgetCard from "@/components/dashboard/BudgetCard";
import AnimatedPage from "@/components/shared/AnimatedPage";
import StoreProvider from "@/components/shared/StoreProvider";
import { calculatePercentage, formatCurrency } from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";

function BudgetsContent() {
  const { budgets } = useFinanceStore();

  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const remaining = totalLimit - totalSpent;
  const usage = calculatePercentage(totalSpent, totalLimit);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Budgets</h1>
        <p className="mt-2 text-sm text-slate-400">
          Track spending against your monthly limits.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Total Budget</p>
          <h3 className="mt-2 text-2xl font-bold">
            {formatCurrency(totalLimit)}
          </h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Spent</p>
          <h3 className="mt-2 text-2xl font-bold text-amber-400">
            {formatCurrency(totalSpent)}
          </h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Remaining</p>
          <h3 className="mt-2 text-2xl font-bold text-emerald-400">
            {formatCurrency(remaining)}
          </h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Usage</p>
          <h3 className="mt-2 text-2xl font-bold text-blue-400">{usage}%</h3>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="mb-2 flex items-center justify-between text-sm text-slate-400">
          <span>Overall spending progress</span>
          <span>{usage}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${usage}%` }}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {budgets.map((b) => (
          <BudgetCard key={b.id} budget={b} />
        ))}
      </div>
    </div>
  );
}

export default function BudgetsPage() {
  return (
    <AnimatedPage>
      <StoreProvider>
        <BudgetsContent />
      </StoreProvider>
    </AnimatedPage>
  );
}