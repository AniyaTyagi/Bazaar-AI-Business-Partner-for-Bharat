'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Wallet, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck,
  ChevronRight,
  User,
  Copy,
  Check
} from 'lucide-react';
import { AgentMessage } from '../types';
import { AgentOrchestrator } from '../agents/orchestrator';

interface AIChatViewProps {
  initialPrompt?: string;
  onLaunchCampaign: (details?: any) => void;
}

export const AIChatView: React.FC<AIChatViewProps> = ({ initialPrompt, onLaunchCampaign }) => {
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'init_1',
      sender: 'joint',
      text: `Namaste Rajesh! I am your AI Business Partner powered by Razorpay data. I bring together AI Bazaar (for sales, customers & growth) and AI Munim (for cashflow, settlements & expenses).\n\nHow can we help Sharma General Store today?`,
      timestamp: '07:50 PM'
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeAgentFilter, setActiveAgentFilter] = useState<'all' | 'bazaar' | 'munim' | 'joint'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handledPromptRef = useRef<string | null>(null);

  useEffect(() => {
    if (initialPrompt && handledPromptRef.current !== initialPrompt) {
      handledPromptRef.current = initialPrompt;
      handleSendQuery(initialPrompt);
    }
  }, [initialPrompt]);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || isThinking) return;

    const userMsg: AgentMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsThinking(true);

    try {
      await new Promise(r => setTimeout(r, 600));
      const agentRes = await AgentOrchestrator.processQuery(queryText);
      setMessages(prev => [...prev, agentRes]);
    } catch (err) {
      console.error('Error processing query:', err);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)] min-h-[600px] pb-6 animate-fadeIn">
      
      {/* Left Sidebar: Context & Agents Panel */}
      <div className="lg:col-span-1 space-y-4 overflow-y-auto pr-1">
        
        {/* Agent Switcher Header */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">AI Partner Brains</span>
          
          <div className="space-y-2">
            <button
              onClick={() => setActiveAgentFilter('bazaar')}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                activeAgentFilter === 'bazaar'
                  ? 'bg-blue-50/80 border-[#0052FF] shadow-2xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-[#0052FF]/15 flex items-center justify-center text-[#0052FF]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-extrabold text-slate-900">AI Bazaar</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#0052FF]/10 text-[#0052FF] font-extrabold ml-auto">GROWTH</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Sales trends, customer cohorts &amp; offer optimization.</p>
            </button>

            <button
              onClick={() => setActiveAgentFilter('munim')}
              className={`w-full p-3 rounded-xl border text-left transition-all ${
                activeAgentFilter === 'munim'
                  ? 'bg-emerald-50/80 border-[#059669] shadow-2xs'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-[#059669]/15 flex items-center justify-center text-[#059669]">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-extrabold text-slate-900">AI Munim</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#059669]/10 text-[#059669] font-extrabold ml-auto">FINANCE</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Cashflow, settlements, supplier dues &amp; business health.</p>
            </button>
          </div>
        </div>

        {/* Live Context Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">Live Merchant Context</span>
          
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Today Collection:</span>
              <span className="font-extrabold text-slate-900">₹48,320</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Expected Settlement:</span>
              <span className="font-extrabold text-[#059669]">₹31,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-medium">Free Cash 7D:</span>
              <span className="font-extrabold text-[#0052FF]">₹42,700</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Conversation & Command Center (3 Cols) */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0052FF] to-[#0037B3] flex items-center justify-center text-white font-bold shadow-md">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight">AI Command Center</h2>
              <p className="text-[11px] text-slate-500 font-medium">Dual Agent Collaboration Active (Bazaar + Munim)</p>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Razorpay Dataset Synced
          </span>
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender !== 'user' && (
                <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-white font-black text-xs shadow-xs ${
                  msg.sender === 'bazaar' ? 'bg-[#0052FF]' : msg.sender === 'munim' ? 'bg-[#059669]' : 'bg-gradient-to-br from-[#0052FF] to-[#059669]'
                }`}>
                  {msg.sender === 'bazaar' ? 'BZ' : msg.sender === 'munim' ? 'MN' : 'JO'}
                </div>
              )}

              <div className={`max-w-2xl space-y-2.5 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Agent Tag & Copy Action */}
                {msg.sender !== 'user' && (
                  <div className="flex items-center justify-between text-[10px] uppercase font-extrabold tracking-wider text-slate-500 px-1">
                    <div className="flex items-center gap-2">
                      <span>{msg.sender === 'bazaar' ? 'AI Bazaar Agent' : msg.sender === 'munim' ? 'AI Munim Agent' : 'Bazaar + Munim Joint Collaboration'}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 normal-case font-semibold text-[11px] ml-4"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}

                {/* Text Output Box */}
                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-[#0052FF] text-white rounded-tr-none font-semibold'
                    : 'bg-slate-50/90 text-slate-800 border border-slate-200/90 rounded-tl-none font-normal'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Structured Data Response Cards */}
                  {msg.structuredData?.metrics && (
                    <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-slate-200/80">
                      {msg.structuredData.metrics.map((m, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                          <span className="text-[10px] text-slate-500 font-extrabold block">{m.label}</span>
                          <span className="text-sm font-black text-slate-900">{m.value}</span>
                          {m.change && <span className={`text-[10px] ml-1.5 font-bold ${m.isPositive ? 'text-[#059669]' : 'text-rose-600'}`}>{m.change}</span>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Joint Recommendation Proposal Card */}
                  {msg.structuredData?.type === 'joint_recommendation' && msg.structuredData.jointDetails && (
                    <div className="mt-4 p-4 rounded-2xl bg-white border border-blue-200 shadow-sm space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="text-xs font-extrabold uppercase text-amber-700 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-amber-500" />
                          Joint Campaign Proposal
                        </span>
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">HIGH ROI</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200">
                          <strong className="text-[#0052FF] font-extrabold block mb-1">AI Bazaar Analysis:</strong>
                          <p className="text-slate-700 text-[11px] font-medium">{msg.structuredData.jointDetails.bazaarAnalysis}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                          <strong className="text-[#059669] font-extrabold block mb-1">AI Munim Validation:</strong>
                          <p className="text-slate-700 text-[11px] font-medium">{msg.structuredData.jointDetails.munimAnalysis}</p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] text-slate-500 block font-bold">Offer: KITCHEN50 (₹50 OFF above ₹499)</span>
                          <span className="text-xs font-extrabold text-[#059669]">Budget: {msg.structuredData.jointDetails.budget} • Upside: {msg.structuredData.jointDetails.expectedUpside}</span>
                        </div>
                        <button
                          onClick={() => onLaunchCampaign()}
                          className="px-4 py-2.5 rounded-xl bg-[#0052FF] hover:bg-[#0043D6] text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shrink-0 shadow-sm active:scale-95"
                        >
                          <span>{msg.structuredData.jointDetails.ctaText}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ))}

          {/* Thinking Visualizer Indicator */}
          {isThinking && (
            <div className="flex gap-3 items-center animate-fadeIn">
              <div className="w-8 h-8 rounded-xl bg-[#0052FF] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                AI
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-blue-700 flex items-center gap-2 font-bold shadow-2xs">
                <Sparkles className="w-4 h-4 animate-spin text-[#0052FF]" />
                <span>Bazaar &amp; Munim processing dataset query...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/80 space-y-3">
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {[
              "Why sales dropped Monday?",
              "Target dormant customers",
              "Next settlement amount",
              "Run weekend campaign"
            ].map((suggest, i) => (
              <button
                key={i}
                onClick={() => handleSendQuery(suggest)}
                className="px-3 py-1 rounded-full bg-white border border-slate-200 hover:border-blue-300 text-slate-600 hover:text-[#0052FF] font-semibold whitespace-nowrap text-[11px] transition-colors shadow-2xs"
              >
                + {suggest}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputPrompt);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask your AI business partner (e.g. 'Why sales dropped Monday?', 'Can I afford weekend offer?')"
              className="flex-1 bg-white border border-slate-300 text-slate-900 text-xs md:text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#0052FF] shadow-2xs font-medium"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isThinking}
              className="px-5 py-3 rounded-xl bg-[#0052FF] hover:bg-[#0043D6] disabled:opacity-50 text-white font-extrabold text-xs flex items-center gap-2 shadow-md transition-all active:scale-95"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

