import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Shield,
  Smartphone,
  LogOut,
  Edit2,
  Check,
  X,
  Heart,
  Warehouse,
  Scale,
  Download,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { usePWA } from '../../hooks/usePWA';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    updateUser,
    setActiveScreen,
    viewLayout,
    setViewLayout,
    favorites,
    garage,
    compareList,
    showToast,
    openInstallModal
  } = useApp();

  const { isStandalone } = usePWA();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [location, setLocation] = useState(user.location);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone, location });
    setIsEditModalOpen(false);
  };

  const handleSignOut = () => {
    showToast('Signed out of AutoHub', 'info');
    setActiveScreen('onboarding');
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

        <h1 className="text-base font-bold text-white">My Profile</h1>

        <button
          onClick={() => setIsEditModalOpen(true)}
          className="w-10 h-10 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#50A8FF] hover:text-white"
          aria-label="Edit Profile"
        >
          <Edit2 size={17} />
        </button>
      </div>

      <div className="space-y-4">
        {/* User Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#102943] via-[#0B1D31] to-[#071525] border border-[rgba(150,190,255,0.22)] shadow-xl relative overflow-hidden text-center flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full border-2 border-[#50A8FF] overflow-hidden bg-[#173550] shadow-[0_0_20px_rgba(35,123,255,0.4)] flex items-center justify-center">
              <span className="text-2xl font-black text-white">
                {user.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 p-1 bg-[#237BFF] rounded-full border-2 border-[#0B1D31]">
              <Shield size={12} className="text-white" />
            </div>
          </div>

          <h2 className="text-lg font-extrabold text-white">{user.name}</h2>
          <p className="text-xs text-[#50A8FF] font-medium mt-0.5">Verified Premier Member</p>
          <p className="text-[11px] text-[#71869D] mt-1">Member since {user.memberSince}</p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 w-full mt-4 pt-4 border-t border-[rgba(150,190,255,0.15)]">
            <div
              onClick={() => setActiveScreen('garage')}
              className="p-2 rounded-xl bg-[#071525]/80 border border-[rgba(150,190,255,0.1)] cursor-pointer hover:border-[#50A8FF]/40"
            >
              <Warehouse size={16} className="mx-auto text-[#50A8FF] mb-1" />
              <span className="text-xs font-bold text-white block">{garage.length}</span>
              <span className="text-[10px] text-[#71869D]">Garage</span>
            </div>

            <div
              onClick={() => setActiveScreen('favorites')}
              className="p-2 rounded-xl bg-[#071525]/80 border border-[rgba(150,190,255,0.1)] cursor-pointer hover:border-[#50A8FF]/40"
            >
              <Heart size={16} className="mx-auto text-[#50A8FF] mb-1" />
              <span className="text-xs font-bold text-white block">{favorites.length}</span>
              <span className="text-[10px] text-[#71869D]">Favorites</span>
            </div>

            <div
              onClick={() => setActiveScreen('compare')}
              className="p-2 rounded-xl bg-[#071525]/80 border border-[rgba(150,190,255,0.1)] cursor-pointer hover:border-[#50A8FF]/40"
            >
              <Scale size={16} className="mx-auto text-[#50A8FF] mb-1" />
              <span className="text-xs font-bold text-white block">{compareList.length}</span>
              <span className="text-[10px] text-[#71869D]">Compare</span>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="p-4 rounded-2xl bg-[#102943]/70 border border-[rgba(150,190,255,0.18)] space-y-3 text-xs">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Contact Information
          </h3>

          <div className="flex items-center gap-3 text-[#A8B9CC]">
            <Mail size={15} className="text-[#50A8FF] shrink-0" />
            <span className="truncate">{user.email}</span>
          </div>

          <div className="flex items-center gap-3 text-[#A8B9CC]">
            <Phone size={15} className="text-[#50A8FF] shrink-0" />
            <span>{user.phone}</span>
          </div>

          <div className="flex items-center gap-3 text-[#A8B9CC]">
            <MapPin size={15} className="text-[#50A8FF] shrink-0" />
            <span>{user.location}</span>
          </div>
        </div>

        {/* PWA Mobile App Installation Section matching prompt requirements */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#102943] to-[#0B1D31] border border-[rgba(150,190,255,0.22)] shadow-lg relative overflow-hidden">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Smartphone size={16} className="text-[#50A8FF]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Mobile Application
                </h3>
              </div>
              <p className="text-[11px] text-[#A8B9CC] mt-1.5 leading-snug">
                Install our app for a better mobile experience.
              </p>
            </div>

            {isStandalone && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold flex items-center gap-1 shrink-0">
                <CheckCircle2 size={12} />
                <span>Installed</span>
              </span>
            )}
          </div>

          <button
            onClick={openInstallModal}
            className="w-full mt-3.5 py-3 px-4 rounded-xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] hover:to-[#2470E8] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(35,123,255,0.35)] active:scale-95 transition-all cursor-pointer border border-[#80BFFF]/30"
          >
            <Download size={15} />
            <span>Install AutoHub</span>
          </button>
        </div>

        {/* Settings & Preferences */}
        <div className="p-4 rounded-2xl bg-[#102943]/70 border border-[rgba(150,190,255,0.18)] space-y-3.5 text-xs">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Preferences & Security
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Bell size={16} className="text-[#50A8FF]" />
              <span className="text-[#A8B9CC]">Price Alert Push Notifications</span>
            </div>
            <button
              onClick={() => {
                updateUser({ notificationsEnabled: !user.notificationsEnabled });
              }}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                user.notificationsEnabled ? 'bg-[#237BFF]' : 'bg-[#173550]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                  user.notificationsEnabled ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[rgba(150,190,255,0.1)]">
            <span className="text-[#A8B9CC]">Display Currency</span>
            <span className="font-semibold text-white">{user.currency}</span>
          </div>
        </div>

        {/* Display Viewport Mode Switcher */}
        <div className="p-4 rounded-2xl bg-[#0B1D31] border border-[rgba(150,190,255,0.2)]">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Preview Presentation Mode
          </h3>
          <p className="text-[11px] text-[#71869D] mb-3">
            Choose how you would like to view AutoHub on your device.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'device' as const, label: 'Phone Frame' },
              { id: 'responsive' as const, label: 'Full Width' },
              { id: 'reference' as const, label: '4-Screen Ref' }
            ].map(mode => (
              <button
                key={mode.id}
                onClick={() => {
                  setViewLayout(mode.id);
                  showToast(`Switched to ${mode.label} mode`, 'info');
                }}
                className={`py-2 px-1 text-center rounded-xl text-xs font-medium transition-all ${
                  viewLayout === mode.id
                    ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.4)]'
                    : 'bg-[#102943] text-[#A8B9CC] hover:text-white'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full py-3.5 rounded-2xl bg-[#102943]/60 hover:bg-rose-950/40 border border-[rgba(244,63,94,0.3)] text-rose-400 hover:text-rose-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsEditModalOpen(false)} className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm bg-[#0B1D31] rounded-3xl border border-[rgba(150,190,255,0.25)] p-5 shadow-2xl z-10 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(150,190,255,0.15)] mb-4">
              <h3 className="text-sm font-bold text-white">Edit Profile Details</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-[#71869D] hover:text-white">
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white focus:outline-none focus:border-[#50A8FF]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white focus:outline-none focus:border-[#50A8FF]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">Phone</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white focus:outline-none focus:border-[#50A8FF]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#102943] border border-[rgba(150,190,255,0.2)] text-white focus:outline-none focus:border-[#50A8FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] text-white font-semibold text-xs shadow-[0_0_15px_rgba(35,123,255,0.4)] cursor-pointer"
              >
                Save Profile
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
