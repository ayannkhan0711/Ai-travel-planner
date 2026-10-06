import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HERO_DESTINATIONS = [
  {
    name: 'Santorini',
    country: 'Greece',
    tagline: 'Aegean Serenity',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1920&q=80',
    gradient: 'from-blue-900/60 via-blue-900/30 to-transparent',
  },
  {
    name: 'Kyoto',
    country: 'Japan',
    tagline: 'Timeless Tranquility',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80',
    gradient: 'from-emerald-900/60 via-emerald-900/30 to-transparent',
  },
  {
    name: 'Amalfi Coast',
    country: 'Italy',
    tagline: 'Mediterranean Majesty',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1920&q=80',
    gradient: 'from-amber-900/60 via-amber-900/30 to-transparent',
  },
];

const TRAVEL_MODES = [
  { icon: '✈', label: 'Flights', key: 'flights', desc: 'First class & private jets', color: 'from-sky-500 to-blue-600' },
  { icon: '🏨', label: 'Hotels', key: 'hotels', desc: 'Five-star & boutique stays', color: 'from-amber-500 to-orange-600' },
  { icon: '🚄', label: 'Rail', key: 'trains', desc: 'Orient Express & high-speed', color: 'from-emerald-500 to-green-600' },
  { icon: '🚌', label: 'Coaches', key: 'buses', desc: 'Luxury motorcoach tours', color: 'from-violet-500 to-purple-600' },
  { icon: '🚕', label: 'Private Cars', key: 'taxis', desc: 'Chauffeur & limousine', color: 'from-rose-500 to-red-600' },
  { icon: '🎭', label: 'Experiences', key: 'activities', desc: 'Curated cultural & adventure', color: 'from-teal-500 to-cyan-600' },
];

const FEATURED_JOURNEYS = [
  {
    title: 'Swiss Alps & Italian Lakes',
    duration: '10 nights',
    price: '$12,500',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
    tags: ['Rail', 'Boutique Hotels', 'Gourmet'],
  },
  {
    title: 'Bali Temple & Beach Retreat',
    duration: '7 nights',
    price: '$6,800',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    tags: ['Villa', 'Wellness', 'Culture'],
  },
  {
    title: 'Patagonia Wilderness Expedition',
    duration: '12 nights',
    price: '$18,200',
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=800&q=80',
    tags: ['Adventure', 'Lodge', 'Nature'],
  },
  {
    title: 'Moroccan Imperial Cities',
    duration: '8 nights',
    price: '$8,900',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80',
    tags: ['Riad', 'Desert', 'Heritage'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Charlotte D.',
    role: 'Centurion Member',
    quote: 'Voyager Luxe turned our anniversary into a once-in-a-lifetime journey through the Greek islands. The seamless multi-modal booking was extraordinary.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    name: 'Alexander M.',
    role: 'Platinum Member',
    quote: 'From private jets to Orient Express cabins — all booked in one place. This platform understands luxury travel intimately.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    name: 'Priya K.',
    role: 'Diamond Member',
    quote: 'The itinerary builder is genius. It planned a flawless 15-day Asia circuit with trains, boutique hotels, and cultural experiences.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

export default function HomePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [heroIndex, setHeroIndex] = useState(0);
  const [quickFrom, setQuickFrom] = useState('');
  const [quickTo, setQuickTo] = useState('');
  const [quickDate, setQuickDate] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_DESTINATIONS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const fromVal = quickFrom || 'New York (JFK)';
    const toVal = quickTo || 'Paris (CDG)';
    const dateVal = quickDate || new Date().toISOString().split('T')[0];
    navigate(`/results?from=${encodeURIComponent(fromVal)}&to=${encodeURIComponent(toVal)}&date=${dateVal}`);
  };

  const currentHero = HERO_DESTINATIONS[heroIndex];

  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        {/* Background Images with Crossfade */}
        {HERO_DESTINATIONS.map((dest, i) => (
          <div
            key={dest.name}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{ opacity: i === heroIndex ? 1 : 0 }}
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-full object-cover scale-105"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${dest.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Destination Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <span className="w-2 h-2 bg-luxury-gold rounded-full animate-pulse" />
              <span className="text-white/90 text-xs font-medium tracking-wider uppercase">
                {currentHero.tagline} — {currentHero.name}, {currentHero.country}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-[1.08] mb-5 tracking-tight">
              Your Journey,
              <br />
              <span className="bg-gradient-to-r from-luxury-goldLight via-luxury-gold to-luxury-copper bg-clip-text text-transparent">
                Elevated
              </span>
            </h1>
            <p className="text-lg text-white/80 max-w-xl font-light leading-relaxed mb-8">
              Unify flights, hotels, rail, private cars, and curated experiences
              into one seamless luxury itinerary. Powered by intelligent aggregation.
            </p>

            {/* Quick Search Bar */}
            <form
              onSubmit={handleQuickSearch}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-2 flex flex-col sm:flex-row items-stretch gap-2 border border-white/20 shadow-2xl max-w-2xl"
            >
              <input
                type="text"
                placeholder="From — city or airport"
                value={quickFrom}
                onChange={(e) => setQuickFrom(e.target.value)}
                className="flex-1 bg-white/90 rounded-xl px-4 py-3.5 text-sm text-luxury-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold/40"
              />
              <input
                type="text"
                placeholder="To — destination"
                value={quickTo}
                onChange={(e) => setQuickTo(e.target.value)}
                className="flex-1 bg-white/90 rounded-xl px-4 py-3.5 text-sm text-luxury-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-luxury-gold/40"
              />
              <input
                type="date"
                value={quickDate}
                onChange={(e) => setQuickDate(e.target.value)}
                className="bg-white/90 rounded-xl px-4 py-3.5 text-sm text-luxury-dark focus:outline-none focus:ring-2 focus:ring-luxury-gold/40"
              />
              <button
                type="submit"
                className="bg-gold-gradient hover:opacity-90 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-glow hover:shadow-lg active:scale-[0.98]"
              >
                Search
              </button>
            </form>
          </div>

          {/* Hero Dots Navigation */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            {HERO_DESTINATIONS.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  i === heroIndex
                    ? 'bg-luxury-gold w-8'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TRAVEL MODES GRID ═══════════════════════ */}
      <section className="py-20 bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-luxury-gold text-sm font-semibold tracking-widest uppercase">All Modes, One Platform</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-luxury-dark mt-3">
              Multi-Modal <span className="text-luxury-brown">Travel Aggregation</span>
            </h2>
            <p className="text-luxury-muted mt-4 max-w-xl mx-auto">
              Search across flights, hotels, railways, coaches, private cars, and experiences — unified in one intelligent search.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TRAVEL_MODES.map((mode) => (
              <Link
                to={`/results?tab=${mode.key}`}
                key={mode.label}
                className="group luxury-card p-6 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-3xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {mode.icon}
                </div>
                <h3 className="font-semibold text-luxury-dark text-sm">{mode.label}</h3>
                <p className="text-xs text-luxury-muted mt-1 leading-snug">{mode.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ WELCOME / USER STATS ═══════════════════════ */}
      {user && (
        <section className="py-12 bg-gradient-to-r from-luxury-brown/5 via-luxury-beige/30 to-luxury-brown/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8">
              <img
                src={user.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={user.firstName}
                className="w-20 h-20 rounded-full object-cover border-2 border-luxury-gold shadow-glow"
              />
              <div className="flex-1">
                <h3 className="font-serif text-2xl font-bold text-luxury-dark">
                  Welcome back, {user.firstName}
                </h3>
                <p className="text-luxury-muted text-sm mt-1">Centurion Member — Your next adventure awaits</p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-luxury-brown">{(user.loyaltyPoints || 48500).toLocaleString()}</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Loyalty Points</p>
                </div>
                <div className="w-px bg-luxury-border" />
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-luxury-brown">{(user.airlineMiles || 64200).toLocaleString()}</p>
                  <p className="text-[10px] uppercase tracking-widest text-luxury-muted">Airline Miles</p>
                </div>
              </div>
              <Link to="/dashboard" className="btn-gold py-2.5 px-6 text-sm whitespace-nowrap">
                Member Dashboard
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════ FEATURED JOURNEYS ═══════════════════════ */}
      <section className="py-20 bg-luxury-offwhite">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-luxury-gold text-sm font-semibold tracking-widest uppercase">Curated by Our Editors</span>
              <h2 className="font-serif text-4xl font-bold text-luxury-dark mt-2">
                Featured Journeys
              </h2>
            </div>
            <Link to="/search" className="btn-outline py-2 px-5 text-sm hidden md:inline-flex">
              View All Journeys →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_JOURNEYS.map((journey) => (
              <Link
                to="/search"
                key={journey.title}
                className="group luxury-card overflow-hidden hover:-translate-y-2 transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={journey.image}
                    alt={journey.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="text-white text-lg font-serif font-bold drop-shadow-lg">{journey.price}</span>
                    <span className="text-white/80 text-xs">{journey.duration}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-luxury-dark group-hover:text-luxury-brown transition-colors">
                    {journey.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {journey.tags.map((tag) => (
                      <span key={tag} className="badge-gold text-[10px]">{tag}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ PLATFORM FEATURES ═══════════════════════ */}
      <section className="py-20 bg-luxury-cream">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-luxury-gold text-sm font-semibold tracking-widest uppercase">Why Voyager Luxe</span>
            <h2 className="font-serif text-4xl font-bold text-luxury-dark mt-3">
              The Intelligent Travel Platform
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Itinerary',
                desc: 'Our algorithms build personalized day-by-day itineraries, optimizing routes, timings, and budget across all transport modes.',
              },
              {
                icon: '🔒',
                title: 'Secure Document Vault',
                desc: 'Store passports, visas, and travel insurance digitally. Auto-fill booking forms and receive expiry reminders.',
              },
              {
                icon: '📊',
                title: 'Price Intelligence',
                desc: 'Real-time fare tracking across 500+ providers. Get alerts when prices drop for your saved routes.',
              },
              {
                icon: '🌐',
                title: 'Multi-Modal Search',
                desc: 'Search flights, hotels, trains, buses, taxis, and experiences simultaneously. Compare across every option.',
              },
              {
                icon: '🛡️',
                title: 'Travel Protection',
                desc: 'Comprehensive travel insurance with one-click purchase. Medical, cancellation, and baggage coverage.',
              },
              {
                icon: '💎',
                title: 'Loyalty Integration',
                desc: 'Earn and track points across airline, hotel, and reward programs. Redeem seamlessly at checkout.',
              },
            ].map((feature) => (
              <div key={feature.title} className="luxury-card p-8 text-center hover:-translate-y-1 transition-all duration-300">
                <span className="text-4xl block mb-4">{feature.icon}</span>
                <h3 className="font-serif text-xl font-bold text-luxury-dark mb-3">{feature.title}</h3>
                <p className="text-sm text-luxury-muted leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section className="py-20 bg-luxury-offwhite">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-luxury-gold text-sm font-semibold tracking-widest uppercase">Traveler Stories</span>
            <h2 className="font-serif text-4xl font-bold text-luxury-dark mt-3">
              Cherished by Discerning Travelers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="luxury-card p-8 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-luxury-gold text-lg">★</span>
                  ))}
                </div>
                <blockquote className="text-sm text-luxury-dark/80 leading-relaxed italic flex-1">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-luxury-border">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-bold text-luxury-dark">{t.name}</p>
                    <p className="text-[11px] text-luxury-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ CALL TO ACTION ═══════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-luxury-brownDark/85 to-luxury-brown/70" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-5">
            Begin Your Extraordinary Journey
          </h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Join thousands of discerning travelers who trust Voyager Luxe to orchestrate flawless, multi-modal adventures across the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search" className="btn-gold py-4 px-10 text-base">
              Start Planning →
            </Link>
            <Link to="/itinerary" className="inline-flex items-center justify-center px-10 py-4 rounded-xl border border-white/30 text-white hover:bg-white/10 font-medium transition-all duration-300 text-base">
              Build Itinerary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
