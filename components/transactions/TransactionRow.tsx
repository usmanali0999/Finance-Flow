import type { Transaction } from "@/types";
import {
  cn,
  formatCurrency,
  formatDate,
  getCategoryIcon,
  getCategoryLabel,
} from "@/lib/utils";

interface TransactionRowProps {
  transaction: Transaction;
}

const statusStyles = {
  completed: "bg-emerald-500/10 text-emerald-400",
  pending: "bg-amber-500/10 text-amber-400",
  failed: "bg-red-500/10 text-red-400",
};

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center gap-4 rounded-xl px-4 py-4 transition hover:bg-white/5">
      {/* Category Icon */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
        {getCategoryIcon(transaction.category)}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-white">
            {transaction.title}
          </p>
          <span
            className={cn(
              "hidden shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize sm:inline-flex",
              statusStyles[transaction.status]
            )}
          >
            {transaction.status}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
          <span>
            {transaction.merchant ||
              getCategoryLabel(transaction.category)}
          </span>
          <span>•</span>
          <span>{formatDate(transaction.date)}</span>
        </div>
      </div>

      {/* Amount */}
      <div className="shrink-0 text-right">
        <p
          className={cn(
            "text-sm font-bold",
            isIncome ? "text-emerald-400" : "text-white"
          )}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(transaction.amount)}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {getCategoryLabel(transaction.category)}
        </p>
      </div>
    </div>
  );
}