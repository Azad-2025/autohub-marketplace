import React from 'react';
import { ArrowLeft, Heart, Trash2, MapPin, Star, ChevronRight, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CARS_DATA } from '../../data/cars';

export const FavoritesScreen: React.FC = () => {
  const {
    favorites,
    toggleFavorite,
    setActiveScreen,
    setSelectedCarId,
    startDealerInquiry
  } = useApp();

  const favoriteCars = CARS_DATA.filter(c => favorites.includes(c.id));
  const totalValuation = favoriteCars.reduce((sum, c) => sum + c.price, 0);

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
          <h1 className="text-base font-bold text-white">Saved Favorites</h1>
          <p className="text-[10px] text-[#50A8FF]">
            {favoriteCars.length} Dream {favoriteCars.length === 1 ? 'Vehicle' : 'Vehicles'}
          </p>
        </div>

        <div className="w-10" />
      </div>

      {favoriteCars.length === 0 ? (
        <div className="p-8 rounded-3xl bg-[#102943]/50 border border-[rgba(150,190,255,0.18)] text-center my-8">
          <Heart size={36} className="mx-auto text-[#71869D] mb-3 opacity-60" />
          <h3 className="text-base font-bold text-white">Your Garage Wishlist is Empty</h3>
          <p className="text-xs text-[#71869D] mt-1 mb-5">
            Tap the heart icon on any vehicle card to save it for easy access and price tracking.
          </p>
          <button
            onClick={() => setActiveScreen('search')}
            className="py-2.5 px-5 rounded-2xl bg-[#237BFF] text-white text-xs font-semibold shadow-[0_0_15px_rgba(35,123,255,0.4)]"
          >
            Explore Vehicles
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Summary Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#102943] to-[#0B1D31] border border-[rgba(150,190,255,0.2)] flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#71869D] uppercase tracking-wider font-semibold">
                Wishlist Total Value
              </span>
              <div className="text-xl font-black text-[#50A8FF]">
                ${totalValuation.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#71869D] uppercase tracking-wider font-semibold">
                Vehicles
              </span>
              <div className="text-base font-bold text-white">{favoriteCars.length}</div>
            </div>
          </div>

          {/* Favorites List */}
          <div className="space-y-3">
            {favoriteCars.map(car => (
              <div
                key={car.id}
                className="p-3.5 rounded-2xl bg-[#102943]/70 border border-[rgba(150,190,255,0.18)] relative group overflow-hidden"
              >
                <div className="flex gap-3.5">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setSelectedCarId(car.id);
                      setActiveScreen('details');
                    }}
                    className="w-28 h-24 rounded-xl overflow-hidden bg-[#071525] shrink-0 border border-[rgba(150,190,255,0.15)] cursor-pointer"
                  >
                    <img
                      src={car.images[0]}
                      alt={car.model}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold text-[#50A8FF]">
                          {car.brand}
                        </span>
                        <button
                          onClick={() => toggleFavorite(car.id)}
                          className="text-[#71869D] hover:text-rose-400 p-1"
                          title="Remove from favorites"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <h3
                        onClick={() => {
                          setSelectedCarId(car.id);
                          setActiveScreen('details');
                        }}
                        className="text-sm font-bold text-white truncate cursor-pointer hover:text-[#50A8FF]"
                      >
                        {car.model}
                      </h3>
                      <p className="text-[11px] text-[#A8B9CC] truncate">{car.subtitle}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-white">
                        ${car.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => startDealerInquiry(car)}
                        className="py-1 px-2.5 rounded-lg bg-[#237BFF] hover:bg-[#3A8BFF] text-[11px] font-semibold text-white flex items-center gap-1"
                      >
                        <MessageSquare size={12} />
                        <span>Contact</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
