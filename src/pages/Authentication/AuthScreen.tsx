import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ArrowLeft, Shield, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AutoHubLogo } from '../../components/common/BrandEmblems';

export const AuthScreen: React.FC = () => {
  const { setActiveScreen, showToast, updateUser } = useApp();
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (authMode === 'signup' && !name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Enter a valid email address';
    }
    if (authMode !== 'forgot') {
      if (!password || password.length < 6) {
        errs.password = 'Password must be at least 6 characters';
      }
      if (authMode === 'signup' && password !== confirmPassword) {
        errs.confirmPassword = 'Passwords do not match';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (authMode === 'signin') {
      showToast('Welcome back to AutoHub!', 'success');
      setActiveScreen('home');
    } else if (authMode === 'signup') {
      updateUser({ name, email });
      showToast('Account created successfully! Welcome to AutoHub.', 'success');
      setActiveScreen('home');
    } else {
      showToast('Password reset link sent to your email.', 'info');
      setAuthMode('signin');
    }
  };

  const handleDemoLogin = () => {
    setEmail('alex.vance@autohub.io');
    setPassword('••••••••••••');
    showToast('Signed in with Verified Demo Member', 'success');
    setActiveScreen('home');
  };

  return (
    <div className="min-h-screen pb-16 px-5 pt-4 max-w-md mx-auto text-white flex flex-col justify-between">
      {/* Top back */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={() => setActiveScreen('home')}
          className="w-10 h-10 rounded-xl bg-[#102943]/60 border border-[rgba(150,190,255,0.18)] flex items-center justify-center text-[#A8B9CC] hover:text-white"
        >
          <ArrowLeft size={19} />
        </button>
        <span className="text-xs text-[#71869D]">Secure 256-bit SSL</span>
      </div>

      <div className="my-auto py-4">
        {/* Logo and header */}
        <div className="text-center mb-6">
          <AutoHubLogo size={48} glow={true} />
          <h2 className="text-2xl font-black text-white mt-2">
            Auto<span className="text-[#50A8FF]">Hub</span>
          </h2>
          <p className="text-xs text-[#A8B9CC] mt-1">
            {authMode === 'signin' && 'Sign in to access your garage, saved cars & dealer chats'}
            {authMode === 'signup' && 'Create your AutoHub account to start driving your dream'}
            {authMode === 'forgot' && 'Reset your password to regain access to your account'}
          </p>
        </div>

        {/* Tab switch */}
        {authMode !== 'forgot' && (
          <div className="flex p-1 rounded-2xl bg-[#0B1D31] border border-[rgba(150,190,255,0.18)] mb-5">
            <button
              onClick={() => {
                setAuthMode('signin');
                setErrors({});
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                authMode === 'signin'
                  ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.4)]'
                  : 'text-[#A8B9CC] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setAuthMode('signup');
                setErrors({});
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                authMode === 'signup'
                  ? 'bg-[#237BFF] text-white shadow-[0_0_12px_rgba(35,123,255,0.4)]'
                  : 'text-[#A8B9CC] hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === 'signup' && (
            <div>
              <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71869D]" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#102943]/70 border border-[rgba(150,190,255,0.2)] text-white text-xs focus:outline-none focus:border-[#50A8FF]"
                />
              </div>
              {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71869D]" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#102943]/70 border border-[rgba(150,190,255,0.2)] text-white text-xs focus:outline-none focus:border-[#50A8FF]"
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
          </div>

          {authMode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-semibold text-[#A8B9CC]">
                  Password
                </label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-[#50A8FF] hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71869D]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl bg-[#102943]/70 border border-[rgba(150,190,255,0.2)] text-white text-xs focus:outline-none focus:border-[#50A8FF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#71869D] hover:text-white"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-rose-400 mt-1">{errors.password}</p>}
            </div>
          )}

          {authMode === 'signup' && (
            <div>
              <label className="text-[11px] font-semibold text-[#A8B9CC] block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71869D]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#102943]/70 border border-[rgba(150,190,255,0.2)] text-white text-xs focus:outline-none focus:border-[#50A8FF]"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-[10px] text-rose-400 mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-[#237BFF] to-[#1E62D0] hover:from-[#3A8BFF] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(35,123,255,0.4)] active:scale-95 transition-all cursor-pointer"
          >
            <span>
              {authMode === 'signin' && 'Sign In to AutoHub'}
              {authMode === 'signup' && 'Create Free Account'}
              {authMode === 'forgot' && 'Send Password Reset'}
            </span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* 1-Click Demo Login Button */}
        <div className="mt-4 pt-4 border-t border-[rgba(150,190,255,0.12)] text-center">
          <p className="text-[11px] text-[#71869D] mb-2">Want to test the app without typing?</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-[#173550] border border-[rgba(150,190,255,0.25)] text-[#50A8FF] hover:bg-[#237BFF] hover:text-white transition-all text-xs font-semibold flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={15} />
            <span>1-Click Verified Demo Login</span>
          </button>
        </div>

        {authMode === 'forgot' && (
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className="mt-4 text-center w-full text-xs text-[#50A8FF] hover:underline"
          >
            Back to Sign In
          </button>
        )}
      </div>

      <p className="text-[10px] text-center text-[#71869D]">
        By continuing, you agree to AutoHub's Terms of Service and Privacy Policy.
      </p>
    </div>
  );
};
