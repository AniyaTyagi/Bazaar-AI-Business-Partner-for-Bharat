'use client';

import React from 'react';
import { ArrowUpRight, Bot, AlertCircle, Clock, ShoppingBag, ChevronRight, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';

interface HomeCommandCenterProps {
  onAskMunim: (prompt: string) => void;
  onNavigateToBazaar: () => void;
  onNavigateToHealth: () => void;
}

export const HomeCommandCenter: React.FC<HomeCommandCenterProps> = ({
  onAskMunim,
  onNavigateToBazaar,
  onNavigateToHealth,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Good morning, Ramesh 👋
          </h1>
          <p className="text-xs text-slate-500 font-bold mt-0.5">Ramesh General Store • Daily Operations Dashboard</p>
        </div>

        <button
          onClick={() => onAskMunim("Kal ke liye samaan mangwana hai.")}
          className="px-4 py-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Bot className="w-4 h-4" />
          <span>Restock Inventory with Munim</span>
        </button>
      </div>

      {/* HERO FINANCIAL CARD */}
      <div className="munim-card p-6 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-blue-200/80">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-1">
              Today's Sales Revenue
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                ₹84,620
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                <ArrowUpRight className="w-3.5 h-3.5" />
                18% vs yesterday
              </span>
            </div>
            <p className="text-xs font-bold text-[#1B3A6B] mt-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>₹18,430 estimated net profit today</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-600 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
            <div>
              <span className="text-slate-400 font-bold block text-[11px] uppercase">Orders</span>
              <span className="text-base font-black text-slate-900">247 orders</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[11px] uppercase">Avg Order</span>
              <span className="text-base font-black text-slate-900">₹342</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold block text-[11px] uppercase">Settlement</span>
              <span className="text-base font-black text-[#059669]">Tomorrow</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROMINENT MUNIM INSIGHT CARD */}
      <div className="munim-card p-6 bg-white border-2 border-[#1B3A6B]/30 shadow-xs relative overflow-hidden">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1B3A6B] flex items-center justify-center text-white font-black text-lg shadow-sm">
              🤖
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>Munim Business Brain</span>
                <span className="munim-badge-navy">Proactive Intelligence</span>
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Good morning, Ramesh. I found 2 things that need your attention today.
              </p>
            </div>
          </div>

          <button
            onClick={() => onAskMunim("What needs my attention today?")}
            className="hidden sm:flex px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1B3A6B] font-extrabold text-xs items-center gap-1.5 transition-colors shrink-0"
          >
            <span>Ask Munim</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* TWO INSIGHT ROWS */}
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0" />
              <div>
                <p className="text-xs font-extrabold text-slate-900">Milk stock may run out tomorrow evening</p>
                <p className="text-[11px] text-slate-600">Based on last 3 days of evening sales velocity</p>
              </div>
            </div>

            <button
              onClick={() => onAskMunim("Kal ke liye samaan mangwana hai.")}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-[11px] transition-colors shrink-0"
            >
              Restock Milk
            </button>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <div>
                <p className="text-xs font-extrabold text-slate-900">₹12,850 customer &amp; vendor payments pending</p>
                <p className="text-[11px] text-slate-600">3 customer credits + Metro Wholesale payout due Friday</p>
              </div>
            </div>

            <button
              onClick={() => onAskMunim("Show my pending payments and cash flow.")}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[11px] transition-colors shrink-0"
            >
              View Dues
            </button>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">Monitoring 20 catalog products &amp; 3 supplier networks</span>
          <button
            onClick={() => onAskMunim("Kal ke liye samaan mangwana hai.")}
            className="text-xs font-extrabold text-[#1B3A6B] hover:underline flex items-center gap-1"
          >
            <span>Ask Munim →</span>
          </button>
        </div>
      </div>

      {/* COMPACT BUSINESS METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="munim-card p-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Today Sales</span>
          <div className="text-xl font-black text-slate-900">₹84,620</div>
          <span className="text-[11px] font-bold text-[#059669] mt-1 block">↑ 18% vs avg</span>
        </div>

        <div className="munim-card p-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Transactions</span>
          <div className="text-xl font-black text-slate-900">247</div>
          <span className="text-[11px] font-bold text-slate-500 mt-1 block">99.2% UPI &amp; Cards</span>
        </div>

        <div className="munim-card p-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Pending Dues</span>
          <div className="text-xl font-black text-amber-700">₹12,850</div>
          <span className="text-[11px] font-bold text-amber-600 mt-1 block">2 vendor payouts</span>
        </div>

        <div className="munim-card p-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Inventory Health</span>
          <div className="text-xl font-black text-emerald-700">82%</div>
          <span className="text-[11px] font-bold text-emerald-600 mt-1 block">Optimal Stock Level</span>
        </div>
      </div>

      {/* TODAY'S OPPORTUNITIES */}
      <div className="munim-card p-5 bg-white border border-slate-200">
        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <span>💰 Today's Sourcing Opportunities</span>
          </h3>
          <span className="text-[11px] text-slate-500 font-bold">AI Bazaar Verified</span>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-sm">Save ₹1,240 on weekly inventory restock</span>
              <span className="munim-badge-navy">Best Value</span>
            </div>
            <p className="text-xs text-slate-600">
              Sharma Distributors offers Milk (+40), Maggi (+50), Coke (+30) for ₹3,770 with free delivery tomorrow.
            </p>
          </div>

          <button
            onClick={() => onAskMunim("Kal ke liye samaan mangwana hai.")}
            className="px-4 py-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 shrink-0"
          >
            View recommendation
          </button>
        </div>
      </div>

    </div>
  );
};
