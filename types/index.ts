export type TransactionType = "income" | "expense" | "transfer";

export type TransactionCategory =
  | "salary"
  | "freelance"
  | "food"
  | "transport"
  | "entertainment"
  | "health"
  | "shopping"
  | "utilities"
  | "rent"
  | "investment"
  | "other";

export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  status: TransactionStatus;
  date: string;
  merchant?: string;
  description?: string;
}

export interface Budget {
  id: string;
  category: TransactionCategory;
  limit: number;
  spent: number;
  period: "monthly" | "weekly" | "yearly";
  color: string;
}

export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "credit" | "investment";
  balance: number;
  currency: string;
  lastFour?: string;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}