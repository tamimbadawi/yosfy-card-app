import React, { useState, useEffect } from 'react';
import { CardView } from './components/CardView';
import { CustomizerPanel } from './components/CustomizerPanel';
import { IPhoneWalletMockup } from './components/IPhoneWalletMockup';
import { AppleWatchMockup } from './components/AppleWatchMockup';
import { PresetsModal } from './components/PresetsModal';
import { ExportModal } from './components/ExportModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { CARD_PRESETS } from './data/presets';
import { AppleLogo } from './components/CardSvgLogos';
import { 
  RotateCw, 
  Sparkles, 
  Dices, 
  Download, 
  Smartphone, 
  Eye, 
  Watch, 
  Undo2, 
  Redo2, 
  Layers,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

export default function App() {
  const [currentCard, setCurrentCard] = useState(CARD_PRESETS[4] || CARD_PRESETS[0]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [previewMode, setPreviewMode] = useState('3d-tilt'); // '3d-tilt' | 'iphone-wallet' | 'apple-watch'
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [cardScale, setCardScale] = useState(1);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  // Undo / Redo history stack
  const [history, setHistory] = useState([CARD_PRESETS[4] || CARD_PRESETS[0]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleCardChange = (updatedCard) => {
    setCurrentCard(updatedCard);
    
    // Add to history
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(updatedCard);
    // Limit history size to 30
    if (nextHistory.length > 30) nextHistory.shift();
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentCard(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentCard(history[historyIndex + 1]);
    }
  };

  const handleSelectPreset = (preset) => {
    handleCardChange(preset);
  };

  // Generate surprise random card
  const handleRandomize = () => {
    const randomPreset = CARD_PRESETS[Math.floor(Math.random() * CARD_PRESETS.length)];
    const randomAngles = [45, 90, 135, 180, 225, 315];
    const chips = ['gold', 'silver', 'etched', 'dark'];
    const foils = ['none', 'iridescent', 'gold', 'silver'];

    const randomized = {
      ...randomPreset,
      id: `random-${Date.now()}`,
      gradient: randomPreset.gradient ? {
        ...randomPreset.gradient,
        angle: randomAngles[Math.floor(Math.random() * randomAngles.length)]
      } : randomPreset.gradient,
      chipStyle: chips[Math.floor(Math.random() * chips.length)],
      foilEffect: foils[Math.floor(Math.random() * foils.length)],
    };

    handleCardChange(randomized);
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-neutral-100 flex flex-col selection:bg-blue-500/30">
      {/* ================= APPLE-INSPIRED HEADER ================= */}
      <header className="h-16 border-b border-white/10 bg-neutral-950/80 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-neutral-800 to-neutral-700 border border-white/10 flex items-center justify-center shadow-md">
            <AppleLogo className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight text-white">Yosfy is App</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">Studio</span>
            </div>
            <span className="text-[10px] text-neutral-400 block -mt-0.5">3D Card Studio & 150+ Oleo Designs</span>
          </div>
        </div>

        {/* Center: Presets & Controls */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setIsPresetsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/20 hover:bg-neutral-800 text-xs font-medium text-neutral-200 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Oleo & Presets Gallery</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">150+</span>
          </button>

          <button
            onClick={handleRandomize}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/20 hover:bg-neutral-800 text-xs font-medium text-neutral-300 transition-all"
            title="Randomize Design"
          >
            <Dices className="w-3.5 h-3.5 text-blue-400" />
            <span>Randomize</span>
          </button>

          <div className="h-5 w-px bg-white/10 mx-1" />

          {/* Undo / Redo */}
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Undo"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg bg-neutral-900 border border-white/10 hover:bg-neutral-800 text-neutral-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Redo"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Install PWA & Export Button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
              } else {
                setIsInstallOpen(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 hover:border-white/20 hover:bg-neutral-800 text-xs font-medium text-neutral-200 transition-all shadow-sm"
            title="Install CardStudio PWA"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Install App</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Card Art & Pass</span>
          </button>
        </div>
      </header>

      {/* ================= MAIN STUDIO WORKSPACE ================= */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left / Center: Interactive Preview Stage */}
        <div className="flex-1 flex flex-col items-center justify-between p-6 overflow-y-auto relative bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]">
          
          {/* Top Stage Bar: Mode Selector */}
          <div className="w-full max-w-xl flex items-center justify-between mb-4 z-20">
            <div className="flex items-center gap-1.5 p-1 bg-neutral-900/90 border border-white/10 rounded-2xl backdrop-blur-xl shadow-lg">
              <button
                onClick={() => setPreviewMode('3d-tilt')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  previewMode === '3d-tilt'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>3D Card Studio</span>
              </button>
              <button
                onClick={() => setPreviewMode('iphone-wallet')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  previewMode === 'iphone-wallet'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iPhone Wallet</span>
              </button>
              <button
                onClick={() => setPreviewMode('apple-watch')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  previewMode === 'apple-watch'
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Watch className="w-3.5 h-3.5" />
                <span>Apple Watch</span>
              </button>
            </div>

            {/* Flip card & quick export buttons for 3D mode */}
            {previewMode === '3d-tilt' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900/90 border border-white/10 hover:border-white/20 hover:bg-neutral-800 text-xs font-medium text-neutral-300 transition-all shadow-sm"
                >
                  <RotateCw className="w-3.5 h-3.5 text-blue-400" />
                  <span>{isFlipped ? 'View Front' : 'Flip to Back'}</span>
                </button>
                <button
                  onClick={() => setIsExportOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-all shadow-md shadow-blue-500/25"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export PNG</span>
                </button>
              </div>
            )}
          </div>

          {/* Core Interactive Visualizer Area */}
          <div className="flex-1 w-full flex items-center justify-center my-auto py-8">
            {previewMode === '3d-tilt' && (
              <div className="flex flex-col items-center">
                {/* Visual Card Stage with Ambient Floor Glow */}
                <div className="relative group">
                  {/* Subtle colorful ambient back-glow behind card */}
                  <div 
                    className="absolute -inset-8 rounded-[40px] opacity-35 blur-2xl transition-all duration-500 pointer-events-none"
                    style={{
                      background: currentCard.backgroundType === 'solid' 
                        ? currentCard.backgroundColor 
                        : (currentCard.gradient?.stops?.[0]?.color || '#3b82f6')
                    }}
                  />

                  {/* 3D Tilt Card */}
                  <CardView
                    card={currentCard}
                    isFlipped={isFlipped}
                    interactive={true}
                    scale={cardScale}
                    onCardClick={() => setIsFlipped(!isFlipped)}
                  />
                </div>

                <div className="mt-8 flex items-center gap-2 text-xs text-neutral-500 select-none">
                  <span>Hover to feel 3D Apple Card light reflection • Click to flip</span>
                </div>
              </div>
            )}

            {previewMode === 'iphone-wallet' && (
              <div id="mockup-container-render">
                <IPhoneWalletMockup card={currentCard} cardStack={CARD_PRESETS.slice(1, 4)} />
              </div>
            )}

            {previewMode === 'apple-watch' && (
              <div id="mockup-container-render">
                <AppleWatchMockup card={currentCard} />
              </div>
            )}
          </div>

          {/* Bottom Zoom / Status Controls */}
          {previewMode === '3d-tilt' && (
            <div className="flex items-center gap-2 p-1 bg-neutral-900/80 border border-white/10 rounded-xl text-neutral-400 text-xs backdrop-blur-md">
              <button 
                onClick={() => setCardScale(Math.max(0.7, cardScale - 0.1))}
                className="p-1 hover:text-white"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1">{Math.round(cardScale * 100)}%</span>
              <button 
                onClick={() => setCardScale(Math.min(1.4, cardScale + 0.1))}
                className="p-1 hover:text-white"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Customization Controls Panel */}
        <aside className="w-full lg:w-[420px] xl:w-[460px] p-6 bg-neutral-950/60 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col">
          <CustomizerPanel card={currentCard} onChange={handleCardChange} />
        </aside>
      </main>

      {/* ================= MODALS ================= */}
      <PresetsModal
        isOpen={isPresetsOpen}
        onClose={() => setIsPresetsOpen(false)}
        activePresetId={currentCard.id}
        onSelectPreset={handleSelectPreset}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        card={currentCard}
      />

      <InstallPromptModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
        deferredPrompt={deferredPrompt}
        onInstallClick={() => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => {
              setDeferredPrompt(null);
              setIsInstallOpen(false);
            });
          }
        }}
      />
    </div>
  );
}
