'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface LandingHeroProps {
  onEnter: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onEnter }) => {
  return (
    <div className="relative rounded-2xl bg-white border border-slate-200 p-6 md:p-8 mb-8 shadow-sm">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0052FF]/10 border border-[#0052FF]/20 text-[#0052FF] text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Razorpay AI Buildathon Submission</span>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-[#0C2340] tracking-tight mb-3">
          Good evening, Aniya👋
        </h1>

        <p className="text-sm md:text-base text-slate-600 mb-6 max-w-2xl leading-relaxed">
          Welcome to <strong className="text-slate-900">BAZAAR</strong> — your Razorpay-powered AI business partner.
          Transforming daily payment data into commercial growth, customer intelligence, and financial health.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onEnter}
            className="px-5 py-3 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2 group"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="flex items-center gap-4 text-xs text-slate-500 border-l border-slate-200 pl-4 py-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              Razorpay Secured
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              Bazaar + Munim Agents Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
