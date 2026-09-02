'use client';

import React from 'react';
import { CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  orderId: string;
  amount: number;
  supplierName: string;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  orderId,
  amount,
  supplierName,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 sm:p-8 text-center space-y-6 animate-slideUp">
        
        {/* SUCCESS ICON */}
        <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1B3A6B] flex items-center justify-center mx-auto border-4 border-blue-100">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* HEADING & AMOUNT */}
        <div>
          <span className="munim-badge-navy mb-1.5 inline-block">RAZORPAY PAYMENT VERIFIED</span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Order Placed Successfully</h2>
          <p className="text-3xl font-black text-[#1B3A6B] mt-2">₹{amount.toLocaleString('en-IN')}</p>
          <p className="text-xs font-mono text-slate-400 mt-1">Payment ID: {orderId}</p>
        </div>

        {/* ORDER DETAILS */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex justify-between text-slate-600">
            <span>Supplier</span>
            <strong className="text-slate-900">{supplierName}</strong>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Estimated Delivery</span>
            <strong className="text-[#1B3A6B]">Tomorrow Morning</strong>
          </div>
        </div>

        {/* PROACTIVE MUNIM CARD */}
        <div className="p-4 rounded-2xl bg-blue-50/80 border-2 border-blue-200 text-left space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-[#1B3A6B] text-white flex items-center justify-center font-bold text-xs">
              🤖
            </span>
            <h3 className="text-xs font-extrabold text-[#1B3A6B] uppercase tracking-wider">
              Munim Assistant Proactive Action
            </h3>
          </div>
          <p className="text-xs text-slate-800 font-bold leading-relaxed">
            You saved ₹1,240 today. I'll keep an eye on your inventory levels and alert you if sales surge.
          </p>
        </div>

        {/* CTAS */}
        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 text-center"
          >
            Done
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs text-center transition-colors"
          >
            View order details
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1B3A6B]" />
          <span>Transaction secured by Razorpay Gateway</span>
        </div>

      </div>
    </div>
  );
};
