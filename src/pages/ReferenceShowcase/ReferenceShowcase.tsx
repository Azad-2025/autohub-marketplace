import React from 'react';
import { Smartphone, ExternalLink, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OnboardingScreen } from '../Onboarding/OnboardingScreen';
import { HomeScreen } from '../Home/HomeScreen';
import { CarDetailsScreen } from '../CarDetails/CarDetailsScreen';
import { SearchScreen } from '../Search/SearchScreen';
import { TopBar } from '../../components/navigation/TopBar';
import { BottomNavBar } from '../../components/navigation/BottomNavBar';

export const ReferenceShowcase: React.FC = () => {
  const { setActiveScreen, setViewLayout } = useApp();

  const handleFocusScreen = (screenName: any) => {
    setActiveScreen(screenName);
    setViewLayout('device');
  };

  return (
    <div className="min-h-screen bg-[#040C16] text-white p-4 sm:p-6 lg:p-8">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102943] border border-[rgba(150,190,255,0.25)] text-[#50A8FF] text-xs font-semibold mb-3">
          <Sparkles size={14} />
          <span>Interactive 4-Screen Reference Matrix</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AutoHub <span className="text-[#50A8FF]">Design System Showcase</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#A8B9CC] mt-2 max-w-2xl mx-auto">
          Recreating the exact 4 mobile screens from the reference design. Tap any phone frame below to focus and interact seamlessly.
        </p>

        <div className="flex items-center justify-center gap-3 mt-4">
          <button
            onClick={() => {
              setActiveScreen('home');
              setViewLayout('device');
            }}
            className="py-2 px-4 rounded-xl bg-[#237BFF] hover:bg-[#3A8BFF] text-white text-xs font-semibold shadow-[0_0_15px_rgba(35,123,255,0.4)] flex items-center gap-1.5"
          >
            <Smartphone size={15} />
            <span>Switch to Single Phone Device Mode</span>
          </button>
        </div>
      </div>

      {/* 2x2 Matrix matching the exact layout of image_543ec1b2.png */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {/* Screen 1: Top-Left - Welcome / Onboarding */}
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#50A8FF] shadow-[0_0_8px_#50A8FF]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                01. Welcome / Onboarding Screen
              </h2>
            </div>
            <button
              onClick={() => handleFocusScreen('onboarding')}
              className="text-xs text-[#50A8FF] hover:underline flex items-center gap-1"
            >
              <span>Focus Screen</span>
              <ExternalLink size={13} />
            </button>
          </div>

          {/* Phone Frame */}
          <div className="w-full max-w-[390px] h-[780px] rounded-[44px] bg-[#071525] border-4 border-[#173550] shadow-[0_0_50px_rgba(35,123,255,0.25)] relative overflow-hidden flex flex-col ring-1 ring-[#50A8FF]/30">
            {/* Glossy Bevel Reflection */}
            <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30" />
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 border border-[#173550]/50" />

            <div className="flex-1 overflow-y-auto no-scrollbar pt-3">
              <OnboardingScreen />
            </div>
          </div>
        </div>

        {/* Screen 2: Top-Right - Home Dashboard */}
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#50A8FF] shadow-[0_0_8px_#50A8FF]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                02. Home Dashboard Screen
              </h2>
            </div>
            <button
              onClick={() => handleFocusScreen('home')}
              className="text-xs text-[#50A8FF] hover:underline flex items-center gap-1"
            >
              <span>Focus Screen</span>
              <ExternalLink size={13} />
            </button>
          </div>

          {/* Phone Frame */}
          <div className="w-full max-w-[390px] h-[780px] rounded-[44px] bg-[#071525] border-4 border-[#173550] shadow-[0_0_50px_rgba(35,123,255,0.25)] relative overflow-hidden flex flex-col ring-1 ring-[#50A8FF]/30">
            <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30" />
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 border border-[#173550]/50" />

            {/* Status bar */}
            <div className="px-6 pt-3 pb-1 flex justify-between text-[11px] font-semibold text-[#A8B9CC] z-30 shrink-0">
              <span>9:41</span>
              <span>5G · 100%</span>
            </div>

            <TopBar />
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <HomeScreen />
            </div>
            <BottomNavBar />
          </div>
        </div>

        {/* Screen 3: Bottom-Left - Car Details */}
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#50A8FF] shadow-[0_0_8px_#50A8FF]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                03. Car Details Screen
              </h2>
            </div>
            <button
              onClick={() => handleFocusScreen('details')}
              className="text-xs text-[#50A8FF] hover:underline flex items-center gap-1"
            >
              <span>Focus Screen</span>
              <ExternalLink size={13} />
            </button>
          </div>

          {/* Phone Frame */}
          <div className="w-full max-w-[390px] h-[780px] rounded-[44px] bg-[#071525] border-4 border-[#173550] shadow-[0_0_50px_rgba(35,123,255,0.25)] relative overflow-hidden flex flex-col ring-1 ring-[#50A8FF]/30">
            <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30" />
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 border border-[#173550]/50" />

            {/* Status bar */}
            <div className="px-6 pt-3 pb-1 flex justify-between text-[11px] font-semibold text-[#A8B9CC] z-30 shrink-0">
              <span>9:41</span>
              <span>5G · 100%</span>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <CarDetailsScreen />
            </div>
          </div>
        </div>

        {/* Screen 4: Bottom-Right - Find Your Car / Search */}
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#50A8FF] shadow-[0_0_8px_#50A8FF]" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                04. Find Your Car / Search Results
              </h2>
            </div>
            <button
              onClick={() => handleFocusScreen('search')}
              className="text-xs text-[#50A8FF] hover:underline flex items-center gap-1"
            >
              <span>Focus Screen</span>
              <ExternalLink size={13} />
            </button>
          </div>

          {/* Phone Frame */}
          <div className="w-full max-w-[390px] h-[780px] rounded-[44px] bg-[#071525] border-4 border-[#173550] shadow-[0_0_50px_rgba(35,123,255,0.25)] relative overflow-hidden flex flex-col ring-1 ring-[#50A8FF]/30">
            <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-30" />
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-40 border border-[#173550]/50" />

            {/* Status bar */}
            <div className="px-6 pt-3 pb-1 flex justify-between text-[11px] font-semibold text-[#A8B9CC] z-30 shrink-0">
              <span>9:41</span>
              <span>5G · 100%</span>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <SearchScreen />
            </div>
            <BottomNavBar />
          </div>
        </div>
      </div>
    </div>
  );
};
