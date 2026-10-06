import React from 'react';

export default function HealthRequirements({ country = 'France' }) {
  return (
    <div className="bg-white border border-[#F5E6D3] rounded-2xl p-6 shadow-luxury space-y-4 text-left">
      <div className="flex items-center gap-2 border-b border-[#F5E6D3] pb-3">
        <span className="text-luxury-brown font-serif text-lg">✦</span>
        <h4 className="font-serif text-lg font-bold text-luxury-dark">
          Health & Medical Protocols: {country}
        </h4>
      </div>

      <div className="space-y-3 text-xs">
        <div className="p-3 bg-[#FFFAF0] rounded-xl border border-luxury-beige">
          <span className="font-bold text-luxury-brown block mb-1">Immunization Advisory</span>
          <p className="text-gray-600 leading-relaxed">
            Routine international vaccinations (MMR, DTP). No mandatory yellow fever or endemic certificates required for European & luxury Mediterranean resorts.
          </p>
        </div>

        <div className="p-3 bg-[#FFFAF0] rounded-xl border border-luxury-beige">
          <span className="font-bold text-luxury-brown block mb-1">Private Healthcare Concierge</span>
          <p className="text-gray-600 leading-relaxed">
            24/7 on-call English-speaking physicians and private hospital transfers guaranteed under Voyager Premier Shield.
          </p>
        </div>

        <div className="p-3 bg-[#FFFAF0] rounded-xl border border-luxury-beige">
          <span className="font-bold text-luxury-brown block mb-1">Drinking Water & Culinary Standards</span>
          <p className="text-gray-600 leading-relaxed">
            Pristine tap and mineral water safety standards at all partner palaces. Artisan mineral water (San Pellegrino / Evian) provided complimentary in suites.
          </p>
        </div>
      </div>
    </div>
  );
}
