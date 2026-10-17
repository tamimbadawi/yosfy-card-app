import React, { useState } from 'react';
import { 
  Palette, 
  CreditCard, 
  Sparkles, 
  Cpu, 
  Image as ImageIcon, 
  Type, 
  Layers, 
  Upload, 
  Trash2, 
  Check 
} from 'lucide-react';

export function CustomizerPanel({ card, onChange }) {
  const [activeTab, setActiveTab] = useState('background');

  const updateCard = (key, value) => {
    onChange({ ...card, [key]: value });
  };

  const updateGradientStop = (index, color) => {
    const newStops = [...(card.gradient?.stops || [])];
    if (newStops[index]) {
      newStops[index] = { ...newStops[index], color };
      updateCard('gradient', { ...card.gradient, stops: newStops });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateCard('customImage', event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateCard('issuerCustomLogo', event.target?.result);
        updateCard('issuerLogoType', 'custom');
      };
      reader.readAsDataURL(file);
    }
  };

  const tabs = [
    { id: 'background', label: 'Background', icon: Palette },
    { id: 'branding', label: 'Branding', icon: CreditCard },
    { id: 'details', label: 'Details', icon: Type },
    { id: 'hardware', label: 'Hardware', icon: Cpu },
    { id: 'effects', label: '3D & Sheen', icon: Sparkles },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-neutral-900/90 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl">
      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto p-1 bg-black/40">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[70px] py-2.5 px-3 flex flex-col items-center gap-1 text-[11px] font-medium rounded-xl transition-all ${
                isActive 
                  ? 'bg-neutral-800 text-white shadow-sm' 
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-sm text-neutral-200">
        {/* ================= 1. BACKGROUND TAB ================= */}
        {activeTab === 'background' && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Background Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'solid', label: 'Solid' },
                  { id: 'gradient', label: 'Gradient' },
                  { id: 'custom', label: 'Art / Image' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateCard('backgroundType', t.id === 'custom' ? card.backgroundType : t.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      card.backgroundType === t.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Solid color selection */}
            {card.backgroundType === 'solid' && (
              <div className="space-y-3">
                <label className="text-xs font-medium text-neutral-300 block">
                  Base Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={card.backgroundColor || '#ECEAE6'}
                    onChange={(e) => updateCard('backgroundColor', e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={card.backgroundColor || '#ECEAE6'}
                    onChange={(e) => updateCard('backgroundColor', e.target.value)}
                    className="flex-1 bg-neutral-800 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono uppercase text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Popular Palette swatches */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {['#ECEAE6', '#161618', '#0F1C3F', '#CA8A04', '#064E3B', '#7E22CE', '#BE185D', '#374151'].map((c) => (
                    <button
                      key={c}
                      onClick={() => updateCard('backgroundColor', c)}
                      className="w-7 h-7 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-110"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Gradient controls */}
            {card.backgroundType === 'gradient' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-neutral-300">
                    Gradient Angle ({card.gradient?.angle || 135}°)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={card.gradient?.angle || 135}
                    onChange={(e) => updateCard('gradient', { ...card.gradient, angle: Number(e.target.value) })}
                    className="w-32 accent-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-300 block">
                    Gradient Color Stops
                  </label>
                  <div className="space-y-2">
                    {(card.gradient?.stops || []).map((stop, index) => (
                      <div key={index} className="flex items-center gap-3 bg-neutral-800/60 p-2 rounded-xl border border-white/5">
                        <span className="text-[10px] text-neutral-400 font-mono w-10">Stop {index + 1}</span>
                        <input
                          type="color"
                          value={stop.color}
                          onChange={(e) => updateGradientStop(index, e.target.value)}
                          className="w-7 h-7 rounded-lg cursor-pointer bg-transparent border-0"
                        />
                        <input
                          type="text"
                          value={stop.color}
                          onChange={(e) => updateGradientStop(index, e.target.value)}
                          className="flex-1 bg-neutral-900 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono uppercase text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Material Texture */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Surface Texture
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'titanium', label: 'Titanium Grain' },
                  { id: 'brushed', label: 'Brushed Metal' },
                  { id: 'carbon', label: 'Carbon Weave' },
                  { id: 'none', label: 'Smooth Matte' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateCard('texture', t.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                      card.texture === t.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {card.texture !== 'none' && (
                <div className="pt-2">
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Texture Opacity</span>
                    <span>{Math.round((card.textureOpacity || 0.3) * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.05"
                    value={card.textureOpacity || 0.3}
                    onChange={(e) => updateCard('textureOpacity', parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Custom Image Upload */}
            <div className="space-y-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Custom Artwork / Wallpaper
                </label>
                {card.customImage && (
                  <button
                    onClick={() => updateCard('customImage', null)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                )}
              </div>

              <label className="border-2 border-dashed border-white/15 hover:border-white/30 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-800/30">
                <Upload className="w-5 h-5 text-neutral-400 mb-1.5" />
                <span className="text-xs text-neutral-300 font-medium">Click to upload custom card image</span>
                <span className="text-[10px] text-neutral-500 mt-0.5">PNG, JPG, or SVG recommended</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {card.customImage && (
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Image Blend Mode</span>
                    <select
                      value={card.imageBlendMode || 'normal'}
                      onChange={(e) => updateCard('imageBlendMode', e.target.value)}
                      className="bg-neutral-800 border border-white/10 rounded px-2 py-1 text-xs text-white"
                    >
                      <option value="normal">Normal</option>
                      <option value="overlay">Overlay</option>
                      <option value="screen">Screen</option>
                      <option value="multiply">Multiply</option>
                      <option value="soft-light">Soft Light</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 2. BRANDING TAB ================= */}
        {activeTab === 'branding' && (
          <div className="space-y-5">
            {/* Payment Network */}
            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Payment Network
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'apple-cash', label: 'Apple Pay / Cash' },
                  { id: 'mastercard', label: 'Mastercard' },
                  { id: 'visa', label: 'Visa' },
                  { id: 'amex', label: 'American Express' },
                  { id: 'discover', label: 'Discover' },
                  { id: 'none', label: 'None (Stealth)' },
                ].map((net) => (
                  <button
                    key={net.id}
                    onClick={() => updateCard('network', net.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left transition-all flex items-center justify-between ${
                      card.network === net.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    <span>{net.label}</span>
                    {card.network === net.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Network Color Mode */}
            {card.network !== 'none' && (
              <div>
                <label className="text-xs font-medium text-neutral-300 block mb-2">
                  Network Logo Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['original', 'white', 'black', 'gold'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateCard('networkColorMode', mode)}
                      className={`py-1.5 px-2 rounded-lg text-xs capitalize border text-center ${
                        card.networkColorMode === mode
                          ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                          : 'border-white/10 bg-neutral-800/40 text-neutral-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bank Issuer Logo */}
            <div className="pt-3 border-t border-white/10">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                Bank / Issuer Brand
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'apple', label: 'Apple' },
                  { id: 'chase', label: 'Chase' },
                  { id: 'amex', label: 'Amex' },
                  { id: 'goldman', label: 'Goldman' },
                  { id: 'revolut', label: 'Revolut' },
                  { id: 'citi', label: 'Citi' },
                  { id: 'none', label: 'None' },
                ].map((iss) => (
                  <button
                    key={iss.id}
                    onClick={() => updateCard('issuerLogoType', iss.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      card.issuerLogoType === iss.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {iss.label}
                  </button>
                ))}
              </div>

              {/* Upload Custom Bank Logo */}
              <div className="mt-3">
                <label className="border border-dashed border-white/20 hover:border-white/40 rounded-xl p-2.5 flex items-center justify-center gap-2 cursor-pointer bg-neutral-800/30">
                  <Upload className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="text-xs text-neutral-300">Upload Custom Bank Logo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomLogoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Issuer Color Mode */}
              {card.issuerLogoType !== 'none' && (
                <div className="mt-3">
                  <label className="text-xs font-medium text-neutral-400 block mb-1.5">
                    Issuer Logo Color
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['white', 'black', 'gold'].map((c) => (
                      <button
                        key={c}
                        onClick={() => updateCard('issuerColorMode', c)}
                        className={`py-1.5 px-2 rounded-lg text-xs capitalize border text-center ${
                          card.issuerColorMode === c
                            ? 'border-blue-500 bg-blue-500/10 text-white'
                            : 'border-white/10 bg-neutral-800/40 text-neutral-400'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 3. DETAILS TAB ================= */}
        {activeTab === 'details' && (
          <div className="space-y-5">
            {/* Cardholder Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Cardholder Name
              </label>
              <input
                type="text"
                value={card.cardholderName || ''}
                onChange={(e) => updateCard('cardholderName', e.target.value)}
                placeholder="JOHN APPLESEED"
                className="w-full bg-neutral-800 border border-white/10 rounded-xl px-3 py-2.5 text-sm uppercase text-white tracking-wider focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Typography selection */}
            <div>
              <label className="text-xs font-medium text-neutral-400 block mb-2">
                Name Typography
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'sf', label: 'SF Pro' },
                  { id: 'serif', label: 'Classic Serif' },
                  { id: 'luxury', label: 'Luxury' },
                  { id: 'mono', label: 'Monospace' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => updateCard('nameFont', f.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      card.nameFont === f.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Name color */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-neutral-400 block">
                Text & Laser Etch Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={card.nameColor || '#FFFFFF'}
                  onChange={(e) => updateCard('nameColor', e.target.value)}
                  className="w-9 h-9 rounded-xl cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={card.nameColor || '#FFFFFF'}
                  onChange={(e) => updateCard('nameColor', e.target.value)}
                  className="flex-1 bg-neutral-800 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono uppercase text-white"
                />
              </div>
            </div>

            {/* Card Number display */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Card Number Visibility
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'hidden', label: 'Hidden (Apple)' },
                  { id: 'masked', label: 'Masked (•••• 8821)' },
                  { id: 'full', label: 'Full 16 Digits' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => updateCard('cardNumberType', m.id)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      card.cardNumberType === m.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {card.cardNumberType !== 'hidden' && (
                <div className="pt-1">
                  <label className="text-xs text-neutral-400 block mb-1">Last 4 or Full Card Number</label>
                  <input
                    type="text"
                    value={card.cardNumber || ''}
                    onChange={(e) => updateCard('cardNumber', e.target.value)}
                    placeholder="4242 •••• •••• 8821"
                    className="w-full bg-neutral-800 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white"
                  />
                </div>
              )}
            </div>

            {/* Expiration & CVV */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-neutral-400 block mb-1">Expiration Date</label>
                <input
                  type="text"
                  value={card.expirationDate || ''}
                  onChange={(e) => updateCard('expirationDate', e.target.value)}
                  placeholder="12/29"
                  className="w-full bg-neutral-800 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>
              <div>
                <label className="text-xs text-neutral-400 block mb-1">CVV Security Code</label>
                <input
                  type="text"
                  value={card.cvv || ''}
                  onChange={(e) => updateCard('cvv', e.target.value)}
                  placeholder="842"
                  className="w-full bg-neutral-800 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. HARDWARE TAB ================= */}
        {activeTab === 'hardware' && (
          <div className="space-y-5">
            {/* EMV Smart Chip */}
            <div>
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                EMV Smart Chip Finish
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gold', label: 'Gold Bullion Chip' },
                  { id: 'silver', label: 'Silver Chrome Chip' },
                  { id: 'etched', label: 'Laser-Etched Minimal' },
                  { id: 'dark', label: 'Stealth Black Chip' },
                  { id: 'hidden', label: 'Hidden (Virtual Pass)' },
                ].map((chip) => (
                  <button
                    key={chip.id}
                    onClick={() => updateCard('chipStyle', chip.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between ${
                      card.chipStyle === chip.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    <span>{chip.label}</span>
                    {card.chipStyle === chip.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Contactless Wave Toggle */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-white block">Contactless NFC Wave</span>
                <span className="text-[10px] text-neutral-400">Shows tap-to-pay wave icon</span>
              </div>
              <input
                type="checkbox"
                checked={card.contactlessIcon}
                onChange={(e) => updateCard('contactlessIcon', e.target.checked)}
                className="w-5 h-5 rounded accent-blue-500 cursor-pointer"
              />
            </div>

            {/* Tier Badge */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Card Status / Tier Badge
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'titanium', label: 'Titanium' },
                  { id: 'platinum', label: 'Platinum' },
                  { id: 'world-elite', label: 'World Elite' },
                  { id: 'infinite', label: 'Infinite' },
                  { id: 'custom', label: 'Custom' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => updateCard('tierBadge', tier.id)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      card.tierBadge === tier.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>

              {card.tierBadge === 'custom' && (
                <div className="pt-1">
                  <input
                    type="text"
                    value={card.customBadgeText || ''}
                    onChange={(e) => updateCard('customBadgeText', e.target.value)}
                    placeholder="E.g. FOUNDER, VIP, RESERVE"
                    className="w-full bg-neutral-800 border border-white/10 rounded-xl px-3 py-2 text-xs uppercase text-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= 5. EFFECTS TAB ================= */}
        {activeTab === 'effects' && (
          <div className="space-y-5">
            {/* Holographic Pearlescent Sheen */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-white block">Apple Card Hologram Sheen</span>
                <span className="text-[10px] text-neutral-400">Dynamic pearlescent rainbow reflection</span>
              </div>
              <input
                type="checkbox"
                checked={card.holographicSheen}
                onChange={(e) => updateCard('holographicSheen', e.target.checked)}
                className="w-5 h-5 rounded accent-blue-500 cursor-pointer"
              />
            </div>

            {card.holographicSheen && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-neutral-400">
                  <span>Sheen Glow Intensity</span>
                  <span>{Math.round((card.sheenIntensity || 0.65) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={card.sheenIntensity || 0.65}
                  onChange={(e) => updateCard('sheenIntensity', parseFloat(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
            )}

            {/* Foil Embossing Effect */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Metallic Foil Embossing
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Flat Laser-Etched' },
                  { id: 'iridescent', label: 'Rainbow Iridescent' },
                  { id: 'gold', label: 'Gold Foil' },
                  { id: 'silver', label: 'Silver Chrome Foil' },
                ].map((foil) => (
                  <button
                    key={foil.id}
                    onClick={() => updateCard('foilEffect', foil.id)}
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between ${
                      card.foilEffect === foil.id
                        ? 'border-blue-500 bg-blue-500/10 text-white font-semibold'
                        : 'border-white/10 bg-neutral-800/50 hover:bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    <span>{foil.label}</span>
                    {card.foilEffect === foil.id && <Check className="w-3.5 h-3.5 text-blue-400" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
