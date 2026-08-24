# BAZAAR — Your AI Business Partner for Bharat 🚀

> **AI-Powered Merchant Intelligence & Commercial Copilot Platform**  
> *Transforming payment transactions into automated commercial growth, customer intelligence, and financial health for Indian merchants.*

![Next.js 14](https://img.shields.io/badge/Next.js-14.2_App_Router-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## 💡 Overview

Small Indian merchants (kirana stores, retail outlets, FMCG distributors) often operate without dedicated data analysts, CAs, marketing agencies, or finance teams. 

**BAZAAR** acts as a 24/7 AI business partner. By analyzing raw payment transaction streams, settlements, customer purchasing behavior, and vendor ledgers, BAZAAR translates complex business data into simple, actionable Indian-language decisions.

---

## 🤖 Dual AI Agent Architecture

BAZAAR orchestrates two specialized AI agent personas that collaborate to run a smart merchant business:

```
                          ┌───────────────────────────┐
                          │   Merchant / App User     │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │  Multi-Agent Orchestrator │
                          └──────┬─────────────┬──────┘
                                 │             │
                 ┌───────────────┘             └───────────────┐
                 ▼                                             ▼
    ┌──────────────────────────┐                  ┌──────────────────────────┐
    │     AI Bazaar Agent      │                  │     AI Munim Agent       │
    │  (Growth & Commercial)   │                  │  (Treasury & Accounting) │
    ├──────────────────────────┤                  ├──────────────────────────┤
    │ • Sales Anomaly Detection│                  │ • "Aaj Ka Hisaab" Ledger │
    │ • Evening Surge Insights │                  │ • 7-Day Cashflow Curve   │
    │ • RFM Customer Cohorts   │                  │ • Settlement Reconciliation│
    │ • Campaign Link Builder  │                  │ • Vendor Expense Audit   │
    └────────────┬─────────────┘                  └────────────┬─────────────┘
                 │                                             │
                 └───────────────┬─────────────┬───────────────┘
                                 │             │
                                 ▼             ▼
                    ┌───────────────────────────────┐
                    │  Joint Policy Collaboration   │
                    │  (Demand vs. Cashflow Safety) │
                    └───────────────────────────────┘
```

### 1. 📈 AI Bazaar Agent (Growth & Commercial Manager)
* **Sales Anomaly & Surge Analytics:** Pinpoints revenue dips (e.g. 18% Monday drop due to 32% evening customer decline) and co-purchase affinity (e.g. Atta 5kg + Sunflower Oil 1L co-purchase 2.4× multiplier).
* **RFM Customer Intelligence:** Segments customer profiles by Recency, Frequency, and Monetary spend to detect churn risk.
* **Automated Campaign Link Builder:** Generates customized discount offers and digital payment links (`https://rzp.io/l/sharma_store_kitchen50`).

### 2. 🏦 AI Munim Agent (Digital Accountant & Treasury Manager)
* **Aaj Ka Hisaab:** Provides daily Jama (collections) vs Kharcha (expenses) breakdown in simple financial terms.
* **7-Day Cash Flow Forecasting:** Predicts daily liquidity curves, minimum balance points, and safety buffer ratings.
* **Auto-Settlement Payouts:** Tracks direct bank transfer payouts with UTR numbers and gateway fee deductions.
* **Vendor Ledger:** Manages upcoming supplier dues (e.g. Amul Dairy, Metro Wholesale) and scheduled payouts.

### 3. ⚡ Joint Collaboration Engine
* **Policy Validation:** Before approving marketing campaigns, Bazaar (customer demand) and Munim (cash cushion) cross-validate spending to ensure zero cashflow risk.

---

## ✨ Core Platform Features

### 🔴 Real-Time Webhook Telemetry Stream
* **Auto-Streaming Ticker:** Automatically simulates incoming webhook payment events (`payment.captured`, `settlement.processed`, `refund.created`) every 4.5 seconds.
* **Live Telemetry Charts:** Area graphs and payment channel pie charts update live as transactions stream in.

### 🏢 Enterprise Operations Console
* **Multi-Branch Outlet Switcher:** Switch between *Lajpat Nagar Flagship*, *Karol Bagh Outlet*, and *Connaught Place Superstore*.
* **CSV Exporter:** One-click transaction ledger export.
* **API Audit Logs Modal:** Inspect raw webhook payloads, tool routing execution steps, latencies, and PCI-DSS compliance logs.

### 🧪 Evaluation & Benchmark Suite
* **Automated Scenario Testing:** Built-in benchmark suite to evaluate agent routing precision, factual accuracy, tool execution steps, and response latencies (<200ms).

---

## 🛠️ Technology Stack

* **Frontend Framework:** Next.js 14 (App Router)
* **Language:** TypeScript 5.6
* **Styling:** Tailwind CSS 3.4
* **Icons & UI:** Lucide React, Framer Motion
* **Analytics & Charts:** Recharts
* **GenAI Engine Integration:** Google Gemini API (`@google/generative-ai`)

---

## 📊 Dataset Specifications

BAZAAR includes a comprehensive dataset for **Sharma General Store**:
* **5,000+ Payment Transactions:** Spanning 90 days with hourly timestamps, payment methods (UPI, Cards, Netbanking, Links), items, and status logs.
* **500 Customer Profiles:** Phone numbers, locations, total spent, order frequency, and RFM scores.
* **20 FMCG Catalog Items:** Atta, Rice, Oil, Biscuits, Dairy, Spices with cost price, retail price, and stock levels.
* **Settlements & Ledger:** Bank settlement UTR logs and vendor expense ledger.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
* Node.js v18.0.0 or higher
* npm v9.0.0 or higher

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/bazaar-razorpay-ai.git
cd bazaar-razorpay-ai
npm install
```

### 2. Configure Environment Variables (Optional for Live Gemini API)
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: BAZAAR includes built-in fallback orchestration if API keys are omitted).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build Production Bundle
```bash
npm run build
npm start
```

---

## 📜 License

Distributed under the MIT License.
