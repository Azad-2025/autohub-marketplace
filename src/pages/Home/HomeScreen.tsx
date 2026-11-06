import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Car as CarIcon,
  Tag,
  Scale,
  Heart,
  Percent,
  ChevronRight,
  Shield,
  Star,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FEATURED_BRANDS, CAR_CATEGORIES } from '../../data/cars';
import { BrandLogo } from '../../components/common/BrandEmblems';

export const HomeScreen: React.FC = () => {
  const {
    setActiveScreen,
    setSelectedCarId,
    filters,
    setFilters,
    setIsFilterModalOpen,
    filteredCars,
    toggleFavorite,
    isFavorite,
    showToast
  } = useApp();

  const [searchInput, setSearchInput] = useState(filters.query);
  const [activeBannerSlide, setActiveBannerSlide] = useState(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, query: searchInput }));
    setActiveScreen('search');
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'new':
        setFilters(prev => ({ ...prev, condition: 'New', category: 'All' }));
        setActiveScreen('search');
        break;
      case 'used':
        setFilters(prev => ({ ...prev, condition: 'Used', category: 'All' }));
        setActiveScreen('search');
        break;
      case 'compare':
        setActiveScreen('compare');
        break;
      case 'favorites':
        setActiveScreen('favorites');
        break;
      case 'deals':
        setFilters(prev => ({ ...prev, maxPrice: 70000, condition: 'All' }));
        showToast('Showing verified dealer special deals', 'info');
        setActiveScreen('search');
        break;
      default:
        break;
    }
  };

  const handleBrandSelect = (brandName: string) => {
    setFilters(prev => ({ ...prev, brand: brandName }));
    setActiveScreen('search');
  };

  const handleCategorySelect = (categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    setActiveScreen('search');
  };

  const quickActions = [
    { id: 'new', label: 'New Cars', icon: CarIcon },
    { id: 'used', label: 'Used Cars', icon: Tag },
    { id: 'compare', label: 'Compare', icon: Scale },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'deals', label: 'Deals', icon: Percent }
  ];

  // Category car image mappings
  const categoryImages: Record<string, string> = {
    SUV: '/assets/images/bmw_x5_card_1793954344587.jpg',
    Sedan: '/assets/images/audi_a6_card_1793954343855.jpg',
    Hatchback: '/assets/images/audi_a6_card_1793954343855.jpg',
    Coupe: '/assets/images/home_hero_car_1793954344385.jpg',
    Electric: '/assets/images/tesla_details_car_1793954345712.jpg'
  };

  return (
    <div className="pb-24 px-4 pt-3 space-y-6 max-w-md mx-auto">
      {/* Search Bar matching reference */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71869D]"
          />
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search cars, brands, models..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#102943]/80 border border-[rgba(150,190,255,0.18)] text-white text-xs placeholder-[#71869D] focus:outline-none focus:border-[#50A8FF]/60 focus:ring-1 focus:ring-[#50A8FF]/40 transition-all shadow-inner"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsFilterModalOpen(true)}
          className="ml-2.5 w-11 h-11 rounded-2xl bg-[#102943]/80 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white hover:border-[#50A8FF]/50 active:scale-95 transition-all cursor-pointer shrink-0"
          aria-label="Open filter settings"
        >
          <SlidersHorizontal size={18} />
        </button>
      </form>

      {/* Hero Banner matching reference screenshot */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#102943] via-[#0B1D31] to-[#071525] border border-[rgba(150,190,255,0.22)] p-5 overflow-hidden shadow-xl">
        {/* Neon blue shield contour backdrop */}
        <div className="absolute right-3 top-2 w-32 h-36 border border-[#50A8FF]/20 rounded-t-full rounded-b-3xl pointer-events-none opacity-40 blur-[1px]" />
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-[#237BFF]/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <div className="max-w-[55%]">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              Find Your <br />
              <span className="text-[#50A8FF] drop-shadow-[0_0_12px_rgba(80,168,255,0.6)]">
                Perfect Car
              </span>
            </h2>
            <p className="text-[11px] text-[#A8B9CC] mt-2 line-clamp-2 leading-relaxed">
              Explore thousands of cars from trusted dealers near you.
            </p>
            <button
              onClick={() => {
                setFilters(prev => ({ ...prev, category: 'All' }));
                setActiveScreen('search');
              }}
              className="mt-3.5 py-2 px-4 rounded-full bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] hover:to-[#2470E8] text-white text-xs font-semibold shadow-[0_0_15px_rgba(35,123,255,0.4)] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>Explore Now</span>
            </button>
          </div>

          {/* Car Image on right */}
          <div className="w-[45%] pl-1 relative">
            <div className="relative group cursor-pointer" onClick={() => {
              setSelectedCarId('mercedes-c300');
              setActiveScreen('details');
            }}>
              <img
                src="/assets/images/home_hero_car_1793954344385.jpg"
                alt="Featured Luxury Car"
                referrerPolicy="no-referrer"
                className="w-full h-28 object-cover rounded-xl drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#071525]/30 rounded-xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* 3 Pagination dots underneath banner */}
        <div className="flex items-center justify-center gap-1.5 mt-3 pt-1">
          {[0, 1, 2].map(dot => (
            <button
              key={dot}
              onClick={() => setActiveBannerSlide(dot)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                activeBannerSlide === dot
                  ? 'w-4 h-1.5 bg-[#50A8FF]'
                  : 'w-1.5 h-1.5 bg-[#173550]'
              }`}
              aria-label={`Slide ${dot + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Quick Action Categories (5 icon cards) matching reference */}
      <div>
        <div className="grid grid-cols-5 gap-2">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className="flex flex-col items-center p-2.5 rounded-2xl bg-[#102943]/70 hover:bg-[#173550] border border-[rgba(150,190,255,0.18)] hover:border-[#50A8FF]/40 transition-all group active:scale-95 cursor-pointer shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0B1D31] flex items-center justify-center text-[#50A8FF] group-hover:text-white group-hover:bg-[#237BFF] transition-all shadow-[0_0_10px_rgba(35,123,255,0.15)] mb-1.5">
                  <Icon size={19} />
                </div>
                <span className="text-[10px] font-medium text-[#A8B9CC] group-hover:text-white text-center leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Brands matching reference */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white tracking-wide">Featured Brands</h3>
          <button
            onClick={() => {
              setFilters(prev => ({ ...prev, brand: 'All' }));
              setActiveScreen('search');
            }}
            className="text-xs text-[#50A8FF] hover:underline flex items-center font-medium cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {FEATURED_BRANDS.slice(0, 5).map(brand => {
            const isSelected = filters.brand === brand.name;
            return (
              <button
                key={brand.id}
                onClick={() => handleBrandSelect(brand.name)}
                className={`flex flex-col items-center justify-center min-w-[70px] p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#173550] border-[#50A8FF] text-white shadow-[0_0_12px_rgba(80,168,255,0.3)]'
                    : 'bg-[#102943]/70 hover:bg-[#173550]/80 border-[rgba(150,190,255,0.18)] text-[#A8B9CC] hover:text-white'
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center text-white mb-1">
                  <BrandLogo brand={brand.name} size={26} />
                </div>
                <span className="text-[11px] font-medium text-center truncate max-w-[65px]">
                  {brand.name === 'Mercedes-Benz' ? 'Mercedes' : brand.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Categories matching reference */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white tracking-wide">Popular Categories</h3>
          <button
            onClick={() => setActiveScreen('search')}
            className="text-xs text-[#50A8FF] hover:underline flex items-center font-medium cursor-pointer"
          >
            <span>View All</span>
            <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {CAR_CATEGORIES.filter(c => c.id !== 'All').map(cat => {
            const isSelected = filters.category === cat.id;
            const imgSrc = categoryImages[cat.id] || '/assets/images/audi_a6_card_1793954343855.jpg';

            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`flex flex-col items-center min-w-[76px] p-2 rounded-2xl border transition-all cursor-pointer group ${
                  isSelected
                    ? 'bg-[#173550] border-[#50A8FF] text-white shadow-[0_0_12px_rgba(80,168,255,0.3)]'
                    : 'bg-[#102943]/70 hover:bg-[#173550]/80 border-[rgba(150,190,255,0.18)] text-[#A8B9CC] hover:text-white'
                }`}
              >
                <div className="w-14 h-9 overflow-hidden rounded-lg mb-1.5 flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-[11px] font-medium text-center">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Spotlight Card - Quick Detail Link */}
      <div className="pt-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white tracking-wide">Featured Model Spotlight</h3>
          <span className="text-xs text-[#71869D]">Certified Dealer</span>
        </div>

        <div
          onClick={() => {
            setSelectedCarId('tesla-model-3');
            setActiveScreen('details');
          }}
          className="p-4 rounded-3xl bg-gradient-to-br from-[#102943] to-[#0B1D31] border border-[rgba(150,190,255,0.22)] shadow-xl cursor-pointer hover:border-[#50A8FF]/50 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-3 right-3 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite('tesla-model-3');
              }}
              className="w-8 h-8 rounded-full bg-[#071525]/80 backdrop-blur-md border border-[rgba(150,190,255,0.2)] flex items-center justify-center text-[#A8B9CC] hover:text-[#50A8FF]"
            >
              <Heart
                size={16}
                className={isFavorite('tesla-model-3') ? 'fill-[#237BFF] text-[#237BFF]' : ''}
              />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-28 h-20 rounded-xl overflow-hidden shrink-0 border border-[rgba(150,190,255,0.18)]">
              <img
                src="/assets/images/tesla_details_car_1793954345712.jpg"
                alt="Tesla Model 3"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs text-[#50A8FF] font-semibold">
                <Star size={13} className="fill-[#50A8FF] text-[#50A8FF]" />
                <span>4.8</span>
                <span className="text-[#71869D] font-normal">(120 Reviews)</span>
              </div>
              <h4 className="text-sm font-bold text-white truncate mt-0.5">Tesla Model 3</h4>
              <p className="text-[11px] text-[#A8B9CC] truncate">Long Range AWD · 2024</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-extrabold text-white">$48,990</span>
                <span className="text-xs text-[#50A8FF] group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  View Specs <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
