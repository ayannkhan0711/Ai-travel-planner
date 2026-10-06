import React from 'react';

export default function TravelAdvisories({ country = 'France' }) {
  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 shadow-luxury space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-[#F5E6D3] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-luxury-brown font-serif text-lg">✦</span>
          <h4 className="font-serif text-lg font-bold text-luxury-dark">
            Global Security Advisory: {country}
          </h4>
        </div>
        <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
          Level 1: Safe & Welcoming
        </span>
      </div>

      <div className="text-xs text-gray-600 space-y-2.5">
        <p className="leading-relaxed">
          {country} maintains optimal political stability and premier infrastructure for luxury leisure and private aviation.
        </p>
        <div className="p-3 bg-luxury-cream rounded-xl border border-luxury-beige">
          <span className="font-bold text-luxury-brown block mb-1">Executive Security Escorts</span>
          <p>
            Private close-protection details and bulletproof Maybach transports are available upon 30-minute notice via the Voyager Concierge Desk.
          </p>
        </div>
      </div>
    </div>
  );
}
