"use client";

import { useState } from "react";
import type { TransactionCategory, TransactionType } from "@/types";
import { useFinanceStore } from "@/store/useFinanceStore";

interface AddTransactionFormProps {
  onClose: () => void;
}

const categories: { value: TransactionCategory; label: string }[] = [
  { value: "salary", label: "Salary" },
  { value: "freelance", label: "Freelance" },
  { value: "food", label: "Food & Dining" },
  { value: "transport", label: "Transport" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "shopping", label: "Shopping" },
  { value: "utilities", label: "Utilities" },
  { value: "rent", label: "Rent" },
  { value: "investment", label: "Investment" },
  { value: "other", label: "Other" },
];

export default function AddTransactionForm({ onClose }: AddTransactionFormProps) {
  const { addTransaction } = useFinanceStore();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState<TransactionCategory>("food");
  const [merchant, setMerchant] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }

    const newTransaction = {
      id: `txn_${Date.now()}`,
      title: title.trim(),
      amount: parseFloat(amount),
      type,
      category,
      status: "completed" as const,
      date: new Date().toISOString().split("T")[0],
      merchant: merchant.trim() || undefined,
    };

    addTransaction(newTransaction);
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="mb-1.5 block text-sm text-slate-400">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Grocery Shopping"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500"
        />
      </div>

      {/* Amount */}
      <div>
        <label className="mb-1.5 block text-sm text-slate-400">Amount *</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500"
        />
      </div>

      {/* Type */}
      <div>
        <label className="mb-1.5 block text-sm text-slate-400">Type</label>
        <div className="grid grid-cols-2 gap-3">
          {(["income", "expense"] as TransactionType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium capitalize transition ${
                type === t
                  ? t === "income"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="mb-1.5 block text-sm text-slate-400">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TransactionCategory)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value} className="bg-slate-900">
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Merchant */}
      <div>
        <label className="mb-1.5 block text-sm text-slate-400">
          Merchant (optional)
        </label>
        <input
          type="text"
          value={merchant}
          onChange={(e) => setMerchant(e.target.value)}
          placeholder="e.g. Amazon"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Add Transaction
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/10"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}