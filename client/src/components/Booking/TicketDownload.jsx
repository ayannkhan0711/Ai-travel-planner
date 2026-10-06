import React from 'react';
import { formatDate } from '../../utils/formatters';

export default function TicketDownload({ booking }) {
  const handlePrint = () => {
    window.print();
  };

  const p = booking?.bookingDetails?.passengers?.[0] || {
    firstName: 'Julian',
    lastName: 'Vanderbilt',
    passportNumber: 'USA-9921004',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#F5E6D3] pb-3">
        <div>
          <h4 className="font-serif text-lg font-bold text-luxury-dark">
            Electronic Boarding Pass & Travel Manifest
          </h4>
          <p className="text-xs text-gray-500">
            Official pass for VIP Salon fast-track escort and aircraft boarding.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="btn-primary py-2 px-4 text-xs font-semibold flex items-center gap-1.5"
        >
          <span>🖨</span>
          <span>Print / PDF</span>
        </button>
      </div>

      {/* Luxury Boarding Pass Layout */}
      <div className="bg-white border-2 border-luxury-brown rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row text-left">
        {/* Main Pass Section */}
        <div className="flex-1 p-6 sm:p-8 border-b md:border-b-0 md:border-r-2 md:border-dashed md:border-luxury-beige">
          <div className="flex items-center justify-between border-b border-luxury-brown/30 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl text-luxury-brown">✦</span>
              <span className="font-serif text-xl font-bold tracking-widest text-luxury-brown">
                VOYAGER LUXE
              </span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-luxury-cream text-luxury-brown border border-luxury-beige">
              {booking?.bookingType?.toUpperCase() || 'FIRST CLASS'} BOARDING PASS
            </span>
          </div>

          {/* Route Header */}
          <div className="flex items-center justify-between my-6">
            <div>
              <span className="font-serif text-4xl font-extrabold text-luxury-dark">
                {booking?.sourceLocation?.code || 'JFK'}
              </span>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                {booking?.sourceLocation?.city || 'New York'}
              </p>
            </div>
            <div className="text-center px-4">
              <span className="text-luxury-brown text-lg font-serif">✦ ➔ ✦</span>
              <p className="text-[10px] text-gray-400 font-medium">Non-Stop Direct</p>
            </div>
            <div className="text-right">
              <span className="font-serif text-4xl font-extrabold text-luxury-dark">
                {booking?.destinationLocation?.code || 'CDG'}
              </span>
              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                {booking?.destinationLocation?.city || 'Paris'}
              </p>
            </div>
          </div>

          {/* Manifest Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-gray-100 text-xs">
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Passenger</span>
              <span className="font-bold text-luxury-dark">{p.firstName} {p.lastName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Flight / Unit</span>
              <span className="font-bold text-luxury-dark">{booking?.bookingDetails?.flightNumber || 'VL-202'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Suite Number</span>
              <span className="font-bold text-luxury-brown text-sm">{booking?.bookingDetails?.seatNumber || '01A'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Cabin Tier</span>
              <span className="font-bold text-luxury-dark">{booking?.bookingDetails?.cabinClass || 'Royal Suite'}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Departure Date</span>
              <span className="font-bold text-luxury-dark">{formatDate(booking?.departureDate || new Date())}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Gate / Salon</span>
              <span className="font-bold text-luxury-dark">VIP Salon 4</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Fast-Track</span>
              <span className="font-bold text-green-700">Confirmed ✓</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-gray-400 block font-semibold">Baggage</span>
              <span className="font-bold text-luxury-dark">3 x 32kg VIP</span>
            </div>
          </div>

          {/* Barcode Simulation */}
          <div className="mt-6 h-12 bg-luxury-dark rounded-lg flex items-center justify-center text-white tracking-[8px] font-mono text-xs">
            ||| | ||||| || |||| ||||| | |||||| |||| |||
          </div>
        </div>

        {/* Stub Section */}
        <div className="md:w-64 bg-[#FFFAF0] p-6 flex flex-col justify-between text-xs">
          <div>
            <div className="border-b border-luxury-beige pb-2 mb-4">
              <span className="font-serif font-bold text-luxury-brown text-sm block">PASSENGER STUB</span>
              <span className="text-[10px] text-gray-400">Ref: {booking?.bookingReference || 'VL-789042'}</span>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Traveler</span>
                <span className="font-bold text-luxury-dark">{p.firstName} {p.lastName}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Sector</span>
                <span className="font-bold text-luxury-dark">{booking?.sourceLocation?.code || 'JFK'} ➔ {booking?.destinationLocation?.code || 'CDG'}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 block uppercase">Suite</span>
                <span className="font-serif text-2xl font-bold text-luxury-brown">
                  {booking?.bookingDetails?.seatNumber || '01A'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-luxury-beige text-center">
            <span className="text-[9px] uppercase tracking-wider text-gray-400 block">
              Voyager Luxe Global Concierge
            </span>
            <span className="text-[9px] text-luxury-brown font-semibold">Geneva · Paris · New York</span>
          </div>
        </div>
      </div>
    </div>
  );
}
