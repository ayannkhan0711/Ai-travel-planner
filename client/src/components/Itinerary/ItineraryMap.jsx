import React from 'react';

export default function ItineraryMap({ destinations = [] }) {
  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 shadow-luxury overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#F5E6D3] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-luxury-brown font-serif">✦</span>
          <h4 className="font-serif text-base font-bold text-luxury-dark">
            Geographic Route & Scenic Corridor
          </h4>
        </div>
        <span className="text-xs text-gray-500">Live Satellite Elevation</span>
      </div>

      {/* Styled Interactive Route Map Visual */}
      <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#8B7355]/10 via-[#F5E6D3]/30 to-[#FFFAF0] border border-luxury-beige flex items-center justify-center p-6">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(#8B7355 1px, transparent 1px), radial-gradient(#8B7355 1px, #FAF3EB 1px)',
            backgroundSize: '24px 24px',
          }}
        ></div>

        {/* Route Pins & Connecting Golden Line */}
        <div className="relative z-10 w-full flex items-center justify-between px-4 sm:px-12">
          {destinations.map((dest, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-luxury-brown shadow-luxury flex items-center justify-center text-luxury-brown text-base font-serif font-bold group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              <span className="font-serif text-sm font-bold text-luxury-dark mt-2 block">
                {dest.city}
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                {dest.stayDurationDays || 3} Days Stay
              </span>
            </div>
          ))}
        </div>

        {/* Connecting Line Overlay */}
        <div className="absolute top-1/2 left-20 right-20 h-0.5 border-t-2 border-dashed border-luxury-gold -translate-y-4 pointer-events-none"></div>
      </div>
    </div>
  );
}
