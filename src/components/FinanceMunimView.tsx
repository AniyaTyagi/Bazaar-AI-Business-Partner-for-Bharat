'use client';

import React, { useState, useEffect } from 'react';
import { Wallet, IndianRupee, Clock, ArrowUpRight, ArrowDownRight, ShieldCheck, CheckCircle2, Sliders, Building, Terminal, Layers } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { AnalyticsService } from '../services/analytics';

interface FinanceMunimViewProps {
  onAskMunim: (prompt: string) => void;
}

export const FinanceMunimView: React.FC<FinanceMunimViewProps> = ({ onAskMunim }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [projectedSales, setProjectedSales] = useState(42000);
  const [supplierBill, setSupplierBill] = useState(18500);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const summary = AnalyticsService.getBusinessSummary();
  const forecast = AnalyticsService.getCashForecast(projectedSales, supplierBill);
  const settlements = AnalyticsService.getSettlements();
  const expenses = AnalyticsService.getExpenses();

  const lowestBalance = Math.min(...forecast.map(f => f.balance));
  const isHealthy = lowestBalance >= 20000;

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-emerald-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider mb-1">
            <Wallet className="w-4 h-4" />
            RazorpayX Treasury &amp; AI Munim Accountant
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Enterprise Working Capital &amp; Settlement Portal</h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">Real-time payouts, TDR tax audit, and cashflow projections for Sharma General Store</p>
        </div>

        <button
          onClick={() => onAskMunim("How much money do I actually have and when is my next settlement?")}
          className="px-5 py-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0"
        >
          <Clock className="w-4 h-4" />
          <span>Ask AI Munim Treasury</span>
        </button>
      </div>

      {/* Core Financial Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="razor-card p-5 hover:shadow-md transition-all">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Today Jama (Collections)</span>
          <div className="text-2xl font-black text-slate-900">₹{summary.todayRevenue.toLocaleString('en-IN')}</div>
          <div className="text-[11px] font-extrabold text-[#059669] mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +14.2% vs Tuesday
          </div>
        </div>

        <div className="razor-card p-5 hover:shadow-md transition-all">
          <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mb-1">Today Kharcha (Expenses)</span>
          <div className="text-2xl font-black text-amber-700">₹12,850</div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">Metro Wholesale inventory</div>
        </div>

        <div className="razor-card p-5 border-emerald-300 bg-emerald-50/20 hover:shadow-md transition-all">
          <span className="text-xs font-extrabold text-[#059669] uppercase tracking-wider block mb-1">Settlement Tomorrow</span>
          <div className="text-2xl font-black text-slate-900">₹{summary.expectedSettlementTomorrow.toLocaleString('en-IN')}</div>
          <div className="text-[11px] font-bold text-[#059669] mt-1">Axis Bank Transfer</div>
        </div>

        <div className="razor-card p-5 border-blue-200 bg-blue-50/20 hover:shadow-md transition-all">
          <span className="text-xs font-extrabold text-[#0052FF] uppercase tracking-wider block mb-1">Net Free Cash (Bachat)</span>
          <div className="text-2xl font-black text-blue-700">₹{(30000 + summary.expectedSettlementTomorrow - supplierBill).toLocaleString('en-IN')}</div>
          <div className="text-[11px] font-extrabold text-[#059669] mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isHealthy ? 'Safe Cash Buffer' : 'Low Buffer Warning'}
          </div>
        </div>

      </div>

      {/* Dynamic Cashflow Scenario Simulator Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#059669]" />
            <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Dynamic Cashflow &amp; Payout Simulator</span>
          </div>
          <span className="text-xs text-slate-500 font-bold">Model custom sales &amp; supplier payout commitments</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-slate-700 font-extrabold">Projected Daily Store Sales:</label>
              <span className="text-[#0052FF] font-black px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200">₹{projectedSales.toLocaleString('en-IN')} / day</span>
            </div>
            <input
              type="range"
              min="20000"
              max="80000"
              step="1000"
              value={projectedSales}
              onChange={(e) => setProjectedSales(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0052FF]"
            />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-slate-700 font-extrabold">Supplier Bill Commitment:</label>
              <span className="text-amber-700 font-black px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200">₹{supplierBill.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={supplierBill}
              onChange={(e) => setSupplierBill(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>
        </div>
      </div>

      {/* 7-Day Cash Flow Forecast Curve */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Wallet className="w-4 h-4 text-[#059669]" />
              7-Day Cash Flow &amp; Working Capital Liquidity Curve
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Projecting cash inflow vs supplier payouts</p>
          </div>
          <span className={`text-xs font-extrabold px-3 py-1.5 rounded-full ${
            isHealthy ? 'bg-emerald-50 text-[#059669] border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            Min Balance Point: ₹{lowestBalance.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="h-72 w-full">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecast}>
                <defs>
                  <linearGradient id="colorBal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="dayName" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0C2340', borderColor: '#334155', borderRadius: '12px', color: '#FFFFFF', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)' }}
                  itemStyle={{ color: '#34D399', fontWeight: 700 }}
                  formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Cash Balance']}
                />
                <Area type="monotone" dataKey="balance" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorBal)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Expense & Settlement Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Settlements Log */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Razorpay Payout &amp; Settlement Logs</h3>
          <div className="space-y-3">
            {settlements.map((s) => (
              <div key={s.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 flex items-center justify-between transition-colors">
                <div>
                  <div className="text-xs font-extrabold text-slate-900">{s.status === 'pending' ? 'Tomorrow' : s.settlementDate}</div>
                  <div className="text-[11px] font-mono text-slate-500">UTR: {s.utr}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-[#059669]">₹{s.netAmount.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-slate-500 font-medium">TDR Deducted: ₹{s.fees + s.tax}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Ledger */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Categorized Business Expenses &amp; Vendor Ledger</h3>
          <div className="space-y-3">
            {expenses.map((exp) => (
              <div key={exp.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 flex items-center justify-between transition-colors">
                <div>
                  <div className="text-xs font-extrabold text-slate-900">{exp.payee}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{exp.category} • {exp.notes}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-black ${exp.status === 'paid' ? 'text-slate-400 line-through' : 'text-amber-700'}`}>
                    ₹{exp.id === 'exp_01' ? supplierBill.toLocaleString('en-IN') : exp.amount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] font-extrabold text-slate-500 uppercase">{exp.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

