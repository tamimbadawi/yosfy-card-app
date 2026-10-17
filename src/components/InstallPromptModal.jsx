import React from 'react';
import { X, Share, PlusSquare, Download, CheckCircle2, Smartphone } from 'lucide-react';

export function InstallPromptModal({ isOpen, onClose, deferredPrompt, onInstallClick }) {
  if (!isOpen) return null;

  // Check if user is on iOS
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center shadow-inner">
              <img src="/pwa-192x192.png" alt="CardStudio" className="w-7 h-7 rounded-lg" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Install CardStudio</h3>
              <p className="text-xs text-neutral-400">Add to your device for offline use</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="space-y-2 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full standalone window without browser navigation bar</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Works offline with cached pass designer & textures</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant launch directly from your home screen or dock</span>
            </div>
          </div>

          {/* If Native PWA Install Prompt is available (Desktop Chrome, Edge, Android) */}
          {deferredPrompt && (
            <button
              onClick={onInstallClick}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-xs text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all mt-4"
            >
              <Download className="w-4 h-4" />
              <span>Install to Desktop / Home Screen</span>
            </button>
          )}

          {/* If iOS Safari instructions */}
          {isIos && (
            <div className="p-4 rounded-2xl bg-neutral-800/50 border border-white/10 space-y-3 mt-4 text-xs">
              <span className="font-semibold text-white block">Instructions for iPhone / iPad:</span>
              <ol className="space-y-2 text-neutral-300">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center text-[11px] font-bold">1</span>
                  <span>Tap the <strong className="text-white">Share</strong> icon in Safari</span>
                  <Share className="w-4 h-4 text-blue-400 ml-1 inline" />
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center text-[11px] font-bold">2</span>
                  <span>Scroll down and tap <strong className="text-white">Add to Home Screen</strong></span>
                  <PlusSquare className="w-4 h-4 text-white ml-1 inline" />
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-700 flex items-center justify-center text-[11px] font-bold">3</span>
                  <span>Tap <strong className="text-white">Add</strong> in the top right corner</span>
                </li>
              </ol>
            </div>
          )}

          {!deferredPrompt && !isIos && (
            <div className="p-4 rounded-2xl bg-neutral-800/40 border border-white/5 text-xs text-neutral-400 text-center">
              Your browser already supports or installed this app. You can also click the Install icon in your browser address bar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
