import React from 'react';
import { ArrowRight, Star, Flame, Sparkles } from 'lucide-react';

interface HeroProps {
  onReserveClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#111215]">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-terracotta-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gourmet Dining Experience</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Savor Every Moment <br />
              with <span className="terracotta-gradient-text italic">Every Bite</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-xl font-light leading-relaxed max-w-xl">
              Experience gourmet dining crafted with passion, fresh organic ingredients, and unforgettable Tanzanian coastal flavors.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={onReserveClick}
                className="terracotta-btn px-8 py-4 rounded-full text-xs uppercase tracking-widest flex items-center space-x-3 text-white font-bold"
              >
                <span>Reserve Your Table</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>

            {/* Quick Feature Pills (Matching Photo 2) */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="savorite-card p-3.5 rounded-2xl flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400">
                  <Star className="w-4 h-4 fill-terracotta-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Special Events</span>
                  <span className="text-[10px] text-slate-400 block">Private Celebrations</span>
                </div>
              </div>

              <div className="savorite-card p-3.5 rounded-2xl flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Chef's Experience</span>
                  <span className="text-[10px] text-slate-400 block">Tasting Menus</span>
                </div>
              </div>

              <div className="savorite-card p-3.5 rounded-2xl flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-terracotta-500/15 border border-terracotta-500/30 flex items-center justify-center text-terracotta-400">
                  <Flame className="w-4 h-4 text-terracotta-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Wood Grills</span>
                  <span className="text-[10px] text-slate-400 block">Acacia Smoked Cuts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Circular Black Plate Dish Spotlight (Matching Photo 2) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative group">
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E06D2B]/30 via-amber-500/20 to-transparent blur-2xl group-hover:scale-110 transition-transform duration-700" />

              {/* Main Circular Plate Container */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-black/80 shadow-2xl bg-black">
                <img
                  src="https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80"
                  alt="Crispy Glazed Honey Wings Spotlight"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
              </div>

              {/* Floating Handwritten Style Annotation Tag (Matching Photo 2) */}
              <div className="absolute -bottom-4 left-4 bg-black/90 border border-terracotta-500/40 backdrop-blur-xl p-3.5 rounded-2xl shadow-2xl flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-terracotta-500 text-white font-serif font-bold text-sm flex items-center justify-center">
                  #1
                </div>
                <div>
                  <span className="text-xs font-serif font-bold text-white block">Crispy Glazed Honey Wings</span>
                  <span className="text-[10px] text-terracotta-400 font-medium">Chef's Choice Recipe • ★ 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
