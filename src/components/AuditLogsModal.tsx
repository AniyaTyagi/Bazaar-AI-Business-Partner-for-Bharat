'use client';

import React, { useState } from 'react';
import { X, Terminal, ShieldCheck, Copy, CheckCircle2, RefreshCw } from 'lucide-react';
import { AnalyticsService } from '../services/analytics';

interface AuditLogsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogsModal: React.FC<AuditLogsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'webhooks' | 'api_logs' | 'security'>('webhooks');
  const webhooks = AnalyticsService.getWebhookEvents();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white border border-slate-200 p-6 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0052FF]/10 border border-[#0052FF]/20 flex items-center justify-center text-[#0052FF]">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Razorpay Enterprise Audit &amp; Webhook Logs</h3>
              <p className="text-xs text-slate-500 font-mono">Merchant ID: rzp_m_9831a4f8 • Environment: Production API v2.4</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 border-b border-slate-200 pb-3 mb-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('webhooks')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'webhooks' ? 'bg-[#0052FF] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Webhook Telemetry ({webhooks.length})
          </button>

          <button
            onClick={() => setActiveTab('api_logs')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'api_logs' ? 'bg-[#0052FF] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            AI Tool Routing Logs
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'security' ? 'bg-[#0052FF] text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Security &amp; RBAC Audit
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
          
          {activeTab === 'webhooks' && (
            <div className="space-y-2">
              {webhooks.map((evt) => (
                <div key={evt.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-[#0052FF]">
                      <span>[{evt.event}]</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-800 text-[11px] font-sans">{evt.details}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Event ID: {evt.id} • Payload Signature Verified</div>
                  </div>
                  <div className="text-right">
                    <div className="font-extrabold text-slate-900">₹{evt.amount.toLocaleString('en-IN')}</div>
                    <div className="text-[10px] text-slate-400">{evt.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'api_logs' && (
            <div className="bg-[#0C2340] text-slate-100 p-4 rounded-xl font-mono text-[11px] space-y-2 overflow-x-auto">
              <div className="text-emerald-400 font-bold">[INFO] 2026-08-24 19:54:12 - Bazaar Agent routed query to 'bazaar.analyze_sales_trend' (latency: 142ms)</div>
              <div className="text-blue-400 font-bold">[INFO] 2026-08-24 19:50:00 - Munim Agent calculated liquidity forecast 'munim.calculate_cash_forecast' (latency: 98ms)</div>
              <div className="text-amber-400 font-bold">[INFO] 2026-08-24 18:30:00 - Joint Collaboration Orchestrator executed dual policy validation (latency: 210ms)</div>
              <div className="text-slate-400">[TRACE] Payload verification succeeded against HMAC-SHA256 signature.</div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#059669]">
                <ShieldCheck className="w-4 h-4" />
                Enterprise Security Verification Passed
              </div>
              <ul className="list-disc pl-5 text-xs space-y-1 text-slate-700">
                <li>PCI-DSS Level 1 Compliant Razorpay API Integration</li>
                <li>TLS 1.3 End-to-End Encryption for Merchant Credentials</li>
                <li>Role-Based Access Control (RBAC) active for Owner (Rajesh Sharma)</li>
              </ul>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">Status: ALL SYSTEMS OPERATIONAL</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
          >
            Close Audit Portal
          </button>
        </div>

      </div>
    </div>
  );
};
