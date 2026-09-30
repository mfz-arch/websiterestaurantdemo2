import React from 'react';
import { MOCK_CHEFS } from '../data/mockData';
import { Award } from 'lucide-react';

export const ChefsSection: React.FC = () => {
  return (
    <section id="chefs" className="py-28 bg-[#111215] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Matching Photo 2) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Master Chefs</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Crafted by Experts
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            With decades of combined culinary excellence and Michelin-star backgrounds, our chefs transform fresh ingredients into gastronomic masterpieces.
          </p>
        </div>

        {/* 3 Chef Cards Grid (Matching Photo 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_CHEFS.map((chef) => (
            <div
              key={chef.id}
              className="savorite-card rounded-3xl overflow-hidden group flex flex-col justify-between"
            >
              <div>
                {/* Chef Photo (Monochrome / High Contrast) */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={chef.image}
                    alt={chef.name}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C24] via-transparent to-transparent opacity-90" />

                  {/* Specialty Tag */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-terracotta-500/40 text-terracotta-400 text-[10px] font-bold uppercase tracking-wider inline-block">
                      {chef.specialty}
                    </span>
                  </div>
                </div>

                {/* Chef Info */}
                <div className="p-6 text-center">
                  <h3 className="font-serif text-2xl font-bold text-white mb-1 group-hover:text-terracotta-400 transition-colors">
                    {chef.name}
                  </h3>
                  <span className="text-xs text-terracotta-400 font-semibold uppercase tracking-wider block mb-2">
                    {chef.role}
                  </span>
                  <p className="text-slate-400 text-xs font-light">
                    {chef.experience}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
