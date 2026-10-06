import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import BookingHistory from '../components/Booking/BookingHistory';
import ManageBooking from '../components/Booking/ManageBooking';

const DASH_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'loyalty', label: 'Loyalty & Miles' },
  { key: 'documents', label: 'Documents' },
  { key: 'notifications', label: 'Notifications' },
];

const UPCOMING_TRIPS = [
  {
    destination: 'Kyoto, Japan',
    dates: 'Nov 15 – Nov 24, 2026',
    status: 'Confirmed',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
    bookingRef: 'VLX-KYT-48392',
  },
  {
    destination: 'Amalfi Coast, Italy',
    dates: 'Dec 20 – Dec 30, 2026',
    status: 'Pending Payment',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80',
    bookingRef: 'VLX-AMF-73621',
  },
];

const NOTIFICATIONS_DATA = [
  { type: 'alert', message: 'Flight EK201 departure gate changed to B14', time: '2 hours ago', read: false },
  { type: 'promo', message: 'Flash sale: 40% off Maldives luxury villas this weekend', time: '5 hours ago', read: false },
  { type: 'booking', message: 'Booking VLX-KYT-48392 confirmed — e-tickets ready', time: '1 day ago', read: true },
  { type: 'loyalty', message: 'Congratulations! You earned 2,500 bonus miles', time: '2 days ago', read: true },
  { type: 'alert', message: 'Travel advisory update for Japan — no issues reported', time: '3 days ago', read: true },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBookingToManage, setSelectedBookingToManage] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection user={user} />;
      case 'bookings':
        return (
          <div className="space-y-6">
            {selectedBookingToManage ? (
              <div className="luxury-card p-6">
                <ManageBooking
                  booking={selectedBookingToManage}
                  onBack={() => setSelectedBookingToManage(null)}
                />
              </div>
            ) : (
              <div className="luxury-card p-6">
                <div className="flex items-center justify-between mb-4 border-b border-[#F5E6D3] pb-3">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-luxury-dark">All Reservations</h3>
                    <p className="text-xs text-gray-500">Select any dossier to modify suites, request chauffeurs, or download boarding passes.</p>
                  </div>
                </div>
                <BookingHistory
                  onManageBooking={(b) => setSelectedBookingToManage(b)}
                />
              </div>
            )}
          </div>
        );
      case 'loyalty':
        return <LoyaltySection user={user} />;
      case 'documents':
        return <DocumentsSection />;
      case 'notifications':
        return <NotificationsSection />;
      default:
        return <OverviewSection user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Dashboard Header */}
      <section className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark py-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-6">
          <img
            src={user?.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={user?.firstName || 'User'}
            className="w-20 h-20 rounded-full object-cover border-2 border-luxury-gold shadow-glow"
          />
          <div className="text-center md:text-left">
            <h1 className="font-serif text-3xl font-bold text-white">
              Welcome back, {user?.firstName || 'Traveler'}
            </h1>
            <p className="text-white/60 text-sm mt-1">Centurion Member — Member since 2024</p>
          </div>
          <div className="flex-1" />
          <div className="flex gap-6 text-center">
            <div>
              <p className="text-2xl font-serif font-bold text-luxury-goldLight">
                {(user?.loyaltyPoints || 48500).toLocaleString()}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-white/50">Points</p>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <p className="text-2xl font-serif font-bold text-luxury-goldLight">
                {(user?.airlineMiles || 64200).toLocaleString()}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-white/50">Miles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-luxury-border bg-white sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {DASH_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-luxury-brown text-luxury-brown'
                  : 'border-transparent text-luxury-muted hover:text-luxury-brown'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="animate-fade-in">
          {renderContent()}
        </div>
      </section>
    </div>
  );
}

/* ═══ Overview Section ═══ */
function OverviewSection({ user }) {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Upcoming Trips', value: '2', icon: '✈️', accent: 'text-sky-600 bg-sky-50' },
          { label: 'Countries Visited', value: '23', icon: '🌍', accent: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total Bookings', value: '47', icon: '📋', accent: 'text-violet-600 bg-violet-50' },
          { label: 'Savings Earned', value: '$4,200', icon: '💎', accent: 'text-amber-600 bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="luxury-card p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.accent} flex items-center justify-center text-xl mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-serif font-bold text-luxury-dark">{stat.value}</p>
            <p className="text-xs text-luxury-muted mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Trips */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-luxury-dark mb-5">Upcoming Journeys</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {UPCOMING_TRIPS.map((trip) => (
            <div key={trip.bookingRef} className="luxury-card overflow-hidden flex">
              <img src={trip.image} alt={trip.destination} className="w-40 h-full object-cover" />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-luxury-dark">{trip.destination}</h3>
                  <p className="text-xs text-luxury-muted mt-1">{trip.dates}</p>
                  <p className="text-[10px] text-luxury-brownLight mt-0.5">Ref: {trip.bookingRef}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`badge-gold text-[10px] ${trip.status === 'Confirmed' ? '' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    {trip.status}
                  </span>
                  <Link to={`/booking/${trip.bookingRef}`} className="text-xs text-luxury-brown hover:underline font-medium">
                    Manage →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Search Flights', icon: '✈️', path: '/search' },
          { label: 'Build Itinerary', icon: '🗺️', path: '/itinerary' },
          { label: 'Check Visa', icon: '🛂', path: '/travel-guides' },
          { label: 'Get Insurance', icon: '🛡️', path: '/insurance' },
        ].map((action) => (
          <Link
            key={action.label}
            to={action.path}
            className="luxury-card p-5 text-center hover:-translate-y-1 transition-all duration-300 group"
          >
            <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{action.icon}</span>
            <p className="text-sm font-medium text-luxury-dark group-hover:text-luxury-brown transition-colors">{action.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ═══ Loyalty Section ═══ */
function LoyaltySection({ user }) {
  const programs = [
    { name: 'Emirates Skywards', miles: 24800, tier: 'Gold', icon: '✈️' },
    { name: 'Marriott Bonvoy', points: 18200, tier: 'Platinum', icon: '🏨' },
    { name: 'Voyager Luxe Rewards', points: user?.loyaltyPoints || 48500, tier: 'Centurion', icon: '💎' },
  ];

  return (
    <div className="space-y-8">
      <div className="luxury-card p-8 bg-gradient-to-r from-luxury-brown to-luxury-brownDark text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm">Total Loyalty Value</p>
            <p className="font-serif text-4xl font-bold mt-1">
              {(user?.loyaltyPoints || 48500).toLocaleString()} <span className="text-lg font-normal text-luxury-goldLight">points</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-sm">Membership Tier</p>
            <p className="font-serif text-2xl font-bold text-luxury-goldLight mt-1">Centurion</p>
          </div>
        </div>
        <div className="mt-6 bg-white/10 rounded-full h-3 overflow-hidden">
          <div className="bg-gold-gradient h-full rounded-full" style={{ width: '78%' }} />
        </div>
        <p className="text-white/50 text-xs mt-2">12,500 points until Platinum upgrade</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {programs.map((prog) => (
          <div key={prog.name} className="luxury-card p-6">
            <span className="text-3xl block mb-3">{prog.icon}</span>
            <h3 className="font-serif text-lg font-bold text-luxury-dark">{prog.name}</h3>
            <p className="text-sm text-luxury-muted mt-1">Tier: <span className="font-semibold text-luxury-brown">{prog.tier}</span></p>
            <p className="font-serif text-2xl font-bold text-luxury-dark mt-3">
              {(prog.points || prog.miles).toLocaleString()}
              <span className="text-sm font-normal text-luxury-muted ml-1">{prog.miles ? 'miles' : 'pts'}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ Documents Section ═══ */
function DocumentsSection() {
  const docs = [
    { type: 'Passport', name: 'US Passport', number: '****4521', expiry: 'Mar 2029', status: 'valid' },
    { type: 'Visa', name: 'Japan Tourist Visa', number: '****8834', expiry: 'Nov 2026', status: 'valid' },
    { type: 'Insurance', name: 'Global Travel Shield', number: 'GTS-48291', expiry: 'Dec 2026', status: 'valid' },
    { type: 'Passport', name: 'EU Passport', number: '****7712', expiry: 'Jan 2025', status: 'expired' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold text-luxury-dark">Travel Document Vault</h2>
        <button className="btn-primary py-2 px-5 text-sm">+ Add Document</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((doc, i) => (
          <div key={i} className={`luxury-card p-5 flex items-center gap-4 ${doc.status === 'expired' ? 'border-red-200 bg-red-50/30' : ''}`}>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
              doc.type === 'Passport' ? 'bg-blue-50 text-blue-600' :
              doc.type === 'Visa' ? 'bg-emerald-50 text-emerald-600' :
              'bg-purple-50 text-purple-600'
            }`}>
              {doc.type === 'Passport' ? '🛂' : doc.type === 'Visa' ? '📄' : '🛡️'}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-luxury-dark text-sm">{doc.name}</p>
              <p className="text-xs text-luxury-muted">{doc.number} · Expires {doc.expiry}</p>
            </div>
            <span className={`text-[10px] font-semibold px-3 py-1 rounded-full ${
              doc.status === 'valid' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
            }`}>
              {doc.status === 'valid' ? 'Valid' : 'Expired'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══ Notifications Section ═══ */
function NotificationsSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-2xl font-bold text-luxury-dark">Notifications</h2>
        <button className="text-xs text-luxury-brown hover:underline font-medium">Mark All as Read</button>
      </div>

      {NOTIFICATIONS_DATA.map((notif, i) => (
        <div key={i} className={`luxury-card p-5 flex items-start gap-4 ${!notif.read ? 'border-l-4 border-l-luxury-brown' : ''}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
            notif.type === 'alert' ? 'bg-red-50 text-red-600' :
            notif.type === 'promo' ? 'bg-amber-50 text-amber-600' :
            notif.type === 'booking' ? 'bg-emerald-50 text-emerald-600' :
            'bg-purple-50 text-purple-600'
          }`}>
            {notif.type === 'alert' ? '⚠️' : notif.type === 'promo' ? '🎉' : notif.type === 'booking' ? '✅' : '💎'}
          </div>
          <div className="flex-1">
            <p className={`text-sm ${!notif.read ? 'font-semibold text-luxury-dark' : 'text-luxury-muted'}`}>{notif.message}</p>
            <p className="text-[11px] text-luxury-muted mt-1">{notif.time}</p>
          </div>
          {!notif.read && <span className="w-2.5 h-2.5 bg-luxury-brown rounded-full flex-shrink-0 mt-1.5" />}
        </div>
      ))}
    </div>
  );
}
