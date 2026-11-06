import React from 'react';
import { Home, Search, Warehouse, MessageSquare, User } from 'lucide-react';
import { useApp, ScreenId } from '../../context/AppContext';

export const BottomNavBar: React.FC = () => {
  const { activeScreen, setActiveScreen, conversations } = useApp();

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const navItems: { id: ScreenId; label: string; icon: React.FC<{ className?: string; size?: number }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'garage', label: 'My Garage', icon: Warehouse },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B1D31]/95 backdrop-blur-xl border-t border-[rgba(150,190,255,0.18)] max-w-md mx-auto"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
    >
      <div className="grid grid-cols-5 items-center h-16 px-2">
        {navItems.map(item => {
          const isActive = activeScreen === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className="flex flex-col items-center justify-center py-1 transition-all duration-200 relative group cursor-pointer focus:outline-none"
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon
                  size={22}
                  className={`transition-colors duration-200 ${
                    isActive
                      ? 'text-[#237BFF] drop-shadow-[0_0_10px_rgba(35,123,255,0.8)]'
                      : 'text-[#71869D] group-hover:text-[#A8B9CC]'
                  }`}
                />
                {item.id === 'messages' && totalUnread > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#237BFF] text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-[#0B1D31]">
                    {totalUnread}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-[#237BFF] font-semibold' : 'text-[#71869D] group-hover:text-[#A8B9CC]'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-5 h-0.5 bg-[#237BFF] rounded-full shadow-[0_0_8px_#237BFF]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
