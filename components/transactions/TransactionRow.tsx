"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { Transaction } from "@/types";
import {
  cn,
  formatCurrency,
  formatDate,
  getCategoryIcon,
  getCategoryLabel,
} from "@/lib/utils";
import { useFinanceStore } from "@/store/useFinanceStore";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

interface TransactionRowProps {
  transaction: Transaction;
}

const statusStyles = {
  completed: "bg-emerald-500/10 text-emerald-400",
  pending: "bg-amber-500/10 text-amber-400",
  failed: "bg-red-500/10 text-red-400",
};

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const { deleteTransaction } = useFinanceStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const isIncome = transaction.type === "income";

  return (
    <>
      <div className="group flex items-center gap-4 rounded-xl px-4 py-4 transition hover:bg-white/5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl">
          {getCategoryIcon(transaction.category)}
        </div>

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

        <button
          onClick={() => setShowConfirm(true)}
          className="shrink-0 rounded-lg p-2 text-slate-600 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100"
          title="Delete transaction"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${transaction.title}"? This action cannot be undone.`}
        onConfirm={() => {
          deleteTransaction(transaction.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}