import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CreditCard,
  Shield,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

const features = [
  {
    title: "Smart Analytics",
    description:
      "Track spending patterns and monthly performance with interactive visualizations.",
    icon: BarChart3,
  },
  {
    title: "Budget Planning",
    description:
      "Set category budgets and monitor progress with clean visual indicators.",
    icon: Wallet,
  },
  {
    title: "Multi-Account View",
    description:
      "Manage checking, savings, credit, and investment balances in one place.",
    icon: CreditCard,
  },
  {
    title: "Growth Insights",
    description:
      "Understand income trends and optimize savings with actionable insights.",
    icon: TrendingUp,
  },
  {
    title: "Reliable Architecture",
    description:
      "Built with professional patterns, modular components, and scalable structure.",
    icon: Shield,
  },
  {
    title: "Fast & Responsive",
    description:
      "Modern Next.js performance with crisp interactions across all devices.",
    icon: Zap,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Finance Flow</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-400 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#cta" className="transition hover:text-white">
              Get Started
            </a>
          </div>

          <Link
            href="/login"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-500"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
              <Zap className="h-4 w-4" />
              Professional Finance Dashboard
            </div>

            <h1 className="max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
              Manage money with a cleaner,
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                smarter workflow
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Finance Flow helps you monitor income, expenses, budgets, and
              financial health with a modern UI built for clarity and speed.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium transition hover:bg-blue-500"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-slate-200 transition hover:bg-white/10"
              >
                View Features
              </a>
            </div>

            <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">50K+</p>
                <p className="mt-1 text-sm text-slate-400">Users</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">$2.4B</p>
                <p className="mt-1 text-sm text-slate-400">Tracked</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold">99.9%</p>
                <p className="mt-1 text-sm text-slate-400">Uptime</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Total Balance</p>
                <p className="mt-2 text-2xl font-bold">$94,431</p>
                <p className="mt-1 text-sm text-emerald-400">+8.2%</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Net Savings</p>
                <p className="mt-2 text-2xl font-bold">$9,357</p>
                <p className="mt-1 text-sm text-emerald-400">Strong growth</p>
              </div>

              <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-400">Budget Progress</p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Food", pct: 47, color: "bg-amber-400" },
                    { label: "Transport", pct: 40, color: "bg-blue-400" },
                    { label: "Health", pct: 76, color: "bg-emerald-400" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-1 flex justify-between text-sm text-slate-300">
                        <span>{item.label}</span>
                        <span>{item.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-800">
                        <div
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold md:text-4xl">
            Built with real product thinking
          </h2>
          <p className="mt-3 text-slate-400">
            A clean architecture, modular components, and a professional UI
            designed for portfolio quality.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20 hover:bg-white/8"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                  <Icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-7xl px-6 pb-20 pt-8">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-blue-600/10 to-violet-600/10 p-8 md:p-12">
          <h2 className="text-3xl font-bold">Ready to explore?</h2>
          <p className="mt-3 max-w-2xl text-slate-300">
            Sign up and see the full product experience — analytics,
            budgets, transactions, and more.
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:bg-slate-200"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600">
              <TrendingUp className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold text-slate-300">Finance Flow</span>
          </div>

          <p className="text-sm text-slate-600">
            © 2026 Finance Flow. Built by Usman Ali.
          </p>

          <div className="flex gap-6 text-sm text-slate-500">
            <a
              href="https://github.com/usmanali0999"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
            <a href="#" className="transition hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="transition hover:text-white">
              Portfolio
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}