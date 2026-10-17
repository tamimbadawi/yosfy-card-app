import React from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { CARD_PRESETS } from '../data/presets';

export function PresetsModal({ isOpen, onClose, activePresetId, onSelectPreset }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Apple Pay Card Presets</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">Select a pre-designed iconic card aesthetic to start customizing</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {CARD_PRESETS.map((preset) => {
            const isSelected = activePresetId === preset.id;
            
            // Build simple preview gradient
            const bgStyle = preset.backgroundType === 'solid'
              ? { backgroundColor: preset.backgroundColor }
              : {
                  background: `linear-gradient(${preset.gradient.angle}deg, ${preset.gradient.stops.map(s => `${s.color} ${s.position}%`).join(', ')})`
                };

            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10' 
                    : 'border-white/10 bg-neutral-800/40 hover:bg-neutral-800/70 hover:border-white/20'
                }`}
              >
                {/* Mini card visual preview */}
                <div 
                  className="w-full h-28 rounded-xl shadow-md p-3 relative overflow-hidden flex flex-col justify-between border border-white/10"
                  style={bgStyle}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-80" style={{ color: preset.nameColor }}>
                      {preset.issuerLogoType?.toUpperCase() || 'APPLE'}
                    </span>
                    <span className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full border border-white/20 bg-black/20" style={{ color: preset.nameColor }}>
                      {preset.network?.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-end justify-between">
                    <span className="text-[11px] font-medium tracking-wide uppercase truncate max-w-[140px]" style={{ color: preset.nameColor }}>
                      {preset.cardholderName}
                    </span>
                    <span className="text-[9px] font-mono opacity-80" style={{ color: preset.nameColor }}>
                      •••• {preset.cardNumber?.slice(-4) || '8821'}
                    </span>
                  </div>
                </div>

                {/* Preset metadata */}
                <div className="mt-3 flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{preset.name}</span>
                      <span className="text-[9px] font-normal px-1.5 py-0.2 rounded bg-neutral-700/60 text-neutral-300">
                        {preset.category}
                      </span>
                    </h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{preset.description}</p>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 ml-2 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
