import React from 'react';

export default function SearchFilters({ filters, setFilters, onApply }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 shadow-luxury space-y-6">
      <div className="flex items-center justify-between border-b border-[#F5E6D3] pb-3">
        <h3 className="font-serif text-base font-semibold text-luxury-dark">
          Refine Selection
        </h3>
        <button
          onClick={() =>
            setFilters({
              maxPrice: 8000,
              nonStopOnly: false,
              cabinClass: 'all',
              carrier: 'all',
              ratingMin: 4.5,
            })
          }
          className="text-xs text-luxury-brown hover:underline font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Max Budget Slider */}
      <div>
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          <span className="text-gray-600">Maximum Fare</span>
          <span className="text-luxury-brown font-bold text-sm">
            ${filters.maxPrice?.toLocaleString() || '8,000'}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="15000"
          step="250"
          value={filters.maxPrice || 8000}
          onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
          className="w-full accent-luxury-brown cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>$500</span>
          <span>$15,000+</span>
        </div>
      </div>

      {/* Direct / Non-Stop */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold text-gray-700">Journey Preferences</label>
        <label className="flex items-center gap-2.5 text-xs text-luxury-dark cursor-pointer">
          <input
            type="checkbox"
            checked={filters.nonStopOnly || false}
            onChange={(e) => handleChange('nonStopOnly', e.target.checked)}
            className="w-4 h-4 rounded text-luxury-brown focus:ring-luxury-brown"
          />
          <span>Non-Stop & Direct Only</span>
        </label>
        <label className="flex items-center gap-2.5 text-xs text-luxury-dark cursor-pointer">
          <input
            type="checkbox"
            checked={filters.privateChauffeurIncluded || false}
            onChange={(e) => handleChange('privateChauffeurIncluded', e.target.checked)}
            className="w-4 h-4 rounded text-luxury-brown focus:ring-luxury-brown"
          />
          <span>Includes Chauffeur VIP Transfer</span>
        </label>
      </div>

      {/* Cabin Class */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Cabin / Tier</label>
        <div className="space-y-1.5">
          {['all', 'First Class Suite', 'Private Jet / Helipad', 'Business Premier'].map((tier) => (
            <label key={tier} className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
              <input
                type="radio"
                name="cabinTier"
                value={tier}
                checked={(filters.cabinClass || 'all') === tier}
                onChange={() => handleChange('cabinClass', tier)}
                className="text-luxury-brown focus:ring-luxury-brown"
              />
              <span className="capitalize">{tier === 'all' ? 'All Luxury Tiers' : tier}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Palace Rating</label>
        <div className="flex items-center gap-2">
          {[4.5, 4.8, 4.9].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleChange('ratingMin', star)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                filters.ratingMin === star
                  ? 'bg-luxury-brown text-white border-luxury-brown'
                  : 'bg-[#FFFAF0] text-luxury-brown border-luxury-beige hover:border-luxury-brown'
              }`}
            >
              ★ {star}+
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Carriers */}
      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-2">Partner Carriers</label>
        <select
          value={filters.carrier || 'all'}
          onChange={(e) => handleChange('carrier', e.target.value)}
          className="w-full bg-[#FFFAF0] border border-luxury-beige rounded-xl p-2.5 text-xs text-luxury-dark focus:outline-none focus:ring-1 focus:ring-luxury-brown cursor-pointer"
        >
          <option value="all">All Premier Carriers</option>
          <option value="Emirates">Emirates First A380</option>
          <option value="Singapore Airlines">Singapore Airlines Suites</option>
          <option value="Qatar Airways">Qatar Airways Qsuite / First</option>
          <option value="Air France">Air France La Première</option>
          <option value="VistaJet">VistaJet Private Fleet</option>
        </select>
      </div>

      {onApply && (
        <button
          onClick={onApply}
          className="w-full btn-primary py-2.5 text-xs uppercase tracking-wider font-semibold"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}
