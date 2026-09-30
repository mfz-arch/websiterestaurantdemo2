import React from 'react';
import { MOCK_REVIEWS } from '../data/mockData';
import { Star, MessageSquare } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-28 bg-[#111215] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Matching Photo 2) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-terracotta-500/15 border border-terracotta-500/30 text-terracotta-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Guest Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Praise from Our Patrons
          </h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed">
            Read authentic reviews from guests who experienced fine dining at Savorite.
          </p>
        </div>

        {/* 3 Review Cards Grid (Matching Photo 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="savorite-card p-6 rounded-3xl flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center space-x-1 text-terracotta-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-terracotta-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm font-light leading-relaxed mb-6 italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Guest Profile */}
              <div className="flex items-center space-x-3 pt-4 border-t border-white/10">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover border border-terracotta-500/40"
                />
                <div>
                  <span className="font-serif font-bold text-white text-sm block">
                    {review.name}
                  </span>
                  <span className="text-[10px] text-terracotta-400 uppercase font-medium block">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
