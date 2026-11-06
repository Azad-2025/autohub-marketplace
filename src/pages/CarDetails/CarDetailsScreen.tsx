import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Gauge,
  Zap,
  Timer,
  BatteryCharging,
  CheckCircle2,
  MessageSquare,
  Scale,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CarDetailsScreen: React.FC = () => {
  const {
    selectedCar,
    setActiveScreen,
    toggleFavorite,
    isFavorite,
    addToCompare,
    isInCompare,
    startDealerInquiry,
    showToast
  } = useApp();

  const [selectedColor, setSelectedColor] = useState(
    selectedCar.availableColors[0]?.name || 'Standard'
  );
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'features' | 'dealer'>(
    'overview'
  );

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `AutoHub: ${selectedCar.model}`,
          text: `Check out this ${selectedCar.model} ${selectedCar.subtitle} on AutoHub!`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'success');
    }
  };

  const isFavorited = isFavorite(selectedCar.id);
  const isCompared = isInCompare(selectedCar.id);

  return (
    <div className="pb-28 max-w-md mx-auto text-white min-h-screen">
      {/* Top Navigation Bar matching reference */}
      <div className="sticky top-0 z-30 px-4 py-3 bg-[#071525]/90 backdrop-blur-md flex items-center justify-between border-b border-[rgba(150,190,255,0.12)]">
        <button
          onClick={() => setActiveScreen('home')}
          className="w-10 h-10 rounded-full bg-[#102943]/80 border border-[rgba(150,190,255,0.2)] flex items-center justify-center text-[#A8B9CC] hover:text-white active:scale-95 transition-all cursor-pointer"
          aria-label="Back to home"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => toggleFavorite(selectedCar.id)}
            className="w-10 h-10 rounded-full bg-[#102943]/80 border border-[rgba(150,190,255,0.2)] flex items-center justify-center text-[#A8B9CC] hover:text-[#50A8FF] active:scale-95 transition-all cursor-pointer"
            aria-label="Toggle favorite"
          >
            <Heart
              size={18}
              className={isFavorited ? 'fill-[#237BFF] text-[#237BFF]' : 'text-white'}
            />
          </button>
          <button
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-[#102943]/80 border border-[rgba(150,190,255,0.2)] flex items-center justify-center text-[#A8B9CC] hover:text-white active:scale-95 transition-all cursor-pointer"
            aria-label="Share car details"
          >
            <Share2 size={18} />
          </button>
        </div>
      </div>

      <div className="px-5 pt-3">
        {/* Title, Subtitle and Rating matching reference */}
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            {selectedCar.model}
          </h1>
          <p className="text-sm font-medium text-[#A8B9CC] mt-0.5">
            {selectedCar.subtitle}
          </p>

          <div className="flex items-center gap-1.5 mt-2">
            <div className="flex items-center gap-1 text-xs text-[#50A8FF] font-semibold bg-[#102943]/80 px-2.5 py-1 rounded-full border border-[rgba(150,190,255,0.18)]">
              <Star size={13} className="fill-[#50A8FF] text-[#50A8FF]" />
              <span>{selectedCar.rating.toFixed(1)}</span>
              <span className="text-[#71869D] font-normal">
                ({selectedCar.reviewCount} Reviews)
              </span>
            </div>
            <span className="text-xs text-[#71869D] font-medium ml-1">
              {selectedCar.year} · {selectedCar.category}
            </span>
          </div>
        </div>

        {/* Large Hero Vehicle Image on Glowing Pedestal matching reference */}
        <div className="relative my-4 flex items-center justify-center">
          {/* Subtle neon blue glow behind car */}
          <div className="absolute inset-0 bg-[#237BFF]/20 blur-3xl rounded-full pointer-events-none" />

          <div className="relative w-full rounded-2xl overflow-hidden border border-[rgba(150,190,255,0.2)] shadow-2xl bg-[#0B1D31]">
            <img
              src={selectedCar.images[0]}
              alt={selectedCar.model}
              referrerPolicy="no-referrer"
              className="w-full h-56 sm:h-64 object-cover object-center"
            />
            {/* Ambient lighting ring overlay reflection */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#071525] via-transparent to-transparent opacity-70" />
          </div>
        </div>

        {/* 4 Specifications Cards in a row matching reference */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {/* Range Card */}
          <div className="p-2.5 rounded-2xl bg-[#102943]/80 border border-[rgba(150,190,255,0.18)] flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-medium text-[#71869D] uppercase tracking-wider">
              Range
            </span>
            <div className="mt-1 flex items-baseline gap-0.5">
              <span className="text-base font-extrabold text-white">
                {selectedCar.range || 580}
              </span>
              <span className="text-[10px] text-[#A8B9CC]">km</span>
            </div>
          </div>

          {/* Top Speed Card */}
          <div className="p-2.5 rounded-2xl bg-[#102943]/80 border border-[rgba(150,190,255,0.18)] flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-medium text-[#71869D] uppercase tracking-wider">
              Top Speed
            </span>
            <div className="mt-1 flex items-baseline gap-0.5">
              <span className="text-base font-extrabold text-white">
                {selectedCar.topSpeed}
              </span>
              <span className="text-[10px] text-[#A8B9CC]">km/h</span>
            </div>
          </div>

          {/* 0-100 km/h Card */}
          <div className="p-2.5 rounded-2xl bg-[#102943]/80 border border-[rgba(150,190,255,0.18)] flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-medium text-[#71869D] uppercase tracking-wider">
              0-100 km/h
            </span>
            <div className="mt-1 flex items-baseline gap-0.5">
              <span className="text-base font-extrabold text-white">
                {selectedCar.acceleration}
              </span>
              <span className="text-[10px] text-[#A8B9CC]">sec</span>
            </div>
          </div>

          {/* Power Card */}
          <div className="p-2.5 rounded-2xl bg-[#102943]/80 border border-[rgba(150,190,255,0.18)] flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-medium text-[#71869D] uppercase tracking-wider">
              Power
            </span>
            <div className="mt-1 flex items-baseline gap-0.5">
              <span className="text-base font-extrabold text-white">
                {selectedCar.horsepower}
              </span>
              <span className="text-[10px] text-[#A8B9CC]">HP</span>
            </div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#102943] to-[#0B1D31] border border-[rgba(150,190,255,0.2)] mb-5">
          <div>
            <span className="text-[10px] text-[#71869D] uppercase tracking-wider font-semibold">
              Market Price
            </span>
            <div className="text-2xl font-black text-white">
              ${selectedCar.price.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isCompared) {
                  showToast('Car already in comparison', 'info');
                  setActiveScreen('compare');
                } else {
                  addToCompare(selectedCar.id);
                  setActiveScreen('compare');
                }
              }}
              className="py-2 px-3 rounded-xl bg-[#173550] border border-[rgba(150,190,255,0.25)] text-xs font-semibold text-[#50A8FF] hover:bg-[#237BFF] hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Scale size={15} />
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>
          </div>
        </div>

        {/* Color Palette Selector */}
        {selectedCar.availableColors && selectedCar.availableColors.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#A8B9CC]">Exterior Finish:</span>
              <span className="text-xs font-medium text-[#50A8FF]">{selectedColor}</span>
            </div>
            <div className="flex items-center gap-3">
              {selectedCar.availableColors.map(color => {
                const isPicked = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer relative ${
                      isPicked
                        ? 'border-[#50A8FF] scale-110 shadow-[0_0_10px_#50A8FF]'
                        : 'border-[#173550] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive Segmented Tabs */}
        <div className="flex items-center p-1 rounded-2xl bg-[#0B1D31] border border-[rgba(150,190,255,0.18)] mb-4">
          {(['overview', 'specs', 'features', 'dealer'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.4)]'
                  : 'text-[#A8B9CC] hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)]">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Vehicle Overview
              </h4>
              <p className="text-xs text-[#A8B9CC] leading-relaxed">
                {selectedCar.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)]">
                <span className="text-[10px] text-[#71869D]">Powertrain</span>
                <p className="text-xs font-semibold text-white mt-0.5">{selectedCar.engine}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)]">
                <span className="text-[10px] text-[#71869D]">Transmission</span>
                <p className="text-xs font-semibold text-white mt-0.5">{selectedCar.transmission}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)]">
                <span className="text-[10px] text-[#71869D]">Odometer</span>
                <p className="text-xs font-semibold text-white mt-0.5">{selectedCar.mileage.toLocaleString()} km</p>
              </div>
              <div className="p-3 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)]">
                <span className="text-[10px] text-[#71869D]">Location</span>
                <p className="text-xs font-semibold text-white mt-0.5 truncate">{selectedCar.location}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="p-4 rounded-2xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)] space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Technical Specifications
            </h4>
            {[
              { label: 'Year & Model', value: `${selectedCar.year} ${selectedCar.model}` },
              { label: 'Body Style', value: selectedCar.category },
              { label: 'Fuel / Energy Type', value: selectedCar.fuelType },
              { label: 'Horsepower', value: `${selectedCar.horsepower} HP` },
              { label: 'Top Speed', value: `${selectedCar.topSpeed} km/h` },
              { label: 'Acceleration (0-100)', value: `${selectedCar.acceleration} seconds` },
              { label: 'Estimated Range', value: `${selectedCar.range || 580} km` },
              { label: 'Condition', value: selectedCar.condition }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-1.5 border-b border-[rgba(150,190,255,0.08)] last:border-none text-xs"
              >
                <span className="text-[#A8B9CC]">{item.label}</span>
                <span className="font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="p-4 rounded-2xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Included Equipment & Tech
            </h4>
            <div className="space-y-2.5">
              {selectedCar.features.map((feat, index) => (
                <div key={index} className="flex items-start gap-2.5 text-xs text-[#A8B9CC]">
                  <CheckCircle2 size={16} className="text-[#50A8FF] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'dealer' && (
          <div className="p-4 rounded-2xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)] space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white">{selectedCar.dealer.name}</h4>
                  <ShieldCheck size={16} className="text-[#50A8FF]" />
                </div>
                <p className="text-[11px] text-[#A8B9CC] mt-0.5">{selectedCar.dealer.address}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#50A8FF] font-semibold bg-[#173550] px-2 py-1 rounded-lg">
                <Star size={13} className="fill-[#50A8FF]" />
                <span>{selectedCar.dealer.rating}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[rgba(150,190,255,0.1)] space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#A8B9CC]">
                <Phone size={14} className="text-[#50A8FF]" />
                <span>{selectedCar.dealer.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#A8B9CC]">
                <Mail size={14} className="text-[#50A8FF]" />
                <span>{selectedCar.dealer.email}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Action Bar with "Contact Dealer" CTA matching reference */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#071525]/95 backdrop-blur-xl border-t border-[rgba(150,190,255,0.18)] p-3.5 max-w-md mx-auto">
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleFavorite(selectedCar.id)}
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
              isFavorited
                ? 'bg-[#237BFF]/20 border-[#237BFF] text-[#237BFF]'
                : 'bg-[#102943] border-[rgba(150,190,255,0.2)] text-[#A8B9CC] hover:text-white'
            }`}
            aria-label="Save to favorites"
          >
            <Heart size={20} className={isFavorited ? 'fill-[#237BFF]' : ''} />
          </button>

          <button
            onClick={() => {
              startDealerInquiry(selectedCar);
            }}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] hover:to-[#2470E8] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(35,123,255,0.45)] active:scale-[0.98] transition-all cursor-pointer border border-[#80BFFF]/30"
          >
            <MessageSquare size={18} />
            <span>Contact Dealer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
