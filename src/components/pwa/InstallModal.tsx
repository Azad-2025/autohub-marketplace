import React, { useState } from 'react';
import {
  Download,
  X,
  Share2,
  PlusSquare,
  Sparkles,
  Smartphone,
  CheckCircle2,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';
import { AutoHubLogo } from '../common/BrandEmblems';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstalled?: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose, onInstalled }) => {
  const { hasNativePrompt, isIOS, installApp } = usePWA();
  const [isInstalling, setIsInstalling] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (hasNativePrompt) {
      setIsInstalling(true);
      const outcome = await installApp();
      setIsInstalling(false);
      if (outcome === 'accepted') {
        onInstalled?.();
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#0B1D31] to-[#071525] rounded-3xl border border-[rgba(150,190,255,0.25)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(35,123,255,0.2)] z-10 animate-in zoom-in-95 duration-200 text-white">
        {/* Glow halo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#237BFF]/20 blur-2xl rounded-full pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#102943]/80 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white transition-colors cursor-pointer"
          aria-label="Close install modal"
        >
          <X size={16} />
        </button>

        {/* Brand Icon & Heading */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-[#102943] border border-[#50A8FF]/40 flex items-center justify-center shadow-[0_0_20px_rgba(35,123,255,0.35)]">
              <AutoHubLogo size={42} glow={false} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#237BFF] border-2 border-[#071525] flex items-center justify-center">
              <Download size={12} className="text-white" />
            </div>
          </div>

          <h3 className="text-lg font-black tracking-tight text-white">
            Take AutoHub With You
          </h3>
          <p className="text-xs text-[#A8B9CC] mt-1.5 leading-relaxed max-w-[280px]">
            Install AutoHub on your phone and enjoy a faster, app-like car discovery experience.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="my-5 p-3 rounded-2xl bg-[#102943]/50 border border-[rgba(150,190,255,0.12)] space-y-2 text-xs">
          <div className="flex items-center gap-2.5 text-[#A8B9CC]">
            <Zap size={14} className="text-[#50A8FF] shrink-0" />
            <span>Instant launch right from your Home Screen</span>
          </div>
          <div className="flex items-center gap-2.5 text-[#A8B9CC]">
            <ShieldCheck size={14} className="text-[#50A8FF] shrink-0" />
            <span>Offline access to your saved garage & favorites</span>
          </div>
          <div className="flex items-center gap-2.5 text-[#A8B9CC]">
            <Smartphone size={14} className="text-[#50A8FF] shrink-0" />
            <span>Full-screen native mobile application experience</span>
          </div>
        </div>

        {/* Platform Specific Action */}
        {isIOS && !hasNativePrompt ? (
          /* iOS Safari 4-Step Instructions */
          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-[#173550]/70 border border-[#50A8FF]/30 text-left">
              <p className="text-[11px] font-bold text-[#50A8FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>Install on iPhone / iPad:</span>
              </p>
              <ol className="text-xs text-[#A8B9CC] space-y-2 list-none pl-0">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#237BFF] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Open AutoHub in <strong>Safari</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#237BFF] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span className="inline-flex items-center gap-1">
                    Tap the <strong>Share</strong> icon <Share2 size={13} className="text-[#50A8FF] inline" /> in Safari toolbar.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#237BFF] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span className="inline-flex items-center gap-1">
                    Select <strong>Add to Home Screen</strong> <PlusSquare size={13} className="text-[#50A8FF] inline" />.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#237BFF] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </span>
                  <span>Tap <strong>Add</strong> in the top-right corner.</span>
                </li>
              </ol>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] text-white font-semibold text-xs transition-all shadow-[0_0_15px_rgba(35,123,255,0.4)] cursor-pointer"
            >
              Got It
            </button>
          </div>
        ) : (
          /* Android / Chromium Flow with Native Prompt */
          <div className="space-y-2.5 pt-1">
            <button
              onClick={handleInstallClick}
              disabled={isInstalling}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] hover:to-[#2470E8] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(35,123,255,0.45)] active:scale-95 transition-all cursor-pointer border border-[#80BFFF]/30 disabled:opacity-50"
            >
              <Download size={16} />
              <span>{isInstalling ? 'Installing AutoHub...' : 'Install Now'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-2xl text-xs font-medium text-[#71869D] hover:text-[#A8B9CC] transition-colors cursor-pointer"
            >
              Maybe Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
