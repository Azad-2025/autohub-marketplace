import React from 'react';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC<{ isOnline: boolean }> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="fixed top-14 left-4 right-4 max-w-md mx-auto z-50 animate-in slide-in-from-top duration-300">
      <div className="py-2 px-3.5 rounded-2xl bg-gradient-to-r from-amber-600/90 to-amber-700/90 backdrop-blur-md border border-amber-400/40 text-white text-xs font-medium shadow-2xl flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <WifiOff size={15} className="text-amber-200 shrink-0" />
          <span>Offline Mode — Cached cars & garage data available</span>
        </div>
        <span className="text-[10px] bg-black/30 px-2 py-0.5 rounded-full text-amber-200 font-semibold">
          Offline
        </span>
      </div>
    </div>
  );
};
