import React, { useRef, useState, useEffect } from 'react';
import { 
  AppleLogo, 
  ApplePayBadge, 
  VisaLogo, 
  MastercardLogo, 
  AmexLogo, 
  DiscoverLogo, 
  JcbLogo, 
  EmvChip, 
  ContactlessWave, 
  IssuerLogo 
} from './CardSvgLogos';

export function CardView({ 
  card, 
  isFlipped = false, 
  interactive = true, 
  scale = 1,
  id = "apple-pay-card-render",
  onCardClick
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Percentage
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    
    // Tilt angles (subtle & realistic Apple tilt max +- 14 deg)
    const rx = ((py - 50) / 50) * -12;
    const ry = ((px - 50) / 50) * 14;

    setRotateX(rx);
    setRotateY(ry);
    setGlarePos({ x: px, y: py, opacity: 0.65 });
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Build card background style
  const getCardBackgroundStyle = () => {
    if (card.backgroundType === 'solid') {
      return { backgroundColor: card.backgroundColor };
    }
    if (card.backgroundType === 'gradient') {
      const g = card.gradient;
      if (g.type === 'radial') {
        const stopsStr = g.stops.map(s => `${s.color} ${s.position}%`).join(', ');
        return { background: `radial-gradient(circle at center, ${stopsStr})` };
      } else {
        const stopsStr = g.stops.map(s => `${s.color} ${s.position}%`).join(', ');
        return { background: `linear-gradient(${g.angle}deg, ${stopsStr})` };
      }
    }
    return { backgroundColor: card.backgroundColor || '#1c1c1e' };
  };

  // Font family helper
  const getFontFamily = () => {
    switch(card.nameFont) {
      case 'serif': return '"Playfair Display", Georgia, serif';
      case 'mono': return 'ui-monospace, SFMono-Regular, Menlo, monospace';
      case 'luxury': return '"Cinzel", "Bodoni MT", serif';
      default: return '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
    }
  };

  // Foil class helper
  const getFoilClass = () => {
    if (card.foilEffect === 'gold') return 'foil-gold';
    if (card.foilEffect === 'silver') return 'foil-silver';
    if (card.foilEffect === 'iridescent') return 'foil-iridescent';
    return '';
  };

  return (
    <div 
      className="relative select-none perspective-[1200px]"
      style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
    >
      <div
        id={id}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onCardClick}
        className="w-[min(calc(100vw-2.5rem),440px)] h-[calc(min(calc(100vw-2.5rem),440px)/1.5845)] rounded-[20px] sm:rounded-[24px] shadow-2xl relative transition-transform duration-200 ease-out preserve-3d cursor-pointer overflow-hidden border border-white/10"
        style={{
          transform: interactive 
            ? `rotateX(${rotateX}deg) rotateY(${rotateY + (isFlipped ? 180 : 0)}deg)`
            : `rotateY(${isFlipped ? 180 : 0}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.3s ease',
          boxShadow: isFlipped
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.65)'
            : '0 28px 60px -15px rgba(0, 0, 0, 0.55), 0 0 20px 2px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* ================= FRONT SIDE ================= */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden rounded-[20px] sm:rounded-[24px] overflow-hidden p-4 sm:p-6 flex flex-col justify-between"
          style={{
            ...getCardBackgroundStyle(),
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Custom Uploaded Background Image Layer */}
          {card.customImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: `url(${card.customImage})`,
                opacity: card.imageOpacity !== undefined ? card.imageOpacity : (card.isOleoDesign || card.backgroundType === 'custom' ? 1 : 0.85),
                mixBlendMode: card.imageBlendMode || 'normal',
                transform: `scale(${card.imageScale || 1})`,
                backgroundSize: card.imageFit || 'cover'
              }}
            />
          )}

          {/* Texture Overlays */}
          {card.texture === 'titanium' && (
            <div 
              className="absolute inset-0 titanium-grain pointer-events-none" 
              style={{ opacity: card.textureOpacity || 0.35 }}
            />
          )}
          {card.texture === 'brushed' && (
            <div 
              className="absolute inset-0 brushed-metal pointer-events-none" 
              style={{ opacity: card.textureOpacity || 0.4 }}
            />
          )}
          {card.texture === 'carbon' && (
            <div 
              className="absolute inset-0 carbon-pattern pointer-events-none" 
              style={{ opacity: card.textureOpacity || 0.4 }}
            />
          )}

          {/* Dynamic Light Specular Glare (Reacts to cursor) */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              opacity: glarePos.opacity,
              background: `radial-gradient(circle 320px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 80%)`
            }}
          />

          {/* Iridescent Rainbow Sheen Layer (Apple Card signature effect) */}
          {card.holographicSheen && (
            <div 
              className="absolute inset-0 iridescent-sheen pointer-events-none mix-blend-color-dodge transition-transform duration-150"
              style={{
                opacity: card.sheenIntensity ?? 0.65,
                transform: `translate(${(glarePos.x - 50) * 1.2}px, ${(glarePos.y - 50) * 1.2}px)`
              }}
            />
          )}

          {/* Frosted Border Highlight */}
          <div className="absolute inset-0 rounded-[24px] border border-white/20 pointer-events-none" />

          {/* Card Top Row: Issuer Logo & Contactless / Badge */}
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-3">
              {card.issuerLogoType !== 'none' && (
                card.issuerLogoType === 'custom' && card.issuerCustomLogo ? (
                  <img src={card.issuerCustomLogo} alt="Bank Logo" className="h-7 object-contain max-w-[110px]" />
                ) : (
                  <IssuerLogo type={card.issuerLogoType} colorMode={card.issuerColorMode} />
                )
              )}
            </div>

            <div className="flex items-center gap-3">
              {card.contactlessIcon && (
                <ContactlessWave 
                  className="w-5 h-5 opacity-80" 
                  color={card.issuerColorMode === 'black' ? '#000000' : '#FFFFFF'} 
                />
              )}
              {card.tierBadge !== 'none' && (
                <div 
                  className={`text-[10px] tracking-widest font-semibold px-2 py-0.5 rounded-full border border-white/20 uppercase bg-black/20 backdrop-blur-md ${getFoilClass()}`}
                  style={{ color: card.nameColor }}
                >
                  {card.tierBadge === 'custom' ? card.customBadgeText : card.tierBadge}
                </div>
              )}
            </div>
          </div>

          {/* Card Middle: EMV Smart Chip */}
          <div className="relative z-10 flex items-center gap-3 my-auto">
            {card.chipStyle !== 'hidden' && (
              <EmvChip style={card.chipStyle} />
            )}
            {card.cardNumberType !== 'hidden' && (
              <span 
                className="font-mono text-sm tracking-widest text-shadow opacity-85 select-all"
                style={{ color: card.nameColor }}
              >
                {card.cardNumberType === 'masked' 
                  ? `•••• ${card.cardNumber?.slice(-4) || '8821'}` 
                  : (card.cardNumber || '•••• •••• •••• 8821')}
              </span>
            )}
          </div>

          {/* Card Bottom Row: Cardholder Name & Payment Network */}
          <div className="relative z-10 flex items-end justify-between">
            <div className="flex flex-col">
              <span 
                className={`text-sm tracking-wider font-medium uppercase drop-shadow-sm transition-colors ${getFoilClass()}`}
                style={{
                  fontFamily: getFontFamily(),
                  color: card.nameColor || '#FFFFFF',
                  letterSpacing: '0.08em'
                }}
              >
                {card.cardholderName || 'CARDHOLDER NAME'}
              </span>
              {card.expirationDate && (
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] uppercase tracking-wider opacity-60" style={{ color: card.nameColor }}>Valid Thru</span>
                  <span className="font-mono text-xs opacity-85 tracking-widest" style={{ color: card.nameColor }}>
                    {card.expirationDate}
                  </span>
                </div>
              )}
            </div>

            {/* Network Logo */}
            <div className="flex items-center">
              {card.network === 'apple-cash' && (
                <ApplePayBadge color={card.networkColorMode === 'black' ? '#000000' : '#FFFFFF'} />
              )}
              {card.network === 'visa' && (
                <VisaLogo mode={card.networkColorMode} />
              )}
              {card.network === 'mastercard' && (
                <MastercardLogo mode={card.networkColorMode} />
              )}
              {card.network === 'amex' && (
                <AmexLogo mode={card.networkColorMode} />
              )}
              {card.network === 'discover' && (
                <DiscoverLogo mode={card.networkColorMode} />
              )}
              {card.network === 'jcb' && (
                <JcbLogo />
              )}
            </div>
          </div>
        </div>

        {/* ================= BACK SIDE ================= */}
        <div 
          className="absolute inset-0 w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden p-4 sm:p-6 flex flex-col justify-between"
          style={{
            ...getCardBackgroundStyle(),
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Subtle Back Texture */}
          {card.texture !== 'none' && (
            <div className="absolute inset-0 bg-black/10 pointer-events-none" />
          )}

          {/* Magnetic Stripe */}
          <div className="w-full h-12 bg-neutral-900 mt-6 shadow-inner relative flex items-center">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-neutral-700/60 to-transparent" />
          </div>

          {/* Signature Panel & CVV */}
          <div className="px-6 space-y-4 my-auto">
            <div className="flex items-center gap-3">
              {/* White signature strip */}
              <div className="h-9 flex-1 bg-neutral-100 rounded flex items-center justify-between px-3 relative overflow-hidden shadow-sm">
                {/* Security line patterns */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,#f3f4f6,#f3f4f6_6px,#e5e7eb_6px,#e5e7eb_12px)] opacity-50" />
                <span className="font-serif italic text-xs text-neutral-500 relative z-10 select-none">
                  Authorized Signature
                </span>
                <span className="font-mono font-bold tracking-widest text-xs text-neutral-800 bg-white px-2 py-0.5 rounded shadow-inner relative z-10 border border-neutral-300">
                  {card.cvv || '842'}
                </span>
              </div>

              {/* Holographic Bird / Security Seal */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-300 via-emerald-400 to-indigo-400 p-[1px] flex items-center justify-center shadow-md">
                <div className="w-full h-full rounded-full bg-black/40 flex items-center justify-center text-[8px] font-black tracking-tighter text-white">
                  SECURE
                </div>
              </div>
            </div>

            {/* Apple Card / Wallet Compliance Disclaimer */}
            <div className="text-[8px] leading-tight text-neutral-400 max-w-[360px] opacity-75">
              This card is issued pursuant to license from payment network. Use of this card is subject to the agreement between issuer and cardholder. For customer service or lost cards, open Apple Wallet app or contact issuer support.
            </div>
          </div>

          {/* Card Back Footer */}
          <div className="px-6 pb-5 flex items-center justify-between text-neutral-400">
            <div className="flex items-center gap-1.5">
              <AppleLogo className="w-3.5 h-3.5 opacity-60" color="currentColor" />
              <span className="text-[9px] font-medium tracking-wide">Apple Pay Enabled</span>
            </div>
            <span className="text-[9px] font-mono opacity-60">ID: {card.id || 'APL-8821'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
