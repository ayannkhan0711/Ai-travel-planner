import React from 'react';
import { useParams } from 'react-router-dom';
import BookingFlow from '../components/Booking/BookingFlow';
import BookingHistory from '../components/Booking/BookingHistory';

export default function BookingPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Header */}
      <section className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <span className="text-luxury-goldLight text-sm font-semibold tracking-widest uppercase">
            {id ? 'Complete Your Reservation' : 'Booking Management'}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2">
            {id ? 'Secure Checkout' : 'Your Bookings'}
          </h1>
          <p className="text-white/60 text-sm mt-2">
            {id ? 'Finalize your luxury travel arrangements with confidence.' : 'View, manage, and download tickets for all your reservations.'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {id ? (
          <BookingFlow bookingId={id} />
        ) : (
          <div>
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: '🎫', label: 'Active Bookings', value: '3', color: 'bg-emerald-50 text-emerald-700' },
                { icon: '⏳', label: 'Pending', value: '1', color: 'bg-amber-50 text-amber-700' },
                { icon: '✅', label: 'Completed', value: '12', color: 'bg-blue-50 text-blue-700' },
                { icon: '📋', label: 'Total Spend', value: '$34,500', color: 'bg-purple-50 text-purple-700' },
              ].map((stat) => (
                <div key={stat.label} className={`luxury-card p-5 flex items-center gap-4`}>
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl font-serif font-bold text-luxury-dark">{stat.value}</p>
                    <p className="text-xs text-luxury-muted">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking History */}
            <div className="luxury-card p-6 md:p-8">
              <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-6">Reservation History</h2>
              <BookingHistory />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
