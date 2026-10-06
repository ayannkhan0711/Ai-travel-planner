import React from 'react';
import ResultCard from './ResultCard';

export default function BusResults({ buses = [], onSelectBus }) {
  if (!buses.length) return null;

  return (
    <div className="space-y-6">
      {buses.map((bus) => (
        <ResultCard
          key={bus.id}
          title={bus.name}
          subtitle={`${bus.operator} · ${bus.busType}`}
          badge="VIP Cruiser"
          price={bus.price}
          rating={bus.rating}
          features={bus.amenities || []}
          actionLabel="Select Cruiser Seat"
          onAction={() => onSelectBus && onSelectBus(bus)}
        >
          <div className="my-3 flex items-center justify-between text-xs text-gray-600 bg-[#FFFAF0] p-3 rounded-xl border border-luxury-beige">
            <span>Departure: <strong>{bus.departureTime}</strong></span>
            <span>Duration: <strong>{bus.duration}</strong></span>
            <span>Arrival: <strong>{bus.arrivalTime}</strong></span>
          </div>
        </ResultCard>
      ))}
    </div>
  );
}
