'use client';

import React from 'react';
import { Home, Bot, ShoppingBag, HeartPulse, Bell, Settings, ShieldCheck, UserCheck, ChevronRight, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '../services/multilingual';

export type ActiveTab = 'home' | 'munim' | 'bazaar' | 'health' | 'alerts' | 'more';

interface AppShellProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onOpenVoiceModal?: () => void;
  onOpenAuditLogs?: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  setActiveTab,
  selectedLanguage,
  onLanguageChange,
  onOpenVoiceModal,
  onOpenAuditLogs,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 flex flex-col md:flex-row font-sans">

      {/* DESKTOP LEFT SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-5 shrink-0 fixed inset-y-0 left-0 z-30 shadow-2xs">

        {/* Brand Logo & Merchant Header */}
        <div className="pb-5 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1B3A6B] flex items-center justify-center text-white font-black text-lg shadow-sm">
              M
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-[#1B3A6B] tracking-tight">Munim</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-blue-50 text-[#1B3A6B] border border-blue-200">
                  AI BRAIN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Business Copilot for SMBs</p>
            </div>
          </div>

          {/* Multilingual Selector */}
          <div className="mt-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase">
              <Globe className="w-3 h-3 text-[#1B3A6B]" />
              <span>Select Voice &amp; App Language</span>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#1B3A6B] focus:outline-none focus:border-[#1B3A6B]"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.nativeName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sidebar Primary Links */}
        <nav className="space-y-1.5 flex-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${activeTab === 'home'
                ? 'bg-blue-50 text-[#1B3A6B] border border-blue-200/80 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            <Home className="w-4 h-4 shrink-0" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('munim')}
            className={`w-full px-3.5 py-2.5 rounded-xl font-extrabold text-xs flex items-center justify-between transition-colors ${activeTab === 'munim'
                ? 'bg-[#1B3A6B] text-white shadow-sm'
                : 'text-slate-700 bg-blue-50/60 hover:bg-blue-100/60 border border-blue-200/60'
              }`}
          >
            <div className="flex items-center gap-3">
              <Bot className="w-4 h-4 shrink-0" />
              <span>Munim AI</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${activeTab === 'munim' ? 'bg-white/20 text-white' : 'bg-blue-200 text-blue-900'
              }`}>
              AI Restock
            </span>
          </button>

          <button
            onClick={() => setActiveTab('bazaar')}
            className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${activeTab === 'bazaar'
                ? 'bg-blue-50 text-[#1B3A6B] border border-blue-200/80 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            <span>AI Bazaar Sourcing</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-3 transition-colors ${activeTab === 'health'
                ? 'bg-blue-50 text-[#1B3A6B] border border-blue-200/80 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            <HeartPulse className="w-4 h-4 shrink-0" />
            <span>Business Health</span>
          </button>

          <button
            onClick={() => setActiveTab('alerts')}
            className={`w-full px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-between transition-colors ${activeTab === 'alerts'
                ? 'bg-blue-50 text-[#1B3A6B] border border-blue-200/80 shadow-2xs'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 shrink-0" />
              <span>Proactive Monitoring</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          </button>
        </nav>

        {/* Sidebar Footer Trust Badge */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <button
            onClick={onOpenAuditLogs}
            className="w-full px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-bold flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1B3A6B]" />
              <span>Razorpay Verified API</span>
            </div>
            <ChevronRight className="w-3 h-3 text-slate-400" />
          </button>

          <p className="text-[10px] text-center text-slate-400 font-medium pt-1">
            Munim v3.2 • Unified AI Commerce Engine
          </p>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <header className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1B3A6B] flex items-center justify-center text-white font-black text-base shadow-xs">
            M
          </div>
          <div>
            <h1 className="font-extrabold text-sm text-[#1B3A6B] leading-tight">Munim</h1>
            <p className="text-[10px] text-slate-500 font-medium">Aniya General Store</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-[#1B3A6B]"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.flag} {l.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setActiveTab('alerts')}
            className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 relative"
            aria-label="Alerts"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER SHELL */}
      <main className="flex-1 md:pl-64 min-h-screen flex flex-col pb-20 md:pb-6">
        <div className="max-w-6xl w-full mx-auto p-4 md:p-8 flex-1">
          {children}
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors ${activeTab === 'home' ? 'text-[#1B3A6B] font-bold' : 'text-slate-500 font-medium'
            }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        {/* Prominent Munim Tab */}
        <button
          onClick={() => setActiveTab('munim')}
          className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-2xl transition-all shadow-sm ${activeTab === 'munim'
              ? 'bg-[#1B3A6B] text-white font-extrabold -mt-3 ring-4 ring-blue-100'
              : 'bg-blue-50 text-[#1B3A6B] font-bold border border-blue-200'
            }`}
        >
          <Bot className="w-5 h-5" />
          <span className="text-[10px]">Munim</span>
        </button>

        <button
          onClick={() => setActiveTab('bazaar')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors ${activeTab === 'bazaar' ? 'text-[#1B3A6B] font-bold' : 'text-slate-500 font-medium'
            }`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px]">Bazaar</span>
        </button>

        <button
          onClick={() => setActiveTab('more')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-colors ${activeTab === 'more' || activeTab === 'health' || activeTab === 'alerts'
              ? 'text-[#1B3A6B] font-bold'
              : 'text-slate-500 font-medium'
            }`}
        >
          <HeartPulse className="w-5 h-5" />
          <span className="text-[10px]">More</span>
        </button>
      </nav>

    </div>
  );
};
