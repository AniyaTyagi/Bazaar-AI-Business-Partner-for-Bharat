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
  User
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendQuery(initialPrompt);
    }
  }, [initialPrompt]);

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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)] min-h-[600px] pb-6">
      
      {/* Left Sidebar: Context & Agents Panel */}
      <div className="lg:col-span-1 space-y-4 overflow-y-auto">
        
        {/* Agent Switcher Header */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-3">AI Partner Brains</span>
          
          <div className="space-y-2">
            <button
              onClick={() => setActiveAgentFilter('bazaar')}
              className={`w-full p-3 rounded-xl border text-left transition-colors ${
                activeAgentFilter === 'bazaar'
                  ? 'bg-blue-50 border-[#0052FF]'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-[#0052FF]/15 flex items-center justify-center text-[#0052FF]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900">AI Bazaar</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0052FF]/10 text-[#0052FF] font-bold ml-auto">GROWTH</span>
              </div>
              <p className="text-[11px] text-slate-500">Sales trends, customer cohorts &amp; offer optimization.</p>
            </button>

            <button
              onClick={() => setActiveAgentFilter('munim')}
              className={`w-full p-3 rounded-xl border text-left transition-colors ${
                activeAgentFilter === 'munim'
                  ? 'bg-emerald-50 border-[#059669]'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-md bg-[#059669]/15 flex items-center justify-center text-[#059669]">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900">AI Munim</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#059669]/10 text-[#059669] font-bold ml-auto">FINANCE</span>
              </div>
              <p className="text-[11px] text-slate-500">Cashflow, settlements, supplier dues &amp; business health.</p>
            </button>
          </div>
        </div>

        {/* Live Context Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Live Merchant Context</span>
          
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Today Collection:</span>
              <span className="font-bold text-slate-900">₹48,320</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Expected Settlement:</span>
              <span className="font-bold text-[#059669]">₹31,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Free Cash 7D:</span>
              <span className="font-bold text-[#0052FF]">₹42,700</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Conversation & Command Center (3 Cols) */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0052FF] flex items-center justify-center text-white font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">AI Command Center</h2>
              <p className="text-[11px] text-slate-500">Dual Agent Collaboration Active</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
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
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white font-bold text-xs ${
                  msg.sender === 'bazaar' ? 'bg-[#0052FF]' : msg.sender === 'munim' ? 'bg-[#059669]' : 'bg-[#0052FF]'
                }`}>
                  {msg.sender === 'bazaar' ? 'BZ' : msg.sender === 'munim' ? 'MN' : 'JO'}
                </div>
              )}

              <div className={`max-w-2xl space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* Agent Tag */}
                {msg.sender !== 'user' && (
                  <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                    <span>{msg.sender === 'bazaar' ? 'AI Bazaar Agent' : msg.sender === 'munim' ? 'AI Munim Agent' : 'Bazaar + Munim Joint Collaboration'}</span>
                    <span>•</span>
                    <span>{msg.timestamp}</span>
                  </div>
                )}

                {/* Text Output Box */}
                <div className={`p-4 rounded-xl text-xs md:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#0052FF] text-white rounded-tr-none font-medium'
                    : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none font-normal'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>

                  {/* Structured Data Response Cards */}
                  {msg.structuredData?.metrics && (
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200">
                      {msg.structuredData.metrics.map((m, idx) => (
                        <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200">
                          <span className="text-[10px] text-slate-500 font-bold block">{m.label}</span>
                          <span className="text-sm font-black text-slate-900">{m.value}</span>
                          {m.change && <span className={`text-[10px] ml-1.5 font-bold ${m.isPositive ? 'text-[#059669]' : 'text-rose-600'}`}>{m.change}</span>}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Joint Recommendation Proposal Card */}
                  {msg.structuredData?.type === 'joint_recommendation' && msg.structuredData.jointDetails && (
                    <div className="mt-4 p-4 rounded-xl bg-white border border-blue-200 shadow-xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="text-xs font-bold uppercase text-amber-700 flex items-center gap-1.5">
                          <Zap className="w-4 h-4" />
                          Joint Campaign Proposal
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">HIGH ROI</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-200">
                          <strong className="text-[#0052FF] block mb-1">AI Bazaar Analysis:</strong>
                          <p className="text-slate-700 text-[11px]">{msg.structuredData.jointDetails.bazaarAnalysis}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                          <strong className="text-[#059669] block mb-1">AI Munim Validation:</strong>
                          <p className="text-slate-700 text-[11px]">{msg.structuredData.jointDetails.munimAnalysis}</p>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-500 block font-semibold">Offer: KITCHEN50 (₹50 OFF above ₹499)</span>
                          <span className="text-xs font-bold text-[#059669]">Budget: {msg.structuredData.jointDetails.budget} • Upside: {msg.structuredData.jointDetails.expectedUpside}</span>
                        </div>
                        <button
                          onClick={() => onLaunchCampaign()}
                          className="px-4 py-2 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-xs"
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
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-lg bg-[#0052FF] flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-blue-700 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-[#0052FF]" />
                <span>Bazaar &amp; Munim processing dataset query...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
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
              className="flex-1 bg-white border border-slate-300 text-slate-900 text-xs md:text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-[#0052FF]"
            />
            <button
              type="submit"
              disabled={!inputPrompt.trim() || isThinking}
              className="px-5 py-3 rounded-lg bg-[#0052FF] hover:bg-[#0043D6] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
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
