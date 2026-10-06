import React from 'react';

export default function SortOptions({ sortBy, setSortBy, totalResults = 0 }) {
  const options = [
    { id: 'recommended', label: 'Recommended Concierge Choice' },
    { id: 'price_asc', label: 'Lowest Fare' },
    { id: 'price_desc', label: 'Highest Tier / Prestige' },
    { id: 'duration', label: 'Fastest Travel Time' },
    { id: 'rating', label: 'Highest Member Rating' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#F5E6D3] rounded-2xl px-6 py-4 mb-6 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-luxury-brown font-serif">✦</span>
        <span className="text-sm font-semibold text-luxury-dark">
          {totalResults} Luxury Options Available
        </span>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs text-gray-500 font-medium">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-[#FFFAF0] border border-luxury-beige rounded-xl px-3 py-1.5 text-xs font-semibold text-luxury-brown focus:outline-none focus:ring-1 focus:ring-luxury-brown cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
