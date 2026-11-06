import React, { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Warehouse,
  Wrench,
  Calendar,
  Gauge,
  FileText,
  Trash2,
  CheckCircle2,
  X,
  ChevronRight,
  Shield
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CARS_DATA } from '../../data/cars';
import { GarageItem } from '../../types';

export const GarageScreen: React.FC = () => {
  const { garage, addToGarage, removeFromGarage, updateGarageItem, setActiveScreen, setSelectedCarId } =
    useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCarForAdd, setSelectedCarForAdd] = useState(CARS_DATA[0].id);
  const [nickname, setNickname] = useState('');
  const [mileage, setMileage] = useState(12000);
  const [notes, setNotes] = useState('Routine inspection passed.');

  const handleAddCar = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    addToGarage({
      carId: selectedCarForAdd,
      customNickname: nickname || 'Personal Vehicle',
      purchaseDate: today,
      currentMileage: Number(mileage),
      lastServiceDate: today,
      nextServiceDue: nextYear.toISOString().split('T')[0],
      notes,
      status: 'Active'
    });

    setIsAddModalOpen(false);
    setNickname('');
    setMileage(12000);
  };

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
          <h1 className="text-base font-bold text-white">My Garage</h1>
          <p className="text-[10px] text-[#50A8FF]">
            {garage.length} {garage.length === 1 ? 'Vehicle Registered' : 'Vehicles Registered'}
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="w-10 h-10 rounded-xl bg-[#237BFF] text-white flex items-center justify-center hover:bg-[#3A8BFF] shadow-[0_0_12px_rgba(35,123,255,0.4)] cursor-pointer"
          aria-label="Add vehicle to garage"
        >
          <Plus size={19} />
        </button>
      </div>

      {garage.length === 0 ? (
        <div className="p-8 rounded-3xl bg-[#102943]/50 border border-[rgba(150,190,255,0.18)] text-center my-8">
          <Warehouse size={36} className="mx-auto text-[#50A8FF] mb-3 opacity-60" />
          <h3 className="text-base font-bold text-white">Your Garage is Empty</h3>
          <p className="text-xs text-[#71869D] mt-1 mb-5">
            Add your current vehicles to log mileage, track maintenance schedules, and monitor warranty status.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="py-2.5 px-5 rounded-2xl bg-[#237BFF] text-white text-xs font-semibold shadow-[0_0_15px_rgba(35,123,255,0.4)]"
          >
            Park a Vehicle
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {garage.map(item => {
            const car = CARS_DATA.find(c => c.id === item.carId) || CARS_DATA[0];

            return (
              <div
                key={item.id}
                className="p-4 rounded-3xl bg-gradient-to-br from-[#102943] to-[#0B1D31] border border-[rgba(150,190,255,0.2)] shadow-xl relative overflow-hidden"
              >
                {/* Status banner */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                      {item.status}
                    </span>
                  </div>

                  <button
                    onClick={() => removeFromGarage(item.id)}
                    className="text-[#71869D] hover:text-rose-400 p-1"
                    title="Remove vehicle"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Car Banner & Thumbnail */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div
                    onClick={() => {
                      setSelectedCarId(car.id);
                      setActiveScreen('details');
                    }}
                    className="w-24 h-20 rounded-xl overflow-hidden bg-[#071525] shrink-0 border border-[rgba(150,190,255,0.18)] cursor-pointer"
                  >
                    <img
                      src={car.images[0]}
                      alt={car.model}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">
                      {item.customNickname || car.model}
                    </h3>
                    <p className="text-[11px] text-[#A8B9CC] truncate">{car.model} {car.subtitle}</p>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-[#50A8FF] font-semibold">
                      <Gauge size={13} />
                      <span>{item.currentMileage.toLocaleString()} km logged</span>
                    </div>
                  </div>
                </div>

                {/* Maintenance stats row */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#071525]/70 border border-[rgba(150,190,255,0.12)] text-xs mb-3">
                  <div>
                    <span className="text-[10px] text-[#71869D] block">Last Service</span>
                    <span className="font-semibold text-white">{item.lastServiceDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#71869D] block">Next Due</span>
                    <span className="font-semibold text-[#50A8FF]">{item.nextServiceDue}</span>
                  </div>
                </div>

                {/* Notes and quick update */}
                {item.notes && (
                  <p className="text-[11px] text-[#A8B9CC] italic px-1 mb-2">
                    "{item.notes}"
                  </p>
                )}

                <div className="flex gap-2 pt-1 border-t border-[rgba(150,190,255,0.1)]">
                  <button
                    onClick={() => {
                      const newMil = item.currentMileage + 500;
                      updateGarageItem(item.id, { currentMileage: newMil });
                    }}
                    className="flex-1 py-1.5 rounded-xl bg-[#173550] hover:bg-[#237BFF] text-white text-[11px] font-medium transition-all"
                  >
                    +500 km Odometer
                  </button>
                  <button
                    onClick={() => {
                      const today = new Date().toISOString().split('T')[0];
                      updateGarageItem(item.id, { lastServiceDate: today });
                    }}
                    className="flex-1 py-1.5 rounded-xl bg-[#173550] hover:bg-[#237BFF] text-white text-[11px] font-medium transition-all"
                  >
                    Log Service Today
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Car Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setIsAddModalOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-sm bg-[#0B1D31] rounded-3xl border border-[rgba(150,190,255,0.25)] p-5 shadow-2xl z-10 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(150,190,255,0.15)] mb-4">
              <h3 className="text-sm font-bold text-white">Add Vehicle to My Garage</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-[#71869D] hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddCar} className="space-y-3.5 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">
                  Select Vehicle Model
                </label>
                <select
                  value={selectedCarForAdd}
                  onChange={e => setSelectedCarForAdd(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white focus:outline-none focus:border-[#50A8FF]"
                >
                  {CARS_DATA.map(c => (
                    <option key={c.id} value={c.id} className="bg-[#0B1D31]">
                      {c.brand} {c.model} ({c.year})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">
                  Custom Nickname (Optional)
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  placeholder="e.g. Daily Driver, Track Car"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white focus:outline-none focus:border-[#50A8FF]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">
                  Current Odometer (km)
                </label>
                <input
                  type="number"
                  value={mileage}
                  onChange={e => setMileage(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white focus:outline-none focus:border-[#50A8FF]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">
                  Service Notes
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white focus:outline-none focus:border-[#50A8FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] text-white font-semibold text-xs shadow-[0_0_15px_rgba(35,123,255,0.4)] cursor-pointer"
              >
                Park In Garage
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
