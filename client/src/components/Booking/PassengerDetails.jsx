import React from 'react';

export default function PassengerDetails({ passengers, onChange }) {
  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F5E6D3] pb-3">
        <h4 className="font-serif text-lg font-bold text-luxury-dark">
          Traveler Dossier & Passenger Manifest
        </h4>
        <p className="text-xs text-gray-500">
          Required for aviation border pre-clearance and VIP terminal escort.
        </p>
      </div>

      {passengers.map((p, idx) => (
        <div key={idx} className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-luxury-brown">
              Primary Traveler #{idx + 1}
            </span>
            <span className="text-[11px] bg-white border border-luxury-beige text-luxury-dark px-2.5 py-0.5 rounded-full font-medium">
              Suite Allocated: {p.seat || '01A'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                First Name (as on Passport)
              </label>
              <input
                type="text"
                value={p.firstName}
                onChange={(e) => updatePassenger(idx, 'firstName', e.target.value)}
                className="w-full bg-white border border-[#E8DCCF] rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-luxury-brown"
                placeholder="Julian"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={p.lastName}
                onChange={(e) => updatePassenger(idx, 'lastName', e.target.value)}
                className="w-full bg-white border border-[#E8DCCF] rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-luxury-brown"
                placeholder="Vanderbilt"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                Passport / ID Document Number
              </label>
              <input
                type="text"
                value={p.passportNumber}
                onChange={(e) => updatePassenger(idx, 'passportNumber', e.target.value)}
                className="w-full bg-white border border-[#E8DCCF] rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-luxury-brown"
                placeholder="USA-9921004"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                Suite / Seat Preference
              </label>
              <select
                value={p.seat || '01A'}
                onChange={(e) => updatePassenger(idx, 'seat', e.target.value)}
                className="w-full bg-white border border-[#E8DCCF] rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-luxury-brown cursor-pointer"
              >
                <option value="01A">Suite 01A (Window Port)</option>
                <option value="01K">Suite 01K (Window Starboard)</option>
                <option value="02E">Suite 02E (Center Honeymoon Double)</option>
                <option value="02F">Suite 02F (Center Honeymoon Double)</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
