import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { Currency, MenuItem } from '../types/restaurant';
import { CheckCircle, Sparkles } from 'lucide-react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  preSelectedDish?: MenuItem | null;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  currency,
  preSelectedDish
}) => {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-09-30');
  const [time, setTime] = useState('19:30');
  const [guestsCount, setGuestsCount] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'tigopesa' | 'airtel' | 'card'>('mpesa');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [reservationCode, setReservationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'SAV-' + Math.floor(100000 + Math.random() * 900000);
    setReservationCode(code);
    setIsConfirmed(true);

    confetti({
      particleCount: 80,
      spread: 70,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="savorite-card max-w-2xl w-full rounded-3xl overflow-hidden border border-terracotta-500/40 p-6 sm:p-8 relative shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-all"
        >
          ✕
        </button>

        {!isConfirmed ? (
          <div>
            <div className="text-center mb-6">
              <span className="text-terracotta-400 text-xs font-semibold uppercase tracking-widest block mb-1">
                Savorite VIP Reservation
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Reserve Your Table Today
              </h2>
              {preSelectedDish && (
                <div className="mt-2 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-300 text-xs font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-terracotta-400" />
                  <span>Selected Dish: <strong>{preSelectedDish.name}</strong></span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Date, Time & Guests Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  />
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
                    Guests
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

              {/* Guest Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Aim'fiz Ibrahim"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+255 77... / M-Pesa"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="guest@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111215] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-terracotta-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                  Special Requests
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
                    Table Deposit Guarantee
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
                className="terracotta-btn w-full py-4 rounded-xl text-xs uppercase tracking-widest font-bold shadow-xl"
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-terracotta-500/20 border border-terracotta-500 text-terracotta-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-9 h-9 animate-bounce" />
            </div>

            <span className="text-terracotta-400 text-xs font-semibold uppercase tracking-widest block mb-1">
              Reservation Guaranteed
            </span>
            <h3 className="text-2xl font-serif font-bold text-white mb-2">
              Welcome to Savorite, {guestName}!
            </h3>
            <p className="text-slate-300 text-xs font-light max-w-md mx-auto mb-6">
              A SMS confirmation has been sent to <strong>{phone}</strong>. Present your VIP voucher code upon arrival.
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
                setIsConfirmed(false);
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
