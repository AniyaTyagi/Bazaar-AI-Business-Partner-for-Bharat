'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface LandingHeroProps {
  onEnter: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onEnter }) => {
  return (
    <div className="rounded-2xl bg-[#0C2340] text-slate-100 p-6 md:p-8 mb-8 shadow-lg border border-slate-700 animate-fadeIn">
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-extrabold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Razorpay Merchant AI Platform</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Welcome to <span className="text-[#0052FF]">BAZAAR</span> — AI Business Partner
        </h1>

        <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed font-medium">
          Transforming daily payment telemetry into commercial growth, customer intelligence, and automated working capital management for Indian Kirana &amp; SMB Merchants.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onEnter}
            className="px-5 py-3 rounded-xl bg-[#0052FF] hover:bg-[#0043D6] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 group"
          >
            <span>Enter Executive Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t sm:border-t-0 sm:border-l border-slate-700 pt-3 sm:pt-0 sm:pl-4">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Razorpay Secured API
            </span>
            <span className="flex items-center gap-1.5 font-bold text-amber-400">
              <Zap className="w-4 h-4" />
              Dual AI Agents (Bazaar + Munim)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


