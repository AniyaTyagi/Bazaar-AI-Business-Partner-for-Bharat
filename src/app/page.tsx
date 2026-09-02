'use client';

import React, { useState, useEffect } from 'react';
import { AppShell, ActiveTab } from '../components/Navbar';
import { HomeCommandCenter } from '../components/HomeCommandCenter';
import { MunimChatView, SupplierOffer } from '../components/MunimChatView';
import { SupplierComparisonView } from '../components/SupplierComparisonView';
import { PaymentCheckoutModal } from '../components/PaymentCheckoutModal';
import { OrderSuccessModal } from '../components/OrderSuccessModal';
import { BazaarTabView } from '../components/BazaarTabView';
import { BusinessHealthView } from '../components/BusinessHealthView';
import { ProactiveAlertsView } from '../components/ProactiveAlertsView';
import { VoiceAssistantModal } from '../components/VoiceAssistantModal';
import { AuditLogsModal } from '../components/AuditLogsModal';
import { SupportedLanguage } from '../services/multilingual';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [subView, setSubView] = useState<'main' | 'supplier_comparison'>('main');
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('hinglish');

  // Modals & Flows State
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierOffer | null>(null);
  const [comparisonSuppliers, setComparisonSuppliers] = useState<SupplierOffer[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isAuditLogsModalOpen, setIsAuditLogsModalOpen] = useState(false);
  const [completedOrderInfo, setCompletedOrderInfo] = useState<{ id: string; amount: number; supplierName: string }>({
    id: '',
    amount: 0,
    supplierName: '',
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAskMunim = (promptText: string) => {
    setChatPrompt(promptText);
    setSubView('main');
    setActiveTab('munim');
  };

  const handleInitiatePayment = (supplier: SupplierOffer) => {
    setSelectedSupplier(supplier);
    setIsCheckoutModalOpen(true);
  };

  const handleCompareSuppliers = (suppliers: SupplierOffer[]) => {
    setComparisonSuppliers(suppliers);
    setSubView('supplier_comparison');
    setActiveTab('munim');
  };

  const handlePaymentSuccess = (orderId: string, amount: number) => {
    setIsCheckoutModalOpen(false);
    setCompletedOrderInfo({
      id: orderId,
      amount,
      supplierName: selectedSupplier?.name || 'Sharma Distributors',
    });
    setIsSuccessModalOpen(true);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] text-slate-900 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1B3A6B] animate-pulse mx-auto flex items-center justify-center text-white font-black text-2xl">
            M
          </div>
          <p className="text-xs font-black tracking-widest text-[#1B3A6B] uppercase">Starting Munim AI Business Copilot...</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell
      activeTab={activeTab}
      setActiveTab={(tab) => {
        setSubView('main');
        setActiveTab(tab);
      }}
      selectedLanguage={selectedLanguage}
      onLanguageChange={setSelectedLanguage}
      onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
      onOpenAuditLogs={() => setIsAuditLogsModalOpen(true)}
    >
      {/* SCREEN 1 — HOME COMMAND CENTER */}
      {activeTab === 'home' && (
        <HomeCommandCenter
          onAskMunim={handleAskMunim}
          onNavigateToBazaar={() => setActiveTab('bazaar')}
          onNavigateToHealth={() => setActiveTab('health')}
        />
      )}

      {/* SCREEN 2 & 3 & 4 — MUNIM CHAT & HERO FLOW & SUPPLIER COMPARISON */}
      {activeTab === 'munim' && (
        <>
          {subView === 'main' && (
            <MunimChatView
              initialPrompt={chatPrompt}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              onInitiatePayment={handleInitiatePayment}
              onCompareSuppliers={handleCompareSuppliers}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
            />
          )}

          {subView === 'supplier_comparison' && (
            <SupplierComparisonView
              suppliers={comparisonSuppliers}
              onSelectSupplier={(sup) => {
                setSubView('main');
                handleInitiatePayment(sup);
              }}
              onBack={() => setSubView('main')}
            />
          )}
        </>
      )}

      {/* SCREEN 7 — AI BAZAAR TAB */}
      {activeTab === 'bazaar' && (
        <BazaarTabView
          onTriggerRestock={() => handleAskMunim("Kal ke liye samaan mangwana hai.")}
        />
      )}

      {/* SCREEN 8 — BUSINESS HEALTH TAB */}
      {activeTab === 'health' && (
        <BusinessHealthView
          onOptimize={handleAskMunim}
        />
      )}

      {/* SCREEN 9 & 10 — PROACTIVE ALERTS / MORE */}
      {(activeTab === 'alerts' || activeTab === 'more') && (
        <ProactiveAlertsView
          onAction={handleAskMunim}
        />
      )}

      {/* SCREEN 5 — CONFIRM ORDER & PAYMENT CHECKOUT MODAL */}
      <PaymentCheckoutModal
        isOpen={isCheckoutModalOpen}
        supplier={selectedSupplier}
        onClose={() => setIsCheckoutModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* SCREEN 6 — ORDER SUCCESS MODAL */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        orderId={completedOrderInfo.id}
        amount={completedOrderInfo.amount}
        supplierName={completedOrderInfo.supplierName}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setActiveTab('home');
        }}
      />

      {/* VOICE ASSISTANT MODAL */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        onClose={() => setIsVoiceModalOpen(false)}
        onSelectVoicePrompt={handleAskMunim}
      />

      {/* RAZORPAY API AUDIT LOGS MODAL */}
      <AuditLogsModal
        isOpen={isAuditLogsModalOpen}
        onClose={() => setIsAuditLogsModalOpen(false)}
      />
    </AppShell>
  );
}
