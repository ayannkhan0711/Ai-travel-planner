import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import SearchFilters from '../components/Search/SearchFilters';
import SortOptions from '../components/Results/SortOptions';
import FlightResults from '../components/Results/FlightResults';
import HotelResults from '../components/Results/HotelResults';
import TrainResults from '../components/Results/TrainResults';
import BusResults from '../components/Results/BusResults';
import TaxiResults from '../components/Results/TaxiResults';
import ActivityResults from '../components/Results/ActivityResults';
import { searchService } from '../services/searchService';
import { useBooking } from '../hooks/useBooking';

const TABS = [
  { key: 'flights', label: 'Flights', icon: '✈️' },
  { key: 'hotels', label: 'Hotels', icon: '🏨' },
  { key: 'trains', label: 'Rail', icon: '🚄' },
  { key: 'buses', label: 'Coaches', icon: '🚌' },
  { key: 'taxis', label: 'Cars', icon: '🚕' },
  { key: 'activities', label: 'Experiences', icon: '🎭' },
];

// Rich luxury mock datasets when offline or supplementing API results
const DEFAULT_FLIGHTS = [
  {
    id: 'fl-001',
    type: 'flight',
    airline: 'Emirates First Class',
    flightNumber: 'EK 004',
    aircraft: 'Airbus A380-800 Gamechanger',
    stops: 0,
    price: 4850,
    currency: 'USD',
    duration: '7h 15m',
    stopDetails: 'Direct Non-Stop Flight',
    features: ['Private enclosed suite', 'Onboard shower spa', 'Dom Pérignon vintage 2013', 'Bulgari amenity kit', 'Chauffeur-drive service'],
    origin: { code: 'JFK', time: '22:20', city: 'New York', terminal: 'Terminal 4' },
    destination: { code: 'LHR', time: '10:35', city: 'London Heathrow', terminal: 'Terminal 3' },
    carrier: 'Emirates',
    cabinClass: 'First Class Suite',
    rating: 4.98,
  },
  {
    id: 'fl-002',
    type: 'flight',
    airline: 'Singapore Airlines Suites',
    flightNumber: 'SQ 025',
    aircraft: 'Airbus A380 Double Bed Suite',
    stops: 0,
    price: 6200,
    currency: 'USD',
    duration: '7h 45m',
    stopDetails: 'Direct Non-Stop Flight',
    features: ['Standalone double bed', 'Lalique bespoke crystal', 'Caviar tasting service', 'Private check-in pavilion', 'Bang & Olufsen headphones'],
    origin: { code: 'JFK', time: '20:55', city: 'New York', terminal: 'Terminal 4' },
    destination: { code: 'FRA', time: '10:40', city: 'Frankfurt', terminal: 'Terminal 1' },
    carrier: 'Singapore Airlines',
    cabinClass: 'First Class Suite',
    rating: 4.99,
  },
  {
    id: 'fl-003',
    type: 'flight',
    airline: 'Air France La Première',
    flightNumber: 'AF 007',
    aircraft: 'Boeing 777-300ER',
    stops: 0,
    price: 5400,
    currency: 'USD',
    duration: '7h 30m',
    stopDetails: 'Direct Non-Stop Flight',
    features: ['Private haute couture suite', 'Michelin 3-Star dining', 'Sisley Paris beauty treatments', 'Porsche tarmac escort', 'Curated wine list'],
    origin: { code: 'JFK', time: '19:30', city: 'New York', terminal: 'Terminal 1' },
    destination: { code: 'CDG', time: '09:00', city: 'Paris Charles de Gaulle', terminal: 'Terminal 2E' },
    carrier: 'Air France',
    cabinClass: 'First Class Suite',
    rating: 4.97,
  },
  {
    id: 'fl-004',
    type: 'flight',
    airline: 'Qatar Airways Qsuite',
    flightNumber: 'QR 702',
    aircraft: 'Airbus A350-1000',
    stops: 1,
    price: 3600,
    currency: 'USD',
    duration: '11h 20m',
    stopDetails: '1 stop (Doha Al Mourjan Lounge 1h 45m)',
    features: ['Quad suite convertible bed', 'Diptyque amenities', 'Dine-on-demand', 'The Orchard garden lounge transfer', 'Oryx One 4K entertainment'],
    origin: { code: 'JFK', time: '21:00', city: 'New York', terminal: 'Terminal 8' },
    destination: { code: 'DXB', time: '18:20', city: 'Dubai', terminal: 'Terminal 3' },
    carrier: 'Qatar Airways',
    cabinClass: 'Business Premier',
    rating: 4.94,
  },
  {
    id: 'fl-005',
    type: 'flight',
    airline: 'VistaJet Private Fleet',
    flightNumber: 'VJ 882',
    aircraft: 'Bombardier Global 7500',
    stops: 0,
    price: 14500,
    currency: 'USD',
    duration: '6h 50m',
    stopDetails: 'Private FBO departure',
    features: ['Dedicated cabin hostess', 'Master stateroom with en-suite shower', 'Pet-friendly luxury', 'Bespoke Michelin catering', 'Zero customs queue'],
    origin: { code: 'TEB', time: '16:00', city: 'Teterboro FBO', terminal: 'Jet Aviation FBO' },
    destination: { code: 'LBG', time: '05:50', city: 'Paris Le Bourget', terminal: 'Signature Flight Support' },
    carrier: 'VistaJet',
    cabinClass: 'Private Jet / Helipad',
    rating: 5.0,
  },
];

const DEFAULT_HOTELS = [
  {
    id: 'ht-001',
    type: 'hotel',
    name: 'Four Seasons Hotel George V',
    location: '8st Avenue George V, 8th Arrondissement, Paris',
    roomType: 'Penthouse Presidential Suite with Eiffel View',
    pricePerNight: 3200,
    price: 3200,
    rating: '4.98',
    freeCancellation: 'Free cancellation until 48h before check-in',
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['3 Michelin-Starred Restaurants', 'Christian Le Squer gastronomy', 'Marble infinity courtyard pool', 'Private Butler service', 'Hermès bath amenities'],
  },
  {
    id: 'ht-002',
    type: 'hotel',
    name: 'Ritz Paris',
    location: '15 Place Vendôme, Paris',
    roomType: 'Suite Impériale & Private Salon',
    pricePerNight: 4100,
    price: 4100,
    rating: '4.99',
    freeCancellation: 'Complimentary cancellation 7 days prior',
    reviewCount: 512,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    amenities: ['Chanel Spa au Ritz Paris', 'Bar Hemingway', 'Private garden terrace', 'Grand piano salon', 'Rolls-Royce house transfer'],
  },
  {
    id: 'ht-003',
    type: 'hotel',
    name: 'The Connaught Mayfair',
    location: 'Carlos Place, Mayfair, London',
    roomType: 'The Mews Heritage Suite',
    pricePerNight: 2450,
    price: 2450,
    rating: '4.96',
    freeCancellation: 'Free cancellation until 24h prior',
    reviewCount: 388,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    amenities: ['Hélène Darroze 3-Star Michelin', 'Connaught Bar martini trolley', 'Aman Spa healing baths', 'Chauffeured towncar', '24h butler'],
  },
];

const DEFAULT_TRAINS = [
  {
    id: 'tr-001',
    type: 'train',
    name: 'Venice Simplon-Orient-Express',
    trainNumber: 'OE-101',
    operator: 'Belmond Orient-Express',
    coachClass: 'Grand Suite (Art Deco Historic Carriage)',
    price: 2450,
    origin: { city: 'Paris', station: 'Gare de l’Est', time: '09:20' },
    destination: { city: 'Venice', station: 'Santa Lucia', time: '18:35' },
    duration: '9h 15m',
    amenities: ['24-hour personal cabin steward', 'Free-flowing vintage champagne', 'Lalique crystal dining car', 'Private marble bathroom', 'Midnight brunch in car 3309'],
  },
  {
    id: 'tr-002',
    type: 'train',
    name: 'Eurostar Premier Class',
    trainNumber: 'ES-9014',
    operator: 'Eurostar International',
    coachClass: 'Business Premier Carriage 01',
    price: 420,
    origin: { city: 'London', station: 'St Pancras International', time: '11:01' },
    destination: { city: 'Paris', station: 'Gare du Nord', time: '14:18' },
    duration: '2h 17m',
    amenities: ['Raymond Blanc three-course menu', 'Fast-track priority gate 10m check-in', 'Access to Business Premier Lounges', 'Spacious ergonomic recliners'],
  },
  {
    id: 'tr-003',
    type: 'train',
    name: 'Glacier Express Excellence Class',
    trainNumber: 'GEX-902',
    operator: 'Rhaetian Railway & MGB',
    coachClass: 'Excellence Panorama Carriage',
    price: 980,
    origin: { city: 'Zermatt', station: 'Zermatt Alpine Hub', time: '08:52' },
    destination: { city: 'St. Moritz', station: 'St. Moritz Bahnhof', time: '16:38' },
    duration: '7h 46m',
    amenities: ['Guaranteed window seat', '7-Course regional menu with wine pairing', 'Glacier bar with gold leaf ceiling', 'Concierge tour escort'],
  },
];

const DEFAULT_BUSES = [
  {
    id: 'bs-001',
    type: 'bus',
    name: 'The Royal Sovereign VIP Coach',
    operator: 'Voyager Luxe Grand Tourers',
    busType: 'Double-Decker Platinum Sleeper',
    price: 240,
    rating: '4.92',
    departureTime: '21:30',
    duration: '7h 45m',
    arrivalTime: '05:15 (+1)',
    amenities: ['Individual leather privacy pods', 'High-speed Starlink WiFi', 'Onboard attendant & espresso bar', 'Full-flat lie-down bedding', 'Noise-cancelling audio'],
  },
  {
    id: 'bs-002',
    type: 'bus',
    name: 'Alpine Panoramic Executive Shuttle',
    operator: 'Helvetia Luxury Transit',
    busType: 'Glass-Roof VIP Sprinter',
    price: 195,
    rating: '4.89',
    departureTime: '10:00',
    duration: '3h 30m',
    arrivalTime: '13:30',
    amenities: ['Retractable glass roof for mountain views', 'Leather club chairs with 180° swivel', 'Curated Swiss cheese & wine service', 'Ski equipment safe storage'],
  },
];

const DEFAULT_TAXIS = [
  {
    id: 'tx-001',
    type: 'taxi',
    vehicleModel: 'Rolls-Royce Phantom VIII',
    provider: 'Voyager Chauffeur Privé',
    vehicleClass: 'Ultra-Luxury Bespoke Chauffeur',
    capacity: 'Up to 3 Guests + 4 Luggage',
    price: 650,
    rating: '5.0',
    chauffeur: 'Jean-Luc Moreau (English, French, Italian fluent)',
    features: ['Starlight headliner ceiling', 'Champagne cooler with flutes', 'Airport airside tarmac pass', 'High-security discreet transport'],
  },
  {
    id: 'tx-002',
    type: 'taxi',
    vehicleModel: 'Mercedes-Maybach S 680 4MATIC',
    provider: 'Silver Arrow VIP Fleet',
    vehicleClass: 'Executive First Class Chauffeur',
    capacity: 'Up to 3 Guests',
    price: 420,
    rating: '4.97',
    chauffeur: 'Alexander Wright (Diplomatic driving certified)',
    features: ['Executive rear recliner with calf rest', 'Burmester 4D surround sound', 'Silver-plated champagne flutes', 'Heated neck & shoulder cushions'],
  },
  {
    id: 'tx-003',
    type: 'taxi',
    vehicleModel: 'Riva Aquarama Private Yacht Transfer',
    provider: 'Riviera Water Chauffeurs',
    vehicleClass: 'Venetian Mahogany Motor Yacht',
    capacity: 'Up to 6 Guests',
    price: 1100,
    rating: '4.99',
    chauffeur: 'Captain Marco Bellini (Master Mariner)',
    features: ['Direct pier landing to hotel private water dock', 'Vintage 1968 polished mahogany hull', 'Complimentary Prosecco di Valdobbiadene'],
  },
];

const DEFAULT_ACTIVITIES = [
  {
    id: 'act-001',
    type: 'activity',
    title: 'Private After-Hours Château de Versailles Tour & Hall of Mirrors Access',
    category: 'VIP Royal Culture',
    duration: '4 Hours',
    price: 1250,
    rating: '4.99',
    image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Zero crowd private access after palace closure', 'Historic state apartments illuminated by candlelight', 'Private classical violin quartet recital', 'Dom Pérignon reception in the Queen’s Antechamber'],
  },
  {
    id: 'act-002',
    type: 'activity',
    title: 'Helicopter Flight over Mont Blanc & Glacier Champagne Picnic',
    category: 'Alpine Adventure',
    duration: '3.5 Hours',
    price: 1850,
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Twin-engine Airbus H130 panoramic aircraft', 'Touchdown on untouched high glacier', 'Caviar & Krug champagne tasting table', 'Professional mountain photographer included'],
  },
  {
    id: 'act-003',
    type: 'activity',
    title: 'Bespoke Perfume Atelier with Master Nez in Grasse',
    category: 'Artisan Workshop',
    duration: '3 Hours',
    price: 750,
    rating: '4.95',
    image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Creation of personal signature eau de parfum', 'Access to rare centifolia rose and jasmine absolutes', 'Engraved crystal flacon in velvet box', 'Formula archived indefinitely for reorders'],
  },
];

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { startBooking } = useBooking();

  const initialTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(
    initialTab && TABS.some((t) => t.key === initialTab) ? initialTab : 'flights'
  );
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState('recommended');
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    maxPrice: 8000,
    nonStopOnly: false,
    privateChauffeurIncluded: false,
    cabinClass: 'all',
    carrier: 'all',
    ratingMin: 4.5,
  });

  const from = searchParams.get('from') || 'New York (JFK)';
  const to = searchParams.get('to') || 'Paris (CDG)';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

  // Raw data stores
  const [flights, setFlights] = useState(DEFAULT_FLIGHTS);
  const [hotels, setHotels] = useState(DEFAULT_HOTELS);
  const [trains, setTrains] = useState(DEFAULT_TRAINS);
  const [buses, setBuses] = useState(DEFAULT_BUSES);
  const [taxis, setTaxis] = useState(DEFAULT_TAXIS);
  const [activities, setActivities] = useState(DEFAULT_ACTIVITIES);

  // Fetch live results if server is available, else keep rich defaults
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        if (activeTab === 'flights') {
          const res = await searchService.searchFlights({ origin: from, destination: to, date });
          if (isMounted && res && res.length > 0) setFlights(res);
        } else if (activeTab === 'hotels') {
          const res = await searchService.searchHotels({ destination: to, checkIn: date });
          if (isMounted && res && res.length > 0) setHotels(res);
        } else if (activeTab === 'trains') {
          const res = await searchService.searchTrains({ origin: from, destination: to, date });
          if (isMounted && res && res.length > 0) setTrains(res);
        } else if (activeTab === 'buses') {
          const res = await searchService.searchBuses({ origin: from, destination: to, date });
          if (isMounted && res && res.length > 0) setBuses(res);
        } else if (activeTab === 'taxis') {
          const res = await searchService.searchTaxis({ origin: from, destination: to, date });
          if (isMounted && res && res.length > 0) setTaxis(res);
        } else if (activeTab === 'activities') {
          const res = await searchService.searchActivities({ destination: to });
          if (isMounted && res && res.length > 0) setActivities(res);
        }
      } catch (err) {
        // Fallbacks already in state
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, [activeTab, from, to, date]);

  // Handler for booking item selection
  const handleSelectItem = (item) => {
    startBooking({
      ...item,
      origin: { city: from, code: from.split(' ')[0] },
      destination: { city: to, code: to.split(' ')[0] },
      date: date,
    });
    navigate('/booking');
  };

  // Filter and sort items according to current tab
  const filteredFlights = useMemo(() => {
    return flights
      .filter((f) => {
        if (f.price > filters.maxPrice) return false;
        if (filters.nonStopOnly && f.stops > 0) return false;
        if (filters.carrier !== 'all' && f.carrier && !f.carrier.toLowerCase().includes(filters.carrier.toLowerCase())) return false;
        if (filters.cabinClass !== 'all' && f.cabinClass && f.cabinClass !== filters.cabinClass) return false;
        if (f.rating && Number(f.rating) < filters.ratingMin) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        return 0;
      });
  }, [flights, filters, sortBy]);

  const filteredHotels = useMemo(() => {
    return hotels
      .filter((h) => {
        const p = h.pricePerNight || h.price || 0;
        if (p > filters.maxPrice) return false;
        if (h.rating && Number(h.rating) < filters.ratingMin) return false;
        return true;
      })
      .sort((a, b) => {
        const pa = a.pricePerNight || a.price || 0;
        const pb = b.pricePerNight || b.price || 0;
        if (sortBy === 'price_asc') return pa - pb;
        if (sortBy === 'price_desc') return pb - pa;
        if (sortBy === 'rating') return Number(b.rating || 5) - Number(a.rating || 5);
        return 0;
      });
  }, [hotels, filters, sortBy]);

  const filteredTrains = useMemo(() => {
    return trains
      .filter((t) => (t.price || 0) <= filters.maxPrice)
      .sort((a, b) => (sortBy === 'price_asc' ? a.price - b.price : sortBy === 'price_desc' ? b.price - a.price : 0));
  }, [trains, filters, sortBy]);

  const filteredBuses = useMemo(() => {
    return buses
      .filter((b) => (b.price || 0) <= filters.maxPrice)
      .sort((a, b) => (sortBy === 'price_asc' ? a.price - b.price : sortBy === 'price_desc' ? b.price - a.price : 0));
  }, [buses, filters, sortBy]);

  const filteredTaxis = useMemo(() => {
    return taxis
      .filter((tx) => (tx.price || 0) <= filters.maxPrice)
      .sort((a, b) => (sortBy === 'price_asc' ? a.price - b.price : sortBy === 'price_desc' ? b.price - a.price : 0));
  }, [taxis, filters, sortBy]);

  const filteredActivities = useMemo(() => {
    return activities
      .filter((act) => (act.price || 0) <= filters.maxPrice)
      .sort((a, b) => (sortBy === 'price_asc' ? a.price - b.price : sortBy === 'price_desc' ? b.price - a.price : 0));
  }, [activities, filters, sortBy]);

  const totalResults = useMemo(() => {
    switch (activeTab) {
      case 'flights': return filteredFlights.length;
      case 'hotels': return filteredHotels.length;
      case 'trains': return filteredTrains.length;
      case 'buses': return filteredBuses.length;
      case 'taxis': return filteredTaxis.length;
      case 'activities': return filteredActivities.length;
      default: return 0;
    }
  }, [activeTab, filteredFlights, filteredHotels, filteredTrains, filteredBuses, filteredTaxis, filteredActivities]);

  return (
    <div className="min-h-screen bg-luxury-offwhite">
      {/* Results Header */}
      <section className="bg-gradient-to-r from-luxury-brown to-luxury-brownDark py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <Link to="/search" className="hover:text-white transition-colors">← Back to Search</Link>
              </div>
              <h1 className="font-serif text-3xl font-bold text-white">
                {from} <span className="text-luxury-goldLight mx-2">→</span> {to}
              </h1>
              <p className="text-white/60 text-sm mt-1">
                {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <Link to="/search" className="btn-outline border-white/30 text-white hover:bg-white/10 py-2 px-5 text-sm">
              Modify Search
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-1 scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-white text-luxury-brown shadow-luxury font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Results Body */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} w-72 flex-shrink-0 hidden lg:block`}>
            <div className="sticky top-28">
              <SearchFilters
                filters={filters}
                setFilters={setFilters}
                onApply={() => {}}
              />
            </div>
          </aside>

          {/* Results Content */}
          <div className="flex-1 min-w-0">
            {/* Sort Bar */}
            <SortOptions
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalResults={totalResults}
            />

            {/* Mobile filter toggle */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline w-full py-2 px-4 text-xs font-semibold"
              >
                {showFilters ? 'Hide Filters ▲' : 'Show Refine Filters ▼'}
              </button>
              {showFilters && (
                <div className="mt-3">
                  <SearchFilters filters={filters} setFilters={setFilters} />
                </div>
              )}
            </div>

            {/* Result Cards Display */}
            {loading ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-[#F5E6D3] p-8 shadow-sm">
                <div className="w-10 h-10 border-4 border-luxury-brown border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="font-serif text-lg text-luxury-brown font-semibold">Aggregating VIP Providers...</p>
                <p className="text-xs text-gray-400 mt-1">Checking Amadeus, Belmond, Private Fleets & Palace Suites</p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {activeTab === 'flights' && (
                  <FlightResults
                    flights={filteredFlights}
                    onSelectFlight={handleSelectItem}
                  />
                )}
                {activeTab === 'hotels' && (
                  <HotelResults
                    hotels={filteredHotels}
                    onSelectHotel={handleSelectItem}
                  />
                )}
                {activeTab === 'trains' && (
                  <TrainResults
                    trains={filteredTrains}
                    onSelectTrain={handleSelectItem}
                  />
                )}
                {activeTab === 'buses' && (
                  <BusResults
                    buses={filteredBuses}
                    onSelectBus={handleSelectItem}
                  />
                )}
                {activeTab === 'taxis' && (
                  <TaxiResults
                    taxis={filteredTaxis}
                    onSelectTaxi={handleSelectItem}
                  />
                )}
                {activeTab === 'activities' && (
                  <ActivityResults
                    activities={filteredActivities}
                    onSelectActivity={handleSelectItem}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
