import React from 'react';
import {
  ArrowLeft,
  Plus,
  X,
  Scale,
  Zap,
  Gauge,
  Timer,
  Trophy,
  Check,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CARS_DATA } from '../../data/cars';

export const CompareScreen: React.FC = () => {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    setActiveScreen,
    setSelectedCarId,
    addToCompare,
    startDealerInquiry
  } = useApp();

  const comparedCars = CARS_DATA.filter(c => compareList.includes(c.id));
  const availableToAdd = CARS_DATA.filter(c => !compareList.includes(c.id));

  // Determine winners
  const lowestPrice = Math.min(...comparedCars.map(c => c.price));
  const quickestAccel = Math.min(...comparedCars.map(c => c.acceleration));
  const highestPower = Math.max(...comparedCars.map(c => c.horsepower));
  const highestRange = Math.max(...comparedCars.map(c => c.range || 0));

  return (
    <div className="pb-24 px-4 pt-3 max-w-md mx-auto text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(150,190,255,0.12)] mb-4">
        <button
          onClick={() => setActiveScreen('home')}
          className="w-10 h-10 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white"
        >
          <ArrowLeft size={19} />
        </button>

        <div className="text-center">
          <h1 className="text-base font-bold text-white">Car Comparison</h1>
          <p className="text-[10px] text-[#50A8FF]">Side-by-Side Benchmark</p>
        </div>

        {comparedCars.length > 0 ? (
          <button
            onClick={clearCompare}
            className="text-xs text-rose-400 hover:text-rose-300 font-medium"
          >
            Clear
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {comparedCars.length === 0 ? (
        <div className="p-8 rounded-3xl bg-[#102943]/50 border border-[rgba(150,190,255,0.18)] text-center my-8">
          <Scale size={36} className="mx-auto text-[#50A8FF] mb-3 opacity-60" />
          <h3 className="text-base font-bold text-white">No Cars in Comparison</h3>
          <p className="text-xs text-[#71869D] mt-1 mb-5 leading-relaxed">
            Select vehicles from the catalog or detail pages to compare acceleration, horsepower, range, and pricing side by side.
          </p>
          <button
            onClick={() => setActiveScreen('search')}
            className="py-2.5 px-5 rounded-2xl bg-[#237BFF] text-white text-xs font-semibold shadow-[0_0_15px_rgba(35,123,255,0.4)]"
          >
            Browse Cars to Compare
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Vehicles Overview Row */}
          <div className="grid grid-cols-2 gap-3">
            {comparedCars.map(car => (
              <div
                key={car.id}
                className="relative p-3 rounded-2xl bg-[#102943]/80 border border-[rgba(150,190,255,0.2)] flex flex-col justify-between"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFromCompare(car.id)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#071525]/80 text-[#71869D] hover:text-rose-400 flex items-center justify-center z-10"
                >
                  <X size={13} />
                </button>

                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedCarId(car.id);
                    setActiveScreen('details');
                  }}
                >
                  <div className="h-24 rounded-xl overflow-hidden mb-2 bg-[#071525]">
                    <img
                      src={car.images[0]}
                      alt={car.model}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xs font-bold text-white truncate">{car.model}</h3>
                  <p className="text-[10px] text-[#A8B9CC] truncate">{car.subtitle}</p>
                  <div className="text-sm font-extrabold text-[#50A8FF] mt-1">
                    ${car.price.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={() => startDealerInquiry(car)}
                  className="mt-2.5 w-full py-1.5 rounded-lg bg-[#173550] hover:bg-[#237BFF] text-[10px] font-semibold text-white flex items-center justify-center gap-1 transition-all"
                >
                  <MessageSquare size={12} />
                  <span>Inquire</span>
                </button>
              </div>
            ))}

            {comparedCars.length < 2 && (
              <div className="p-3 rounded-2xl border border-dashed border-[rgba(150,190,255,0.3)] bg-[#0B1D31]/40 flex flex-col items-center justify-center text-center min-h-[180px]">
                <Plus size={24} className="text-[#50A8FF] mb-2" />
                <span className="text-xs font-semibold text-white">Add 2nd Vehicle</span>
                <p className="text-[10px] text-[#71869D] mt-1 max-w-[120px]">
                  Pick another vehicle from search or below
                </p>
              </div>
            )}
          </div>

          {/* Side-by-Side Specifications Matrix */}
          <div className="p-4 rounded-2xl bg-[#0B1D31] border border-[rgba(150,190,255,0.18)] space-y-3.5 text-xs">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Trophy size={14} className="text-[#50A8FF]" />
              <span>Head-to-Head Benchmark</span>
            </h3>

            {/* Spec: Price */}
            <div className="py-2 border-b border-[rgba(150,190,255,0.1)]">
              <span className="text-[11px] text-[#71869D] block mb-1.5">Starting Price</span>
              <div className="grid grid-cols-2 gap-3">
                {comparedCars.map(c => {
                  const isBest = c.price === lowestPrice && comparedCars.length > 1;
                  return (
                    <div
                      key={c.id}
                      className={`p-2 rounded-xl flex items-center justify-between ${
                        isBest ? 'bg-[#237BFF]/20 border border-[#237BFF]/50' : 'bg-[#102943]/50'
                      }`}
                    >
                      <span className="font-extrabold text-white">${c.price.toLocaleString()}</span>
                      {isBest && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#237BFF] text-white font-bold">
                          BEST VALUE
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Spec: 0-100 Acceleration */}
            <div className="py-2 border-b border-[rgba(150,190,255,0.1)]">
              <span className="text-[11px] text-[#71869D] block mb-1.5">0 - 100 km/h</span>
              <div className="grid grid-cols-2 gap-3">
                {comparedCars.map(c => {
                  const isBest = c.acceleration === quickestAccel && comparedCars.length > 1;
                  return (
                    <div
                      key={c.id}
                      className={`p-2 rounded-xl flex items-center justify-between ${
                        isBest ? 'bg-[#237BFF]/20 border border-[#237BFF]/50' : 'bg-[#102943]/50'
                      }`}
                    >
                      <span className="font-extrabold text-white">{c.acceleration} sec</span>
                      {isBest && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#237BFF] text-white font-bold">
                          FASTEST
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Spec: Horsepower */}
            <div className="py-2 border-b border-[rgba(150,190,255,0.1)]">
              <span className="text-[11px] text-[#71869D] block mb-1.5">Power Output</span>
              <div className="grid grid-cols-2 gap-3">
                {comparedCars.map(c => {
                  const isBest = c.horsepower === highestPower && comparedCars.length > 1;
                  return (
                    <div
                      key={c.id}
                      className={`p-2 rounded-xl flex items-center justify-between ${
                        isBest ? 'bg-[#237BFF]/20 border border-[#237BFF]/50' : 'bg-[#102943]/50'
                      }`}
                    >
                      <span className="font-extrabold text-white">{c.horsepower} HP</span>
                      {isBest && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#237BFF] text-white font-bold">
                          STRONGEST
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Spec: Top Speed */}
            <div className="py-2 border-b border-[rgba(150,190,255,0.1)]">
              <span className="text-[11px] text-[#71869D] block mb-1.5">Top Speed</span>
              <div className="grid grid-cols-2 gap-3">
                {comparedCars.map(c => (
                  <div key={c.id} className="p-2 rounded-xl bg-[#102943]/50 font-semibold text-white">
                    {c.topSpeed} km/h
                  </div>
                ))}
              </div>
            </div>

            {/* Spec: Fuel Type & Engine */}
            <div className="py-2">
              <span className="text-[11px] text-[#71869D] block mb-1.5">Engine / Energy</span>
              <div className="grid grid-cols-2 gap-3">
                {comparedCars.map(c => (
                  <div key={c.id} className="p-2 rounded-xl bg-[#102943]/50 text-[11px] text-[#A8B9CC]">
                    <span className="font-semibold text-white block truncate">{c.fuelType}</span>
                    <span className="truncate block mt-0.5">{c.transmission}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Add Available Car */}
          {availableToAdd.length > 0 && comparedCars.length < 3 && (
            <div className="pt-2">
              <span className="text-xs font-bold text-[#A8B9CC] block mb-2.5">
                Quick Add To Comparison:
              </span>
              <div className="space-y-2">
                {availableToAdd.slice(0, 3).map(car => (
                  <div
                    key={car.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.15)]"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <img
                        src={car.images[0]}
                        alt={car.model}
                        referrerPolicy="no-referrer"
                        className="w-12 h-9 rounded-lg object-cover"
                      />
                      <div className="truncate">
                        <span className="text-xs font-semibold text-white truncate block">
                          {car.model}
                        </span>
                        <span className="text-[10px] text-[#50A8FF]">
                          ${car.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCompare(car.id)}
                      className="py-1 px-3 rounded-lg bg-[#237BFF] text-[11px] font-semibold text-white hover:bg-[#3A8BFF] cursor-pointer shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
