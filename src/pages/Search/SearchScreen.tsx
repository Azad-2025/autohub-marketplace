import React, { useState } from 'react';
import {
  ArrowLeft,
  SlidersHorizontal,
  Heart,
  ChevronDown,
  MapPin,
  Sparkles,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAR_CATEGORIES, FEATURED_BRANDS } from '../../data/cars';

export const SearchScreen: React.FC = () => {
  const {
    setActiveScreen,
    setSelectedCarId,
    filters,
    setFilters,
    filteredCars,
    toggleFavorite,
    isFavorite,
    setIsFilterModalOpen
  } = useApp();

  const [activeDropdown, setActiveDropdown] = useState<'price' | 'brand' | 'year' | 'sort' | null>(
    null
  );

  const sortOptions = [
    { id: 'popular', label: 'Popular' },
    { id: 'price_asc', label: 'Price: Low to High' },
    { id: 'price_desc', label: 'Price: High to Low' },
    { id: 'year_desc', label: 'Year: Newest' }
  ];

  const handleCategoryClick = (categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
  };

  const handleSelectCar = (carId: string) => {
    setSelectedCarId(carId);
    setActiveScreen('details');
  };

  return (
    <div className="pb-24 px-4 pt-3 max-w-md mx-auto text-white min-h-screen">
      {/* Header matching reference screenshot */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(150,190,255,0.12)] mb-3">
        <button
          onClick={() => setActiveScreen('home')}
          className="w-10 h-10 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white active:scale-95 transition-all cursor-pointer"
          aria-label="Back to home"
        >
          <ArrowLeft size={19} />
        </button>

        <h1 className="text-base font-bold text-white tracking-wide">
          Find Your Car
        </h1>

        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="w-10 h-10 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white active:scale-95 transition-all cursor-pointer"
          aria-label="Open advanced filters"
        >
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* Category Tabs matching reference screenshot */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3">
        {CAR_CATEGORIES.map(cat => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#237BFF] text-white shadow-[0_0_15px_rgba(35,123,255,0.45)]'
                  : 'bg-[#102943]/70 text-[#A8B9CC] hover:text-white border border-[rgba(150,190,255,0.15)]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Filter Controls Row matching reference */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 relative">
        {/* Price Dropdown Chip */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
              filters.maxPrice < 200000
                ? 'bg-[#173550] border-[#50A8FF] text-[#50A8FF]'
                : 'bg-[#102943]/80 border-[rgba(150,190,255,0.18)] text-[#A8B9CC] hover:text-white'
            }`}
          >
            <span>{filters.maxPrice < 200000 ? `< $${filters.maxPrice / 1000}k` : 'Price'}</span>
            <ChevronDown size={13} />
          </button>

          {activeDropdown === 'price' && (
            <div className="absolute left-0 mt-2 w-48 rounded-xl bg-[#0B1D31] border border-[rgba(150,190,255,0.25)] p-2 shadow-2xl z-40">
              <span className="text-[10px] uppercase text-[#71869D] font-bold px-2 py-1 block">
                Max Price
              </span>
              {[50000, 75000, 100000, 150000, 200000].map(price => (
                <button
                  key={price}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, maxPrice: price }));
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#A8B9CC] hover:text-white hover:bg-[#102943] rounded-lg flex items-center justify-between"
                >
                  <span>Under ${price.toLocaleString()}</span>
                  {filters.maxPrice === price && <Check size={14} className="text-[#50A8FF]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Brand Dropdown Chip */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'brand' ? null : 'brand')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
              filters.brand !== 'All'
                ? 'bg-[#173550] border-[#50A8FF] text-[#50A8FF]'
                : 'bg-[#102943]/80 border-[rgba(150,190,255,0.18)] text-[#A8B9CC] hover:text-white'
            }`}
          >
            <span>{filters.brand !== 'All' ? filters.brand : 'Brand'}</span>
            <ChevronDown size={13} />
          </button>

          {activeDropdown === 'brand' && (
            <div className="absolute left-0 mt-2 w-44 rounded-xl bg-[#0B1D31] border border-[rgba(150,190,255,0.25)] p-2 shadow-2xl z-40">
              <button
                onClick={() => {
                  setFilters(prev => ({ ...prev, brand: 'All' }));
                  setActiveDropdown(null);
                }}
                className="w-full text-left px-2.5 py-1.5 text-xs text-[#A8B9CC] hover:text-white hover:bg-[#102943] rounded-lg"
              >
                All Brands
              </button>
              {FEATURED_BRANDS.map(b => (
                <button
                  key={b.id}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, brand: b.name }));
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#A8B9CC] hover:text-white hover:bg-[#102943] rounded-lg flex items-center justify-between"
                >
                  <span>{b.name}</span>
                  {filters.brand === b.name && <Check size={14} className="text-[#50A8FF]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year Dropdown Chip */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'year' ? null : 'year')}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-all ${
              filters.minYear > 2020
                ? 'bg-[#173550] border-[#50A8FF] text-[#50A8FF]'
                : 'bg-[#102943]/80 border-[rgba(150,190,255,0.18)] text-[#A8B9CC] hover:text-white'
            }`}
          >
            <span>{filters.minYear > 2020 ? `${filters.minYear}+` : 'Year'}</span>
            <ChevronDown size={13} />
          </button>

          {activeDropdown === 'year' && (
            <div className="absolute left-0 mt-2 w-40 rounded-xl bg-[#0B1D31] border border-[rgba(150,190,255,0.25)] p-2 shadow-2xl z-40">
              {[2020, 2022, 2023, 2024].map(yr => (
                <button
                  key={yr}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, minYear: yr }));
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#A8B9CC] hover:text-white hover:bg-[#102943] rounded-lg flex items-center justify-between"
                >
                  <span>{yr} & Newer</span>
                  {filters.minYear === yr && <Check size={14} className="text-[#50A8FF]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* More Filters button matching reference */}
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-[#102943]/80 border border-[rgba(150,190,255,0.18)] text-xs font-medium text-[#A8B9CC] hover:text-white flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0"
        >
          <SlidersHorizontal size={13} />
          <span>More Filters</span>
        </button>
      </div>

      {/* Results Count & Sorting matching reference */}
      <div className="flex items-center justify-between py-2 text-xs">
        <span className="text-[#A8B9CC] font-semibold">
          {filteredCars.length === 8 ? '1286' : filteredCars.length} Cars Found
        </span>

        {/* Sort by dropdown */}
        <div className="relative">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'sort' ? null : 'sort')}
            className="flex items-center gap-1 text-[#A8B9CC] hover:text-white cursor-pointer"
          >
            <span>Sort by:</span>
            <span className="text-[#50A8FF] font-semibold capitalize">
              {sortOptions.find(o => o.id === filters.sortBy)?.label.split(':')[0] || 'Popular'}
            </span>
            <ChevronDown size={13} className="text-[#50A8FF]" />
          </button>

          {activeDropdown === 'sort' && (
            <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#0B1D31] border border-[rgba(150,190,255,0.25)] p-2 shadow-2xl z-40">
              {sortOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFilters(prev => ({ ...prev, sortBy: opt.id as any }));
                    setActiveDropdown(null);
                  }}
                  className="w-full text-left px-2.5 py-1.5 text-xs text-[#A8B9CC] hover:text-white hover:bg-[#102943] rounded-lg flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  {filters.sortBy === opt.id && <Check size={14} className="text-[#50A8FF]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Car Listing Cards matching reference screenshot */}
      <div className="space-y-3 mt-1">
        {filteredCars.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#102943]/40 border border-[rgba(150,190,255,0.15)] text-center my-6">
            <Sparkles size={32} className="mx-auto text-[#50A8FF] mb-3 opacity-60" />
            <h3 className="text-sm font-bold text-white">No Vehicles Match Filters</h3>
            <p className="text-xs text-[#71869D] mt-1 mb-4">
              Try adjusting your category, price range, or brand criteria.
            </p>
            <button
              onClick={() => {
                setFilters({
                  query: '',
                  category: 'All',
                  brand: 'All',
                  minPrice: 0,
                  maxPrice: 200000,
                  minYear: 2020,
                  maxYear: 2025,
                  fuelType: 'All',
                  transmission: 'All',
                  condition: 'All',
                  sortBy: 'popular'
                });
              }}
              className="py-2 px-4 rounded-xl bg-[#237BFF] text-white text-xs font-semibold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredCars.map(car => {
            const isFav = isFavorite(car.id);
            return (
              <div
                key={car.id}
                onClick={() => handleSelectCar(car.id)}
                className="p-3 rounded-2xl bg-[#102943]/70 hover:bg-[#173550]/80 border border-[rgba(150,190,255,0.18)] hover:border-[#50A8FF]/40 transition-all cursor-pointer group shadow-sm flex items-center gap-3.5 relative overflow-hidden"
              >
                {/* Left Thumbnail Image */}
                <div className="w-28 sm:w-32 h-20 rounded-xl overflow-hidden bg-[#071525] shrink-0 border border-[rgba(150,190,255,0.12)]">
                  <img
                    src={car.images[0]}
                    alt={car.model}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Right Vehicle Info matching reference */}
                <div className="flex-1 min-w-0 pr-8">
                  <h3 className="text-sm font-bold text-white truncate group-hover:text-[#50A8FF] transition-colors">
                    {car.model}
                  </h3>
                  <p className="text-[11px] text-[#A8B9CC] truncate mt-0.5">
                    {car.year} · {car.category}
                  </p>

                  <div className="text-sm font-extrabold text-white mt-2">
                    ${car.price.toLocaleString()}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-[#71869D] mt-0.5 truncate">
                    <MapPin size={11} className="shrink-0" />
                    <span className="truncate">{car.location}</span>
                  </div>
                </div>

                {/* Favorite Heart Icon matching reference */}
                <button
                  onClick={e => {
                    e.stopPropagation();
                    toggleFavorite(car.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-[#71869D] hover:text-[#50A8FF] transition-colors cursor-pointer"
                  aria-label="Toggle favorite"
                >
                  <Heart
                    size={17}
                    className={isFav ? 'fill-[#237BFF] text-[#237BFF]' : 'text-[#71869D]'}
                  />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
