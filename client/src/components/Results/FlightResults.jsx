import React from 'react';
import ResultCard from './ResultCard';

export default function FlightResults({ flights = [], onSelectFlight }) {
  if (!flights.length) {
    return (
      <div className="text-center py-16 bg-white border border-[#F5E6D3] rounded-2xl p-8">
        <span className="text-3xl text-luxury-brown block mb-2">✈</span>
        <h4 className="font-serif text-lg font-bold text-luxury-dark">No flights matching criteria</h4>
        <p className="text-xs text-gray-500 mt-1">Please try adjusting your departure dates or airport hubs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {flights.map((flight) => (
        <ResultCard
          key={flight.id}
          title={flight.airline}
          subtitle={`${flight.aircraft} · Flight ${flight.flightNumber}`}
          badge={flight.stops === 0 ? 'Direct Non-Stop' : `${flight.stops} VIP Transfer`}
          price={flight.price}
          rating="4.98"
          image={flight.logo}
          features={flight.features || []}
          actionLabel="Reserve Suite"
          onAction={() => onSelectFlight && onSelectFlight(flight)}
        >
          {/* Flight Path Segment Graphic */}
          <div className="my-4 bg-[#FFFAF0] border border-[#F5E6D3] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Origin */}
            <div className="text-center sm:text-left">
              <span className="font-serif text-2xl font-bold text-luxury-dark">
                {flight.origin?.code || 'JFK'}
              </span>
              <p className="text-xs font-semibold text-luxury-brown">{flight.origin?.time || '10:30'}</p>
              <p className="text-[11px] text-gray-500">{flight.origin?.city || 'Origin'}</p>
              <span className="text-[10px] text-luxury-brownLight font-medium">{flight.origin?.terminal}</span>
            </div>

            {/* Path duration */}
            <div className="flex-1 flex flex-col items-center px-4 max-w-xs w-full">
              <span className="text-[11px] text-gray-500 font-semibold mb-1">{flight.duration}</span>
              <div className="w-full flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-luxury-brown"></div>
                <div className="flex-1 border-t-2 border-dashed border-luxury-brown"></div>
                <span className="text-luxury-brown text-sm">✦</span>
                <div className="flex-1 border-t-2 border-dashed border-luxury-brown"></div>
                <div className="w-2 h-2 rounded-full bg-luxury-brown"></div>
              </div>
              <span className="text-[10px] text-gray-400 mt-1">{flight.stopDetails}</span>
            </div>

            {/* Destination */}
            <div className="text-center sm:text-right">
              <span className="font-serif text-2xl font-bold text-luxury-dark">
                {flight.destination?.code || 'CDG'}
              </span>
              <p className="text-xs font-semibold text-luxury-brown">{flight.destination?.time || '18:45'}</p>
              <p className="text-[11px] text-gray-500">{flight.destination?.city || 'Destination'}</p>
              <span className="text-[10px] text-luxury-brownLight font-medium">{flight.destination?.terminal}</span>
            </div>
          </div>
        </ResultCard>
      ))}
    </div>
  );
}
