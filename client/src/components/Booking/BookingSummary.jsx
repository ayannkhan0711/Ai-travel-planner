import React from 'react';
import { formatCurrency } from '../../utils/formatters';

export default function BookingSummary({ selectedItem, bookingData = {} }) {
  const basePrice = selectedItem?.price || 2450;
  const insurancePrice = bookingData?.insurancePrice || 0;
  const totalPrice = basePrice + insurancePrice;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#F5E6D3] pb-3">
        <h4 className="font-serif text-lg font-bold text-luxury-dark">
          Itinerary Review & Grand Total
        </h4>
        <p className="text-xs text-gray-500">
          Review your reservation parameters prior to authorization.
        </p>
      </div>

      <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-6 space-y-4">
        {/* Item Summary */}
        <div className="flex items-start justify-between border-b border-luxury-beige/60 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-brown block">
              Primary Journey Reservation
            </span>
            <h5 className="font-serif text-base font-bold text-luxury-dark">
              {selectedItem?.title || selectedItem?.airline || selectedItem?.name || 'Emirates First Class A380 Suite'}
            </h5>
            <p className="text-xs text-gray-600 mt-1">
              {selectedItem?.origin?.city || 'New York'} ➔ {selectedItem?.destination?.city || selectedItem?.destination?.hotelName || 'Paris'}
            </p>
            <p className="text-[11px] text-gray-500">
              Allocated Suite: {bookingData.passengers[0]?.seat || '01A'} · Passenger: {bookingData.passengers[0]?.firstName} {bookingData.passengers[0]?.lastName}
            </p>
          </div>
          <span className="font-serif text-lg font-bold text-luxury-brown">
            {formatCurrency(basePrice)}
          </span>
        </div>

        {/* Protection Tier */}
        {insurancePrice > 0 && (
          <div className="flex items-center justify-between border-b border-luxury-beige/60 pb-4">
            <div>
              <span className="text-xs font-semibold text-luxury-dark">
                Premier Shield: {bookingData.insurancePlan}
              </span>
              <p className="text-[11px] text-gray-500">$2,000,000 Medical Evacuation & 100% Non-refundable coverage</p>
            </div>
            <span className="font-serif text-sm font-bold text-luxury-brown">
              +{formatCurrency(insurancePrice)}
            </span>
          </div>
        )}

        {/* Taxes & VIP Concierge Fees */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Airport VIP Lounge Escort & Tarmac Chauffeur</span>
          <span className="text-luxury-brown font-semibold">Included (Complimentary)</span>
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t border-luxury-brown/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-600 block">
              Total Payable Authorization
            </span>
            <span className="text-[11px] text-gray-400">All regulatory fees and carbon offsets included</span>
          </div>
          <div className="text-right">
            <span className="font-serif text-2xl font-bold text-luxury-brown block">
              {formatCurrency(totalPrice)}
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest">USD Currency</span>
          </div>
        </div>
      </div>

      {/* Cancellation Policy Banner */}
      <div className="bg-white border border-[#E8DCCF] rounded-xl p-4 flex items-start gap-3">
        <span className="text-luxury-brown text-base">🛡</span>
        <div className="text-xs text-gray-600">
          <p className="font-bold text-luxury-dark mb-0.5">Complimentary Cancellation Guarantee</p>
          <p>Full 100% refund credited back to your Centurion card if cancelled at least 24 hours prior to scheduled departure.</p>
        </div>
      </div>
    </div>
  );
}
