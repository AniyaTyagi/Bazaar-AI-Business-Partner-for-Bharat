'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ArrowRight, Lock, CreditCard, Smartphone } from 'lucide-react';
import { SupplierOffer } from './MunimChatView';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  supplier: SupplierOffer | null;
  onClose: () => void;
  onPaymentSuccess: (orderId: string, amount: number) => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  supplier,
  onClose,
  onPaymentSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'review' | 'upi_pin'>('review');
  const [upiPin, setUpiPin] = useState('');

  if (!isOpen || !supplier) return null;

  const handleConfirmPay = () => {
    setPaymentStep('upi_pin');
  };

  const handleAuthorizeUpi = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const mockOrderId = `order_rzp_${Math.floor(100000 + Math.random() * 900000)}`;
      onPaymentSuccess(mockOrderId, supplier.totalAmount);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-slideUp">

        {/* MODAL HEADER */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1B3A6B] text-white font-bold text-xs flex items-center justify-center">
              rzp
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900">Confirm &amp; Pay Order</h2>
              <p className="text-[10px] text-slate-500 font-medium">Powered by Razorpay Payments</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: ORDER REVIEW */}
        {paymentStep === 'review' && (
          <div className="p-6 space-y-5">

            {/* ORDER DETAILS */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Supplier</span>
                  <p className="font-extrabold text-slate-900">{supplier.name}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Delivery</span>
                  <p className="font-extrabold text-[#1B3A6B]">{supplier.deliveryTime}</p>
                </div>
              </div>

              {/* PRODUCTS LIST */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">3 Products Included</span>
                {supplier.items.map((it) => (
                  <div key={it.id} className="flex justify-between items-center text-slate-700 font-medium">
                    <span>{it.name} (+{it.quantity})</span>
                    <span className="font-bold text-slate-900">₹{it.total}</span>
                  </div>
                ))}
              </div>

              {/* PRICING SUMMARY */}
              <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Order Items Subtotal</span>
                  <span>₹{supplier.totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Delivery Charge</span>
                  <span className="text-[#059669] font-bold">FREE</span>
                </div>
                <div className="pt-2 border-t border-blue-200/60 flex justify-between items-baseline">
                  <span className="font-extrabold text-slate-900 text-sm">Total Payable</span>
                  <span className="text-xl font-black text-[#1B3A6B]">₹{supplier.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD CARD */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center font-bold text-xs border border-blue-200">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Razorpay UPI Payment</p>
                  <p className="text-[11px] text-slate-500 font-mono">UPI ID: Aniya@gpay (•••• 4821)</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Auto-Verified</span>
            </div>

            {/* TRUST INDICATOR */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#1B3A6B]" />
              <span>Secure payment powered by Razorpay</span>
            </div>

            {/* PRIMARY CTA */}
            <button
              onClick={handleConfirmPay}
              className="w-full py-3.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Confirm &amp; Pay ₹{supplier.totalAmount.toLocaleString('en-IN')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: SIMULATED UPI AUTHORIZATION */}
        {paymentStep === 'upi_pin' && (
          <div className="p-6 space-y-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#1B3A6B] flex items-center justify-center mx-auto border border-blue-200">
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900">Enter UPI PIN to Authorize</h3>
              <p className="text-xs text-slate-500 mt-1">Paying ₹{supplier.totalAmount.toLocaleString('en-IN')} to {supplier.name}</p>
            </div>

            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`w-10 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-black ${upiPin.length > idx ? 'border-[#1B3A6B] bg-blue-50 text-[#1B3A6B]' : 'border-slate-200 bg-slate-50'
                    }`}
                >
                  {upiPin.length > idx ? '•' : ''}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto text-sm font-bold text-slate-800">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => upiPin.length < 4 && setUpiPin(prev => prev + num)}
                  className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 transition-colors"
                >
                  {num}
                </button>
              ))}
              <button
                onClick={() => setUpiPin('')}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-500"
              >
                Clear
              </button>
              <button
                onClick={() => upiPin.length < 4 && setUpiPin(prev => prev + '0')}
                className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200"
              >
                0
              </button>
              <button
                onClick={handleAuthorizeUpi}
                disabled={isProcessing}
                className="py-2.5 rounded-xl bg-[#1B3A6B] text-white hover:bg-[#142d54] text-xs font-extrabold flex items-center justify-center"
              >
                {isProcessing ? '...' : '✓'}
              </button>
            </div>

            <button
              onClick={handleAuthorizeUpi}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <span>Processing Payment with Razorpay...</span>
              ) : (
                <span>Authorize Payment</span>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
