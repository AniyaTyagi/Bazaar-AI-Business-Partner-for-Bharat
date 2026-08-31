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
    <div className="rounded-2xl bg-white border border-slate-200 p-6 mb-8 shadow-xs animate-fadeIn">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#0037B3] flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">AI Business Briefing</h2>
              <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                LIVE INSIGHTS
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Synthesized from 5,000+ Razorpay transactions &amp; financial ledger</p>
          </div>
        </div>

        <button
          onClick={() => onTakeAction('Should I run a weekend offer for my store?')}
          className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-[#0052FF] border border-blue-200/80 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 self-start sm:self-auto shadow-2xs"
        >
          <Zap className="w-4 h-4 text-amber-500" />
          <span>Ask AI Business Partner</span>
        </button>
      </div>

      {/* Grid of Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Today's Sales Stat */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-slate-300 transition-colors">
          <div>
            <span className="text-xs text-slate-500 font-extrabold uppercase tracking-wider">Your Business Today</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-2xl font-black text-slate-900">₹{summary.todayRevenue.toLocaleString('en-IN')}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-0.5">
                <ArrowUpRight className="w-3.5 h-3.5" />
                +{summary.revenueGrowthPercent}%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">vs your normal Tuesday average</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs text-slate-700 flex items-center justify-between font-medium">
            <span>Successful Orders: <strong className="font-extrabold">{summary.todayOrders}</strong></span>
            <span className="text-emerald-700 font-bold">{summary.successfulPaymentRate}% Success</span>
          </div>
        </div>

        {/* AI Bazaar Noticed */}
        <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 flex flex-col justify-between hover:border-blue-300 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#0052FF]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0052FF]">AI Bazaar Noticed</span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">Evening demand is accelerating</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
              6:00 PM – 9:00 PM orders are up <strong className="text-emerald-700">31%</strong>. Atta &amp; Sunflower oil buyers have a 2.4× co-purchase affinity.
            </p>
          </div>
          <div className="mt-4 text-xs font-extrabold text-[#0052FF] flex items-center gap-1">
            <span>Growth Potential: +₹6,000–₹9,000</span>
          </div>
        </div>

        {/* AI Munim Noticed */}
        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-[#059669]" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#059669]">AI Munim Noticed</span>
            </div>
            <h3 className="text-sm font-extrabold text-slate-900">₹31,200 expected tomorrow</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
              After ₹18,500 Amul supplier payments, your net projected free cash balance is <strong className="text-emerald-700">₹42,700</strong>.
            </p>
          </div>
          <div className="mt-4 text-xs font-extrabold text-[#059669] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Cashflow Status: Healthy &amp; Safe</span>
          </div>
        </div>

      </div>

      {/* Recommended Action Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
          <Zap className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Recommended Action: Target 47 dormant customers with ₹50 OFF campaign. Projected upside: +₹8,500.</span>
        </div>
        <button
          onClick={() => onTakeAction('Target the 47 dormant customers with custom offer')}
          className="px-4 py-2 rounded-xl bg-[#0052FF] hover:bg-[#0043D6] text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 shrink-0"
        >
          <span>Review Campaign Proposal</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

