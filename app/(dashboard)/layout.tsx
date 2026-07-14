"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeftRight,
  BarChart3,
  LayoutDashboard,
  Menu,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Transactions", href: "/transactions", icon: ArrowLeftRight },
  { label: "Budgets", href: "/budgets", icon: Wallet },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Mobile overlay */}
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950/95 p-6 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-semibold">Finance Flow</span>
          </Link>

          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X className="h-5 w-5 text-slate-300" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-blue-600/15 text-blue-400"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold">
              UA
            </div>
            <div>
              <p className="text-sm font-medium">Usman Ali</p>
              <p className="text-xs text-slate-400">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">
          <button onClick={() => setOpen(true)} className="lg:hidden">
            <Menu className="h-5 w-5 text-slate-300" />
          </button>

          <p className="hidden text-sm text-slate-400 lg:block">
            Finance Flow Dashboard
          </p>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 sm:block">
              July 2026
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold">
              UA
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}