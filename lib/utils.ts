import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parseISO } from "date-fns";
import type { TransactionCategory } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string) {
  return format(parseISO(date), "MMM dd, yyyy");
}

export function getCategoryIcon(category: TransactionCategory) {
  const icons: Record<TransactionCategory, string> = {
    salary: "💼",
    freelance: "💻",
    food: "🍔",
    transport: "🚗",
    entertainment: "🎬",
    health: "🏥",
    shopping: "🛍️",
    utilities: "⚡",
    rent: "🏠",
    investment: "📈",
    other: "📦",
  };

  return icons[category];
}

export function getCategoryLabel(category: TransactionCategory) {
  const labels: Record<TransactionCategory, string> = {
    salary: "Salary",
    freelance: "Freelance",
    food: "Food & Dining",
    transport: "Transport",
    entertainment: "Entertainment",
    health: "Health",
    shopping: "Shopping",
    utilities: "Utilities",
    rent: "Rent",
    investment: "Investment",
    other: "Other",
  };

  return labels[category];
}

export function calculatePercentage(spent: number, limit: number) {
  if (limit === 0) return 0;
  return Math.min(Math.round((spent / limit) * 100), 100);
}

export function getBudgetStatus(percentage: number) {
  if (percentage >= 90) {
    return {
      label: "Critical",
      textColor: "text-red-400",
      bgColor: "bg-red-500/10",
    };
  }

  if (percentage >= 75) {
    return {
      label: "Warning",
      textColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
    };
  }

  return {
    label: "On Track",
    textColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  };
}