import React, { useState } from 'react';
import { Menu, Bell, X, CheckCircle, Info, Sparkles } from 'lucide-react';
import { AutoHubLogo } from '../common/BrandEmblems';
import { useApp } from '../../context/AppContext';

export const TopBar: React.FC<{ onOpenMenu?: () => void }> = ({ onOpenMenu }) => {
  const { setActiveScreen, showToast } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: 'n1',
      title: 'Price Drop Alert',
      body: 'Tesla Model 3 Long Range AWD dropped by $1,200 near you.',
      time: '15m ago',
      unread: true
    },
    {
      id: 'n2',
      title: 'Dealer Confirmed Viewing',
      body: 'Manhattan BMW scheduled your showroom appointment.',
      time: '2h ago',
      unread: true
    },
    {
      id: 'n3',
      title: 'New Arrival: Porsche Taycan',
      body: 'A certified 2024 Taycan 4S just arrived in Los Angeles.',
      time: '1d ago',
      unread: true
    }
  ];

  return (
    <header className="sticky top-0 z-30 w-full bg-[#071525]/90 backdrop-blur-md border-b border-[rgba(150,190,255,0.12)] px-4 py-3 flex items-center justify-between">
      {/* Left: Hamburger menu */}
      <button
        onClick={onOpenMenu}
        className="w-10 h-10 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white hover:border-[#50A8FF]/40 active:scale-95 transition-all cursor-pointer"
        aria-label="Open Navigation Menu"
      >
        <Menu size={20} />
      </button>

      {/* Center: Brand Wordmark */}
      <div
        onClick={() => setActiveScreen('home')}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <AutoHubLogo size={32} glow={false} />
        <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#50A8FF] transition-colors">
          Auto<span className="text-[#237BFF]">Hub</span>
        </span>
      </div>

      {/* Right: Notifications button */}
      <div className="relative">
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            if (unreadCount > 0) setUnreadCount(0);
          }}
          className="w-10 h-10 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white hover:border-[#50A8FF]/40 active:scale-95 transition-all relative cursor-pointer"
          aria-label="View notifications"
        >
          <Bell size={19} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#237BFF] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_#237BFF]">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 sm:w-88 rounded-2xl bg-[#0B1D31] border border-[rgba(150,190,255,0.25)] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(150,190,255,0.15)]">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#50A8FF]" />
                <h4 className="text-sm font-semibold text-white">Notifications</h4>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-[#71869D] hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => {
                    setShowNotifications(false);
                    showToast(n.title, 'info');
                  }}
                  className="p-2.5 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.12)] hover:border-[#237BFF]/40 cursor-pointer transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">{n.title}</span>
                    <span className="text-[10px] text-[#71869D]">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-[#A8B9CC] mt-1 leading-snug">{n.body}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 mt-2 border-t border-[rgba(150,190,255,0.15)] flex justify-between items-center text-xs">
              <span className="text-[#71869D]">All notifications up to date</span>
              <button
                onClick={() => {
                  setShowNotifications(false);
                  showToast('All notifications marked as read', 'success');
                }}
                className="text-[#50A8FF] hover:underline font-medium"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
