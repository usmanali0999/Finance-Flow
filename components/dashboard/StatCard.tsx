import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export default function StatCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition hover:border-white/20">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{value}</h3>
          <div
            className={cn(
              "mt-3 flex items-center gap-1 text-sm font-medium",
              changeType === "positive" && "text-emerald-400",
              changeType === "negative" && "text-red-400",
              changeType === "neutral" && "text-slate-400"
            )}
          >
            {changeType === "positive" && (
              <ArrowUpRight className="h-4 w-4" />
            )}
            {changeType === "negative" && (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span>{change}</span>
          </div>
        </div>

        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            iconBg
          )}
        >
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </div>
    </div>
  );
}