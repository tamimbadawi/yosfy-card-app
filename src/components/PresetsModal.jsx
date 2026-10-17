import React, { useState, useMemo } from 'react';
import { X, Sparkles, Check, Search, Palette } from 'lucide-react';
import { CARD_PRESETS } from '../data/presets';

export function PresetsModal({ isOpen, onClose, activePresetId, onSelectPreset }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Designs' },
    { id: 'vol1', label: 'Oleo Vol. 1 (50)' },
    { id: 'vol2', label: 'Oleo Vol. 2 (50)' },
    { id: 'vol3', label: 'Oleo Vol. 3 (50)' },
    { id: 'classic', label: 'Classic Metal (7)' },
  ];

  const filteredPresets = useMemo(() => {
    return CARD_PRESETS.filter((preset) => {
      // Category filter
      if (selectedCategory === 'vol1' && !preset.id.startsWith('oleo-vol1')) return false;
      if (selectedCategory === 'vol2' && !preset.id.startsWith('oleo-vol2')) return false;
      if (selectedCategory === 'vol3' && !preset.id.startsWith('oleo-vol3')) return false;
      if (selectedCategory === 'classic' && preset.id.startsWith('oleo-')) return false;

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = preset.name.toLowerCase().includes(query);
        const matchesDesc = preset.description.toLowerCase().includes(query);
        const matchesCat = preset.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Card Preset Gallery ({CARD_PRESETS.length} Designs)</span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Includes all 150 official Oleo Card App skin volumes (Vol 1, 2, 3) & iconic Apple Wallet classics
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search & Category Filter bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search skins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-800/80 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-neutral-800/60 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Presets Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPresets.map((preset) => {
            const isSelected = activePresetId === preset.id;
            
            // Background preview style
            const bgStyle = preset.customImage
              ? {
                  backgroundImage: `url(${preset.customImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : preset.backgroundType === 'solid'
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
                className={`group p-3 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between ${
                  isSelected 
                    ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10' 
                    : 'border-white/10 bg-neutral-800/40 hover:bg-neutral-800/70 hover:border-white/20'
                }`}
              >
                {/* Mini card visual preview */}
                <div 
                  className="w-full h-32 rounded-xl shadow-md p-3 relative overflow-hidden flex flex-col justify-between border border-white/10 bg-neutral-950"
                  style={bgStyle}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span 
                      className="text-[9px] font-bold tracking-wider uppercase px-1.5 py-0.5 rounded backdrop-blur-md bg-black/30 border border-white/10 text-white"
                    >
                      {preset.issuerLogoType?.toUpperCase() || 'APPLE'}
                    </span>
                    <span 
                      className="text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded backdrop-blur-md bg-black/30 border border-white/10 text-white"
                    >
                      {preset.network?.toUpperCase()}
                    </span>
                  </div>

                  <div className="relative z-10 flex items-end justify-between">
                    <span className="text-[10px] font-medium tracking-wide uppercase truncate max-w-[130px] drop-shadow-md text-white">
                      {preset.cardholderName}
                    </span>
                    <span className="text-[9px] font-mono drop-shadow-md text-white/90">
                      •••• {preset.cardNumber?.slice(-4) || '8821'}
                    </span>
                  </div>
                </div>

                {/* Preset metadata */}
                <div className="mt-2.5 flex items-start justify-between">
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5 truncate">
                      <span className="truncate">{preset.name}</span>
                      {preset.isOleoDesign && (
                        <span className="text-[8px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                          OLEO
                        </span>
                      )}
                    </h4>
                    <p className="text-[10px] text-neutral-400 mt-0.5 truncate">{preset.category}</p>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-white/10 bg-black/30 flex items-center justify-between text-xs text-neutral-400">
          <span>Showing {filteredPresets.length} designs</span>
          <span className="text-[11px] text-neutral-500">Click any design to load into 3D Studio & Apple Wallet mockup</span>
        </div>
      </div>
    </div>
  );
}
