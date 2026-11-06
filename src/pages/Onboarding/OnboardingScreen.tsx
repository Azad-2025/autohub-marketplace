import React, { useState } from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AutoHubLogo } from '../../components/common/BrandEmblems';
import { CarImage } from '../../components/common/CarImage';

export const OnboardingScreen: React.FC = () => {
  const { setActiveScreen } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Drive Your Dream',
      tagline: 'Explore. Compare. Drive.\nAll in One Auto Platform.',
      badge: 'Next-Gen Auto Platform',
      icon: Sparkles
    },
    {
      title: 'Certified Luxury & EVs',
      tagline: 'Verified 160-point inspection.\nDirect from elite dealer showrooms.',
      badge: 'Transparent Pricing',
      icon: ShieldCheck
    },
    {
      title: 'Instant Dealer Connect',
      tagline: 'Schedule private test drives &\nreserve with guaranteed warranty.',
      badge: 'Frictionless Experience',
      icon: Zap
    }
  ];

  const slide = slides[currentSlide];

  return (
    <div className="relative min-h-[780px] h-full flex flex-col justify-between p-6 overflow-hidden bg-[#071525]">
      {/* Background ambient neon glows */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#237BFF]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[250px] h-[250px] bg-[#50A8FF]/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[220px] h-[220px] bg-[#173550]/40 blur-[90px] rounded-full pointer-events-none" />

      {/* Decorative cyber laser beam matching the reference screenshot */}
      <div className="absolute top-48 -left-10 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#50A8FF] to-transparent opacity-60 rotate-[-12deg] pointer-events-none blur-[0.5px]" />

      {/* Top Branding Section */}
      <div className="relative z-10 pt-6 flex flex-col items-center text-center">
        {/* Logo with minimal car silhouette */}
        <div className="mb-3">
          <AutoHubLogo size={70} glow={true} />
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Auto<span className="text-[#50A8FF]">Hub</span>
        </h1>

        {/* Tagline */}
        <p className="text-sm font-medium text-[#A8B9CC] mt-1 tracking-wide">
          {slide.title}
        </p>

        {/* Divider line matching reference */}
        <div className="w-12 h-[2px] bg-[#237BFF] my-3.5 rounded-full shadow-[0_0_8px_#50A8FF]" />

        {/* Supporting text */}
        <p className="text-xs text-[#71869D] leading-relaxed whitespace-pre-line max-w-xs font-normal">
          {slide.tagline}
        </p>
      </div>

      {/* Center Supercar Photo */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        {/* Glow halo behind car */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#237BFF]/25 via-transparent to-transparent rounded-3xl blur-2xl pointer-events-none" />

        <div className="relative w-full rounded-2xl overflow-hidden border border-[rgba(150,190,255,0.22)] shadow-[0_15px_35px_rgba(7,21,37,0.9)] group">
          <CarImage
            src="/assets/images/onboarding_car_1793954342429.jpg"
            alt="Flagship sports car"
            className="w-full h-64 sm:h-72 object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
          />

          {/* Bottom vignette reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071525] via-transparent to-transparent opacity-60" />
        </div>
      </div>

      {/* Bottom CTA & Pagination Section */}
      <div className="relative z-10 pb-4 flex flex-col items-center">
        {/* Get Started Button matching reference */}
        <button
          onClick={() => setActiveScreen('home')}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] hover:to-[#2470E8] text-white font-semibold text-sm flex items-center justify-center gap-3 shadow-[0_4px_25px_rgba(35,123,255,0.45)] active:scale-[0.98] transition-all duration-200 cursor-pointer border border-[#80BFFF]/30"
        >
          <span>Get Started</span>
          <ArrowRight size={18} className="text-white" />
        </button>

        {/* Sign In option */}
        <div className="mt-4 text-xs text-[#A8B9CC] flex items-center gap-1.5">
          <span>Already have an account?</span>
          <button
            onClick={() => setActiveScreen('auth')}
            className="text-[#50A8FF] font-semibold hover:underline cursor-pointer"
          >
            Sign In
          </button>
        </div>

        {/* 3 Pagination Dots matching reference */}
        <div className="flex items-center gap-2 mt-5">
          {[0, 1, 2].map(index => {
            const isActive = currentSlide === index;
            return (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 h-2 bg-[#50A8FF] shadow-[0_0_8px_#50A8FF]'
                    : 'w-2 h-2 bg-[#173550] hover:bg-[#71869D]'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
