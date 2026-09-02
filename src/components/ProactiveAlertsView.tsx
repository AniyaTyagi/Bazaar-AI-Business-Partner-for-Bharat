'use client';

import React from 'react';
import { Bell, Bot, ShoppingCart, Clock, TrendingUp, DollarSign, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ProactiveAlertsViewProps {
  onAction: (promptText: string) => void;
}

export const ProactiveAlertsView: React.FC<ProactiveAlertsViewProps> = ({ onAction }) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Munim Proactive Monitoring</span>
            <span className="munim-badge-navy">Autonomous AI Engine</span>
          </h1>
          <p className="text-xs text-slate-500 font-bold mt-0.5">Munim doesn't wait for you to ask — continuous business monitoring</p>
        </div>

        <button
          onClick={() => onAction("Show all proactive alerts and supplier opportunities.")}
          className="px-4 py-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Bot className="w-4 h-4" />
          <span>Ask Munim</span>
        </button>
      </div>

      {/* AGENT ACTION CENTER DEMO */}
      <div className="munim-card p-6 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 border-2 border-blue-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#1B3A6B] text-white font-black flex items-center justify-center text-sm shadow-xs">
              🤖
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900">Munim is working...</h2>
              <p className="text-[11px] text-slate-500 font-bold">Task: Restock Inventory for Ramesh General Store</p>
            </div>
          </div>
          <span className="munim-badge-navy animate-pulse">AUTONOMOUS AGENT ACTIVE</span>
        </div>

        <div className="space-y-3 text-xs font-bold">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1B3A6B] flex items-center justify-center text-xs">✓</span>
            <span className="text-slate-900">Checked last 30 days sales velocity &amp; stock levels</span>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1B3A6B] flex items-center justify-center text-xs">✓</span>
            <span className="text-slate-900">Predicted demand: Milk (+40), Maggi (+50), Coke (+30)</span>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1B3A6B] flex items-center justify-center text-xs">✓</span>
            <span className="text-slate-900">Compared 5 wholesale suppliers in AI Bazaar</span>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-slate-200/80">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1B3A6B] flex items-center justify-center text-xs">✓</span>
            <span className="text-slate-900">Selected lowest-cost supplier: Sharma Distributors (Save ₹1,240)</span>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900">
            <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-xs animate-pulse">⏳</span>
            <span className="font-black">Waiting for your approval &amp; Razorpay payment authorization</span>
          </div>
        </div>
      </div>

      {/* PROACTIVE ALERTS CARDS LIST */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          Active Proactive Alerts
        </h3>

        <div className="space-y-3">
          
          {/* STOCK ALERT */}
          <div className="munim-card p-5 bg-white border border-rose-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-600 mt-1 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="munim-badge-red">🔴 STOCK ALERT</span>
                  <h4 className="text-sm font-extrabold text-slate-900">Cooking oil may run out in 2 days</h4>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Current stock: 4 bottles remaining. Weekend demand is expected to spike by 35%.
                </p>
              </div>
            </div>

            <button
              onClick={() => onAction("Kal ke liye samaan mangwana hai.")}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shrink-0 transition-colors"
            >
              Buy now
            </button>
          </div>

          {/* CASH FLOW ALERT */}
          <div className="munim-card p-5 bg-white border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-3 h-3 rounded-full bg-amber-500 mt-1 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="munim-badge-amber">🟡 CASH FLOW ALERT</span>
                  <h4 className="text-sm font-extrabold text-slate-900">₹38,000 in supplier payments due this week</h4>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Metro Wholesale ₹18,500 due Friday; Amul Dairy ₹19,500 due Sunday. Projected balance is safe.
                </p>
              </div>
            </div>

            <button
              onClick={() => onAction("Show my pending payments and cash flow.")}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shrink-0 transition-colors"
            >
              View payments
            </button>
          </div>

          {/* DEMAND OPPORTUNITY */}
          <div className="munim-card p-5 bg-white border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-3 h-3 rounded-full bg-[#1B3A6B] mt-1 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="munim-badge-navy">🟢 DEMAND OPPORTUNITY</span>
                  <h4 className="text-sm font-extrabold text-slate-900">Customers bought 42% more cold drinks this weekend</h4>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Stocking up 30 additional Coke 600ml bottles can yield +₹2,100 additional weekend profit.
                </p>
              </div>
            </div>

            <button
              onClick={() => onAction("Kal ke liye samaan mangwana hai.")}
              className="px-4 py-2 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs shrink-0 transition-colors"
            >
              Stock up
            </button>
          </div>

          {/* SAVINGS OPPORTUNITY */}
          <div className="munim-card p-5 bg-white border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="w-3 h-3 rounded-full bg-[#1B3A6B] mt-1 shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="munim-badge-navy">💰 SAVINGS OPPORTUNITY</span>
                  <h4 className="text-sm font-extrabold text-slate-900">Found a supplier who can save you ₹1,240/month</h4>
                </div>
                <p className="text-xs text-slate-600 font-medium mt-1">
                  Sharma Distributors has lowered wholesale rates on FMCG packaged goods by 4.2%.
                </p>
              </div>
            </div>

            <button
              onClick={() => onAction("Kal ke liye samaan mangwana hai.")}
              className="px-4 py-2 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs shrink-0 transition-colors"
            >
              View supplier
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
