'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  TrendingUp,
  Wallet,
  ArrowRight,
  Globe2,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  BarChart3,
  Layers,
  Cpu,
  Activity,
  CreditCard,
  Building2,
  Sparkle,
  Radio,
  Lock
} from 'lucide-react';
import { MultilingualService, SupportedLanguage } from '../services/multilingual';

export const SplashView: React.FC = () => {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'architecture' | 'telemetry' | 'voice'>('architecture');
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>('hinglish');
  const [voicePlaying, setVoicePlaying] = useState(false);

  // Simulated Webhook Stream for Splash
  const [telemetryLogs, setTelemetryLogs] = useState<Array<{ id: string; time: string; event: string; status: string; color: string }>>([
    { id: '1', time: '19:44:01', event: 'payment.captured (₹1,250 via UPI)', status: 'PROCESSED', color: 'text-emerald-400' },
    { id: '2', time: '19:44:05', event: 'bazaar.analytics: Co-purchase Atta + Oil detected', status: 'INSIGHT', color: 'text-blue-400' },
    { id: '3', time: '19:44:09', event: 'settlement.processed (₹31,200 UTR: AXISCN8912)', status: 'SETTLED', color: 'text-cyan-400' },
  ]);

  const steps = [
    { label: 'Initializing Razorpay Telemetry Engine...', detail: 'Establishing 4.5s heartbeat webhook pipeline', icon: Radio },
    { label: 'Booting Dual AI Agents (Bazaar + Munim)...', detail: 'Loading RFM cohorts & 7-day liquidity algorithms', icon: Cpu },
    { label: 'Connecting 8-Language Speech Synthesizer...', detail: 'Calibrating Hinglish & regional voice models', icon: Globe2 },
    { label: 'Enforcing Joint Financial Policy Gating...', detail: 'Setting minimum cash buffer safety threshold (₹25,000)', icon: ShieldCheck },
    { label: 'BAZAAR Copilot Ready for Platform Launch 🚀', detail: 'Sharma General Store dataset initialized', icon: CheckCircle2 }
  ];

  // Progress Bar & Webhook Streamer Simulator
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const next = prev + 1.5;
        if (next < 20) setActiveStepIndex(0);
        else if (next < 45) setActiveStepIndex(1);
        else if (next < 70) setActiveStepIndex(2);
        else if (next < 90) setActiveStepIndex(3);
        else setActiveStepIndex(4);
        return next;
      });
    }, 35);

    return () => clearInterval(timer);
  }, []);

  // Webhook log simulation heartbeat
  useEffect(() => {
    const logTimer = setInterval(() => {
      const events = [
        { event: 'payment.captured (₹750 via PhonePe UPI)', status: 'CAPTURED', color: 'text-emerald-400' },
        { event: 'bazaar.anomaly: Monday 6-9 PM drop (-18%)', status: 'ALERT', color: 'text-amber-400' },
        { event: 'munim.ledger: Amul Dairy due ₹18,500 checked', status: 'AUDITED', color: 'text-cyan-400' },
        { event: 'policy.validator: Campaign budget ₹4,800 approved', status: 'PASSED', color: 'text-[#0052FF]' },
      ];
      const randomEv = events[Math.floor(Math.random() * events.length)];
      const nowStr = new Date().toLocaleTimeString('en-IN', { hour12: false });
      
      setTelemetryLogs((prev) => [
        { id: `log_${Date.now()}`, time: nowStr, event: randomEv.event, status: randomEv.status, color: randomEv.color },
        ...prev.slice(0, 4)
      ]);
    }, 3200);

    return () => clearInterval(logTimer);
  }, []);

  // Keyboard shortcut [Enter] or [Space] to launch
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  const handleTestVoice = (lang: SupportedLanguage) => {
    setSelectedLanguage(lang);
    setVoicePlaying(true);
    const answer = MultilingualService.getAnswer('cashflow hisaab', lang);
    MultilingualService.speakText(answer.text, lang);
    setTimeout(() => setVoicePlaying(false), 4500);
  };

  const CurrentStepIcon = steps[activeStepIndex]?.icon || Sparkles;

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-blue-600 selection:text-white flex flex-col justify-between relative overflow-hidden font-sans">
      
      {/* Dynamic Background Gradients & Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#0052FF]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* TOP HEADER */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-800/60 bg-[#030712]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3.5">
          <div className="relative group cursor-pointer">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0052FF] via-cyan-400 to-emerald-400 p-0.5 shadow-lg shadow-blue-500/30">
              <div className="w-full h-full bg-[#030712] rounded-[14px] flex items-center justify-center font-black text-2xl text-blue-400">
                B
              </div>
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#030712] animate-ping" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-wider text-white">BAZAAR</span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-blue-500/20 border border-blue-400/40 text-blue-300">
                Razorpay Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">AI Business Partner &amp; Commercial Copilot for Bharat</p>
          </div>
        </div>

        {/* Top Header Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 transition-all flex items-center gap-2 text-xs font-bold"
          >
            {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />}
            <span className="hidden sm:inline">{isAudioMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0052FF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black text-xs shadow-lg shadow-blue-500/30 transition-all active:scale-95 flex items-center gap-2 group"
          >
            <span>Launch Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </header>

      {/* MAIN SPLASH CORE STAGE */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 my-auto space-y-10">

        {/* TOP BADGE */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-black tracking-widest uppercase shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>RAZORPAY MERCHANT AI &amp; TELEMETRY ENGINE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Transforming Transactions into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0052FF] via-cyan-300 to-emerald-400">
              Automated Business Growth &amp; Treasury
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
            The 24/7 AI Commercial Copilot built for Kirana merchants — translating raw payment webhooks into clear Indian-language growth decisions &amp; zero-risk cashflow management.
          </p>
        </div>

        {/* CENTRAL DUAL-AGENT REACTOR GRAPHIC */}
        <div className="relative rounded-3xl bg-slate-900/60 border border-slate-800 p-8 backdrop-blur-2xl shadow-2xl overflow-hidden">
          
          {/* Background Reactor Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">

            {/* CORE 1: AI BAZAAR */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-950/80 border border-blue-500/30 relative overflow-hidden group hover:border-blue-400/60 transition-all shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <TrendingUp className="w-32 h-32 text-blue-400" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">AI Bazaar Agent</h3>
                    <p className="text-xs text-blue-300 font-medium">Growth &amp; Commercial Manager</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-blue-500/20 border border-blue-400/30 text-blue-300">
                  Sales Growth
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Sales Anomaly Engine (Identified 18% Monday evening dip)</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Co-Purchase Affinity (Atta + Oil 2.4x co-buy multiplier)</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Auto Campaign Link Builder (<code className="text-blue-300">rzp.io/l/kitchen50</code>)</span>
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-blue-400 font-bold">
                <span>47 Dormant Churn Target</span>
                <span>Est. Winback: +₹14,800</span>
              </div>
            </div>

            {/* CORE 2: AI MUNIM */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-950/80 border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-400/60 transition-all shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Wallet className="w-32 h-32 text-emerald-400" />
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">AI Munim Agent</h3>
                    <p className="text-xs text-emerald-300 font-medium">Digital Accountant &amp; Treasury</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                  Treasury
                </span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>"Aaj Ka Hisaab" Ledger (Jama ₹48.3k vs Kharcha ₹12.8k)</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>7-Day Cash Flow Curve (Min balance buffer &gt; ₹30,000)</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Razorpay Settlement Audit (Axis Bank UTR verified)</span>
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-emerald-400 font-bold">
                <span>Tomorrow Settlement: ₹31,200</span>
                <span>Free Cash: ₹42,700</span>
              </div>
            </div>

          </div>

          {/* CENTER INTERLOCKING JOINT POLICY BADGE */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/60 p-4 rounded-2xl">
            <div className="flex items-center gap-3 text-xs font-bold text-slate-200">
              <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-extrabold">Joint Policy Validation Engine</div>
                <div className="text-[11px] text-slate-400 font-normal">
                  Cross-checks Bazaar marketing proposals against Munim cash liquidity safety rules.
                </div>
              </div>
            </div>

            <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              Constraint Checked: Safe to Spend
            </div>
          </div>
        </div>

        {/* PROGRESS BAR & LIVE STREAM CONTAINER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* PROGRESS & INITIALIZATION WIDGET */}
          <div className="lg:col-span-2 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 backdrop-blur-xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-2 text-blue-300">
                <CurrentStepIcon className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>{steps[activeStepIndex].label}</span>
              </div>
              <span className="text-emerald-400 font-mono font-black text-sm">{Math.round(progress)}%</span>
            </div>

            <p className="text-[11px] text-slate-400 font-medium">
              {steps[activeStepIndex].detail}
            </p>

            {/* Glowing Bar */}
            <div className="w-full h-3 bg-slate-950 rounded-full p-0.5 border border-slate-800 overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-[#0052FF] via-cyan-400 to-emerald-400 rounded-full transition-all duration-150 relative shadow-[0_0_15px_rgba(0,82,255,0.6)]"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-2 bg-white blur-[1px] animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px] font-bold">Press Enter</kbd>
                <span>to launch anytime</span>
              </span>

              <Link
                href="/"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#0052FF] to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black text-xs shadow-lg shadow-blue-500/25 transition-all active:scale-95 flex items-center gap-2 group"
              >
                <span>Enter Executive Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* LIVE WEBHOOK STREAM WIDGET */}
          <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span className="font-extrabold text-xs text-white">Live Razorpay Stream</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Heartbeat: 4.5s</span>
            </div>

            <div className="space-y-2 font-mono text-[11px]">
              {telemetryLogs.map((log) => (
                <div key={log.id} className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <span className="text-slate-500 text-[10px] mr-1.5">{log.time}</span>
                    <span className="text-slate-200 font-medium truncate">{log.event}</span>
                  </div>
                  <span className={`font-bold shrink-0 text-[9px] px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 ${log.color}`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER TICKER */}
      <footer className="relative z-20 w-full border-t border-slate-800/80 bg-[#030712]/90 backdrop-blur-md py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="flex items-center gap-1.5 font-extrabold text-slate-300">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              5,000+ Transactions Analyzed
            </span>
            <span className="flex items-center gap-1.5 font-extrabold text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Razorpay Secured Telemetry
            </span>
            <span className="flex items-center gap-1.5 font-extrabold text-slate-300">
              <Globe2 className="w-3.5 h-3.5 text-blue-400" />
              8 Languages + Hinglish Speech
            </span>
          </div>

          <div className="text-slate-500 text-[11px]">
            BAZAAR Platform v1.0 • Built for Indian Merchants
          </div>
        </div>
      </footer>

    </div>
  );
};
