import React from 'react';
import ResultCard from './ResultCard';

export default function HotelResults({ hotels = [], onSelectHotel }) {
  if (!hotels.length) {
    return (
      <div className="text-center py-16 bg-white border border-[#F5E6D3] rounded-2xl p-8">
        <span className="text-3xl text-luxury-brown block mb-2">🏨</span>
        <h4 className="font-serif text-lg font-bold text-luxury-dark">No luxury sanctuaries found</h4>
        <p className="text-xs text-gray-500 mt-1">Try expanding your destination boundaries or dates.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hotels.map((hotel) => (
        <ResultCard
          key={hotel.id}
          title={hotel.name}
          subtitle={`${hotel.location} · ${hotel.roomType}`}
          badge="Palace Collection"
          price={hotel.pricePerNight}
          rating={hotel.rating}
          image={hotel.image}
          features={hotel.amenities || []}
          actionLabel="Reserve Suite"
          onAction={() => onSelectHotel && onSelectHotel(hotel)}
        >
          <div className="my-3 text-xs text-gray-600 flex items-center gap-3">
            <span className="bg-luxury-cream text-luxury-brown font-semibold px-2.5 py-1 rounded-md border border-luxury-beige text-[11px]">
              {hotel.freeCancellation}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500">{hotel.reviewCount} Member Reviews</span>
          </div>
        </ResultCard>
      ))}
    </div>
  );
}
