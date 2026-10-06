import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MultiModalSearch({ onSearch, initialTab = 'all' }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [origin, setOrigin] = useState('New York (JFK)');
  const [destination, setDestination] = useState('Hernur Riviera');
  const [departureDate, setDepartureDate] = useState('2026-11-20');
  const [returnDate, setReturnDate] = useState('2026-11-27');
  const [passengers, setPassengers] = useState(2);
  const [cabinClass, setCabinClass] = useState('First Class Suite');

  const tabs = [
    { id: 'all', label: 'All-In-One Unified', icon: '✦', desc: 'Rome2Rio Door-to-Door Journey' },
    { id: 'flights', label: 'Flights', icon: '✈', desc: 'Private & First Class Commercial' },
    { id: 'hotels', label: 'Palaces & Suites', icon: '🏨', desc: '5-Star Historic Sanctuaries' },
    { id: 'trains', label: 'Palace Rail', icon: '🚆', desc: 'Orient-Express & High-Speed Executive' },
    { id: 'taxis', label: 'Private Chauffeur', icon: '🚗', desc: 'Maybach & Rolls-Royce Transfers' },
    { id: 'buses', label: 'Royale Cruiser', icon: '🚌', desc: 'VIP Sleeper Capsule Coaches' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const query = {
      tab: activeTab,
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
      cabinClass,
    };

    if (onSearch) {
      onSearch(query);
    } else {
      const targetTab = activeTab === 'all' ? 'flights' : activeTab;
      navigate(`/results?from=${encodeURIComponent(origin)}&to=${encodeURIComponent(destination)}&date=${departureDate}&tab=${targetTab}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-[#F5E6D3] rounded-3xl shadow-2xl p-6 sm:p-8 transition-all">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F5E6D3] pb-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? 'bg-luxury-brown text-white shadow-luxury scale-105'
                    : 'bg-[#FFFAF0] text-luxury-brown hover:bg-luxury-beige'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="hidden md:flex items-center text-xs text-luxury-brown font-medium">
          <span className="text-luxury-gold mr-1">✦</span>
          Instant Multi-Modal Route Optimization
        </div>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Origin */}
          <div className="relative bg-[#FFFAF0] rounded-2xl p-3 border border-luxury-beige focus-within:border-luxury-brown transition-colors">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-luxury-brownLight mb-1">
              {activeTab === 'hotels' ? 'Destination City' : 'Departure Point'}
            </label>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. New York, London, Paris"
              className="w-full bg-transparent text-sm font-semibold text-luxury-dark focus:outline-none placeholder:text-gray-400"
              required
            />
            <span className="absolute right-3 top-4 text-luxury-brown text-xs">⌖</span>
          </div>

          {/* Destination */}
          <div className="relative bg-[#FFFAF0] rounded-2xl p-3 border border-luxury-beige focus-within:border-luxury-brown transition-colors">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-luxury-brownLight mb-1">
              {activeTab === 'hotels' ? 'Property / Sanctuary' : 'Destination'}
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Hernur, Panling, Paris"
              className="w-full bg-transparent text-sm font-semibold text-luxury-dark focus:outline-none placeholder:text-gray-400"
              required
            />
            <span className="absolute right-3 top-4 text-luxury-brown text-xs">✦</span>
          </div>

          {/* Departure Date */}
          <div className="bg-[#FFFAF0] rounded-2xl p-3 border border-luxury-beige focus-within:border-luxury-brown transition-colors">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-luxury-brownLight mb-1">
              Dates
            </label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-luxury-dark focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Guests / Class */}
          <div className="bg-[#FFFAF0] rounded-2xl p-3 border border-luxury-beige focus-within:border-luxury-brown transition-colors">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-luxury-brownLight mb-1">
              Travelers & Class
            </label>
            <div className="flex items-center justify-between text-xs font-semibold text-luxury-dark">
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="bg-transparent focus:outline-none cursor-pointer font-semibold text-xs"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests (Suite)</option>
                <option value={4}>4 Guests (VIP)</option>
                <option value={6}>6+ (Private Charter)</option>
              </select>
              <select
                value={cabinClass}
                onChange={(e) => setCabinClass(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer text-xs font-semibold text-luxury-brown"
              >
                <option value="First Class Suite">First Suite</option>
                <option value="Private Jet">Private Jet</option>
                <option value="Business Class">Business</option>
              </select>
            </div>
          </div>

        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Quick Pre-Selected Luxury Destination Badges */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-luxury-brown">
            <span className="text-[11px] font-medium text-gray-500 mr-1">Trending:</span>
            {['Hernur Riviera', 'Panling Atoll', 'Famling Estate', 'Vouke Chalet', 'Paride'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDestination(d)}
                className="px-2.5 py-1 rounded-full bg-luxury-beige/40 hover:bg-luxury-beige text-[11px] font-medium text-luxury-brown transition-colors"
              >
                {d}
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto btn-gold px-8 py-3.5 text-sm uppercase tracking-widest font-semibold text-white flex items-center justify-center gap-2"
          >
            <span>Search Luxury Itinerary</span>
            <span>➔</span>
          </button>
        </div>
      </form>
    </div>
  );
}
