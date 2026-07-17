"use client";

import IncomeExpenseChart from "@/components/charts/IncomeExpenseChart";
import SavingsTrendChart from "@/components/charts/SavingsTrendChart";
import SpendingBreakdownChart from "@/components/charts/SpendingBreakdownChart";
import AnimatedPage from "@/components/shared/AnimatedPage";
import StoreProvider from "@/components/shared/StoreProvider";
import { formatCurrency } from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";

function AnalyticsContent() {
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
          Visual insights into performance, savings, and spending behavior.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Income</p>
          <h3 className="mt-2 text-2xl font-bold text-emerald-400">
            {formatCurrency(income)}
          </h3>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <p className="text-sm text-slate-400">Expenses</p>
          <h3 className="mt-2 text-2xl font-bold text-white">
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

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Income vs Expenses</h2>
            <p className="text-sm text-slate-400">
              Historical monthly comparison
            </p>
          </div>
          <IncomeExpenseChart />
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Savings Trend</h2>
            <p className="text-sm text-slate-400">
              Track surplus consistency over time
            </p>
          </div>
          <SavingsTrendChart />
        </section>
      </div>

      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Spending Breakdown</h2>
          <p className="text-sm text-slate-400">
            Category-wise expense allocation this month
          </p>
        </div>
        <SpendingBreakdownChart />
      </section>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <AnimatedPage>
      <StoreProvider>
        <AnalyticsContent />
      </StoreProvider>
    </AnimatedPage>
  );
}