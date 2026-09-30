import React, { useState } from 'react';
import { MOCK_MENU } from '../data/mockData';
import type { MenuItem, Currency } from '../types/restaurant';
import { ShoppingBag } from 'lucide-react';

interface DishesShowcaseProps {
  currency: Currency;
  onSelectDishForBooking: (dish: MenuItem) => void;
}

export const DishesShowcase: React.FC<DishesShowcaseProps> = ({
  currency,
  onSelectDishForBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Dishes' },
    { id: 'mains', label: 'Signature Mains' },
    { id: 'starters', label: 'Starters' },
    { id: 'desserts', label: 'Desserts' },
    { id: 'cocktails', label: 'Cocktails' },
  ];

  const filteredItems = activeCategory === 'all'
    ? MOCK_MENU
    : MOCK_MENU.filter((item) => item.category === activeCategory);

  const formatPrice = (item: MenuItem) => {
    if (currency === 'TZS') {
      return `TZS ${item.priceTZS.toLocaleString()}`;
    }
    return `$${item.priceUSD.toFixed(2)}`;
  };

  return (
    <section id="menu" className="py-28 bg-[#111215] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Matching Photo 2) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-terracotta-400 text-xs font-semibold uppercase tracking-widest block mb-2">
              Our Fine Menu Selection
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Indulge in Culinary Artistry
            </h2>
          </div>
          <p className="text-slate-400 text-sm font-light max-w-md">
            Explore our finest selection of gourmet dishes, carefully crafted by world-class chefs using fresh organic catch and local spices.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-4 mb-14 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-terracotta-500 text-white shadow-lg shadow-terracotta-500/30'
                  : 'bg-[#1A1C24] text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Circular Plate Dish Cards Grid (Matching Photo 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((dish) => (
            <div
              key={dish.id}
              className="savorite-card rounded-3xl p-6 relative flex flex-col justify-between group"
            >
              <div>
                {/* Circular Dish Image Spotlight */}
                <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-black/60 shadow-2xl mx-auto mb-6 bg-black">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Dietary Tags */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                  {dish.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] font-semibold text-terracotta-400 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Dish Name */}
                <h3 className="font-serif text-2xl font-bold text-white text-center mb-2 group-hover:text-terracotta-400 transition-colors">
                  {dish.name}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-xs font-light text-center leading-relaxed mb-6 line-clamp-3">
                  {dish.description}
                </p>
              </div>

              {/* Price & Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-semibold">Price</span>
                  <span className="font-serif font-bold text-lg text-white">
                    {formatPrice(dish)}
                  </span>
                </div>

                <button
                  onClick={() => onSelectDishForBooking(dish)}
                  className="terracotta-btn px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Order</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
