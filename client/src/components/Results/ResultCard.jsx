import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export default function ResultCard({
  title,
  subtitle,
  badge,
  price,
  rating,
  image,
  features = [],
  actionLabel = 'Reserve & Add to Dossier',
  onAction,
  onCompare,
  isComparing = false,
  children,
}) {
  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all duration-300 flex flex-col md:flex-row group">
      {/* Visual Thumbnail */}
      {image && (
        <div className="md:w-72 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          {badge && (
            <span className="absolute top-3 left-3 bg-[#FFFAF0]/95 backdrop-blur-sm text-luxury-brown font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-luxury-beige shadow-sm">
              {badge}
            </span>
          )}
        </div>
      )}

      {/* Main Details Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 className="font-serif text-xl font-bold text-luxury-dark group-hover:text-luxury-brown transition-colors">
                {title}
              </h3>
              {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
            </div>

            {rating && (
              <div className="flex items-center gap-1 bg-[#FFFAF0] px-2.5 py-1 rounded-lg border border-luxury-beige">
                <span className="text-luxury-gold text-xs">★</span>
                <span className="text-xs font-bold text-luxury-dark">{rating}</span>
              </div>
            )}
          </div>

          {/* Children or Custom Slot (e.g. Flight times, Train stops) */}
          {children}

          {/* Feature Highlights */}
          {features.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {features.map((f, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-luxury-beigeLight text-luxury-brownDark px-2.5 py-1 rounded-md border border-luxury-beige/50"
                >
                  ✓ {f}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-semibold">
                Bespoke Fare
              </span>
              <span className="font-serif text-2xl font-bold text-luxury-brown">
                {formatCurrency(price)}
              </span>
              <span className="text-[11px] text-gray-400 ml-1">all-inclusive</span>
            </div>

            {onCompare && (
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer ml-4">
                <input
                  type="checkbox"
                  checked={isComparing}
                  onChange={onCompare}
                  className="rounded text-luxury-brown focus:ring-luxury-brown"
                />
                <span>Compare</span>
              </label>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onAction}
              className="w-full sm:w-auto btn-primary py-2.5 px-6 text-xs uppercase tracking-wider font-semibold"
            >
              {actionLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
