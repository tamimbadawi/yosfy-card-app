import React from 'react';

// Official Pixel-Perfect Apple Logo SVG
export function AppleLogo({ className = "w-6 h-6", color = "currentColor" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={color} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Apple"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 3.5c.62-.75 1.04-1.8.93-2.85-.9.04-1.98.6-2.61 1.34-.56.65-.95 1.7-.82 2.72 1 .08 1.99-.54 2.5-1.21Z" />
    </svg>
  );
}

// Apple Pay Full Badge (Authentic Apple Pay lockup)
export function ApplePayBadge({ className = "h-7", color = "currentColor" }) {
  return (
    <div className={`inline-flex items-center gap-1 font-semibold tracking-normal select-none ${className}`} style={{ color }}>
      <AppleLogo className="w-5 h-5 -mt-0.5" color={color} />
      <span className="text-[15px] font-semibold tracking-[-0.03em] leading-none">Pay</span>
    </div>
  );
}

// Visa Logo
export function VisaLogo({ className = "h-6", mode = "white" }) {
  const fill = mode === "original" ? "#1A1F71" : mode === "black" ? "#000000" : mode === "gold" ? "#e6b744" : "#FFFFFF";
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M47.7 34.3L53.9 5.7H63.8L57.6 34.3H47.7Z" fill={fill} />
      <path d="M92.2 6.3C89.9 5.5 86.4 4.7 82 4.7C71.3 4.7 63.8 10.4 63.7 18.5C63.6 24.5 69.1 27.9 73.2 29.9C77.4 32 78.8 33.3 78.8 35.1C78.8 37.9 75.4 39.2 72.1 39.2C67.1 39.2 64.2 38.4 61.2 37.1L59.8 36.5L58.2 43.6C60.6 44.7 65.1 45.6 69.8 45.7C81.2 45.7 88.6 40 88.8 31.4C88.9 26.3 85.5 22.3 78.1 18.8C73.6 16.5 70.9 15.3 70.9 13.1C70.9 11.2 73.1 9.1 77.8 9.1C81.7 9 84.7 9.8 86.9 10.8L88 11.3L92.2 6.3Z" fill={fill} />
      <path d="M102.7 24.1C103.5 21.9 106.7 13.3 106.7 13.3C106.7 13.3 107.5 11.2 108 9.9L110.1 20.3C109.1 21.8 107.9 23.3 102.7 24.1ZM116.5 5.7H108.9C106.5 5.7 104.6 6.4 103.6 8.8L88.5 45.1H98.9L101 39.3H113.8L115 45.1H124.2L116.5 5.7Z" fill={fill} />
      <path d="M37.5 5.7L27.8 32.3L26.7 27C24.9 20.6 20.1 13.7 14.8 10.8L23.7 45H34.2L50 5.7H37.5Z" fill={fill} />
      <path d="M17.1 5.7H0.9L0 6.6C12.8 9.8 21.2 17.5 24.7 27L21.3 9.4C20.7 7 19.1 5.7 17.1 5.7Z" fill={mode === "original" ? "#F7B600" : fill} />
    </svg>
  );
}

// Mastercard Logo
export function MastercardLogo({ className = "h-7", mode = "original" }) {
  if (mode === "white") {
    return (
      <svg className={className} viewBox="0 0 72 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23" cy="22" r="21" fill="none" stroke="#FFFFFF" strokeWidth="3" />
        <circle cx="49" cy="22" r="21" fill="none" stroke="#FFFFFF" strokeWidth="3" />
        <path d="M36 7.6C40.6 11.2 43.5 16.3 43.5 22C43.5 27.7 40.6 32.8 36 36.4C31.4 32.8 28.5 27.7 28.5 22C28.5 16.3 31.4 11.2 36 7.6Z" fill="#FFFFFF" fillOpacity="0.4" />
      </svg>
    );
  }
  if (mode === "black") {
    return (
      <svg className={className} viewBox="0 0 72 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="23" cy="22" r="21" fill="#000000" />
        <circle cx="49" cy="22" r="21" fill="#000000" fillOpacity="0.75" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 72 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="23" cy="22" r="21" fill="#EB001B" />
      <circle cx="49" cy="22" r="21" fill="#F79E1B" />
      <path d="M36 7.6C40.6 11.2 43.5 16.3 43.5 22C43.5 27.7 40.6 32.8 36 36.4C31.4 32.8 28.5 27.7 28.5 22C28.5 16.3 31.4 11.2 36 7.6Z" fill="#FF5F00" />
    </svg>
  );
}

// American Express Logo
export function AmexLogo({ className = "h-7", mode = "original" }) {
  const bg = mode === "white" ? "#FFFFFF" : mode === "black" ? "#000000" : "#006FCF";
  const fg = mode === "white" ? "#000000" : "#FFFFFF";
  return (
    <svg className={className} viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="50" rx="4" fill={bg} />
      <path d="M12 28.5L7.5 18H14.5L16.5 23L18.5 18H25.5L21 28.5H16.5L15 25L13.5 28.5H12ZM27 18H40V21H31V22H39V25H31V26H40V29H27V18ZM42 18H47.5L51 23.5L54.5 18H60V29H55.5V23.5L52.5 28H49.5L46.5 23.5V29H42V18ZM62 18H73V21H66V22H72V25H66V26H73V29H62V18Z" fill={fg} />
    </svg>
  );
}

// Discover Logo
export function DiscoverLogo({ className = "h-6", mode = "white" }) {
  const fg = mode === "black" ? "#000" : "#FFF";
  return (
    <div className={`flex items-center font-black tracking-widest text-xs uppercase px-2 py-0.5 rounded ${className}`} style={{ color: fg }}>
      DISC<span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block mx-0.5"></span>VER
    </div>
  );
}

// JCB Logo
export function JcbLogo({ className = "h-6" }) {
  return (
    <div className={`flex rounded overflow-hidden text-[9px] font-bold text-white px-1 bg-gradient-to-r from-blue-600 via-red-600 to-green-600 items-center justify-center ${className}`}>
      JCB
    </div>
  );
}

// EMV Smart Chip SVG (Detailed photorealistic/etched card chip)
export function EmvChip({ style = "gold", className = "w-11 h-8" }) {
  if (style === "hidden") return null;

  const isSilver = style === "silver";
  const isDark = style === "dark";
  const isEtched = style === "etched";

  const baseGradient = isSilver 
    ? "from-slate-200 via-zinc-100 to-slate-300 border-slate-300" 
    : isDark 
    ? "from-zinc-800 via-neutral-700 to-zinc-900 border-zinc-600"
    : isEtched
    ? "from-neutral-200/40 via-white/30 to-neutral-300/20 border-white/40"
    : "from-amber-200 via-amber-300 to-yellow-500 border-amber-400";

  const trackColor = isSilver ? "#71717a" : isDark ? "#52525b" : isEtched ? "rgba(255,255,255,0.7)" : "#854d0e";

  return (
    <div className={`relative rounded-md border shadow-sm flex items-center justify-center overflow-hidden bg-gradient-to-br ${baseGradient} ${className}`}>
      {/* Circuit track lines */}
      <svg className="w-full h-full p-0.5" viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="52" height="38" rx="4" stroke={trackColor} strokeWidth="1" strokeOpacity="0.4" />
        <path d="M1 14H18V26H1" stroke={trackColor} strokeWidth="1" strokeOpacity="0.6" />
        <path d="M53 14H36V26H53" stroke={trackColor} strokeWidth="1" strokeOpacity="0.6" />
        <path d="M18 20H36" stroke={trackColor} strokeWidth="1.2" strokeOpacity="0.7" />
        <path d="M27 1V14M27 26V39" stroke={trackColor} strokeWidth="1.2" strokeOpacity="0.7" />
        <circle cx="27" cy="20" r="3.5" fill={trackColor} fillOpacity="0.2" stroke={trackColor} strokeWidth="0.8" />
      </svg>
      {/* Subtle metallic reflection line */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent pointer-events-none" />
    </div>
  );
}

// Contactless NFC Payment Wave Icon
export function ContactlessWave({ className = "w-5 h-5", color = "currentColor" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 16.5a7.5 7.5 0 0 1 0-9" />
      <path d="M10 18.5a11.5 11.5 0 0 1 0-13" />
      <path d="M14 20.5a15.5 15.5 0 0 1 0-17" />
      <path d="M18 22.5a19.5 19.5 0 0 1 0-21" />
    </svg>
  );
}

// Bank / Issuer preset logos
export function IssuerLogo({ type, colorMode = "white", className = "h-6" }) {
  const color = colorMode === "white" ? "#FFFFFF" : colorMode === "black" ? "#000000" : colorMode === "gold" ? "#F5D061" : "currentColor";

  switch (type) {
    case 'apple':
      return (
        <div className={`flex items-center gap-1.5 ${className}`}>
          <AppleLogo className="w-5 h-5" color={color} />
          <span className="text-xs font-semibold tracking-wider uppercase" style={{ color }}>Apple Card</span>
        </div>
      );
    case 'chase':
      return (
        <div className={`flex items-center gap-1.5 ${className}`}>
          {/* Chase Octagon SVG */}
          <svg className="w-5 h-5" viewBox="0 0 100 100" fill={color}>
            <polygon points="30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30" fill="none" stroke={color} strokeWidth="12" />
            <polygon points="38,20 62,20 80,38 80,62 62,80 38,80 20,62 20,38" fill={color} />
          </svg>
          <span className="text-xs font-black tracking-widest uppercase" style={{ color }}>CHASE</span>
        </div>
      );
    case 'goldman':
      return (
        <div className={`flex flex-col text-[9px] font-bold tracking-tight leading-none ${className}`} style={{ color }}>
          <span>Goldman</span>
          <span className="tracking-wide">Sachs</span>
        </div>
      );
    case 'revolut':
      return (
        <div className={`flex items-center gap-1 text-sm font-black tracking-tighter uppercase ${className}`} style={{ color }}>
          <span className="text-base">R</span>
          <span className="text-xs font-bold tracking-widest">Revolut</span>
        </div>
      );
    case 'monzo':
      return (
        <div className={`flex items-center gap-1.5 text-xs font-extrabold tracking-widest uppercase ${className}`} style={{ color }}>
          <span className="w-3.5 h-3.5 rounded-sm bg-coral-500 bg-[#FF4F40] inline-block"></span>
          <span>monzo</span>
        </div>
      );
    case 'citi':
      return (
        <div className={`relative flex items-center text-sm font-bold tracking-tighter ${className}`} style={{ color }}>
          <span className="text-base font-black">citi</span>
          <svg className="w-4 h-2 absolute -top-1 left-2" viewBox="0 0 20 10" fill="none">
            <path d="M0 8 Q10 0 20 8" stroke="#ED1B2D" strokeWidth="2.5" fill="none" />
          </svg>
        </div>
      );
    case 'barclays':
      return (
        <div className={`flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase ${className}`} style={{ color }}>
          <span>BARCLAYS</span>
        </div>
      );
    default:
      return null;
  }
}
