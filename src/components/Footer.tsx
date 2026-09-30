import React from 'react';
import { MapPin, Phone, Mail, UtensilsCrossed, Smartphone, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#0B0C0E] border-t border-white/10 pt-20 pb-12 relative overflow-hidden text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          {/* Column 1: Brand Intro */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-terracotta-500 flex items-center justify-center text-white">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-serif text-3xl font-bold tracking-tight text-white">
                Savorite
              </span>
            </div>

            <p className="text-sm text-slate-400 font-light leading-relaxed max-w-md">
              Savor every moment with every bite. Gourmet culinary artistry crafted with fresh organic ingredients and passion.
            </p>

            <div className="space-y-3 text-sm font-light">
              <div className="flex items-start space-x-3 text-slate-300">
                <MapPin className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                <span>Culinary Avenue, Gourmet Square, Main City</span>
              </div>

              <div className="flex items-center space-x-3 text-slate-300">
                <Phone className="w-5 h-5 text-terracotta-400 shrink-0" />
                <span className="font-mono text-terracotta-300">+255 774 000 999 / +255 22 212 9999</span>
              </div>

              <div className="flex items-center space-x-3 text-slate-300">
                <Mail className="w-5 h-5 text-terracotta-400 shrink-0" />
                <span>reservations@savorite.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Hours */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-widest text-terracotta-400">
              Opening Hours
            </h4>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Monday — Thursday</span>
                <span className="font-semibold text-white">12:00 PM — 23:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Friday — Saturday</span>
                <span className="font-semibold text-terracotta-400">12:00 PM — 01:00 AM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Sunday Brunch</span>
                <span className="font-semibold text-white">11:30 AM — 22:30 PM</span>
              </div>
            </div>
          </div>

          {/* Column 3: Payment Options */}
          <div className="lg:col-span-4 space-y-5">
            <h4 className="font-serif text-base font-bold text-white uppercase tracking-widest text-terracotta-400">
              Accepted Payment Systems
            </h4>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              <span className="px-3 py-2 rounded-xl bg-[#1A1C24] border border-emerald-500/30 text-emerald-400 flex items-center space-x-2">
                <Smartphone className="w-3.5 h-3.5" />
                <span>M-Pesa</span>
              </span>
              <span className="px-3 py-2 rounded-xl bg-[#1A1C24] border border-blue-500/30 text-blue-400 flex items-center space-x-2">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Tigo Pesa</span>
              </span>
              <span className="px-3 py-2 rounded-xl bg-[#1A1C24] border border-red-500/30 text-red-400 flex items-center space-x-2">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Airtel Money</span>
              </span>
              <span className="px-3 py-2 rounded-xl bg-[#1A1C24] border border-terracotta-500/30 text-terracotta-400 flex items-center space-x-2">
                <CreditCard className="w-3.5 h-3.5" />
                <span>Visa / Card</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <span>© 2026 Savorite Gourmet Dining. All Rights Reserved.</span>
          <span className="text-terracotta-400 font-medium mt-2 sm:mt-0">
            Crafted by Aim'fiz Ibrahim (Quant & Full-Stack Developer)
          </span>
        </div>
      </div>
    </footer>
  );
};
