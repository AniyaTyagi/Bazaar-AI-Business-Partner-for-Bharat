'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Sparkles, 
  TrendingUp, 
  Wallet, 
  Users, 
  Play, 
  Code2, 
  BrainCircuit,
  Database,
  Building2,
  Download,
  Search,
  Activity,
  Bell,
  ShieldCheck,
  ChevronDown,
  Layers,
  Terminal
} from 'lucide-react';
import { ScenarioPreset } from '../types';
import { AnalyticsService } from '../services/analytics';

interface NavbarProps {
  activeTab: 'dashboard' | 'chat' | 'customers' | 'munim' | 'eval';
  setActiveTab: (tab: 'dashboard' | 'chat' | 'customers' | 'munim' | 'eval') => void;
  isLiveMode: boolean;
  onSelectPreset: (preset: ScenarioPreset) => void;
  selectedPresetId?: string;
  onToggleAuditLogs?: () => void;
}

export const DEMO_PRESETS: ScenarioPreset[] = [
  {
    id: 's1',
    title: 'Scenario 1: Executive Sales Overview',
    prompt: 'What happened with my business today?',
    targetAgent: 'bazaar',
    description: 'Bazaar analyzes today\'s ₹48,320 sales (+14.2%) and evening surge.'
  },
  {
    id: 's2',
    title: 'Scenario 2: Monday Dip Root Cause',
    prompt: 'Why did my sales drop last Monday?',
    targetAgent: 'bazaar',
    description: 'Bazaar inspects 5,000 TXs to uncover 32% drop in 6-9 PM repeat customers.'
  },
  {
    id: 's3',
    title: 'Scenario 3: RFM Customer Targeting',
    prompt: 'Which customers should I target for maximum revenue?',
    targetAgent: 'bazaar',
    description: 'Bazaar identifies 47 dormant high-value customers.'
  },
  {
    id: 's4',
    title: 'Scenario 4: Working Capital Liquidity',
    prompt: 'How much money do I actually have and when is my next settlement?',
    targetAgent: 'munim',
    description: 'Munim checks ₹31.2K settlement & ₹18.5K supplier dues to confirm cash cushion.'
  },
  {
    id: 's5',
    title: 'Scenario 5: Joint Campaign Decision',
    prompt: 'Should I run a weekend offer for my store?',
    targetAgent: 'joint',
    description: 'Bazaar & Munim collaborate to create & budget a ₹5,000 campaign.'
  }
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isLiveMode,
  onSelectPreset,
  selectedPresetId,
  onToggleAuditLogs
}) => {
  const [activeBranch, setActiveBranch] = useState('Lajpat Nagar Flagship');
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      
      {/* Enterprise Top System Bar */}
      <div className="bg-[#0C2340] text-slate-200 text-xs px-4 lg:px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
            <span className="font-mono font-bold text-slate-100">RAZORPAY ENTERPRISE PLATFORM</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300 font-mono">MID: rzp_m_9831a4f8</span>
          </div>

          <div className="hidden md:flex items-center gap-2 border-l border-slate-700 pl-4 text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" />
            <span>Production API v2.4</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-medium">99.99% Gateway Uptime</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => AnalyticsService.exportTransactionsCSV()}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors text-[11px]"
          >
            <Download className="w-3 h-3 text-[#0052FF]" />
            <span>Export CSV Report</span>
          </button>

          {onToggleAuditLogs && (
            <button
              onClick={onToggleAuditLogs}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors text-[11px]"
            >
              <Terminal className="w-3 h-3 text-amber-400" />
              <span>API Audit Logs</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-bold">
            <span>LIVE ENVIRONMENT</span>
          </div>
        </div>
      </div>

      {/* Main Enterprise Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Merchant & Outlet Selector */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0052FF] flex items-center justify-center text-white shadow-sm font-black tracking-tight text-lg">
              B
            </div>

            <div className="relative">
              <button
                onClick={() => setIsOrgDropdownOpen(!isOrgDropdownOpen)}
                className="text-left group flex items-center gap-2 focus:outline-none"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xl tracking-tight text-[#0C2340]">BAZAAR</span>
                    <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#0052FF] border border-blue-200">
                      Enterprise Copilot
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0052FF]" />
                    <span className="font-bold text-slate-900">Sharma General Store</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[#0052FF] font-semibold flex items-center gap-1">
                      {activeBranch}
                      <ChevronDown className="w-3 h-3" />
                    </span>
                  </p>
                </div>
              </button>

              {/* Branch Dropdown */}
              {isOrgDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 text-xs space-y-1 animate-fadeIn">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Merchant Branch</div>
                  {[
                    'Lajpat Nagar Flagship',
                    'Karol Bagh Outlet',
                    'Connaught Place Superstore'
                  ].map((branch) => (
                    <button
                      key={branch}
                      onClick={() => {
                        setActiveBranch(branch);
                        setIsOrgDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-between ${
                        activeBranch === branch ? 'bg-blue-50 text-[#0052FF] font-bold' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{branch}</span>
                      {activeBranch === branch && <span className="w-2 h-2 rounded-full bg-[#0052FF]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enterprise Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-[#0052FF] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            Executive Overview
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-[#0052FF] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            AI Operations Copilot
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'customers'
                ? 'bg-[#0052FF] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Customer CRM &amp; RFM
          </button>

          <button
            onClick={() => setActiveTab('munim')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'munim'
                ? 'bg-[#059669] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            RazorpayX &amp; Munim
          </button>

          <button
            onClick={() => setActiveTab('eval')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
              activeTab === 'eval'
                ? 'bg-amber-500 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            Benchmarking &amp; Audit
          </button>
        </nav>

        {/* Enterprise Benchmark Presets Selector */}
        <div className="hidden xl:flex items-center gap-3">
          <div className="relative">
            <select
              onChange={(e) => {
                const p = DEMO_PRESETS.find(pr => pr.id === e.target.value);
                if (p) onSelectPreset(p);
              }}
              value={selectedPresetId || ''}
              className="bg-white text-slate-800 border border-slate-300 text-xs rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-[#0052FF] cursor-pointer appearance-none shadow-sm font-semibold"
            >
              <option value="" disabled>⚡ Executive Scenario Benchmarks</option>
              {DEMO_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
            <Play className="w-3 h-3 text-[#0052FF] absolute right-3 top-3 pointer-events-none" />
          </div>
        </div>

      </div>
    </header>
  );
};
