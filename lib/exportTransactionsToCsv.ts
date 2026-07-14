import type { Transaction } from "@/types";

function escapeCsvValue(value: string | number | undefined) {
  if (value === undefined || value === null) return "";
  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

export function exportTransactionsToCsv(
  transactions: Transaction[],
  fileName = "transactions"
) {
  const headers = [
    "ID",
    "Title",
    "Amount",
    "Type",
    "Category",
    "Status",
    "Date",
    "Merchant",
    "Description",
  ];

  const rows = transactions.map((transaction) => [
    escapeCsvValue(transaction.id),
    escapeCsvValue(transaction.title),
    escapeCsvValue(transaction.amount),
    escapeCsvValue(transaction.type),
    escapeCsvValue(transaction.category),
    escapeCsvValue(transaction.status),
    escapeCsvValue(transaction.date),
    escapeCsvValue(transaction.merchant),
    escapeCsvValue(transaction.description),
  ]);

  const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}