'use client';

import React, { useState } from 'react';
import { Search, ShoppingBag, Bot, Plus, CheckCircle2, ChevronRight } from 'lucide-react';

interface BazaarTabViewProps {
  onTriggerRestock: () => void;
}

export const BazaarTabView: React.FC<BazaarTabViewProps> = ({ onTriggerRestock }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState<string[]>([]);

  const products = [
    { id: '1', name: 'Milk Packets (1L)', price: 28, lastBought: '3 days ago', category: 'Dairy' },
    { id: '2', name: 'Maggi Noodles Pack', price: 12, lastBought: 'Yesterday', category: 'Packaged Food' },
    { id: '3', name: 'Coke Bottles (600ml)', price: 37, lastBought: '4 days ago', category: 'Beverages' },
    { id: '4', name: 'Fortune Sunflower Oil (1L)', price: 135, lastBought: '1 week ago', category: 'Edible Oil' },
    { id: '5', name: 'Aashirvaad Atta (5kg)', price: 240, lastBought: '5 days ago', category: 'Staples' },
    { id: '6', name: 'Surf Excel Quick Wash (1kg)', price: 175, lastBought: '2 weeks ago', category: 'Household' },
  ];

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const toggleItem = (id: string) => {
    setAddedItems(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>AI Bazaar Procurement</span>
            <span className="munim-badge-navy">Action Layer</span>
          </h1>
          <p className="text-xs text-slate-500 font-bold mt-0.5">What does your business need today, Aniya?</p>
        </div>

        <button
          onClick={onTriggerRestock}
          className="px-4 py-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto"
        >
          <Bot className="w-4 h-4" />
          <span>Review Smart Restock</span>
        </button>
      </div>

      {/* MUNIM'S RECOMMENDATIONS BANNER */}
      <div className="munim-card p-5 bg-gradient-to-r from-blue-50 via-white to-blue-50 border-2 border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1B3A6B] text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
            🤖
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-[#1B3A6B] uppercase tracking-wider">Munim Recommendation</span>
            <h3 className="text-sm font-black text-slate-900">You may need 40 more milk packets before tomorrow.</h3>
            <p className="text-xs text-slate-600 font-medium">Sourcing from Sharma Distributors saves ₹1,240 on wholesale price.</p>
          </div>
        </div>

        <button
          onClick={onTriggerRestock}
          className="px-4 py-2.5 rounded-xl bg-[#1B3A6B] hover:bg-[#142d54] text-white font-extrabold text-xs shadow-xs transition-all active:scale-95 shrink-0"
        >
          Review smart restock
        </button>
      </div>

      {/* SEARCH INPUT */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search products, FMCG items, or wholesale suppliers..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#1B3A6B] shadow-2xs transition-all"
        />
      </div>

      {/* RECOMMENDED FOR YOU CARDS */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          Recommended for Aniya General Store
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((prod) => {
            const isAdded = addedItems.includes(prod.id);
            return (
              <div key={prod.id} className="munim-card p-4 bg-white flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{prod.category}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Last bought: {prod.lastBought}</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900 mt-1">{prod.name}</h4>
                  <p className="text-xs font-black text-[#1B3A6B] mt-1">Best price: ₹{prod.price}</p>
                </div>

                <button
                  onClick={() => toggleItem(prod.id)}
                  className={`w-full py-2 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${isAdded
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1B3A6B]" />
                      <span>Added to Sourcing Cart</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add item</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
