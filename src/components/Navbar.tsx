import React, { useState, useEffect } from 'react';
import type { Currency } from '../types/restaurant';
import { Calendar, UtensilsCrossed, User, LogOut, UserPlus } from 'lucide-react';

interface NavbarProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  onOpenReservation: () => void;
  onOpenAuth: (mode?: 'signin' | 'signup') => void;
  userName: string | null;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  setCurrency,
  onOpenReservation,
  onOpenAuth,
  userName,
  onSignOut,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#111215]/95 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Savorite */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D95A1E] to-[#F18A4F] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-serif text-2xl tracking-tight font-bold text-white block leading-none">
              Savorite
            </span>
            <span className="text-[9px] tracking-[0.25em] text-terracotta-400 font-sans uppercase">
              Culinary Artistry
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-semibold">
          <a href="#hero" className="text-slate-300 hover:text-terracotta-400 transition-colors">
            Home
          </a>
          <a href="#menu" className="text-slate-300 hover:text-terracotta-400 transition-colors">
            Menu
          </a>
          <a href="#chefs" className="text-slate-300 hover:text-terracotta-400 transition-colors">
            Experts
          </a>
          <a href="#reviews" className="text-slate-300 hover:text-terracotta-400 transition-colors">
            Patrons
          </a>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          {/* Currency Switcher */}
          <div className="flex items-center bg-[#1A1C24] border border-white/10 rounded-full p-1 text-xs font-semibold">
            <button
              onClick={() => setCurrency('TZS')}
              className={`px-3 py-1 rounded-full transition-all duration-300 ${
                currency === 'TZS'
                  ? 'bg-terracotta-500 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              TZS
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-full transition-all duration-300 ${
                currency === 'USD'
                  ? 'bg-terracotta-500 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              USD
            </button>
          </div>

          {/* User Sign In / Sign Up Button or Member Badge */}
          {userName ? (
            <div className="flex items-center space-x-2 bg-[#1A1C24] border border-terracotta-500/40 rounded-full px-3.5 py-1.5 text-xs text-white">
              <User className="w-3.5 h-3.5 text-terracotta-400" />
              <span className="font-bold">{userName}</span>
              <button
                onClick={onSignOut}
                title="Sign Out"
                className="ml-1 text-slate-400 hover:text-rose-400 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="hidden lg:flex items-center space-x-1.5 px-3.5 py-2 rounded-full border border-white/15 bg-[#1A1C24] hover:bg-white/10 text-xs font-semibold text-slate-200 transition-all"
              >
                <User className="w-3.5 h-3.5 text-terracotta-400" />
                <span>Sign In</span>
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-full border border-terracotta-500/40 bg-terracotta-500/10 hover:bg-terracotta-500/20 text-xs font-semibold text-terracotta-300 transition-all"
              >
                <UserPlus className="w-3.5 h-3.5 text-terracotta-400" />
                <span>Create Account</span>
              </button>
            </div>
          )}

          {/* Reserve Table Button */}
          <button
            onClick={onOpenReservation}
            className="terracotta-btn px-4 sm:px-5 py-2.5 rounded-full text-xs uppercase tracking-wider flex items-center space-x-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve Table</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

