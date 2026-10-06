import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../utils/formatters';

export default function BookingConfirmation({ booking = {}, onDownloadTicket }) {
  const b = booking || {};
  const [copied, setCopied] = useState(false);

  const copyRef = () => {
    navigator.clipboard?.writeText(b.bookingReference || 'VL-789042');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="text-center py-6 space-y-8 animate-fade-in">
      {/* Success Crest */}
      <div className="w-20 h-20 mx-auto rounded-full bg-luxury-cream border-2 border-luxury-brown flex items-center justify-center text-luxury-brown text-3xl shadow-glow">
        ✦
      </div>

      <div>
        <span className="text-xs uppercase font-bold tracking-widest text-luxury-brown block mb-1">
          Dossier Confirmed & Authorized
        </span>
        <h3 className="font-serif text-3xl font-bold text-luxury-dark">
          Your Luxury Journey is Secured
        </h3>
        <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
          An official confirmation manifest and encrypted boarding pass have been dispatched to your email address.
        </p>
      </div>

      {/* Booking Reference Card */}
      <div className="max-w-md mx-auto bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-6 shadow-sm">
        <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
          Unique Booking Reference
        </span>
        <div className="flex items-center justify-center gap-2 mt-1 mb-4">
          <span className="font-serif text-2xl font-bold text-luxury-brown tracking-widest">
            {b.bookingReference || 'VL-789042'}
          </span>
          <button
            onClick={copyRef}
            className="text-xs bg-white border border-luxury-beige px-2 py-1 rounded-md text-luxury-brown hover:bg-luxury-beige transition-colors"
          >
            {copied ? 'Copied ✓' : 'Copy'}
          </button>
        </div>

        <div className="border-t border-luxury-beige pt-4 grid grid-cols-2 gap-4 text-left text-xs">
          <div>
            <span className="text-gray-400 block text-[10px] uppercase">Departure</span>
            <span className="font-semibold text-luxury-dark">
              {formatDate(b.departureDate || new Date())}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase">Passenger</span>
            <span className="font-semibold text-luxury-dark">
              {b.bookingDetails?.passengers?.[0]?.firstName || 'Julian'} {b.bookingDetails?.passengers?.[0]?.lastName || 'Vanderbilt'}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase">Allocated Suite</span>
            <span className="font-semibold text-luxury-brown">
              {b.bookingDetails?.seatNumber || 'Suite 01A'}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block text-[10px] uppercase">Total Paid</span>
            <span className="font-semibold text-luxury-dark">
              {formatCurrency(b.totalPrice || 2770)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <button
          onClick={onDownloadTicket}
          className="btn-gold py-3 px-8 text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
        >
          <span>Download Luxury Boarding Pass</span>
          <span>⇩</span>
        </button>

        <Link
          to="/dashboard"
          className="btn-outline py-3 px-8 text-xs uppercase tracking-widest font-semibold"
        >
          View in Dossier
        </Link>
      </div>
    </div>
  );
}
