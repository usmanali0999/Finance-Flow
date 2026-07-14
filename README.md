# Finance Flow

A modern personal finance dashboard built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Zustand**, **Recharts**, and **Framer Motion**.

Finance Flow helps users track income, expenses, budgets, account balances, and financial insights through a clean, professional dashboard interface.

---

## Features

- Modern landing page
- Responsive dashboard layout
- Sidebar navigation
- Financial stat cards
- Income / expense / savings charts
- Spending breakdown visualization
- Budget tracking with progress bars
- Transactions page with search and filters
- Add transaction modal
- Delete transaction feature
- Page loading states
- Custom 404 page
- Smooth page animations
- Persistent state with Zustand

---

## Tech Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Zustand**
- **Recharts**
- **Framer Motion**
- **Lucide React**
- **date-fns**

---

## Project Structure

```bash
finance-flow/
│
├── app/
│   ├── (dashboard)/
│   │   ├── analytics/
│   │   ├── budgets/
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   └── layout.tsx
│   ├── globals.css
│   ├── icon.tsx
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── charts/
│   ├── dashboard/
│   ├── shared/
│   └── transactions/
│
├── data/
│   └── mockData.ts
│
├── lib/
│   └── utils.ts
│
├── store/
│   └── useFinanceStore.ts
│
├── types/
│   └── index.ts
│
├── LICENSE
├── PROJECT_PLAN.md
└── README.md