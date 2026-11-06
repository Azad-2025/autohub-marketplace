import React from 'react';
import { Download, X, Smartphone, Sparkles } from 'lucide-react';
import { AutoHubLogo } from '../common/BrandEmblems';

interface InstallBannerProps {
  onInstallClick: () => void;
  onDismiss: () => void;
}

export const InstallBanner: React.FC<InstallBannerProps> = ({
  onInstallClick,
  onDismiss
}) => {
  return (
    <div className="relative rounded-3xl bg-gradient-to-r from-[#102943] via-[#0B1D31] to-[#173550] border border-[rgba(150,190,255,0.22)] p-4 shadow-[0_10px_30px_rgba(7,21,37,0.8),0_0_20px_rgba(35,123,255,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-3 duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#237BFF]/15 blur-2xl rounded-full pointer-events-none" />

      {/* Dismiss Button */}
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#071525]/70 border border-[rgba(150,190,255,0.15)] flex items-center justify-center text-[#71869D] hover:text-white transition-colors cursor-pointer"
        aria-label="Dismiss install banner"
      >
        <X size={14} />
      </button>

      <div className="flex items-center gap-3.5 pr-6">
        {/* App Icon */}
        <div className="w-12 h-12 rounded-2xl bg-[#071525] border border-[#50A8FF]/40 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(35,123,255,0.3)]">
          <AutoHubLogo size={30} glow={false} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-sm font-bold text-white tracking-tight truncate">
              AutoHub Mobile App
            </h4>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#237BFF]/20 border border-[#237BFF]/40 text-[#50A8FF] font-semibold uppercase">
              PWA
            </span>
          </div>
          <p className="text-[11px] text-[#A8B9CC] mt-0.5 leading-snug">
            Install our app for a better mobile experience.
          </p>
        </div>
      </div>

      {/* Install Button matching prompt specification */}
      <div className="mt-3.5 pt-3 border-t border-[rgba(150,190,255,0.12)] flex items-center justify-between gap-3">
        <span className="text-[10px] text-[#71869D] flex items-center gap-1">
          <Smartphone size={12} className="text-[#50A8FF]" />
          <span>Standalone Experience</span>
        </span>

        <button
          onClick={onInstallClick}
          className="py-2 px-4 rounded-xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] hover:to-[#2470E8] text-white font-semibold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(35,123,255,0.4)] active:scale-95 transition-all cursor-pointer border border-[#80BFFF]/30"
        >
          <Download size={14} />
          <span>Install AutoHub</span>
        </button>
      </div>
    </div>
  );
};
