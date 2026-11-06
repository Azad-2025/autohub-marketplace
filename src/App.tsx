import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopBar } from './components/navigation/TopBar';
import { BottomNavBar } from './components/navigation/BottomNavBar';
import { SideDrawer } from './components/navigation/SideDrawer';
import { FilterModal } from './components/filters/FilterModal';

// Screens
import { OnboardingScreen } from './pages/Onboarding/OnboardingScreen';
import { HomeScreen } from './pages/Home/HomeScreen';
import { CarDetailsScreen } from './pages/CarDetails/CarDetailsScreen';
import { SearchScreen } from './pages/Search/SearchScreen';
import { CompareScreen } from './pages/Compare/CompareScreen';
import { FavoritesScreen } from './pages/Favorites/FavoritesScreen';
import { GarageScreen } from './pages/Garage/GarageScreen';
import { MessagesScreen } from './pages/Messages/MessagesScreen';
import { ProfileScreen } from './pages/Profile/ProfileScreen';
import { AuthScreen } from './pages/Authentication/AuthScreen';
import { ReferenceShowcase } from './pages/ReferenceShowcase/ReferenceShowcase';
import { InstallModal } from './components/pwa/InstallModal';
import { UpdateNotification } from './components/pwa/UpdateNotification';
import { OfflineIndicator } from './components/pwa/OfflineIndicator';
import { usePWA } from './hooks/usePWA';

import {
  Smartphone,
  Maximize2,
  Columns,
  Sparkles,
  Info,
  CheckCircle,
  XCircle,
  X
} from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    activeScreen,
    setActiveScreen,
    viewLayout,
    setViewLayout,
    toasts,
    dismissToast,
    isInstallModalOpen,
    setIsInstallModalOpen,
    showToast
  } = useApp();

  const { isOnline, needRefresh, setNeedRefresh, handleUpdate } = usePWA();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // If in 4-screen reference comparison mode, render ReferenceShowcase
  if (viewLayout === 'reference') {
    return (
      <div>
        <OfflineIndicator isOnline={isOnline} />
        <ReferenceShowcase />
        <FilterModal />
        <InstallModal
          isOpen={isInstallModalOpen}
          onClose={() => setIsInstallModalOpen(false)}
          onInstalled={() => showToast('AutoHub successfully installed!', 'success')}
        />
        {needRefresh && (
          <UpdateNotification
            onUpdate={handleUpdate}
            onDismiss={() => setNeedRefresh(false)}
          />
        )}
      </div>
    );
  }

  // Render the current active screen component
  const renderScreenContent = () => {
    switch (activeScreen) {
      case 'onboarding':
        return <OnboardingScreen />;
      case 'home':
        return <HomeScreen />;
      case 'details':
        return <CarDetailsScreen />;
      case 'search':
        return <SearchScreen />;
      case 'compare':
        return <CompareScreen />;
      case 'favorites':
        return <FavoritesScreen />;
      case 'garage':
        return <GarageScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'auth':
        return <AuthScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showTopBar = !['onboarding', 'auth', 'details'].includes(activeScreen);
  const showBottomNav = !['onboarding', 'auth', 'details'].includes(activeScreen);

  return (
    <div className="min-h-screen bg-[#040C16] text-white flex flex-col items-center justify-center relative overflow-x-hidden">
      {/* Ambient background light gradients */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#237BFF]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#50A8FF]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top Floating Control Bar for Quick Navigation & Viewport Mode */}
      <header className="w-full max-w-5xl px-4 py-2.5 z-40 flex items-center justify-between border-b border-[rgba(150,190,255,0.12)] bg-[#071525]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
            Auto<span className="text-[#50A8FF]">Hub</span>
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#102943] text-[#50A8FF] border border-[#50A8FF]/30">
              Mobile App Preview
            </span>
          </span>
        </div>

        {/* Viewport switch pill */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0B1D31] border border-[rgba(150,190,255,0.18)]">
          <button
            onClick={() => setViewLayout('device')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewLayout === 'device'
                ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.4)]'
                : 'text-[#A8B9CC] hover:text-white'
            }`}
            title="View in mobile phone frame matching reference"
          >
            <Smartphone size={14} />
            <span className="hidden sm:inline">Phone Frame</span>
          </button>

          <button
            onClick={() => setViewLayout('responsive')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
              viewLayout === 'responsive'
                ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.4)]'
                : 'text-[#A8B9CC] hover:text-white'
            }`}
            title="Expand to responsive width"
          >
            <Maximize2 size={14} />
            <span className="hidden sm:inline">Responsive</span>
          </button>

          <button
            onClick={() => setViewLayout('reference')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 text-[#50A8FF] hover:bg-[#102943] transition-all cursor-pointer"
            title="Show all 4 reference screens side-by-side"
          >
            <Columns size={14} />
            <span className="hidden sm:inline">4 Screens Matrix</span>
          </button>
        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="w-full flex-1 flex flex-col items-center justify-center p-2 sm:p-6 lg:p-8">
        {viewLayout === 'device' ? (
          /* Phone Frame Container matching reference image screenshot */
          <div className="relative w-full max-w-[410px] min-h-[820px] rounded-[48px] bg-[#071525] border-[6px] border-[#102943] shadow-[0_0_60px_10px_rgba(35,123,255,0.25),0_25px_50px_-12px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col ring-1 ring-[#50A8FF]/40">
            {/* Glossy top bevel reflection */}
            <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30" />

            {/* Dynamic Island / Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 border border-[#173550]/60 shadow-inner flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#102943]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#102943]/60" />
            </div>

            {/* Status bar */}
            <div className="px-7 pt-3.5 pb-1 flex justify-between text-[11px] font-semibold text-[#A8B9CC] z-30 shrink-0">
              <span>9:41</span>
              <span>5G · 100%</span>
            </div>

            {/* Top Bar if applicable */}
            {showTopBar && <TopBar onOpenMenu={() => setIsDrawerOpen(true)} />}

            {/* Screen Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              {renderScreenContent()}
            </div>

            {/* Bottom Nav if applicable */}
            {showBottomNav && <BottomNavBar />}
          </div>
        ) : (
          /* Responsive Layout */
          <div className="w-full max-w-2xl min-h-[820px] rounded-3xl bg-[#071525] border border-[rgba(150,190,255,0.2)] shadow-2xl overflow-hidden flex flex-col relative">
            {showTopBar && <TopBar onOpenMenu={() => setIsDrawerOpen(true)} />}

            <div className="flex-1 overflow-y-auto no-scrollbar relative">
              {renderScreenContent()}
            </div>

            {showBottomNav && <BottomNavBar />}
          </div>
        )}
      </main>

      {/* PWA Offline Indicator */}
      <OfflineIndicator isOnline={isOnline} />

      {/* Side Navigation Drawer */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Advanced Filter Modal */}
      <FilterModal />

      {/* PWA Install Modal */}
      <InstallModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        onInstalled={() => showToast('AutoHub successfully installed!', 'success')}
      />

      {/* PWA Service Worker Update Notification */}
      {needRefresh && (
        <UpdateNotification
          onUpdate={handleUpdate}
          onDismiss={() => setNeedRefresh(false)}
        />
      )}

      {/* Floating Toast Notifications */}
      {toasts.length > 0 && (
        <div className="fixed top-16 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 max-w-md w-full">
          {toasts.map(toast => (
            <div
              key={toast.id}
              className="pointer-events-auto px-4 py-2.5 rounded-2xl bg-[#0B1D31]/95 border border-[#50A8FF]/40 text-white text-xs font-medium shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-150 backdrop-blur-md"
            >
              {toast.type === 'success' ? (
                <CheckCircle size={16} className="text-emerald-400 shrink-0" />
              ) : toast.type === 'error' ? (
                <XCircle size={16} className="text-rose-400 shrink-0" />
              ) : (
                <Sparkles size={16} className="text-[#50A8FF] shrink-0" />
              )}
              <span>{toast.message}</span>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-[#71869D] hover:text-white ml-1"
              >
                <X size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
