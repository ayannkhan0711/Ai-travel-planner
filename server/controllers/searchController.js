const amadeusService = require('../services/amadeusService');
const rome2rioService = require('../services/rome2rioService');
const cache = require('../config/redis');

// Saved searches in-memory / cache fallback
let savedSearchesStore = [
  {
    id: 'saved-1',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    title: 'Autumn in Hernur & Panling',
    origin: 'New York (JFK)',
    destination: 'Hernur Grand Riviera',
    departureDate: '2026-11-20',
    returnDate: '2026-11-27',
    category: 'multi-modal',
    passengers: 2,
    cabinClass: 'First Class',
    savedAt: new Date(),
  },
  {
    id: 'saved-2',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    title: 'Vouke Chalet & Glacier Ski Hop',
    origin: 'Geneva (GVA)',
    destination: 'Vouke Alpine Reserve',
    departureDate: '2026-12-15',
    returnDate: '2026-12-22',
    category: 'hotel',
    passengers: 4,
    cabinClass: 'VIP Helicopter + Suite',
    savedAt: new Date(),
  },
];

// @desc Multi-modal trip search (Universal: flights + rail + taxi + hotels)
// @route GET /api/search/multi-modal
exports.searchMultiModal = async (req, res, next) => {
  try {
    const { origin = 'London', destination = 'Paris', date = '2026-11-15' } = req.query;
    const routes = await rome2rioService.searchMultiModal(origin, destination, date);

    res.status(200).json({
      success: true,
      query: { origin, destination, date },
      count: routes.length,
      data: routes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Flight search (Amadeus)
// @route GET /api/search/flights
exports.searchFlights = async (req, res, next) => {
  try {
    const { origin = 'JFK', destination = 'CDG', date = '2026-11-15', cabinClass = 'First' } = req.query;
    const flights = await amadeusService.searchFlights(origin, destination, date, cabinClass);

    res.status(200).json({
      success: true,
      query: { origin, destination, date, cabinClass },
      count: flights.length,
      data: flights,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Railway search (RailYatri / Amadeus Rail)
// @route GET /api/search/trains
exports.searchTrains = async (req, res, next) => {
  try {
    const { origin = 'Paris Gare de Lyon', destination = 'Milan Centrale', date = '2026-11-15' } = req.query;
    const trains = [
      {
        id: 'trn-001',
        name: 'Venice Simplon-Orient-Express',
        trainNumber: 'OE-101',
        origin: { station: origin, time: '09:15', city: 'Paris' },
        destination: { station: destination, time: '16:40', city: 'Milan' },
        duration: '7h 25m',
        coachClass: 'Grand Suite (Historic Art Deco)',
        price: 1850,
        currency: 'USD',
        operator: 'Belmond Orient-Express',
        amenities: ['Private marble bathroom', '24-hour steward', 'Free-flowing champagne', 'Fine crystal dining car'],
        seatsAvailable: 2,
      },
      {
        id: 'trn-002',
        name: 'Frecciarossa 1000 Executive Class',
        trainNumber: 'FR-9540',
        origin: { station: origin, time: '11:20', city: 'Paris' },
        destination: { station: destination, time: '18:10', city: 'Milan' },
        duration: '6h 50m',
        coachClass: 'Executive Lounge (10 Single Leather Recliners)',
        price: 380,
        currency: 'USD',
        operator: 'Trenitalia / SNCF',
        amenities: ['Rotating leather swivel chair', 'Meeting room onboard', 'Espresso bar & hot meal service', 'VIP station lounge'],
        seatsAvailable: 5,
      },
      {
        id: 'trn-003',
        name: 'TGV Lyria Premiere 1ère',
        trainNumber: 'TGV-9218',
        origin: { station: origin, time: '14:05', city: 'Paris' },
        destination: { station: destination, time: '21:15', city: 'Milan' },
        duration: '7h 10m',
        coachClass: 'Business 1ère Silence Salon',
        price: 320,
        currency: 'USD',
        operator: 'Lyria High-Speed',
        amenities: ['Quiet workspace', 'At-seat warm dining', 'Gourmet cellar selection'],
        seatsAvailable: 4,
      },
    ];

    res.status(200).json({
      success: true,
      query: { origin, destination, date },
      count: trains.length,
      data: trains,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Bus search (Busbud / Ixigo Luxury coaches)
// @route GET /api/search/buses
exports.searchBuses = async (req, res, next) => {
  try {
    const { origin = 'Zurich', destination = 'Milan', date = '2026-11-15' } = req.query;
    const buses = [
      {
        id: 'bus-001',
        name: 'Voyager Royale Sleeper Coach',
        operator: 'Voyager Luxe Lines',
        busType: 'Double-Decker VIP Panoramic Sleeper',
        departureTime: '22:30',
        arrivalTime: '06:00',
        duration: '7h 30m',
        price: 160,
        currency: 'USD',
        rating: 4.9,
        amenities: ['Private cubicle capsule', 'Memory foam mattress', 'Noise-cancelling headphones', 'Lavazza espresso machine', 'En-suite private washroom'],
      },
      {
        id: 'bus-002',
        name: 'Alps Executive Cruiser',
        operator: 'Busbud Platinum Select',
        busType: 'Single-Aisle 2+1 Leather Recliners',
        departureTime: '08:00',
        arrivalTime: '12:30',
        duration: '4h 30m',
        price: 110,
        currency: 'USD',
        rating: 4.8,
        amenities: ['Full 160-degree recline', 'Panoramic alpine skyroof', 'Wi-Fi 6', 'Complimentary charcuterie box'],
      },
    ];

    res.status(200).json({
      success: true,
      query: { origin, destination, date },
      count: buses.length,
      data: buses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Hotel search (Amadeus)
// @route GET /api/search/hotels
exports.searchHotels = async (req, res, next) => {
  try {
    const { city = 'Paris', checkIn = '2026-11-15', checkOut = '2026-11-20', guests = 2 } = req.query;
    const hotels = await amadeusService.searchHotels(city, checkIn, checkOut, guests);

    res.status(200).json({
      success: true,
      query: { city, checkIn, checkOut, guests },
      count: hotels.length,
      data: hotels,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Taxi/car rental search (GetTransfer)
// @route GET /api/search/taxis
exports.searchTaxis = async (req, res, next) => {
  try {
    const { pickup = 'Nice Airport', dropoff = 'Monaco Yacht Club', date = '2026-11-15' } = req.query;
    const taxis = [
      {
        id: 'tx-001',
        provider: 'GetTransfer Premier / Voyager Fleet',
        vehicleModel: 'Rolls-Royce Phantom VIII',
        vehicleClass: 'Ultra-Luxury Bespoke',
        capacity: '3 Passengers, 4 Bags',
        chauffeur: 'English & French speaking private bodyguard-driver',
        price: 490,
        currency: 'USD',
        rating: 5.0,
        features: ['Complimentary Dom Pérignon', 'In-car Wi-Fi & iPad', 'Flight delay guarantee', 'Door-to-lounge escort'],
      },
      {
        id: 'tx-002',
        provider: 'Blacklane Global Elite',
        vehicleModel: 'Mercedes-Maybach S-Class',
        vehicleClass: 'First Class Sedan',
        capacity: '3 Passengers, 3 Bags',
        chauffeur: 'Certified executive chauffeur',
        price: 280,
        currency: 'USD',
        rating: 4.95,
        features: ['60-minute complimentary airport wait', 'Bottled San Pellegrino', 'Climate-controlled cabin'],
      },
      {
        id: 'tx-003',
        provider: 'Voyager Green Elite',
        vehicleModel: 'Porsche Taycan Turbo Cross Turismo',
        vehicleClass: 'Zero-Emission Luxury Grand Tourer',
        capacity: '3 Passengers, 2 Bags',
        chauffeur: 'Professional performance chauffeur',
        price: 240,
        currency: 'USD',
        rating: 4.92,
        features: ['100% Electric Whisper Ride', 'Panoramic Glass Roof', 'Burmester High-End 3D Sound'],
      },
    ];

    res.status(200).json({
      success: true,
      query: { pickup, dropoff, date },
      count: taxis.length,
      data: taxis,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Activities & tours (OpenTripMap / Viator)
// @route GET /api/search/activities
exports.searchActivities = async (req, res, next) => {
  try {
    const { destination = 'Paris' } = req.query;
    const activities = [
      {
        id: 'act-001',
        title: 'Private After-Hours Louvre Tour with Head Curator',
        category: 'Art & Heritage',
        duration: '3 hours',
        rating: 5.0,
        reviewsCount: 128,
        price: 1200,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80',
        highlights: ['Complete solitude with Mona Lisa', 'Secret vault access', 'Private champagne toast under glass pyramid'],
      },
      {
        id: 'act-002',
        title: 'Sunset Yacht Charter with Private Caviar Sommelier',
        category: 'Private Sailing',
        duration: '4 hours',
        rating: 4.98,
        reviewsCount: 94,
        price: 1850,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        highlights: ['Grown Caspian Oscietra tasting', 'Dedicated captain & deck crew', 'Custom playlist & mood lighting'],
      },
      {
        id: 'act-003',
        title: 'Helicopter Flight Over Château Country & Private Vineyard Landing',
        category: 'Aviation & Gastronomy',
        duration: '5 hours',
        rating: 4.96,
        reviewsCount: 76,
        price: 2600,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
        highlights: ['Touchdown at Grand Cru Estate', 'Rare vintage cellar tasting with owner', 'Helicopter pilot narration'],
      },
    ];

    res.status(200).json({
      success: true,
      destination,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Restaurant search (TheFork / Michelin Guide equivalent)
// @route GET /api/search/restaurants
exports.searchRestaurants = async (req, res, next) => {
  try {
    const { destination = 'Paris' } = req.query;
    const restaurants = [
      {
        id: 'rst-001',
        name: 'Le Gabriel - La Réserve',
        michelinStars: 3,
        cuisine: 'Haute French Gastronomy',
        priceTier: '$$$$',
        rating: 4.96,
        address: '42 Avenue Gabriel, Paris',
        chef: 'Jérôme Banctel',
        tableAvailability: 'VIP Concierge Reserved Table tonight 20:30',
        image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80',
      },
      {
        id: 'rst-002',
        name: 'Plénitude - Cheval Blanc',
        michelinStars: 3,
        cuisine: 'Sauce-Centric Culinary Symphony',
        priceTier: '$$$$',
        rating: 4.99,
        address: '8 Quai du Louvre, Paris',
        chef: 'Arnaud Donckele',
        tableAvailability: 'Exclusive Chef Counter reserved for Voyager Luxe guests',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      },
    ];

    res.status(200).json({
      success: true,
      destination,
      count: restaurants.length,
      data: restaurants,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get saved searches
// @route GET /api/search/saved
exports.getSavedSearches = async (req, res) => {
  res.status(200).json({
    success: true,
    count: savedSearchesStore.length,
    data: savedSearchesStore,
  });
};

// @desc Save a search
// @route POST /api/search/save
exports.saveSearch = async (req, res) => {
  const newSave = {
    id: `saved-${Date.now()}`,
    userId: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
    title: req.body.title || `${req.body.origin || 'Search'} to ${req.body.destination || 'Destination'}`,
    ...req.body,
    savedAt: new Date(),
  };
  savedSearchesStore.unshift(newSave);

  res.status(201).json({
    success: true,
    message: 'Search successfully saved to your Voyager Luxe dossier',
    data: newSave,
  });
};

// @desc Delete saved search
// @route DELETE /api/search/:id
exports.deleteSavedSearch = async (req, res) => {
  savedSearchesStore = savedSearchesStore.filter((s) => s.id !== req.params.id);
  res.status(200).json({
    success: true,
    message: 'Saved search removed',
  });
};
