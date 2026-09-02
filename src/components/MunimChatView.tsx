'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Mic, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Clock, RefreshCw, ShoppingCart, Award, Truck, Check, Volume2, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES, SupportedLanguage, MultilingualService } from '../services/multilingual';

export interface SmartRestockItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface SupplierOffer {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  totalAmount: number;
  savings: number;
  isBestMatch?: boolean;
  items: SmartRestockItem[];
}

interface MunimChatViewProps {
  initialPrompt?: string;
  selectedLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onInitiatePayment: (supplier: SupplierOffer) => void;
  onCompareSuppliers: (suppliers: SupplierOffer[]) => void;
  onOpenVoiceModal: () => void;
}

export const MunimChatView: React.FC<MunimChatViewProps> = ({
  initialPrompt,
  selectedLanguage,
  onLanguageChange,
  onInitiatePayment,
  onCompareSuppliers,
  onOpenVoiceModal,
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    sender: 'user' | 'munim';
    text: string;
    timestamp: string;
    isRestockFlow?: boolean;
    restockData?: {
      step: 'analyzing' | 'recommendation' | 'finding_supplier' | 'best_match';
      items: SmartRestockItem[];
      supplier?: SupplierOffer;
    };
  }>>([
    {
      id: 'msg_welcome',
      sender: 'munim',
      text: "Namaste Aniya! I'm Munim, your AI business partner. I'm monitoring your store's sales, stock levels, and cash flow. How can I help you today?",
      timestamp: '9:00 AM',
    }
  ]);

  const [activeRestockStep, setActiveRestockStep] = useState<'none' | 'analyzing' | 'recommendation' | 'finding_supplier' | 'best_match'>('none');
  const [currentSupplier, setCurrentSupplier] = useState<SupplierOffer | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample Demo Suppliers
  const defaultSuppliers: SupplierOffer[] = [
    {
      id: 'sup_sharma',
      name: 'Sharma Distributors',
      rating: 4.8,
      deliveryTime: 'Tomorrow morning',
      totalAmount: 3770,
      savings: 1240,
      isBestMatch: true,
      items: [
        { id: '1', name: 'Milk Packets (1L)', quantity: 40, unitPrice: 30, total: 1200 },
        { id: '2', name: 'Maggi Noodles Pack', quantity: 50, unitPrice: 29, total: 1450 },
        { id: '3', name: 'Coke Bottles (600ml)', quantity: 30, unitPrice: 37.33, total: 1120 },
      ]
    },
    {
      id: 'sup_gupta',
      name: 'Gupta Wholesale Mart',
      rating: 4.6,
      deliveryTime: 'Tomorrow evening',
      totalAmount: 3920,
      savings: 1090,
      items: [
        { id: '1', name: 'Milk Packets (1L)', quantity: 40, unitPrice: 31, total: 1240 },
        { id: '2', name: 'Maggi Noodles Pack', quantity: 50, unitPrice: 30, total: 1500 },
        { id: '3', name: 'Coke Bottles (600ml)', quantity: 30, unitPrice: 39.33, total: 1180 },
      ]
    },
    {
      id: 'sup_metro',
      name: 'Metro Cash & Carry',
      rating: 4.9,
      deliveryTime: '2 days',
      totalAmount: 4100,
      savings: 910,
      items: [
        { id: '1', name: 'Milk Packets (1L)', quantity: 40, unitPrice: 32.5, total: 1300 },
        { id: '2', name: 'Maggi Noodles Pack', quantity: 50, unitPrice: 31, total: 1550 },
        { id: '3', name: 'Coke Bottles (600ml)', quantity: 30, unitPrice: 41.66, total: 1250 },
      ]
    }
  ];

  useEffect(() => {
    if (initialPrompt) {
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeRestockStep]);

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsgId = `usr_${Date.now()}`;
    const newMsg = {
      id: userMsgId,
      sender: 'user' as const,
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Fetch dynamic multilingual answer from MultilingualService
    const { text: responseText, category } = MultilingualService.getAnswer(promptText, selectedLanguage);

    if (category === 'restock') {
      triggerSmartRestockFlow(responseText);
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `mun_${Date.now()}`,
            sender: 'munim',
            text: responseText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        MultilingualService.speakText(responseText, selectedLanguage);
      }, 600);
    }
  };

  const triggerSmartRestockFlow = (customAnswerText?: string) => {
    setActiveRestockStep('analyzing');
    const { text: translatedText } = MultilingualService.getAnswer('restock', selectedLanguage);
    const step1Text = customAnswerText || translatedText;

    // Step 1: Munim initial response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: `mun_restock_1`,
          sender: 'munim',
          text: step1Text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRestockFlow: true,
          restockData: {
            step: 'recommendation',
            items: defaultSuppliers[0].items
          }
        }
      ]);
      MultilingualService.speakText(step1Text, selectedLanguage);
      setActiveRestockStep('recommendation');

      // Step 2: Finding best supplier animation
      setTimeout(() => {
        setActiveRestockStep('finding_supplier');

        // Step 3: Best Match Found
        setTimeout(() => {
          const bestSupplier = defaultSuppliers[0];
          setCurrentSupplier(bestSupplier);
          setActiveRestockStep('best_match');

          const step2Text = `AI Bazaar found Sharma Distributors! They offer Milk (+40), Maggi (+50), and Coke (+30) for ₹3,770 with delivery tomorrow. Save ₹1,240 vs retail.`;

          setMessages(prev => [
            ...prev,
            {
              id: `mun_restock_2`,
              sender: 'munim',
              text: step2Text,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isRestockFlow: true,
              restockData: {
                step: 'best_match',
                items: bestSupplier.items,
                supplier: bestSupplier
              }
            }
          ]);
          MultilingualService.speakText(step2Text, selectedLanguage);
        }, 1800);
      }, 1200);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">

      {/* HEADER BAR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B3A6B] text-white font-black text-xl flex items-center justify-center shadow-xs">
            🤖
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Munim AI Business Partner</span>
              <span className="munim-badge-navy">Brain Active</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">Multilingual Voice &amp; Business Intelligence Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* LANGUAGE SELECTOR IN CHAT HEADER */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold">
            <Globe className="w-3.5 h-3.5 text-[#1B3A6B]" />
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
              className="bg-transparent text-[#1B3A6B] font-extrabold focus:outline-none cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenVoiceModal}
            className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1B3A6B] border border-blue-200 text-xs font-extrabold flex items-center gap-2 transition-all active:scale-95 shrink-0"
          >
            <Mic className="w-4 h-4 text-[#1B3A6B]" />
            <span>Bolo, Munim ko batao</span>
          </button>
        </div>
      </div>

      {/* TWO COLUMN DESKTOP LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT COLUMN: CHAT STREAM */}
        <div className="lg:col-span-7 space-y-4">
          <div className="munim-card p-4 md:p-6 bg-white min-h-[480px] max-h-[600px] flex flex-col justify-between overflow-hidden">

            {/* MESSAGES LIST */}
            <div className="space-y-4 overflow-y-auto pr-1 flex-1">

              {/* EMPTY STATE CHIPS IF ONLY WELCOME */}
              {messages.length === 1 && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-[#1B3A6B] font-black text-2xl flex items-center justify-center mx-auto">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">How can I help today, Aniya?</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Ask any question in your selected language or tap sample queries below</p>
                  </div>

                  {/* QUICK ACTION CHIPS */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto pt-2">
                    <button
                      onClick={() => handleSendPrompt("Kal ke liye samaan mangwana hai.")}
                      className="munim-chip border-blue-300 bg-blue-50/50 text-[#1B3A6B]"
                    >
                      📦 Restock Inventory (समान मंगवाओ)
                    </button>
                    <button
                      onClick={() => handleSendPrompt("Iss mahine paisa kahan zyada ja raha hai?")}
                      className="munim-chip"
                    >
                      💰 Cash Flow &amp; Dues (पैसा &amp; हिसाब)
                    </button>
                    <button
                      onClick={() => handleSendPrompt("Mere customers kya zyada kharid rahe hain?")}
                      className="munim-chip"
                    >
                      📈 Top Demands (ग्राहकों की मांग)
                    </button>
                    <button
                      onClick={() => handleSendPrompt("Show my total sales and net profit.")}
                      className="munim-chip"
                    >
                      📊 Sales &amp; Profit (बिक्री &amp; नफा)
                    </button>
                  </div>
                </div>
              )}

              {/* MESSAGES STREAM */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
                >
                  <div className="flex items-center gap-1.5 max-w-[85%] group">
                    <div
                      className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed ${msg.sender === 'user'
                          ? 'bg-[#1B3A6B] text-white rounded-br-none shadow-2xs font-semibold'
                          : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200/80'
                        }`}
                    >
                      {msg.text}
                    </div>

                    {msg.sender === 'munim' && (
                      <button
                        onClick={() => MultilingualService.speakText(msg.text, selectedLanguage)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-400 hover:text-[#1B3A6B] transition-colors"
                        title="Read message aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 px-1 font-mono">{msg.timestamp}</span>

                  {/* EMBEDDED SMART RESTOCK RECOMMENDATION CARD IN CHAT */}
                  {msg.isRestockFlow && msg.restockData?.step === 'recommendation' && (
                    <div className="w-full mt-2 munim-card p-4 bg-slate-50 border-blue-200 text-xs space-y-3">
                      <div className="flex items-center justify-between font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                        <span className="flex items-center gap-1.5 text-[#1B3A6B]">
                          <ShoppingCart className="w-4 h-4" />
                          Smart Restock Recommendation
                        </span>
                        <span className="text-[10px] text-slate-500 font-normal">30-day AI Demand Model</span>
                      </div>

                      <div className="space-y-1.5 font-bold text-slate-800">
                        {msg.restockData.items.map((it) => (
                          <div key={it.id} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                            <span>{it.name}</span>
                            <span className="text-[#1B3A6B] font-black">+{it.quantity} units</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-500 italic">Based on your last 30 days of sales and current stock levels.</p>
                    </div>
                  )}

                  {/* EMBEDDED BEST MATCH SUPPLIER CARD IN CHAT */}
                  {msg.isRestockFlow && msg.restockData?.step === 'best_match' && msg.restockData.supplier && (
                    <div className="w-full mt-2 munim-card p-4 bg-white border-2 border-[#1B3A6B]/40 text-xs space-y-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="munim-badge-navy">BEST MATCH</span>
                          <span className="font-extrabold text-slate-900 text-sm">{msg.restockData.supplier.name}</span>
                        </div>
                        <span className="text-xs font-black text-[#1B3A6B]">★ {msg.restockData.supplier.rating}</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200 text-[#1B3A6B] font-bold flex items-center justify-between">
                        <span>Total Payable: ₹{msg.restockData.supplier.totalAmount.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] font-black text-[#1B3A6B]">Saved ₹{msg.restockData.supplier.savings}</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-1">
                        <button
                          onClick={() => onInitiatePayment(msg.restockData!.supplier!)}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 text-center"
                        >
                          Order &amp; Pay ₹{msg.restockData.supplier.totalAmount.toLocaleString('en-IN')}
                        </button>
                        <button
                          onClick={() => onCompareSuppliers(defaultSuppliers)}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all text-center"
                        >
                          Compare suppliers
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* SEARCHING ANIMATION STATE */}
              {activeRestockStep === 'finding_supplier' && (
                <div className="munim-card p-4 bg-blue-50/60 border-blue-300 text-xs flex items-center gap-3 animate-pulse">
                  <RefreshCw className="w-4 h-4 text-[#1B3A6B] animate-spin" />
                  <div>
                    <p className="font-extrabold text-[#1B3A6B]">🛒 AI Bazaar is searching best suppliers...</p>
                    <p className="text-[10px] text-slate-600">Comparing Sharma Distributors, Gupta Wholesale &amp; Metro Supply</p>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* BOTTOM COMPOSER */}
            <div className="pt-3 border-t border-slate-100 mt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendPrompt(inputMessage);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Ask Munim in ${SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage)?.name}...`}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#1B3A6B] focus:bg-white transition-all"
                />

                <button
                  type="button"
                  onClick={onOpenVoiceModal}
                  className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  title="Voice input"
                >
                  <Mic className="w-4 h-4 text-[#1B3A6B]" />
                </button>

                <button
                  type="submit"
                  disabled={!inputMessage.trim()}
                  className="p-3 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] disabled:opacity-40 text-white transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: AGENTIC WORKFLOW & CONTEXT CARD (DESKTOP) */}
        <div className="lg:col-span-5 space-y-4">

          {/* AGENT ACTION TIMELINE CENTER */}
          <div className="munim-card p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#1B3A6B]" />
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                  Munim Agentic Workflow
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Autonomous Engine</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1B3A6B] flex items-center justify-center font-bold text-[10px]">
                  ✓
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">Checked last 30 days sales velocity</p>
                  <p className="text-[10px] text-slate-500">Detected Milk, Maggi &amp; Coke demand spike</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1B3A6B] flex items-center justify-center font-bold text-[10px]">
                  ✓
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">Predicted tomorrow's stock requirements</p>
                  <p className="text-[10px] text-slate-500">Milk +40, Maggi +50, Coke +30</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${activeRestockStep === 'finding_supplier' || activeRestockStep === 'best_match'
                    ? 'bg-blue-100 text-[#1B3A6B]'
                    : 'bg-slate-100 text-slate-400'
                  }`}>
                  {activeRestockStep === 'best_match' ? '✓' : '3'}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">Compared 5 wholesale suppliers</p>
                  <p className="text-[10px] text-slate-500">AI Bazaar procurement optimization</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${activeRestockStep === 'best_match' ? 'bg-blue-100 text-[#1B3A6B]' : 'bg-slate-100 text-slate-400'
                  }`}>
                  {activeRestockStep === 'best_match' ? '✓' : '4'}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">Selected lowest-cost supplier</p>
                  <p className="text-[10px] text-slate-500">Sharma Distributors (Save ₹1,240)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${activeRestockStep === 'best_match' ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-slate-100 text-slate-400'
                  }`}>
                  ⏳
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">Waiting for your approval &amp; payment</p>
                  <p className="text-[10px] text-slate-500">Razorpay payment authorization</p>
                </div>
              </div>
            </div>
          </div>

          {/* ACTIVE BEST SUPPLIER MATCH DISPLAY (IF READY) */}
          {currentSupplier ? (
            <div className="munim-card p-5 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 border-2 border-[#1B3A6B]/40 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className="munim-badge-navy mb-1 inline-block">RECOMMENDED SUPPLIER</span>
                  <h3 className="text-sm font-black text-slate-900">{currentSupplier.name}</h3>
                </div>
                <div className="text-right">
                  <div className="text-base font-black text-[#1B3A6B]">₹{currentSupplier.totalAmount.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] font-extrabold text-[#1B3A6B]">Saved ₹{currentSupplier.savings}</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-slate-500" /> Delivery:</span>
                  <span className="font-bold text-slate-900">{currentSupplier.deliveryTime}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5"><Award className="w-3.5 h-3.5 text-amber-500" /> Supplier Rating:</span>
                  <span className="font-bold text-slate-900">★ {currentSupplier.rating} / 5.0</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => onInitiatePayment(currentSupplier)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 text-center flex items-center justify-center gap-2"
                >
                  <span>Order &amp; Pay ₹{currentSupplier.totalAmount.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onCompareSuppliers(defaultSuppliers)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs text-center transition-colors"
                >
                  Compare suppliers
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1B3A6B]" />
                <span>Secure payment powered by Razorpay</span>
              </div>
            </div>
          ) : (
            <div className="munim-card p-5 bg-slate-50 border border-slate-200 text-center space-y-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-[#1B3A6B] flex items-center justify-center mx-auto font-black text-sm">
                🛒
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-800">Ready for Smart Restock</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Click "Restock Inventory" in chat to trigger automated supplier matching.</p>
              </div>
              <button
                onClick={() => handleSendPrompt("Kal ke liye samaan mangwana hai.")}
                className="px-4 py-2 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs transition-colors"
              >
                Run Restock Analysis
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
