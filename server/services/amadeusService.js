const axios = require('axios');
const cache = require('../config/redis');

class AmadeusService {
  constructor() {
    this.clientId = process.env.AMADEUS_CLIENT_ID;
    this.clientSecret = process.env.AMADEUS_CLIENT_SECRET;
    this.token = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (!this.clientId || !this.clientSecret) return null;
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }
    try {
      const response = await axios.post(
        'https://test.api.amadeus.com/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      this.token = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in - 60) * 1000;
      return this.token;
    } catch (err) {
      console.warn('[Amadeus API] Failed to fetch token, using luxury fallback engine');
      return null;
    }
  }

  async searchFlights(origin = 'JFK', destination = 'CDG', date = '2026-11-15', cabinClass = 'First') {
    const cacheKey = `flights:${origin}:${destination}:${date}:${cabinClass}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    // Realistic luxury flights generator
    const airlines = [
      { name: 'Emirates', code: 'EK', logo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=120&q=80' },
      { name: 'Singapore Airlines', code: 'SQ', logo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=120&q=80' },
      { name: 'Qatar Airways', code: 'QR', logo: 'https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&w=120&q=80' },
      { name: 'Air France La Première', code: 'AF', logo: 'https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?auto=format&fit=crop&w=120&q=80' },
      { name: 'Cathay Pacific', code: 'CX', logo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=120&q=80' },
    ];

    const flights = airlines.map((air, idx) => {
      const departureHour = 8 + idx * 3;
      const durationHours = 7 + (idx % 3);
      const arrivalHour = (departureHour + durationHours) % 24;

      return {
        id: `FL-${air.code}-${Math.floor(100 + Math.random() * 900)}`,
        airline: air.name,
        airlineCode: air.code,
        flightNumber: `${air.code} ${Math.floor(100 + Math.random() * 899)}`,
        logo: air.logo,
        aircraft: idx % 2 === 0 ? 'Airbus A380-800 Private Suite' : 'Boeing 777-300ER First Class',
        origin: {
          code: origin.toUpperCase(),
          city: origin.length === 3 ? (origin === 'JFK' ? 'New York' : origin === 'LHR' ? 'London' : 'Origin') : origin,
          time: `${String(departureHour).padStart(2, '0')}:30`,
          date: date,
          terminal: 'Terminal 1 VIP Suite',
        },
        destination: {
          code: destination.toUpperCase(),
          city: destination.length === 3 ? (destination === 'CDG' ? 'Paris' : destination === 'DXB' ? 'Dubai' : 'Destination') : destination,
          time: `${String(arrivalHour).padStart(2, '0')}:45`,
          date: date,
          terminal: 'Terminal Private Pavilion',
        },
        duration: `${durationHours}h 15m`,
        stops: idx === 2 ? 1 : 0,
        stopDetails: idx === 2 ? '1h 15m transfer at Doha VIP Al Mourjan' : 'Non-stop Direct',
        cabinClass: cabinClass || 'First Class',
        price: 2450 + idx * 850,
        currency: 'USD',
        seatsAvailable: 4 - (idx % 3),
        features: [
          'Chauffeur-drive VIP airport transfer',
          'Lie-flat private suite with privacy door',
          'Dom Pérignon Vintage & Caviar service',
          'Onboard shower spa access',
          'Unlimited high-speed Starlink Wi-Fi',
          '60kg checked baggage + 2 cabin bags'
        ],
        carbonOffset: '100% Certified Carbon Neutral Included',
      };
    });

    cache.set(cacheKey, flights, cache.TTL_SEARCH);
    return flights;
  }

  async searchHotels(city = 'Paris', checkIn = '2026-11-15', checkOut = '2026-11-20', guests = 2) {
    const cacheKey = `hotels:${city}:${checkIn}:${checkOut}:${guests}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const hotels = [
      {
        id: 'htl-001',
        name: `The Grand Palace & Reserve`,
        city: city,
        stars: 5,
        rating: 4.95,
        reviewCount: 342,
        pricePerNight: 850,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        roomType: 'Royal Penthouse Suite with Panoramic Terrace',
        amenities: [
          'Private Butler Service 24/7',
          'Heated Infinity Rooftop Pool',
          'Michelin 3-Star In-Suite Dining',
          'Guerlain Spa Access',
          'Complimentary Rolls-Royce Chauffeur',
        ],
        location: `Historic District, Heart of ${city}`,
        freeCancellation: 'Free cancellation until 48 hours prior',
      },
      {
        id: 'htl-002',
        name: `Aura Sanctuary & Spa Resort`,
        city: city,
        stars: 5,
        rating: 4.92,
        reviewCount: 219,
        pricePerNight: 1120,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        roomType: 'Presidential Lagoon Suite with Plunge Pool',
        amenities: [
          'Private Plunge Pool',
          'Holistic Ayurveda Spa',
          'Dedicated Sommelier',
          'Helipad Transfer Access',
          'Organic Farm-to-Table Breakfast',
        ],
        location: `Scenic Waterfront, ${city}`,
        freeCancellation: 'Free cancellation anytime',
      },
      {
        id: 'htl-003',
        name: `Château de L’Étoile`,
        city: city,
        stars: 5,
        rating: 4.88,
        reviewCount: 184,
        pricePerNight: 690,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        roomType: 'Duplex Heritage Suite',
        amenities: [
          'Antique Fireplace & Art Collection',
          'Wine Cellar Tasting Experience',
          'Private Garden Courtyard',
          'Evening Champagne Hour',
        ],
        location: `Cultural Boulevard, ${city}`,
        freeCancellation: 'Free cancellation until 72 hours prior',
      },
      {
        id: 'htl-004',
        name: `The Meridian Glasshouse Villas`,
        city: city,
        stars: 5,
        rating: 4.97,
        reviewCount: 412,
        pricePerNight: 1450,
        currency: 'USD',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        roomType: 'Private Glass Villa with Stargazing Observatory',
        amenities: [
          'Automated Stargazing Retractable Glass Roof',
          'Personal Executive Chef',
          'Private Yacht Charter (Half Day)',
          'High-Tech Wellness Pod & Cryo Chamber',
        ],
        location: `Private Cliffside Domain, ${city}`,
        freeCancellation: 'Non-refundable special rate',
      },
    ];

    cache.set(cacheKey, hotels, cache.TTL_SEARCH);
    return hotels;
  }
}

module.exports = new AmadeusService();
