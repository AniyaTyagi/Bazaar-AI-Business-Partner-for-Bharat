'use client';

import React, { useState } from 'react';
import { Users, UserCheck, AlertTriangle, ArrowRight, Zap, Sliders, RefreshCw, ShieldCheck, Database, Filter } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';

interface CustomerIntelligenceViewProps {
  onTargetSegment: (prompt: string) => void;
}

export const CustomerIntelligenceView: React.FC<CustomerIntelligenceViewProps> = ({ onTargetSegment }) => {
  const [minOrders, setMinOrders] = useState(3);
  const [inactiveDays, setInactiveDays] = useState(14);
  const [minSpent, setMinSpent] = useState(500);

  const segments = AnalyticsService.getCustomerSegments(minOrders, inactiveDays, minSpent);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#0052FF] uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            Enterprise Merchant CRM &amp; RFM Matrix
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Customer Intelligence &amp; LTV Engine</h1>
          <p className="text-xs text-slate-500 mt-1">RFM Scoring (Recency, Frequency, Monetary) for 500 merchant customer profiles</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">Total Profiles</span>
            <span className="text-lg font-black text-slate-900">{segments.total}</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
            <span className="text-[10px] text-amber-800 block uppercase font-bold">Dormant High-Value</span>
            <span className="text-lg font-black text-amber-700">{segments.dormantHighValueCount}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Cohort Builder Filter Panel */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#0052FF]" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Enterprise RFM Filter Controls</span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Recalculating LTV &amp; Churn Risk dynamically</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div>
            <label className="text-slate-600 font-bold block mb-1">Frequency (Min Orders): <span className="text-[#0052FF]">{minOrders} orders</span></label>
            <input
              type="range"
              min="1"
              max="8"
              value={minOrders}
              onChange={(e) => setMinOrders(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0052FF]"
            />
          </div>

          <div>
            <label className="text-slate-600 font-bold block mb-1">Recency (Inactive Days): <span className="text-amber-600">{inactiveDays} days</span></label>
            <input
              type="range"
              min="7"
              max="45"
              step="1"
              value={inactiveDays}
              onChange={(e) => setInactiveDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          <div>
            <label className="text-slate-600 font-bold block mb-1">Monetary (Min Spend): <span className="text-[#059669]">₹{minSpent}</span></label>
            <input
              type="range"
              min="250"
              max="2000"
              step="50"
              value={minSpent}
              onChange={(e) => setMinSpent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#059669]"
            />
          </div>
        </div>
      </div>

      {/* Featured AI Recommendation Box: Dynamic High-Value Dormant Customers */}
      <div className="bg-white p-6 rounded-2xl border border-amber-300 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Enterprise Retargeting Cohort</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">{segments.dormantHighValueCount} High-Value Customers Identified</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bazaar AI detected {segments.dormantHighValueCount} customers with ≥ {minOrders} orders, spend ≥ ₹{minSpent}, inactive for ≥ {inactiveDays} days. Average basket: <strong>₹940</strong>.
            </p>
          </div>

          <button
            onClick={() => onTargetSegment(`Target the ${segments.dormantHighValueCount} dormant customers with custom offer`)}
            className="px-5 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
          >
            <Zap className="w-4 h-4" />
            <span>Trigger Retargeting Workflow ({segments.dormantHighValueCount} Customers)</span>
          </button>
        </div>
      </div>

      {/* Top Customer Profiles Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#059669]" />
              RFM Segment Matrix &amp; Churn Telemetry
            </h3>
            <p className="text-xs text-slate-500">Sharma General Store high-value clientele</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Customer Name</th>
                <th className="py-3 px-4">Phone / Location</th>
                <th className="py-3 px-4">Total LTV</th>
                <th className="py-3 px-4">Orders</th>
                <th className="py-3 px-4">RFM Score</th>
                <th className="py-3 px-4">Churn Risk</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {segments.topSpenders.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-[#0052FF] font-bold text-xs">
                      {cust.name.charAt(0)}
                    </div>
                    <span>{cust.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <div>{cust.phone}</div>
                    <div className="text-[10px] text-slate-400">{cust.location}</div>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#059669]">₹{cust.totalSpent.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-700">{cust.totalOrders} orders</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0052FF] text-[11px]">{cust.rfmScore}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      cust.churnRisk === 'High' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {cust.churnRisk} Risk
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                      cust.isDormant
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}>
                      {cust.isDormant ? 'Dormant' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
