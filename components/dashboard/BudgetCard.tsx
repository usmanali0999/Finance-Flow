import type { Budget } from "@/types";
import {
  calculatePercentage,
  cn,
  formatCurrency,
  getBudgetStatus,
  getCategoryIcon,
  getCategoryLabel,
} from "@/lib/utils";

interface BudgetCardProps {
  budget: Budget;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const percentage = calculatePercentage(budget.spent, budget.limit);
  const status = getBudgetStatus(percentage);
  const remaining = budget.limit - budget.spent;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 transition hover:border-white/20">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">
            {getCategoryIcon(budget.category)}
          </span>
          <div>
            <p className="text-sm font-semibold text-white">
              {getCategoryLabel(budget.category)}
            </p>
            <p className="text-xs capitalize text-slate-400">
              {budget.period}
            </p>
          </div>
        </div>

        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            status.textColor,
            status.bgColor
          )}
        >
          {status.label}
        </span>
      </div>

      <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
        <span>{formatCurrency(budget.spent)} spent</span>
        <span>{percentage}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: budget.color,
          }}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>
          Left:{" "}
          <span className={remaining < 0 ? "text-red-400" : "text-white"}>
            {formatCurrency(remaining)}
          </span>
        </span>
        <span>
          Limit:{" "}
          <span className="text-white">{formatCurrency(budget.limit)}</span>
        </span>
      </div>
    </div>
  );
}