import React from 'react';
import { CardView } from './CardView';
import { Wifi } from 'lucide-react';
import { AppleLogo } from './CardSvgLogos';

export function AppleWatchMockup({ card }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-neutral-400 font-medium mb-3">
        Apple Watch Ultra Preview
      </div>

      {/* Apple Watch Case */}
      <div className="w-[280px] h-[340px] rounded-[58px] p-4 bg-gradient-to-b from-neutral-600 via-neutral-700 to-neutral-800 shadow-2xl relative border-2 border-neutral-600 flex items-center justify-center">
        {/* Digital Crown notch on the right */}
        <div className="absolute -right-3 top-20 w-3 h-12 bg-neutral-500 rounded-r-md border border-neutral-600" />
        <div className="absolute -right-2.5 top-36 w-2 h-8 bg-neutral-600 rounded-r-sm" />

        {/* Watch Screen Bezel */}
        <div className="w-full h-full rounded-[44px] bg-black overflow-hidden relative p-3 flex flex-col justify-between border border-neutral-900">
          {/* Top Status */}
          <div className="flex items-center justify-between text-[11px] text-neutral-300 font-bold px-2 pt-1 select-none">
            <span>09:41</span>
            <div className="flex items-center gap-1">
              <AppleLogo className="w-3.5 h-3.5" color="#FFFFFF" />
              <span className="text-[10px] text-neutral-400">Pay</span>
            </div>
          </div>

          {/* Mini Card View scaled down to watch display */}
          <div className="relative origin-center transform scale-[0.52] -my-10 flex items-center justify-center">
            <CardView card={card} interactive={false} />
          </div>

          {/* Prompt at bottom */}
          <div className="flex flex-col items-center pb-1">
            <span className="text-[10px] font-semibold text-white tracking-tight">Hold Near Reader</span>
            <span className="text-[8px] text-neutral-400 mt-0.5">Double Click Side Button</span>
          </div>
        </div>
      </div>
    </div>
  );
}
