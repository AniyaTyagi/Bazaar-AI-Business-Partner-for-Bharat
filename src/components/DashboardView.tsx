'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  IndianRupee, 
  RefreshCw, 
  Wallet, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Sparkles,
  PieChart as PieIcon,
  Plus,
  MinusCircle,
  Activity,
  Download,
  Filter,
  Layers,
  Terminal,
  Play,
  Pause,
  Radio
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { BusinessSummary, WebhookEvent } from '../types';
import { AnalyticsService } from '../services/analytics';
import { AIBriefing } from './AIBriefing';

interface DashboardViewProps {
  summary: BusinessSummary;
  onQuickAction: (prompt: string) => void;
}

const PAYMENT_COLORS = ['#0052FF', '#059669', '#D97706', '#6366F1'];

export const DashboardView: React.FC<DashboardViewProps> = ({ summary: initialSummary, onQuickAction }) => {
  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d'>('today');
  const [chartPeriod, setChartPeriod] = useState<'today' | '7d' | '30d'>('today');
  const [isMounted, setIsMounted] = useState(false);
  const [liveMetrics, setLiveMetrics] = useState<BusinessSummary>(initialSummary);
  const [lastEventMsg, setLastEventMsg] = useState<string | null>(null);
  const [webhooks, setWebhooks] = useState<WebhookEvent[]>([]);
  const [isAutoStreaming, setIsAutoStreaming] = useState<boolean>(true);

  useEffect(() => {
    setIsMounted(true);
    updateMetrics(dateRange);
  }, []);

  // Auto-Ticker Engine: Generates a live incoming payment every 4 seconds when active
  useEffect(() => {
    if (!isAutoStreaming) return;

    const timer = setInterval(() => {
      const newTx = AnalyticsService.addTransaction();
      updateMetrics(dateRange);
      setLastEventMsg(`Live Event: ${newTx.customerName} paid ₹${newTx.amount.toLocaleString('en-IN')} via ${newTx.method.toUpperCase()}`);
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoStreaming, dateRange]);

  const updateMetrics = (filter: 'today' | '7d' | '30d') => {
    const updated = AnalyticsService.getBusinessSummary(filter);
    setLiveMetrics(updated);
    setWebhooks(AnalyticsService.getWebhookEvents());
  };

  const handleSimulatePayment = (amount: number, method: 'upi' | 'card' = 'upi') => {
    const newTx = AnalyticsService.addTransaction(amount, 'Sunita Verma', method);
    updateMetrics(dateRange);
    setLastEventMsg(`Manual Webhook: payment.captured (${newTx.id} - ₹${amount.toLocaleString('en-IN')})`);
  };

  const handleSimulateRefund = () => {
    const ref = AnalyticsService.processRefund();
    if (ref) {
      updateMetrics(dateRange);
      setLastEventMsg(`Manual Webhook: refund.created (Order #${ref.orderId})`);
    }
  };

  const salesTrend = AnalyticsService.getSalesTrend(chartPeriod);
  const paymentMethods = AnalyticsService.getPaymentMethodBreakdown();
  const settlements = AnalyticsService.getSettlements();
  const expenses = AnalyticsService.getExpenses();

  return (
    <div className="space-y-8 pb-12">
      
      {/* Enterprise Real-Time Live Ticker Header */}
      <div className="bg-[#0C2340] text-slate-100 p-4 rounded-2xl border border-slate-700 shadow-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-100">Live Gateway Telemetry Stream</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                isAutoStreaming ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {isAutoStreaming ? 'AUTO-STREAMING (EVERY 4S)' : 'STREAM PAUSED'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Real-time payment.captured events broadcasting live to Bazaar dashboard</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {lastEventMsg && (
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-700 animate-fadeIn">
              ✓ {lastEventMsg}
            </span>
          )}

          <button
            onClick={() => setIsAutoStreaming(!isAutoStreaming)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs ${
              isAutoStreaming
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            {isAutoStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoStreaming ? 'Pause Auto-Stream' : 'Resume Auto-Stream'}</span>
          </button>

          <button
            onClick={() => handleSimulatePayment(1450, 'upi')}
            className="px-3 py-1.5 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            + Trigger Manual Payment
          </button>

          <button
            onClick={() => AnalyticsService.exportTransactionsCSV()}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-[#0052FF]" />
            Export CSV
          </button>
        </div>
      </div>

      {/* AI Business Briefing Card */}
      <AIBriefing summary={liveMetrics} onTakeAction={onQuickAction} />

      {/* Top Enterprise Core Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        
        {/* Today Gross Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Live Revenue (GPV)</span>
          <div className="text-xl font-black text-[#0052FF] transition-all">
            ₹{liveMetrics.todayRevenue.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#059669] mt-1">
            <ArrowUpRight className="w-3 h-3" />
            +{liveMetrics.revenueGrowthPercent}%
          </div>
        </div>

        {/* Total Captured Orders */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Orders</span>
          <div className="text-xl font-black text-slate-900">{liveMetrics.todayOrders}</div>
          <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 font-bold mt-1">
            <span>Streaming Live</span>
          </div>
        </div>

        {/* Average Ticket Size */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Avg Ticket (AOV)</span>
          <div className="text-xl font-black text-slate-900">₹{liveMetrics.averageOrderValue}</div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-[#059669] mt-1">
            <ArrowUpRight className="w-3 h-3" />
            +5.6%
          </div>
        </div>

        {/* Gateway Success Rate */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Gateway SLA</span>
          <div className="text-xl font-black text-[#059669]">{liveMetrics.successfulPaymentRate}%</div>
          <div className="text-[11px] text-slate-500 mt-1">Razorpay Standard</div>
        </div>

        {/* Tomorrow Settlement Payout */}
        <div className="bg-white p-4 rounded-xl border border-emerald-300 shadow-xs hover:border-emerald-400 transition-colors">
          <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider block mb-1">Next Settlement</span>
          <div className="text-xl font-black text-slate-900">₹{liveMetrics.expectedSettlementTomorrow.toLocaleString('en-IN')}</div>
          <div className="text-[11px] font-medium text-[#059669] mt-1 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Axis Bank (~11 AM)
          </div>
        </div>

        {/* Customer Base */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Total Profiles</span>
          <div className="text-xl font-black text-slate-900">{liveMetrics.totalCustomers}</div>
          <div className="text-[11px] font-bold text-[#0052FF] mt-1">{liveMetrics.repeatCustomerRate}% Repeat Rate</div>
        </div>

        {/* Enterprise Health Score */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors col-span-2 md:col-span-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Health Index</span>
          <div className="text-xl font-black text-slate-900">{liveMetrics.businessHealthScore}/100</div>
          <div className="text-[11px] font-bold text-[#059669] mt-1">Grade A (Optimal)</div>
        </div>

      </div>

      {/* Quick Prompt Pills Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#0052FF]" />
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Enterprise Copilot Shortcuts</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { text: "Why did my sales drop last Monday?", icon: TrendingUp, agent: "bazaar" },
            { text: "Which customers should I target?", icon: Users, agent: "bazaar" },
            { text: "How much money do I actually have?", icon: Wallet, agent: "munim" },
            { text: "Should I run a weekend offer for my store?", icon: Zap, agent: "joint" },
            { text: "What are my upcoming settlements & expenses?", icon: Clock, agent: "munim" }
          ].map((action, idx) => {
            const IconComponent = action.icon;
            return (
              <button
                key={idx}
                onClick={() => onQuickAction(action.text)}
                className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-[#0052FF] text-xs font-bold flex items-center gap-2 transition-colors group"
              >
                <IconComponent className="w-3.5 h-3.5 text-[#0052FF] group-hover:text-[#0052FF] transition-colors" />
                <span>"{action.text}"</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Revenue Trend (2 Cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0052FF]" />
                Live Revenue &amp; Hourly Surge Stream
              </h3>
              <p className="text-xs text-slate-500">Real-time payment collections updating dynamically</p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
              {(['today', '7d', '30d'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setChartPeriod(p)}
                  className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider transition-colors ${
                    chartPeriod === p
                      ? 'bg-[#0052FF] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-72 w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesTrend}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0052FF" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#0052FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="label" stroke="#64748B" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${val / 1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px', color: '#0F172A' }}
                    formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#0052FF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Payment Channels Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2 mb-1">
              <PieIcon className="w-4 h-4 text-[#059669]" />
              Payment Channels
            </h3>
            <p className="text-xs text-slate-500 mb-4">UPI dominance at Sharma General Store</p>

            <div className="h-48 w-full relative">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#CBD5E1', borderRadius: '8px' }}
                      formatter={(val: any) => `₹${val.toLocaleString('en-IN')}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {paymentMethods.map((pm, idx) => (
              <div key={pm.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PAYMENT_COLORS[idx] }} />
                  <span className="text-slate-600 font-medium">{pm.name}</span>
                </div>
                <span className="font-bold text-slate-900">{pm.percent}% (₹{(pm.value / 1000).toFixed(1)}k)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Webhook Activity Feed & Upcoming Settlements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Real-time Webhook Event Feed Table */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#0052FF]" />
                Live Webhook Telemetry Feed
              </h3>
              <p className="text-xs text-slate-500">Incoming gateway events &amp; payload notifications</p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0052FF] border border-blue-200">
              SOCKET ACTIVE
            </span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {webhooks.slice(0, 6).map((evt) => (
              <div key={evt.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${evt.event === 'payment.captured' ? 'bg-[#0052FF]' : evt.event === 'settlement.processed' ? 'bg-[#059669]' : 'bg-rose-500'}`} />
                  <div>
                    <div className="font-mono font-bold text-slate-900 text-[11px]">{evt.event}</div>
                    <div className="text-[10px] text-slate-500">{evt.details}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-slate-900">₹{evt.amount.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{evt.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settlements Log */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Wallet className="w-4 h-4 text-[#059669]" />
                Razorpay Payout &amp; Settlement Log
              </h3>
              <p className="text-xs text-slate-500">Direct bank transfer payouts to Axis Bank</p>
            </div>
            <span className="text-xs font-bold text-[#059669] px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200">
              Auto-Settled
            </span>
          </div>

          <div className="space-y-3">
            {settlements.slice(0, 3).map((s) => (
              <div key={s.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span>{s.status === 'pending' ? 'Tomorrow (Expected)' : s.settlementDate}</span>
                    {s.status === 'pending' && <span className="px-2 py-0.5 text-[10px] rounded bg-amber-100 text-amber-800 border border-amber-300 font-bold">PROCESSING</span>}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">UTR: {s.utr} • {s.transactionCount} payments</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#059669]">₹{s.netAmount.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-slate-500">Gross: ₹{s.amount.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
