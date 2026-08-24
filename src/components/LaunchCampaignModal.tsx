'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Send, Link, Copy, ShieldCheck, Edit3 } from 'lucide-react';

interface LaunchCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerDetails?: {
    code: string;
    targetCount: number;
    expectedCost: string;
    expectedUpside: string;
  };
}

export const LaunchCampaignModal: React.FC<LaunchCampaignModalProps> = ({
  isOpen,
  onClose,
  offerDetails: initialOffer = {
    code: 'KITCHEN50',
    targetCount: 47,
    expectedCost: '₹4,800',
    expectedUpside: '+₹8,500'
  }
}) => {
  const [step, setStep] = useState<'confirm' | 'launching' | 'success'>('confirm');
  const [progress, setProgress] = useState(0);

  // Dynamic user editable offer parameters
  const [couponCode, setCouponCode] = useState(initialOffer.code);
  const [discountAmount, setDiscountAmount] = useState(50);
  const [targetCount, setTargetCount] = useState(initialOffer.targetCount);

  if (!isOpen) return null;

  const dynamicCost = `₹${(targetCount * discountAmount).toLocaleString('en-IN')}`;
  const dynamicUpside = `+₹${(targetCount * 180).toLocaleString('en-IN')}`;
  const dynamicRzpLink = `https://rzp.io/l/sharma_store_${couponCode.toLowerCase()}`;

  const handleLaunch = () => {
    setStep('launching');
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setStep('success');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'confirm' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded bg-[#0052FF]/10 border border-[#0052FF]/20 flex items-center justify-center text-[#0052FF]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Dynamic Campaign Launch</h3>
                <p className="text-xs text-slate-500">Jointly approved by AI Bazaar & AI Munim</p>
              </div>
            </div>

            {/* Editable Offer Inputs */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-xs">
              <div className="flex items-center justify-between gap-2">
                <label className="text-slate-600 font-semibold">Coupon Code:</label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-mono font-bold text-[#0052FF] text-right focus:outline-none focus:border-[#0052FF]"
                />
              </div>

              <div className="flex items-center justify-between gap-2">
                <label className="text-slate-600 font-semibold">Discount Amount (₹):</label>
                <select
                  value={discountAmount}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                  className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#0052FF]"
                >
                  <option value={30}>₹30 OFF (Small)</option>
                  <option value={50}>₹50 OFF (Standard)</option>
                  <option value={100}>₹100 OFF (Festival)</option>
                </select>
              </div>

              <div className="flex justify-between py-1 border-t border-slate-200 pt-2">
                <span className="text-slate-600">Target Segment:</span>
                <span className="font-bold text-slate-900">{targetCount} Dormant High-Value Customers</span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-200 pt-2">
                <span className="text-slate-600">Max Projected Spend:</span>
                <span className="font-bold text-[#059669]">{dynamicCost}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-slate-200 pt-2">
                <span className="text-slate-600">Expected Revenue Upside:</span>
                <span className="font-bold text-[#0052FF]">{dynamicUpside}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="w-1/2 py-2.5 rounded bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLaunch}
                className="w-1/2 py-2.5 rounded bg-[#0052FF] hover:bg-[#0043D6] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Launch Campaign
              </button>
            </div>
          </div>
        )}

        {step === 'launching' && (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/30 flex items-center justify-center mx-auto mb-4 text-[#0052FF] animate-spin">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">Generating Dynamic Razorpay Payment Links...</h3>
            <p className="text-xs text-slate-500 mb-6">Broadcasting targeted SMS notifications to {targetCount} customers</p>

            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200 mb-2">
              <div
                className="bg-[#0052FF] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-[#0052FF]">{progress}% completed</span>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto mb-4 text-[#059669]">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Campaign Live & Active!</h3>
            <p className="text-xs text-slate-600 mb-6">
              SMS broadcast sent to <strong className="text-slate-900">{targetCount} customers</strong> with embedded Razorpay payment link.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-emerald-200 mb-6 text-left">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Dynamic Razorpay Payment Link</span>
              <div className="flex items-center justify-between gap-2 bg-white p-2.5 rounded border border-slate-200">
                <span className="text-xs font-mono text-[#0052FF] truncate">{dynamicRzpLink}</span>
                <button
                  onClick={() => alert(`Dynamic Razorpay Payment Link (${dynamicRzpLink}) copied!`)}
                  className="px-2.5 py-1 rounded bg-[#0052FF]/10 text-[#0052FF] hover:bg-[#0052FF]/20 text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('confirm');
                onClose();
              }}
              className="w-full py-2.5 rounded bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-sm transition-colors"
            >
              Done & Return to Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
