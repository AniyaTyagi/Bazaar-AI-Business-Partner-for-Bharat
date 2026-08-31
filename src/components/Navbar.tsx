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
  Terminal,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs: Array<{ id: 'dashboard' | 'chat' | 'customers' | 'munim' | 'eval'; label: string; icon: React.ComponentType<any>; color: string }> = [
    { id: 'dashboard', label: 'Executive Overview', icon: TrendingUp, color: 'bg-[#0052FF]' },
    { id: 'chat', label: 'AI Operations Copilot', icon: BrainCircuit, color: 'bg-[#0052FF]' },
    { id: 'customers', label: 'Customer CRM & RFM', icon: Users, color: 'bg-[#0052FF]' },
    { id: 'munim', label: 'RazorpayX & Munim', icon: Wallet, color: 'bg-[#059669]' },
    { id: 'eval', label: 'Benchmarking & Audit', icon: Code2, color: 'bg-amber-500' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      
      {/* Enterprise Top System Bar */}
      <div className="bg-[#0C2340] text-slate-200 text-xs px-4 lg:px-8 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse" />
            <span className="font-mono font-bold text-slate-100 tracking-wider">RAZORPAY ENTERPRISE PLATFORM</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-300 font-mono hidden sm:inline text-[11px]">MID: rzp_m_9831a4f8</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 border-l border-slate-700 pl-4 text-slate-300 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00D084]" />
            <span>Production API v2.4</span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-medium">99.99% Gateway Uptime</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => AnalyticsService.exportTransactionsCSV()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold transition-all text-[11px] border border-slate-700 hover:border-slate-600"
          >
            <Download className="w-3 h-3 text-[#0052FF]" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {onToggleAuditLogs && (
            <button
              onClick={onToggleAuditLogs}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold transition-all text-[11px] border border-slate-700 hover:border-slate-600"
            >
              <Terminal className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">API Audit</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded-md text-[10px] text-emerald-300 font-bold tracking-wider">
            <span>LIVE</span>
          </div>
        </div>
      </div>

      {/* Main Enterprise Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Merchant & Outlet Selector */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#0037B3] flex items-center justify-center text-white shadow-md font-black tracking-tight text-xl ring-2 ring-blue-500/20">
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
                  <span className="text-[10px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-[#0052FF] border border-blue-200/80">
                    Enterprise Copilot
                  </span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#0052FF]" />
                  <span className="font-bold text-slate-900">Sharma General Store</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-[#0052FF] font-semibold flex items-center gap-1">
                    {activeBranch}
                    <ChevronDown className="w-3 h-3" />
                  </span>
                </p>
              </div>
            </button>

            {/* Branch Dropdown */}
            {isOrgDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-2 text-xs space-y-1 animate-fadeIn">
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
                    className={`w-full text-left px-3 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-between ${
                      activeBranch === branch ? 'bg-blue-50 text-[#0052FF]' : 'text-slate-700 hover:bg-slate-50'
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

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? `${tab.color} text-white shadow-sm scale-[1.02]`
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Section: Scenario Presets & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-3">
            <div className="relative">
              <select
                onChange={(e) => {
                  const p = DEMO_PRESETS.find(pr => pr.id === e.target.value);
                  if (p) onSelectPreset(p);
                }}
                value={selectedPresetId || ''}
                className="bg-white text-slate-800 border border-slate-300 text-xs rounded-xl px-3.5 py-2 pr-9 focus:outline-none focus:border-[#0052FF] cursor-pointer appearance-none shadow-xs font-bold hover:border-slate-400 transition-colors"
              >
                <option value="" disabled>⚡ Scenario Benchmarks</option>
                {DEMO_PRESETS.map(preset => (
                  <option key={preset.id} value={preset.id}>
                    {preset.title}
                  </option>
                ))}
              </select>
              <Play className="w-3 h-3 text-[#0052FF] absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-fadeIn shadow-lg">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">Navigation Views</div>
          <div className="grid grid-cols-1 gap-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? `${tab.color} text-white shadow-sm`
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Scenario Presets */}
          <div className="pt-2 border-t border-slate-100">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 block mb-1.5">Preset Scenario Benchmarks</label>
            <select
              onChange={(e) => {
                const p = DEMO_PRESETS.find(pr => pr.id === e.target.value);
                if (p) {
                  onSelectPreset(p);
                  setIsMobileMenuOpen(false);
                }
              }}
              value={selectedPresetId || ''}
              className="w-full bg-slate-50 text-slate-800 border border-slate-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#0052FF] font-bold"
            >
              <option value="" disabled>⚡ Executive Scenario Benchmarks</option>
              {DEMO_PRESETS.map(preset => (
                <option key={preset.id} value={preset.id}>
                  {preset.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

