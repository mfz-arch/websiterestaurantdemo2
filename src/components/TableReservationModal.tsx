import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { Currency, MenuItem } from '../types/restaurant';
import { CheckCircle, Sparkles, User, Mail, Phone, Lock, Calendar, ArrowRight, UserPlus, LogIn, Edit2 } from 'lucide-react';

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  preSelectedDish?: MenuItem | null;
  currentUser: UserProfile | null;
  onLoginSuccess: (user: UserProfile) => void;
  initialStep?: 1 | 2;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  currency,
  preSelectedDish,
  currentUser,
  onLoginSuccess,
  initialStep
}) => {
  // Wizard Step: 1 = Account Setup, 2 = Booking & Payment, 3 = Confirmation
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');

  // Step 1: User Account State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Reservation & Payment Details
  const [date, setDate] = useState('2026-09-30');
  const [time, setTime] = useState('19:30');
  const [guestsCount, setGuestsCount] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'tigopesa' | 'airtel' | 'card'>('mpesa');
  const [specialNotes, setSpecialNotes] = useState('');

  // Confirmation
  const [reservationCode, setReservationCode] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (currentUser) {
        setStep(2);
        setFullName(currentUser.name);
        setEmail(currentUser.email);
        setPhone(currentUser.phone);
      } else {
        setStep(initialStep || 1);
      }
    }
  }, [isOpen, currentUser, initialStep]);

  if (!isOpen) return null;

  // Step 1 Handler: Create Account or Sign In
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const profile: UserProfile = {
      name: fullName || (email.split('@')[0] ? email.split('@')[0] : 'Valued Patron'),
      email: email,
      phone: phone || '+255 700 000 000',
    };
    onLoginSuccess(profile);
    setStep(2);
  };

  // Step 2 Handler: Reserve Table & Payment
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'SAV-' + Math.floor(100000 + Math.random() * 900000);
    setReservationCode(code);
    setStep(3);

    // Fire celebratory confetti effect
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  const formatDepositPrice = (usdAmount: number) => {
    if (currency === 'TZS') {
      const tzs = Math.round(usdAmount * 2600);
      return `TZS ${tzs.toLocaleString()}`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  const activeGuestName = currentUser?.name || fullName || 'Valued Patron';
  const activeGuestPhone = currentUser?.phone || phone || 'Mobile Verified';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="savorite-card max-w-2xl w-full rounded-3xl overflow-hidden border border-terracotta-500/40 p-6 sm:p-8 relative shadow-2xl my-8 animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all"
        >
          ✕
        </button>

        {/* Wizard Progress Indicator */}
        {step !== 3 && (
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div
              className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                step === 1
                  ? 'bg-terracotta-500 text-white font-bold shadow-md'
                  : 'bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/40'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">1</span>
              <span>Account Setup</span>
            </div>
            <span className="text-terracotta-500/40">→</span>
            <div
              className={`flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full transition-all ${
                step === 2
                  ? 'bg-terracotta-500 text-white font-bold shadow-md'
                  : 'bg-white/5 text-slate-400 border border-white/10'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/30 flex items-center justify-center text-[10px]">2</span>
              <span>Table & Payment</span>
            </div>
          </div>
        )}

        {/* STEP 1: Account Creation / Sign In */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-terracotta-400 text-xs font-semibold uppercase tracking-widest block mb-1">
                Step 1 of 2 — Member Verification
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {authMode === 'signup' ? 'Create Guest Account' : 'Sign In to Savorite'}
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                {authMode === 'signup'
                  ? 'Please provide your contact details to secure table reservations and SMS vouchers.'
                  : 'Welcome back! Sign in to access your saved reservation details.'}
              </p>
            </div>

            {/* Auth Mode Selector */}
            <div className="flex bg-[#111215] border border-white/10 rounded-full p-1 mb-6 max-w-xs mx-auto text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-1.5 rounded-full transition-all duration-300 flex items-center justify-center space-x-1 ${
                  authMode === 'signup'
                    ? 'bg-terracotta-500 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-1.5 rounded-full transition-all duration-300 flex items-center justify-center space-x-1 ${
                  authMode === 'signin'
                    ? 'bg-terracotta-500 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-lg mx-auto">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-terracotta-500/70 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Aim'fiz Ibrahim"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#111215] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-terracotta-500/70 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="aimfiz@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  />
                </div>
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Phone Number (M-Pesa / SMS Notification)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-terracotta-500/70 absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+255 774 000 999"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#111215] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-terracotta-500/70 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="terracotta-btn w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl flex items-center justify-center space-x-2 mt-4"
              >
                <span>{authMode === 'signup' ? 'Save & Continue to Reservation' : 'Sign In & Continue'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Reservation & Payment Info */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-terracotta-400 text-xs font-semibold uppercase tracking-widest block mb-1">
                Step 2 of 2 — Table & Payment Details
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Reserve Your Dining Table
              </h2>
              {preSelectedDish && (
                <div className="mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-300 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>Selected Dish: <strong>{preSelectedDish.name}</strong></span>
                </div>
              )}
            </div>

            {/* Authenticated Guest Profile Bar */}
            <div className="bg-[#111215] border border-terracotta-500/30 rounded-2xl p-3.5 mb-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-terracotta-500/20 text-terracotta-400 flex items-center justify-center font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center space-x-2">
                    <span>{activeGuestName}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Verified Member
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {activeGuestPhone} • {currentUser?.email || email}
                  </div>
                </div>
              </div>

              {!currentUser && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-terracotta-400 hover:underline flex items-center space-x-1"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* Date, Time & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-terracotta-500/70 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#111215] border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  >
                    <option value="18:30">18:30 PM (Dinner Slot)</option>
                    <option value="19:30">19:30 PM (Prime Hour)</option>
                    <option value="20:30">20:30 PM (Night Tasting)</option>
                    <option value="21:30">21:30 PM (Late Lounge)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Party Size
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Special Requests or Seating Preference
                </label>
                <input
                  type="text"
                  placeholder="e.g. Birthday dessert setup, window booth preference"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full bg-[#111215] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                />
              </div>

              {/* Deposit Guarantee */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-300 uppercase">
                    Table Guarantee Deposit
                  </span>
                  <span className="text-sm font-serif font-bold text-terracotta-400">
                    {formatDepositPrice(25)}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      paymentMethod === 'mpesa'
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-400'
                        : 'bg-[#111215] border-white/10 text-slate-400'
                    }`}
                  >
                    📱 M-Pesa
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tigopesa')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      paymentMethod === 'tigopesa'
                        ? 'bg-blue-950/60 border-blue-500 text-blue-400'
                        : 'bg-[#111215] border-white/10 text-slate-400'
                    }`}
                  >
                    📱 Tigo Pesa
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('airtel')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      paymentMethod === 'airtel'
                        ? 'bg-red-950/60 border-red-500 text-red-400'
                        : 'bg-[#111215] border-white/10 text-slate-400'
                    }`}
                  >
                    📱 Airtel Money
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-terracotta-500/20 border-terracotta-500 text-terracotta-400'
                        : 'bg-[#111215] border-white/10 text-slate-400'
                    }`}
                  >
                    💳 Visa / Card
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="terracotta-btn w-full py-4 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Confirm & Pay Deposit ({formatDepositPrice(25)})</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Confirmation Screen */}
        {step === 3 && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-terracotta-500/20 border border-terracotta-500 text-terracotta-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 animate-bounce" />
            </div>

            <span className="text-terracotta-400 text-xs font-semibold uppercase tracking-widest block mb-1">
              Reservation Guaranteed
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Welcome to Savorite, {activeGuestName}!
            </h3>
            <p className="text-slate-300 text-xs font-light max-w-md mx-auto mb-6">
              A SMS confirmation & electronic voucher have been dispatched to <strong>{activeGuestPhone}</strong>.
            </p>

            {/* VIP Pass Voucher Ticket */}
            <div className="bg-[#111215] border border-terracotta-500/40 rounded-2xl p-6 max-w-md mx-auto text-left shadow-2xl relative overflow-hidden mb-6">
              <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
                <div>
                  <span className="text-[10px] text-terracotta-400 font-bold tracking-widest uppercase block">
                    SAVORITE VIP VOUCHER
                  </span>
                  <span className="text-lg font-serif font-bold text-white">
                    Gourmet Table Reservation
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">CODE</span>
                  <span className="font-mono text-sm font-bold text-terracotta-400">{reservationCode}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs mb-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Date & Time</span>
                  <span className="font-semibold text-slate-200">{date} at {time}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Party Size</span>
                  <span className="font-semibold text-slate-200">{guestsCount} Guests</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-dashed border-white/20">
                <span className="text-[10px] text-slate-400">Verified ({paymentMethod.toUpperCase()})</span>
                <span className="text-xs font-bold text-emerald-400">✅ Deposit Secured</span>
              </div>
            </div>

            <button
              onClick={() => {
                setStep(currentUser ? 2 : 1);
                onClose();
              }}
              className="terracotta-btn px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold"
            >
              Done & Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

