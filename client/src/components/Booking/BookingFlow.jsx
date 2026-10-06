import React, { useState } from 'react';
import { useBooking } from '../../hooks/useBooking';
import PassengerDetails from './PassengerDetails';
import ContactInfo from './ContactInfo';
import BookingSummary from './BookingSummary';
import BookingConfirmation from './BookingConfirmation';
import TicketDownload from './TicketDownload';

export default function BookingFlow({ onClose }) {
  const {
    currentStep,
    nextStep,
    prevStep,
    selectedItem,
    bookingData,
    updateBookingData,
    completeBooking,
    confirmedBooking,
  } = useBooking();

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [showPrintTicket, setShowPrintTicket] = useState(false);

  const steps = [
    { num: 1, title: 'Travelers' },
    { num: 2, title: 'Contact' },
    { num: 3, title: 'Itinerary' },
    { num: 4, title: 'Protection' },
    { num: 5, title: 'Summary' },
    { num: 6, title: 'Payment' },
    { num: 7, title: 'Confirmed' },
  ];

  const handleAuthorizePayment = async () => {
    setPaymentProcessing(true);
    await completeBooking();
    setPaymentProcessing(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Step Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-luxury-beige -translate-y-1/2 z-0"></div>
          {steps.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-luxury-brown text-white shadow-luxury ring-4 ring-luxury-beigeLight scale-110'
                      : isDone
                      ? 'bg-luxury-gold text-white'
                      : 'bg-white border-2 border-luxury-beige text-gray-400'
                  }`}
                >
                  {isDone ? '✓' : s.num}
                </div>
                <span
                  className={`hidden sm:block text-[10px] uppercase font-bold tracking-wider mt-2 ${
                    isCurrent ? 'text-luxury-brown' : 'text-gray-400'
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Contents */}
      <div className="min-h-[380px]">
        {/* Step 1: Passenger Details */}
        {currentStep === 1 && (
          <PassengerDetails
            passengers={bookingData.passengers}
            onChange={(passengers) => updateBookingData({ passengers })}
          />
        )}

        {/* Step 2: Contact Information */}
        {currentStep === 2 && (
          <ContactInfo
            contactInfo={bookingData.contactInfo}
            onChange={(contactInfo) => updateBookingData({ contactInfo })}
          />
        )}

        {/* Step 3: Add to Itinerary */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-[#F5E6D3] pb-3">
              <h4 className="font-serif text-lg font-bold text-luxury-dark">
                Synchronize with Active Dossier
              </h4>
              <p className="text-xs text-gray-500">
                Attach this reservation directly into your multi-day Grand Tour itinerary.
              </p>
            </div>

            <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-6 space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bookingData.addToItinerary}
                  onChange={(e) => updateBookingData({ addToItinerary: e.target.checked })}
                  className="mt-1 rounded text-luxury-brown focus:ring-luxury-brown"
                />
                <div>
                  <span className="text-xs font-bold text-luxury-dark block">
                    Link to "Grand Tour of Hernur & Panling Riviera"
                  </span>
                  <span className="text-[11px] text-gray-500">
                    Automatically schedules chauffeur transfers and aligns restaurant reservations.
                  </span>
                </div>
              </label>

              <div className="pt-2">
                <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                  Special In-Flight & Butler Requests
                </label>
                <textarea
                  rows={3}
                  value={bookingData.specialRequests}
                  onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
                  placeholder="e.g., Preference for Vintage Champagne, Silk Eye Masks, Down Pillows"
                  className="w-full bg-white border border-[#E8DCCF] rounded-xl p-3 text-xs focus:outline-none focus:border-luxury-brown"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Insurance Selection */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-[#F5E6D3] pb-3">
              <h4 className="font-serif text-lg font-bold text-luxury-dark">
                Voyager Premier Shield Protection
              </h4>
              <p className="text-xs text-gray-500">
                Underwritten by Allianz Global & Swiss Re with immediate charter medical evacuation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 'Platinum Centurion',
                  price: 320,
                  coverage: '$2,000,000 Medical Evacuation + 100% Cancellation Reimbursement',
                  recommended: true,
                },
                {
                  id: 'Bespoke Royal Sovereign',
                  price: 680,
                  coverage: 'Unlimited Medical + $35,000 Jewelry/Fine Watch + Private Jet Medevac',
                  recommended: false,
                },
              ].map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => updateBookingData({ insurancePlan: plan.id, insurancePrice: plan.price })}
                  className={`border-2 rounded-2xl p-5 cursor-pointer transition-all ${
                    bookingData.insurancePlan === plan.id
                      ? 'border-luxury-brown bg-[#FFFAF0] shadow-md'
                      : 'border-[#E8DCCF] bg-white hover:border-luxury-beige'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-sm text-luxury-dark">{plan.id}</span>
                    <span className="font-serif font-bold text-luxury-brown text-base">${plan.price}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 mb-4">{plan.coverage}</p>
                  <span className="text-[10px] uppercase font-bold text-luxury-brown">
                    {bookingData.insurancePlan === plan.id ? 'Selected Shield ✓' : 'Select Plan'}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => updateBookingData({ insurancePlan: 'None', insurancePrice: 0 })}
              className="text-xs text-gray-500 hover:text-luxury-brown underline block text-center w-full"
            >
              Decline travel protection for this reservation
            </button>
          </div>
        )}

        {/* Step 5: Summary */}
        {currentStep === 5 && (
          <BookingSummary selectedItem={selectedItem} bookingData={bookingData} />
        )}

        {/* Step 6: Payment (UI simulation & links to partner platforms) */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="border-b border-[#F5E6D3] pb-3">
              <h4 className="font-serif text-lg font-bold text-luxury-dark">
                Direct Settlement & Authorization
              </h4>
              <p className="text-xs text-gray-500">
                Payment gateway simulation. Connects directly to partner airlines and palace reserve desks.
              </p>
            </div>

            <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {['American Express Centurion', 'Visa Infinite Black', 'Private Wire / Crypto'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => updateBookingData({ paymentMethod: method })}
                    className={`p-3 rounded-xl border text-xs font-semibold transition-all ${
                      bookingData.paymentMethod === method
                        ? 'border-luxury-brown bg-white text-luxury-brown shadow-sm'
                        : 'border-[#E8DCCF] bg-white/50 text-gray-600 hover:border-luxury-brown'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    defaultValue="JULIAN VANDERBILT"
                    className="w-full bg-white border border-[#E8DCCF] rounded-xl px-3 py-2 text-xs font-mono font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-600 mb-1">
                    Centurion Black Card Number
                  </label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 9921"
                    className="w-full bg-white border border-[#E8DCCF] rounded-xl px-3 py-2 text-xs font-mono font-semibold"
                  />
                </div>
              </div>

              <div className="text-[11px] text-gray-500 pt-2 flex items-center gap-2">
                <span>🔒</span>
                <span>Encrypted 256-bit AES Handshake with American Express Global Vault</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Confirmation & Printable Boarding Pass */}
        {currentStep === 7 && (
          showPrintTicket ? (
            <TicketDownload booking={confirmedBooking || selectedItem} />
          ) : (
            <BookingConfirmation
              booking={confirmedBooking || selectedItem}
              onDownloadTicket={() => setShowPrintTicket(true)}
            />
          )
        )}
      </div>

      {/* Navigation Buttons */}
      {currentStep < 7 && (
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="btn-outline py-2.5 px-6 text-xs uppercase tracking-wider font-semibold disabled:opacity-30 disabled:pointer-events-none"
          >
            ← Previous
          </button>

          {currentStep === 6 ? (
            <button
              type="button"
              onClick={handleAuthorizePayment}
              disabled={paymentProcessing}
              className="btn-gold py-3 px-8 text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
            >
              {paymentProcessing ? 'Authorizing Centurion Card...' : 'Authorize & Issue Boarding Pass ➔'}
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="btn-primary py-2.5 px-6 text-xs uppercase tracking-wider font-semibold"
            >
              Continue ➔
            </button>
          )}
        </div>
      )}
    </div>
  );
}
