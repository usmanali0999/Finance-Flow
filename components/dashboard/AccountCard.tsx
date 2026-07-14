import { CreditCard, Landmark, PiggyBank, TrendingUp } from "lucide-react";
import type { Account } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";

const config = {
  checking: {
    icon: Landmark,
    gradient: "from-blue-500/20 to-blue-600/10",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  savings: {
    icon: PiggyBank,
    gradient: "from-emerald-500/20 to-emerald-600/10",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  investment: {
    icon: TrendingUp,
    gradient: "from-violet-500/20 to-violet-600/10",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  credit: {
    icon: CreditCard,
    gradient: "from-rose-500/20 to-rose-600/10",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",
  },
};

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const style = config[account.type];
  const Icon = style.icon;

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-gradient-to-br p-5 transition hover:border-white/20",
        style.gradient
      )}
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {account.type}
          </p>
          <h3 className="mt-1 text-sm font-semibold text-white">
            {account.name}
          </h3>
        </div>

        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            style.iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", style.iconColor)} />
        </div>
      </div>

      <p
        className={cn(
          "text-2xl font-bold",
          account.balance < 0 ? "text-red-400" : "text-white"
        )}
      >
        {formatCurrency(account.balance)}
      </p>

      {account.lastFour && (
        <p className="mt-2 text-xs text-slate-500">•••• {account.lastFour}</p>
      )}
    </div>
  );
}