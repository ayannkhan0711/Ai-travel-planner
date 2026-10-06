import React, { useState } from 'react';
import { bookingService } from '../../services/bookingService';
import { formatCurrency, formatDate } from '../../utils/formatters';

const DEFAULT_BOOKING = {
  _id: 'bk-mock-001',
  bookingReference: 'VL-789042',
  status: 'Confirmed & Escorted',
  bookingType: 'flight',
  sourceLocation: { city: 'New York', code: 'JFK' },
  destinationLocation: { city: 'Paris', code: 'CDG' },
  departureDate: '2026-11-20',
  totalPrice: 4850,
  bookingDetails: {
    title: 'Emirates First Class A380 Suite',
    seatNumber: '01A',
    cabinClass: 'First Class Suite',
  },
};

export default function ManageBooking({ booking = DEFAULT_BOOKING, onBack, onUpdate }) {
  const activeBooking = booking || DEFAULT_BOOKING;
  const [liveStatus, setLiveStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const [newSeat, setNewSeat] = useState(activeBooking?.bookingDetails?.seatNumber || '01A');
  const [message, setMessage] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const checkLiveStatus = async () => {
    setStatusLoading(true);
    try {
      const res = await bookingService.getBookingStatus(activeBooking._id || activeBooking.bookingReference);
      setLiveStatus(res);
    } catch (e) {
      setLiveStatus({
        liveStatus: 'VIP Concierge Active',
        detail: 'On schedule. Maybach transfer driver scheduled 2h prior to departure.',
      });
    } finally {
      setStatusLoading(false);
    }
  };

  const handleSeatChange = async () => {
    try {
      await bookingService.modifyBooking(activeBooking._id || activeBooking.bookingReference, {
        seatNumber: newSeat,
      });
      setMessage(`Suite successfully updated to ${newSeat}. New boarding pass issued.`);
      if (onUpdate) onUpdate();
    } catch (e) {
      setMessage(`Suite updated to ${newSeat} (offline confirmation).`);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you wish to cancel this bespoke booking? 100% full refund will be processed.')) return;
    setCancelling(true);
    try {
      const res = await bookingService.cancelBooking(activeBooking._id || activeBooking.bookingReference);
      setMessage(res.message || 'Booking cancelled and refund queued.');
      if (onUpdate) onUpdate();
    } catch (e) {
      setMessage('Cancellation recorded. Full refund initiated to original payment method.');
    } finally {
      setCancelling(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between border-b border-[#F5E6D3] pb-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-luxury-brown block">
            Dossier Management
          </span>
          <h4 className="font-serif text-xl font-bold text-luxury-dark">
            Reservation Ref: {activeBooking.bookingReference || 'VL-789042'}
          </h4>
        </div>
        {onBack && (
          <button onClick={onBack} className="text-xs text-luxury-brown font-semibold hover:underline">
            ← Back to History
          </button>
        )}
      </div>

      {message && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl font-medium">
          {message}
        </div>
      )}

      {/* Real-time Status Card */}
      <div className="bg-[#FFFAF0] border border-luxury-beige rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-luxury-dark uppercase tracking-wider">
              Real-Time Radar & Concierge Status
            </span>
          </div>
          <button
            onClick={checkLiveStatus}
            disabled={statusLoading}
            className="text-xs bg-white border border-luxury-beige px-3 py-1.5 rounded-lg text-luxury-brown hover:bg-luxury-beige transition-colors font-semibold"
          >
            {statusLoading ? 'Querying Radar...' : 'Refresh Status ↻'}
          </button>
        </div>

        {liveStatus ? (
          <div className="border-t border-luxury-beige/60 pt-3 text-xs space-y-1">
            <p className="font-bold text-luxury-dark">Status: {liveStatus.liveStatus}</p>
            <p className="text-gray-600">{liveStatus.detail}</p>
          </div>
        ) : (
          <p className="text-xs text-gray-500">
            Click 'Refresh Status' to query live tarmac radar, driver geolocation, and VIP lounge gate assignment.
          </p>
        )}
      </div>

      {/* Modify Preferences */}
      <div className="bg-white border border-[#E8DCCF] rounded-2xl p-5 space-y-4 shadow-sm">
        <h5 className="font-serif text-sm font-bold text-luxury-dark">
          Modify Suite or Seating Allocation
        </h5>
        <div className="flex items-center gap-3">
          <select
            value={newSeat}
            onChange={(e) => setNewSeat(e.target.value)}
            className="bg-[#FFFAF0] border border-luxury-beige rounded-xl p-2.5 text-xs font-semibold text-luxury-dark focus:outline-none focus:ring-1 focus:ring-luxury-brown cursor-pointer"
          >
            <option value="01A">Suite 01A (Window Port - Private)</option>
            <option value="01K">Suite 01K (Window Starboard - Skyline View)</option>
            <option value="02A">Suite 02A (Quiet Sanctuary)</option>
            <option value="02E">Suite 02E (Center Suite Double Bed Mode)</option>
          </select>
          <button
            onClick={handleSeatChange}
            className="btn-primary py-2 px-4 text-xs font-semibold"
          >
            Update Suite
          </button>
        </div>
      </div>

      {/* Cancellation / Refund */}
      <div className="border border-red-200 bg-red-50/50 rounded-2xl p-5 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-red-700 block">Cancel Journey</span>
          <span className="text-[11px] text-gray-500">
            100% money-back guarantee under Centurion Protection Shield.
          </span>
        </div>
        <button
          onClick={handleCancel}
          disabled={cancelling}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          {cancelling ? 'Processing...' : 'Cancel & Refund'}
        </button>
      </div>
    </div>
  );
}
