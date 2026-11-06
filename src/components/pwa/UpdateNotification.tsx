import React from 'react';
import { RefreshCw, Sparkles, X } from 'lucide-react';

interface UpdateNotificationProps {
  onUpdate: () => void;
  onDismiss: () => void;
}

export const UpdateNotification: React.FC<UpdateNotificationProps> = ({
  onUpdate,
  onDismiss
}) => {
  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-50 animate-in slide-in-from-bottom duration-300">
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#102943] to-[#0B1D31] border border-[#50A8FF]/40 shadow-[0_10px_35px_rgba(7,21,37,0.9),0_0_20px_rgba(80,168,255,0.25)] text-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#173550] flex items-center justify-center text-[#50A8FF] shrink-0 border border-[rgba(150,190,255,0.2)] shadow-[0_0_10px_rgba(35,123,255,0.3)]">
            <Sparkles size={18} className="animate-spin duration-3000" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">New AutoHub Update Available</h4>
            <p className="text-[11px] text-[#A8B9CC] mt-0.5">
              A newer version has been cached and is ready.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onUpdate}
            className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] text-white text-xs font-semibold shadow-[0_0_12px_rgba(35,123,255,0.4)] flex items-center gap-1 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw size={13} />
            <span>Update Now</span>
          </button>
          <button
            onClick={onDismiss}
            className="w-7 h-7 rounded-lg bg-[#102943] text-[#71869D] hover:text-white flex items-center justify-center"
            aria-label="Dismiss update"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
