'use client';

import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, Award, Truck, ChevronRight } from 'lucide-react';
import { SupplierOffer } from './MunimChatView';

interface SupplierComparisonViewProps {
  suppliers: SupplierOffer[];
  onSelectSupplier: (supplier: SupplierOffer) => void;
  onBack: () => void;
}

export const SupplierComparisonView: React.FC<SupplierComparisonViewProps> = ({
  suppliers,
  onSelectSupplier,
  onBack,
}) => {
  const recommended = suppliers.find(s => s.isBestMatch) || suppliers[0];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* HEADER BAR */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Best Wholesale Suppliers
          </h1>
          <p className="text-xs text-slate-500 font-medium">Sourced by AI Bazaar for Ramesh General Store</p>
        </div>
      </div>

      {/* RATIONALE BANNER */}
      <div className="munim-card p-5 bg-blue-50/70 border-2 border-blue-300 space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-xs">
            🤖
          </span>
          <h2 className="text-xs font-extrabold text-[#1B3A6B] uppercase tracking-wider">
            Munim AI Recommendation Rationale
          </h2>
        </div>
        <p className="text-xs text-slate-800 leading-relaxed font-semibold">
          Munim selected <strong className="text-slate-900 font-extrabold">{recommended.name}</strong> because they offer the best combination of price (₹{recommended.totalAmount.toLocaleString('en-IN')}), delivery time ({recommended.deliveryTime}), and supplier reliability (★ {recommended.rating}).
        </p>
      </div>

      {/* SUPPLIERS COMPARISON LIST */}
      <div className="space-y-4">
        {suppliers.map((sup) => (
          <div
            key={sup.id}
            className={`munim-card p-6 transition-all ${
              sup.isBestMatch
                ? 'bg-white border-2 border-[#1B3A6B]/50 shadow-md ring-4 ring-blue-50'
                : 'bg-white border border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-black text-slate-900">{sup.name}</h3>
                  {sup.isBestMatch && (
                    <span className="munim-badge-navy">BEST VALUE</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-amber-500" /> ★ {sup.rating} rating</span>
                  <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-slate-400" /> Delivery: {sup.deliveryTime}</span>
                </div>
              </div>

              <div className="text-left md:text-right">
                <div className="text-2xl font-black text-slate-900">₹{sup.totalAmount.toLocaleString('en-IN')}</div>
                <div className="text-xs font-extrabold text-[#1B3A6B]">Save ₹{sup.savings} vs retail</div>
              </div>
            </div>

            {/* PRODUCT BREAKDOWN */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {sup.items.map((it) => (
                <div key={it.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                  <p className="font-extrabold text-slate-900">{it.name}</p>
                  <div className="flex justify-between items-center text-slate-500 mt-1">
                    <span>{it.quantity} units</span>
                    <span className="font-bold text-slate-800">₹{it.total}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECT CTA */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500 font-medium">Includes free delivery &amp; GST invoice</span>
              <button
                onClick={() => onSelectSupplier(sup)}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-xs transition-all active:scale-95 flex items-center gap-2 ${
                  sup.isBestMatch
                    ? 'bg-[#1B3A6B] hover:bg-[#142d54] text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>Choose {sup.name}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
