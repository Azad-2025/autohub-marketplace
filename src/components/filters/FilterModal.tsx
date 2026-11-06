import React, { useState } from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { FEATURED_BRANDS, CAR_CATEGORIES } from '../../data/cars';

export const FilterModal: React.FC = () => {
  const {
    filters,
    setFilters,
    resetFilters,
    isFilterModalOpen,
    setIsFilterModalOpen,
    setActiveScreen
  } = useApp();

  const [localFilters, setLocalFilters] = useState(filters);

  if (!isFilterModalOpen) return null;

  const handleApply = () => {
    setFilters(localFilters);
    setIsFilterModalOpen(false);
    setActiveScreen('search');
  };

  const handleReset = () => {
    resetFilters();
    setLocalFilters({
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
  };

  const fuelTypes = ['All', 'Electric', 'Hybrid', 'Gasoline'];
  const transmissions = ['All', 'Automatic', 'Dual-Clutch', 'Manual'];
  const conditions = ['All', 'New', 'Used'];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        onClick={() => setIsFilterModalOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Modal / Bottom Sheet */}
      <div className="relative w-full max-w-md bg-[#0B1D31] rounded-t-3xl sm:rounded-3xl border border-[rgba(150,190,255,0.22)] shadow-2xl p-5 max-h-[90vh] flex flex-col z-10 animate-in slide-in-from-bottom duration-200">
        {/* Grab bar */}
        <div className="w-10 h-1 bg-[#173550] rounded-full mx-auto mb-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(150,190,255,0.15)]">
          <h3 className="text-base font-bold text-white">Advanced Vehicle Filters</h3>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="w-8 h-8 rounded-lg bg-[#102943] border border-[rgba(150,190,255,0.15)] flex items-center justify-center text-[#A8B9CC] hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Filter Form */}
        <div className="flex-1 overflow-y-auto py-4 space-y-5 pr-1 text-xs">
          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-semibold text-white">Maximum Price</span>
              <span className="font-bold text-[#50A8FF]">
                ${localFilters.maxPrice.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="30000"
              max="200000"
              step="5000"
              value={localFilters.maxPrice}
              onChange={e =>
                setLocalFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))
              }
              className="w-full accent-[#237BFF] bg-[#102943] h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#71869D] mt-1">
              <span>$30,000</span>
              <span>$100,000</span>
              <span>$200,000+</span>
            </div>
          </div>

          {/* Condition (All / New / Used) */}
          <div>
            <span className="font-semibold text-white block mb-2">Vehicle Condition</span>
            <div className="grid grid-cols-3 gap-2">
              {conditions.map(cond => (
                <button
                  key={cond}
                  type="button"
                  onClick={() =>
                    setLocalFilters(prev => ({ ...prev, condition: cond as any }))
                  }
                  className={`py-2 px-3 rounded-xl border font-medium text-center transition-all ${
                    localFilters.condition === cond
                      ? 'bg-[#237BFF] border-[#50A8FF] text-white shadow-[0_0_10px_rgba(35,123,255,0.4)]'
                      : 'bg-[#102943]/70 border-[rgba(150,190,255,0.15)] text-[#A8B9CC]'
                  }`}
                >
                  {cond}
                </button>
              ))}
            </div>
          </div>

          {/* Body Style / Category */}
          <div>
            <span className="font-semibold text-white block mb-2">Body Style</span>
            <div className="grid grid-cols-3 gap-2">
              {CAR_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setLocalFilters(prev => ({ ...prev, category: cat.id }))}
                  className={`py-2 px-3 rounded-xl border font-medium text-center transition-all ${
                    localFilters.category === cat.id
                      ? 'bg-[#237BFF] border-[#50A8FF] text-white shadow-[0_0_10px_rgba(35,123,255,0.4)]'
                      : 'bg-[#102943]/70 border-[rgba(150,190,255,0.15)] text-[#A8B9CC]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Manufacturer / Brand */}
          <div>
            <span className="font-semibold text-white block mb-2">Manufacturer / Brand</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setLocalFilters(prev => ({ ...prev, brand: 'All' }))}
                className={`py-1.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                  localFilters.brand === 'All'
                    ? 'bg-[#237BFF] border-[#50A8FF] text-white'
                    : 'bg-[#102943]/70 border-[rgba(150,190,255,0.15)] text-[#A8B9CC]'
                }`}
              >
                All Brands
              </button>
              {FEATURED_BRANDS.map(b => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setLocalFilters(prev => ({ ...prev, brand: b.name }))}
                  className={`py-1.5 px-3 rounded-xl border text-xs font-medium transition-all ${
                    localFilters.brand === b.name
                      ? 'bg-[#237BFF] border-[#50A8FF] text-white'
                      : 'bg-[#102943]/70 border-[rgba(150,190,255,0.15)] text-[#A8B9CC]'
                  }`}
                >
                  {b.name}
                </button>
              ))}
            </div>
          </div>

          {/* Fuel / Energy Type */}
          <div>
            <span className="font-semibold text-white block mb-2">Fuel / Energy System</span>
            <div className="grid grid-cols-2 gap-2">
              {fuelTypes.map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setLocalFilters(prev => ({ ...prev, fuelType: f }))}
                  className={`py-2 px-3 rounded-xl border font-medium text-center transition-all ${
                    localFilters.fuelType === f
                      ? 'bg-[#237BFF] border-[#50A8FF] text-white'
                      : 'bg-[#102943]/70 border-[rgba(150,190,255,0.15)] text-[#A8B9CC]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div>
            <span className="font-semibold text-white block mb-2">Transmission</span>
            <div className="grid grid-cols-2 gap-2">
              {transmissions.map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLocalFilters(prev => ({ ...prev, transmission: t }))}
                  className={`py-2 px-3 rounded-xl border font-medium text-center transition-all ${
                    localFilters.transmission === t
                      ? 'bg-[#237BFF] border-[#50A8FF] text-white'
                      : 'bg-[#102943]/70 border-[rgba(150,190,255,0.15)] text-[#A8B9CC]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Model Year */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-semibold text-white">Minimum Year</span>
              <span className="font-bold text-[#50A8FF]">{localFilters.minYear} & Newer</span>
            </div>
            <input
              type="range"
              min="2020"
              max="2025"
              step="1"
              value={localFilters.minYear}
              onChange={e =>
                setLocalFilters(prev => ({ ...prev, minYear: Number(e.target.value) }))
              }
              className="w-full accent-[#237BFF] bg-[#102943] h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[rgba(150,190,255,0.15)] flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="py-3 px-4 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-[#A8B9CC] hover:text-white flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(35,123,255,0.4)] cursor-pointer"
          >
            <Check size={16} />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
