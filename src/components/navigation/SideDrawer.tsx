import React from 'react';
import {
  X,
  Home,
  Search,
  Scale,
  Heart,
  Warehouse,
  MessageSquare,
  User,
  Sparkles,
  Smartphone,
  Maximize2,
  Columns,
  LogIn,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp, ScreenId } from '../../context/AppContext';
import { AutoHubLogo } from '../common/BrandEmblems';

export const SideDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const {
    activeScreen,
    setActiveScreen,
    viewLayout,
    setViewLayout,
    favorites,
    compareList,
    garage,
    user
  } = useApp();

  if (!isOpen) return null;

  const navigateTo = (screen: ScreenId) => {
    setActiveScreen(screen);
    onClose();
  };

  const navItems = [
    { id: 'home' as ScreenId, label: 'Home Dashboard', icon: Home, count: null },
    { id: 'search' as ScreenId, label: 'Find Your Car', icon: Search, count: null },
    { id: 'compare' as ScreenId, label: 'Car Comparison', icon: Scale, count: compareList.length },
    { id: 'favorites' as ScreenId, label: 'Saved Favorites', icon: Heart, count: favorites.length },
    { id: 'garage' as ScreenId, label: 'My Garage', icon: Warehouse, count: garage.length },
    { id: 'messages' as ScreenId, label: 'Dealer Messages', icon: MessageSquare, count: 2 },
    { id: 'profile' as ScreenId, label: 'My Profile & Settings', icon: User, count: null },
    { id: 'onboarding' as ScreenId, label: 'Welcome / Onboarding', icon: Sparkles, count: null },
    { id: 'auth' as ScreenId, label: 'Sign In / Register', icon: LogIn, count: null }
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] h-full bg-[#0B1D31] border-r border-[rgba(150,190,255,0.2)] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Header */}
        <div className="p-5 border-b border-[rgba(150,190,255,0.12)] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AutoHubLogo size={34} glow={false} />
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">AutoHub</h2>
              <p className="text-[10px] text-[#50A8FF] tracking-wider uppercase font-semibold">
                Drive Your Dream
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#102943] border border-[rgba(150,190,255,0.15)] flex items-center justify-center text-[#A8B9CC] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-4 mt-4 rounded-xl bg-[#102943]/80 border border-[rgba(150,190,255,0.15)] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#50A8FF]/40 bg-[#173550] flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-white">AV</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white truncate">{user.name}</span>
              <ShieldCheck size={14} className="text-[#50A8FF] shrink-0" />
            </div>
            <p className="text-[11px] text-[#71869D] truncate">{user.email}</p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="px-4 mt-4">
          <p className="text-[10px] font-semibold text-[#71869D] uppercase tracking-wider mb-2">
            Display Mode
          </p>
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-[#071525] border border-[rgba(150,190,255,0.15)]">
            <button
              onClick={() => setViewLayout('device')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[10px] font-medium transition-all ${
                viewLayout === 'device'
                  ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.5)]'
                  : 'text-[#A8B9CC] hover:text-white'
              }`}
            >
              <Smartphone size={15} className="mb-0.5" />
              Phone Frame
            </button>
            <button
              onClick={() => setViewLayout('responsive')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[10px] font-medium transition-all ${
                viewLayout === 'responsive'
                  ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.5)]'
                  : 'text-[#A8B9CC] hover:text-white'
              }`}
            >
              <Maximize2 size={15} className="mb-0.5" />
              Full View
            </button>
            <button
              onClick={() => setViewLayout('reference')}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-[10px] font-medium transition-all ${
                viewLayout === 'reference'
                  ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.5)]'
                  : 'text-[#A8B9CC] hover:text-white'
              }`}
            >
              <Columns size={15} className="mb-0.5" />
              4 Screens
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <p className="text-[10px] font-semibold text-[#71869D] uppercase tracking-wider mb-2">
            Main Navigation
          </p>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#237BFF] text-white shadow-[0_0_15px_rgba(35,123,255,0.4)]'
                    : 'text-[#A8B9CC] hover:bg-[#102943] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={17} className={isActive ? 'text-white' : 'text-[#50A8FF]'} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.count !== null && item.count > 0 && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white text-[#237BFF]' : 'bg-[#173550] text-[#50A8FF]'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                  <ChevronRight size={14} className="opacity-60" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[rgba(150,190,255,0.12)] text-[11px] text-[#71869D] flex items-center justify-between">
          <span>AutoHub Mobile Suite</span>
          <span className="text-[#50A8FF]">v2.4.0</span>
        </div>
      </div>
    </div>
  );
};
