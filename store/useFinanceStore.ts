import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Account, Budget, Transaction } from "@/types";
import {
  accounts as mockAccounts,
  budgets as mockBudgets,
  transactions as mockTransactions,
} from "@/data/mockData";

interface FinanceState {
  transactions: Transaction[];
  budgets: Budget[];
  accounts: Account[];

  searchQuery: string;
  filterCategory: string;
  filterType: string;

  setSearchQuery: (query: string) => void;
  setFilterCategory: (category: string) => void;
  setFilterType: (type: string) => void;

  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;

  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getNetSavings: () => number;
  getFilteredTransactions: () => Transaction[];
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      budgets: mockBudgets,
      accounts: mockAccounts,

      searchQuery: "",
      filterCategory: "all",
      filterType: "all",

      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilterCategory: (category) => set({ filterCategory: category }),
      setFilterType: (type) => set({ filterType: type }),

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      getTotalIncome: () =>
        get()
          .transactions.filter(
            (t) => t.type === "income" && t.status === "completed"
          )
          .reduce((sum, t) => sum + t.amount, 0),

      getTotalExpenses: () =>
        get()
          .transactions.filter(
            (t) => t.type === "expense" && t.status === "completed"
          )
          .reduce((sum, t) => sum + t.amount, 0),

      getNetSavings: () => {
        const income = get().getTotalIncome();
        const expenses = get().getTotalExpenses();
        return income - expenses;
      },

      getFilteredTransactions: () => {
        const { transactions, searchQuery, filterCategory, filterType } =
          get();

        return transactions.filter((t) => {
          const matchesSearch =
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.merchant?.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesCategory =
            filterCategory === "all" || t.category === filterCategory;

          const matchesType =
            filterType === "all" || t.type === filterType;

          return matchesSearch && matchesCategory && matchesType;
        });
      },
    }),
    {
      name: "finance-flow-storage",
    }
  )
);