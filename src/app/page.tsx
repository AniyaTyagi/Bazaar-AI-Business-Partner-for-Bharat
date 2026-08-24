'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, DEMO_PRESETS } from '../components/Navbar';
import { LandingHero } from '../components/LandingHero';
import { DashboardView } from '../components/DashboardView';
import { AIChatView } from '../components/AIChatView';
import { CustomerIntelligenceView } from '../components/CustomerIntelligenceView';
import { FinanceMunimView } from '../components/FinanceMunimView';
import { EvaluationView } from '../components/EvaluationView';
import { LaunchCampaignModal } from '../components/LaunchCampaignModal';
import { AuditLogsModal } from '../components/AuditLogsModal';
import { AnalyticsService } from '../services/analytics';
import { RazorpayService } from '../services/razorpay';
import { ScenarioPreset } from '../types';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'customers' | 'munim' | 'eval'>('dashboard');
  const [hasEntered, setHasEntered] = useState(false);
  const [chatPrompt, setChatPrompt] = useState<string | undefined>(undefined);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isAuditLogsModalOpen, setIsAuditLogsModalOpen] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const summary = AnalyticsService.getBusinessSummary();
  const isLive = RazorpayService.isLiveMode();

  const handleQuickAction = (promptText: string) => {
    setChatPrompt(promptText);
    setActiveTab('chat');
  };

  const handleSelectPreset = (preset: ScenarioPreset) => {
    setSelectedPresetId(preset.id);
    setChatPrompt(preset.prompt);
    setActiveTab('chat');
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0052FF] animate-pulse mx-auto" />
          <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">Loading BAZAAR Enterprise Platform...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Enterprise Top Navbar Command Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLiveMode={isLive}
        onSelectPreset={handleSelectPreset}
        selectedPresetId={selectedPresetId}
        onToggleAuditLogs={() => setIsAuditLogsModalOpen(true)}
      />

      {/* Main Enterprise Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {/* Landing Hero Card for Initial Welcome */}
        {!hasEntered && activeTab === 'dashboard' && (
          <LandingHero onEnter={() => setHasEntered(true)} />
        )}

        {/* Enterprise Views */}
        {activeTab === 'dashboard' && (
          <DashboardView summary={summary} onQuickAction={handleQuickAction} />
        )}

        {activeTab === 'chat' && (
          <AIChatView
            initialPrompt={chatPrompt}
            onLaunchCampaign={() => setIsCampaignModalOpen(true)}
          />
        )}

        {activeTab === 'customers' && (
          <CustomerIntelligenceView onTargetSegment={handleQuickAction} />
        )}

        {activeTab === 'munim' && (
          <FinanceMunimView onAskMunim={handleQuickAction} />
        )}

        {activeTab === 'eval' && (
          <EvaluationView />
        )}

      </main>

      {/* Interactive Launch Campaign Modal */}
      <LaunchCampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
      />

      {/* Enterprise API Audit Logs Modal */}
      <AuditLogsModal
        isOpen={isAuditLogsModalOpen}
        onClose={() => setIsAuditLogsModalOpen(false)}
      />

      {/* Persistent Enterprise Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-black text-[#0C2340]">BAZAAR</span>
            <span>— Enterprise AI Copilot for Razorpay Merchants</span>
          </div>
          <div className="text-slate-500 font-mono text-[11px]">
            Production API v2.4 • PCI-DSS Level 1 Compliant • MID: rzp_m_9831a4f8
          </div>
        </div>
      </footer>
    </div>
  );
}
