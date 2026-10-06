import React from 'react';
import ResultCard from './ResultCard';

export default function TaxiResults({ taxis = [], onSelectTaxi }) {
  if (!taxis.length) return null;

  return (
    <div className="space-y-6">
      {taxis.map((taxi) => (
        <ResultCard
          key={taxi.id}
          title={taxi.vehicleModel}
          subtitle={`${taxi.provider} · ${taxi.vehicleClass}`}
          badge={taxi.capacity}
          price={taxi.price}
          rating={taxi.rating}
          features={taxi.features || []}
          actionLabel="Reserve Chauffeur"
          onAction={() => onSelectTaxi && onSelectTaxi(taxi)}
        >
          <div className="my-3 p-3 bg-luxury-cream rounded-xl border border-luxury-beige text-xs text-luxury-brown font-medium flex items-center gap-2">
            <span>✦</span>
            <span>Chauffeur: {taxi.chauffeur}</span>
          </div>
        </ResultCard>
      ))}
    </div>
  );
}
