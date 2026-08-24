'use client';

import React from 'react';
import { Sparkles, TrendingUp, Wallet, ArrowUpRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { BusinessSummary } from '../types';

interface AIBriefingProps {
  summary: BusinessSummary;
  onTakeAction: (actionText: string) => void;
}

export const AIBriefing: React.FC<AIBriefingProps> = ({ summary, onTakeAction }) => {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 mb-8 shadow-sm">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#0052FF] flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">AI Business Briefing</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                LIVE INSIGHTS
              </span>
            </div>
            <p className="text-xs text-slate-500">Synthesized from 5,000+ Razorpay transactions & financial ledger</p>
          </div>
        </div>

        <button
          onClick={() => onTakeAction('Should I run a weekend offer for my store?')}
          className="px-4 py-2 rounded bg-blue-50 hover:bg-blue-100 text-[#0052FF] border border-blue-200 text-xs font-semibold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500" />
          Ask AI Business Partner
        </button>
      </div>

      {/* Grid of Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today's Sales Stat */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Your Business Today</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-extrabold text-slate-900">₹{summary.todayRevenue.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" />
                +{summary.revenueGrowthPercent}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">vs your normal Tuesday average</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-700 flex items-center justify-between">
            <span>Successful Orders: <strong>{summary.todayOrders}</strong></span>
            <span className="text-emerald-700 font-semibold">{summary.successfulPaymentRate}% Success</span>
          </div>
        </div>

        {/* AI Bazaar Noticed */}
        <div className="bg-blue-50/60 p-5 rounded-xl border border-blue-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#0052FF]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0052FF]">AI Bazaar Noticed</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Evening demand is accelerating</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              6:00 PM – 9:00 PM orders are up <strong className="text-emerald-700">31%</strong>. Atta & Sunflower oil buyers have a 2.4× co-purchase affinity.
            </p>
          </div>
          <div className="mt-4 text-xs font-semibold text-[#0052FF] flex items-center gap-1">
            <span>Growth Potential: +₹6,000–₹9,000</span>
          </div>
        </div>

        {/* AI Munim Noticed */}
        <div className="bg-emerald-50/60 p-5 rounded-xl border border-emerald-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-[#059669]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#059669]">AI Munim Noticed</span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">₹31,200 expected tomorrow</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              After ₹18,500 Amul supplier payments, your net projected free cash balance is <strong className="text-emerald-700">₹42,700</strong>.
            </p>
          </div>
          <div className="mt-4 text-xs font-semibold text-[#059669] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cashflow Status: Healthy & Safe</span>
          </div>
        </div>

      </div>

      {/* Recommended Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Recommended Action</span>
            <p className="text-xs text-slate-900 font-semibold">Create a ₹499 Kitchen Essentials combo offer for Saturday 6-9 PM</p>
          </div>
        </div>

        <button
          onClick={() => onTakeAction('Should I run a weekend offer for my store?')}
          className="w-full sm:w-auto px-4 py-2 rounded bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm"
        >
          <span>Review Recommendation</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
