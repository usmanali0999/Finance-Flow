"use client";

import { useState } from "react";
import { Download, Plus, Search, ArrowLeftRight } from "lucide-react";
import TransactionRow from "@/components/transactions/TransactionRow";
import AddTransactionForm from "@/components/transactions/AddTransactionForm";
import Modal from "@/components/shared/Modal";
import AnimatedPage from "@/components/shared/AnimatedPage";
import EmptyState from "@/components/shared/EmptyState";
import Toast from "@/components/shared/Toast";
import { useFinanceStore } from "@/store/useFinanceStore";
import { exportTransactionsToCsv } from "@/lib/exportTransactionsToCsv";

const categories = [
  { value: "all", label: "All Categories" },
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
];

const types = [
  { value: "all", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const {
    searchQuery,
    filterCategory,
    filterType,
    setSearchQuery,
    setFilterCategory,
    setFilterType,
    getFilteredTransactions,
  } = useFinanceStore();

  const filtered = getFilteredTransactions();

  function handleTransactionAdded() {
    setIsModalOpen(false);
    setToastMessage("Transaction added successfully");
    setShowToast(true);
  }

  function handleExport() {
    exportTransactionsToCsv(filtered, "finance-flow-transactions");
    setToastMessage("Transactions exported as CSV");
    setShowToast(true);
  }

  return (
    <AnimatedPage>
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="mt-2 text-sm text-slate-400">
              Search, filter, and manage your activity.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleExport}
              disabled={filtered.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              <Plus className="h-4 w-4" />
              Add Transaction
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4 md:grid-cols-[1fr_200px_160px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by title or merchant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value} className="bg-slate-900">
                {c.label}
              </option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200"
          >
            {types.map((t) => (
              <option key={t.value} value={t.value} className="bg-slate-900">
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="rounded-2xl border border-white/10 bg-slate-900/60">
          <div className="border-b border-white/10 px-5 py-4">
            <p className="text-sm text-slate-400">
              {filtered.length} transaction(s) found
            </p>
          </div>

          <div className="divide-y divide-white/5">
            {filtered.length > 0 ? (
              filtered.map((t) => (
                <TransactionRow key={t.id} transaction={t} />
              ))
            ) : (
              <EmptyState
                icon={ArrowLeftRight}
                title="No transactions found"
                description="Try adjusting your search or filters. You can also add a new transaction."
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Transaction"
      >
        <AddTransactionForm onClose={handleTransactionAdded} />
      </Modal>

      {/* Toast */}
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </AnimatedPage>
  );
}