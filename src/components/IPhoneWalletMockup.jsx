import React, { useState } from 'react';
import { CardView } from './CardView';
import { 
  Wifi, 
  BatteryMedium, 
  Plus, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  ShoppingBag, 
  Coffee, 
  Car, 
  Utensils 
} from 'lucide-react';
import { AppleLogo } from './CardSvgLogos';

export function IPhoneWalletMockup({ card, cardStack = [] }) {
  const [walletMode, setWalletMode] = useState('wallet'); // 'wallet' | 'lockscreen'
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const displayCard = activeCardIndex === 0 ? card : (cardStack[activeCardIndex - 1] || card);

  return (
    <div className="flex flex-col items-center">
      {/* Mode switcher tabs above mockup */}
      <div className="flex items-center gap-1.5 p-1 bg-neutral-900/90 border border-white/10 rounded-xl mb-4 backdrop-blur-md">
        <button
          onClick={() => setWalletMode('wallet')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            walletMode === 'wallet' 
              ? 'bg-neutral-800 text-white shadow-sm' 
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Apple Wallet Stack
        </button>
        <button
          onClick={() => setWalletMode('lockscreen')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
            walletMode === 'lockscreen' 
              ? 'bg-neutral-800 text-white shadow-sm' 
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Double-Click Pay Screen
        </button>
      </div>

      {/* iPhone 16 Pro Titanium Frame */}
      <div className="w-[360px] h-[720px] rounded-[52px] p-[10px] bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.15)] relative">
        {/* Outer Titanium edge ring */}
        <div className="w-full h-full rounded-[44px] bg-black overflow-hidden relative flex flex-col border border-neutral-900">
          
          {/* iOS Status Bar */}
          <div className="w-full pt-3 px-7 flex items-center justify-between text-white text-[12px] font-semibold tracking-tight z-30 select-none">
            <span>9:41</span>
            
            {/* Dynamic Island */}
            <div className="w-[96px] h-[26px] bg-black rounded-full flex items-center justify-between px-2.5 mx-auto -mt-1 shadow-md border border-neutral-800">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-blue-950/60" />
            </div>

            <div className="flex items-center gap-1.5">
              <Wifi className="w-3.5 h-3.5" />
              <BatteryMedium className="w-4 h-4" />
            </div>
          </div>

          {walletMode === 'wallet' ? (
            /* ================= APPLE WALLET APP VIEW ================= */
            <div className="flex-1 overflow-y-auto px-4 pt-3 pb-8 text-white relative">
              {/* Wallet Header */}
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-2xl font-bold tracking-tight">Wallet</h2>
                <div className="flex items-center gap-3">
                  <button className="w-7 h-7 rounded-full bg-neutral-800/80 flex items-center justify-center text-neutral-300">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-7 h-7 rounded-full bg-neutral-800/80 flex items-center justify-center text-white">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Primary Active Card with Stack Peeking */}
              <div className="relative mb-6 flex flex-col items-center">
                {/* Simulated Background Stack Cards */}
                <div className="w-[300px] h-[40px] rounded-t-[18px] bg-gradient-to-r from-neutral-800 to-neutral-700 mx-auto -mb-6 opacity-60 scale-95 border-t border-white/10" />
                
                {/* Active Card Scaled */}
                <div className="relative z-10 origin-top transform scale-[0.67] -my-11">
                  <CardView card={displayCard} interactive={false} />
                </div>
              </div>

              {/* Quick Card Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 mb-5 px-1">
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 flex flex-col">
                  <span className="text-[11px] text-neutral-400">Current Balance</span>
                  <span className="text-lg font-bold text-white mt-0.5">$248.50</span>
                  <span className="text-[10px] text-emerald-400 font-medium mt-1">Available: $12,750</span>
                </div>
                <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-3 flex flex-col">
                  <span className="text-[11px] text-neutral-400">Daily Cash</span>
                  <span className="text-lg font-bold text-white mt-0.5">3% Active</span>
                  <span className="text-[10px] text-neutral-400 font-medium mt-1">Earned: $84.20</span>
                </div>
              </div>

              {/* Latest Transactions */}
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-3">
                <div className="flex items-center justify-between mb-2 px-1">
                  <span className="text-xs font-semibold text-neutral-300">Latest Transactions</span>
                  <span className="text-[10px] text-blue-400 font-medium flex items-center">
                    See All <ChevronRight className="w-3 h-3 ml-0.5" />
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-1.5 hover:bg-neutral-800/40 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white">
                        <ShoppingBag className="w-4 h-4 text-neutral-300" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold">Apple Store</span>
                        <span className="text-[10px] text-neutral-400">Today • Cupertino</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold">-$1,299.00</span>
                      <span className="text-[9px] text-emerald-400">+3% ($38.97)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1.5 hover:bg-neutral-800/40 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-950/60 border border-amber-800/30 flex items-center justify-center text-amber-300">
                        <Coffee className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold">Starbucks</span>
                        <span className="text-[10px] text-neutral-400">Yesterday</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold">-$6.85</span>
                      <span className="text-[9px] text-emerald-400">+2% ($0.14)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-1.5 hover:bg-neutral-800/40 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white">
                        <Car className="w-4 h-4 text-neutral-300" />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-semibold">Uber Rides</span>
                        <span className="text-[10px] text-neutral-400">Oct 15</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold">-$24.30</span>
                      <span className="text-[9px] text-emerald-400">+3% ($0.73)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ================= DOUBLE-CLICK PAY LOCKSCREEN VIEW ================= */
            <div className="flex-1 flex flex-col justify-between items-center text-center px-4 pt-10 pb-10 text-white relative">
              <div className="flex flex-col items-center">
                {/* Hold Near Reader Prompt */}
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3 animate-pulse">
                  <AppleLogo className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">Hold Near Reader</h3>
                <p className="text-xs text-neutral-400 mt-1">Ready for Apple Pay</p>
              </div>

              {/* Main Card */}
              <div className="relative origin-center transform scale-[0.72] my-auto">
                <CardView card={displayCard} interactive={false} />
              </div>

              {/* Bottom Done / Face ID / Passcode Controls */}
              <div className="w-full flex flex-col items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Face ID Verified</span>
                </div>

                <button className="w-full py-3 bg-neutral-800/80 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold backdrop-blur-md transition-colors border border-white/10">
                  Done
                </button>
              </div>
            </div>
          )}

          {/* iPhone Home Indicator bar */}
          <div className="w-[120px] h-[4px] bg-white/40 rounded-full mx-auto mb-2" />
        </div>
      </div>
    </div>
  );
}
