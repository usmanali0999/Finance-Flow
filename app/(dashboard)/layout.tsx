"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeftRight,
  BarChart3,
  LayoutDashboard,
  Loader2,
  LogOut,
  Menu,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

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
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [navigating, setNavigating] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
        return;
      }

      setUserName(
        data.user.user_metadata?.full_name ||
          data.user.email?.split("@")[0] ||
          "User"
      );
      setChecking(false);
    }

    checkAuth();
  }, [router]);

  useEffect(() => {
    setNavigating(null);
  }, [pathname]);

  function handleNavClick(href: string) {
    if (href !== pathname) {
      setNavigating(href);
    }
    setOpen(false);
  }

  async function handleSignOut() {
    await signOut();
    router.push("/login");
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-500" />
          </div>
          <p className="text-sm text-slate-400">Checking auth...</p>
        </div>
      </div>
    );
  }

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
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

        <nav className="flex-1 space-y-1 px-3 py-6">
          <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-slate-500">
            Menu
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const isLoading = navigating === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-blue-600/15 text-blue-400"
                    : isLoading
                    ? "bg-white/5 text-blue-300"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                )}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
                {item.label}

                {isActive && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{userName}</p>
              <p className="truncate text-xs text-slate-400">Pro Plan</p>
            </div>
            <button
              onClick={handleSignOut}
              className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-white"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="lg:hidden">
              <Menu className="h-5 w-5 text-slate-300" />
            </button>

            <div className="hidden lg:block">
              <p className="text-sm font-medium text-white">
                {navItems.find((n) => n.href === pathname)?.label ||
                  "Finance Flow"}
              </p>
              <p className="text-xs text-slate-400">
                Welcome back, {userName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live • July 2026
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold lg:hidden">
              {initials}
            </div>
          </div>
        </header>

        {navigating && (
          <div className="fixed left-0 right-0 top-16 z-40 lg:left-72">
            <div className="h-0.5 w-full overflow-hidden bg-slate-800">
              <div className="h-full animate-pulse bg-gradient-to-r from-blue-500 via-violet-500 to-blue-500" />
            </div>
          </div>
        )}

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}