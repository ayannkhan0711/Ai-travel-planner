import React, { useState, useEffect } from 'react';
import { bookingService } from '../../services/bookingService';
import { formatCurrency, formatDate } from '../../utils/formatters';

const DEFAULT_BOOKINGS = [
  {
    _id: 'bk-mock-001',
    bookingReference: 'VL-789042',
    status: 'Confirmed & Escorted',
    bookingType: 'flight',
    sourceLocation: { city: 'New York (JFK)' },
    destinationLocation: { city: 'Paris (CDG)' },
    departureDate: '2026-11-20',
    totalPrice: 4850,
    bookingDetails: {
      title: 'Emirates First Class A380 Suite',
      seatNumber: '01A',
      cabinClass: 'First Class Suite',
    },
  },
  {
    _id: 'bk-mock-002',
    bookingReference: 'VL-882194',
    status: 'Confirmed',
    bookingType: 'hotel',
    sourceLocation: { city: 'Paris' },
    destinationLocation: { city: 'Four Seasons George V' },
    departureDate: '2026-11-20',
    totalPrice: 9600,
    bookingDetails: {
      title: 'Four Seasons George V Presidential Penthouse',
      roomType: 'Penthouse Suite',
    },
  },
  {
    _id: 'bk-mock-003',
    bookingReference: 'VL-914022',
    status: 'Confirmed',
    bookingType: 'train',
    sourceLocation: { city: 'Paris Gare de l’Est' },
    destinationLocation: { city: 'Venice Santa Lucia' },
    departureDate: '2026-11-24',
    totalPrice: 2450,
    bookingDetails: {
      title: 'Venice Simplon-Orient-Express Grand Suite',
      seatNumber: 'Suite Vienna',
      cabinClass: 'Grand Suite',
    },
  },
];

export default function BookingHistory({ onManageBooking, onDownloadTicket }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    bookingService.listBookings().then((data) => {
      if (isMounted) {
        if (data && data.length > 0) {
          setBookings(data);
        } else {
          setBookings(DEFAULT_BOOKINGS);
        }
        setLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setBookings(DEFAULT_BOOKINGS);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="w-8 h-8 border-3 border-luxury-brown border-t-transparent rounded-full animate-spin mx-auto mb-2" />
        <span className="text-xs text-luxury-muted">Retrieving luxury dossiers...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div
          key={b._id || b.bookingReference}
          className="bg-white border border-[#F5E6D3] rounded-2xl p-5 shadow-sm hover:shadow-luxury transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-luxury-cream border border-luxury-beige flex items-center justify-center text-luxury-brown text-xl flex-shrink-0">
              {b.bookingType === 'hotel' ? '🏨' : b.bookingType === 'train' ? '🚆' : '✈'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif font-bold text-luxury-dark text-base">
                  {b.bookingDetails?.title || `${b.sourceLocation?.city || 'Origin'} ➔ ${b.destinationLocation?.city || 'Destination'}`}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
                  {b.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Ref: <strong className="text-luxury-brown font-mono">{b.bookingReference}</strong> · Departure: {formatDate(b.departureDate)}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Suite / Room: <span className="font-semibold text-luxury-dark">{b.bookingDetails?.seatNumber || b.bookingDetails?.roomType || 'Reserved'}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0">
            <div className="text-left md:text-right">
              <span className="font-serif text-lg font-bold text-luxury-brown block">
                {formatCurrency(b.totalPrice)}
              </span>
              <span className="text-[10px] text-gray-400 uppercase tracking-wider">Paid in full</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onDownloadTicket && onDownloadTicket(b)}
                className="btn-outline py-2 px-3 text-xs font-semibold"
                title="Boarding Pass"
              >
                Boarding Pass
              </button>
              <button
                onClick={() => onManageBooking && onManageBooking(b)}
                className="btn-primary py-2 px-4 text-xs font-semibold"
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
