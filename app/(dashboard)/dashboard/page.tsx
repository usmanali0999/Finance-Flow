"use client";

import Link from "next/link";
import {
  ArrowRight,
  DollarSign,
  PiggyBank,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import AccountCard from "@/components/dashboard/AccountCard";
import BudgetCard from "@/components/dashboard/BudgetCard";
import TransactionRow from "@/components/transactions/TransactionRow";
import { formatCurrency } from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";

export default function DashboardPage() {
  const {
    accounts,
    budgets,
    transactions,
    getTotalIncome,
    getTotalExpenses,
    getNetSavings,
  } = useFinanceStore();

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const netSavings = getNetSavings();
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  const stats = [
    {
      title: "Total Balance",
      value: formatCurrency(totalBalance),
      change: "+8.2% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Total Income",
      value: formatCurrency(totalIncome),
      change: "+12.5% this month",
      changeType: "positive" as const,
      icon: TrendingUp,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      change: "-3.2% under budget",
      changeType: "positive" as const,
      icon: TrendingDown,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
    },
    {
      title: "Net Savings",
      value: formatCurrency(netSavings),
      change: "Strong surplus",
      changeType: "positive" as const,
      icon: PiggyBank,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-400",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-slate-400">
          Monitor your balances, recent activity, and monthly health.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.title} {...item} />
        ))}
      </div>

      {/* Transactions + Budgets */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Transactions */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Recent Transactions</h2>
              <p className="text-sm text-slate-400">Latest activity</p>
            </div>
            <Link
              href="/transactions"
              className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {transactions.slice(0, 6).map((t) => (
              <TransactionRow key={t.id} transaction={t} />
            ))}
          </div>
        </section>

        {/* Budget Health */}
        <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Budget Health</h2>
              <p className="text-sm text-slate-400">Monthly progress</p>
            </div>
            <Link
              href="/budgets"
              className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
            >
              All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {budgets.slice(0, 4).map((b) => (
              <BudgetCard key={b.id} budget={b} />
            ))}
          </div>
        </section>
      </div>

      {/* Accounts */}
      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
        <div className="mb-5">
          <h2 className="text-lg font-semibold">Accounts</h2>
          <p className="text-sm text-slate-400">
            Combined: {formatCurrency(totalBalance)}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {accounts.map((a) => (
            <AccountCard key={a.id} account={a} />
          ))}
        </div>
      </section>
    </div>
  );
}