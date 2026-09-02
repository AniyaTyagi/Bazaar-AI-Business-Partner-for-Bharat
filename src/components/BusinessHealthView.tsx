'use client';

import React from 'react';
import { HeartPulse, Bot, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface BusinessHealthViewProps {
  onOptimize: (prompt: string) => void;
}

export const BusinessHealthView: React.FC<BusinessHealthViewProps> = ({ onOptimize }) => {
  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Business Health Score</span>
            <span className="munim-badge-navy">Live Audit</span>
          </h1>
          <p className="text-xs text-slate-500 font-bold mt-0.5">Ramesh General Store • Financial &amp; Operational Assessment</p>
        </div>

        <button
          onClick={() => onOptimize("Help me optimize slow moving inventory.")}
          className="px-4 py-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Bot className="w-4 h-4" />
          <span>Ask Munim to Optimize</span>
        </button>
      </div>

      {/* SCORE CARD */}
      <div className="munim-card p-6 md:p-8 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-2 border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-200 flex items-center justify-center text-[#1B3A6B] shrink-0">
              <div className="text-center">
                <span className="text-3xl font-black block leading-none">78</span>
                <span className="text-[10px] font-bold text-slate-500">/ 100</span>
              </div>
            </div>

            <div>
              <span className="munim-badge-navy mb-1.5 inline-block">HEALTHY BUSINESS</span>
              <h2 className="text-xl font-extrabold text-slate-900">Your business is healthy</h2>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Sales velocity &amp; cash flow are strong. Inventory turnover has room for optimization.
              </p>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 space-y-1.5 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              <span>Razorpay TDR Audit: Passed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#059669]" />
              <span>Working Capital Buffer: Safe</span>
            </div>
          </div>
        </div>
      </div>

      {/* BREAKDOWN METERS */}
      <div className="munim-card p-6 bg-white space-y-4">
        <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          Health Breakdown Meters
        </h3>

        <div className="space-y-4 text-xs font-bold">
          
          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-800 flex items-center gap-2">
                <span>Sales Growth &amp; Velocity</span>
                <span className="text-[#1B3A6B]">🟢 91 / 100</span>
              </span>
              <span className="text-slate-500">Strong</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-[#1B3A6B] rounded-full" style={{ width: '91%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-800 flex items-center gap-2">
                <span>Cash Flow Stability</span>
                <span className="text-[#1B3A6B]">🟢 82 / 100</span>
              </span>
              <span className="text-slate-500 font-bold">Healthy Buffer</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-[#1B3A6B] rounded-full" style={{ width: '82%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-800 flex items-center gap-2">
                <span>Inventory Turnover</span>
                <span className="text-amber-700">🟡 67 / 100</span>
              </span>
              <span className="text-amber-700 font-bold">Action Needed</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '67%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-800 flex items-center gap-2">
                <span>Vendor Expenses</span>
                <span className="text-amber-700">🟡 63 / 100</span>
              </span>
              <span className="text-amber-700 font-bold">High Supplier Cost</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '63%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span className="text-slate-800 flex items-center gap-2">
                <span>Customer Loyalty &amp; Retention</span>
                <span className="text-[#1B3A6B]">🟢 86 / 100</span>
              </span>
              <span className="text-slate-500 font-bold">High Repeat Velocity</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-[#1B3A6B] rounded-full" style={{ width: '86%' }} />
            </div>
          </div>

        </div>
      </div>

      {/* MUNIM'S ADVICE */}
      <div className="munim-card p-5 bg-amber-50/70 border-2 border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
            🤖
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-amber-800 uppercase tracking-wider">Munim Financial Advice</span>
            <h3 className="text-sm font-black text-slate-900">₹18,000 is currently stuck in slow-moving inventory.</h3>
            <p className="text-xs text-slate-600 font-medium">Bundling detergents with FMCG staples can free up cash flow within 5 days.</p>
          </div>
        </div>

        <button
          onClick={() => onOptimize("Help me optimize slow moving inventory.")}
          className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 shrink-0"
        >
          Help me optimize
        </button>
      </div>

    </div>
  );
};
