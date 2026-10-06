const cache = require('../config/redis');

class Rome2RioService {
  constructor() {
    this.apiKey = process.env.ROME2RIO_API_KEY;
  }

  async searchMultiModal(origin = 'London', destination = 'Paris', date = '2026-11-15') {
    const cacheKey = `multimodal:${origin}:${destination}:${date}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const routes = [
      {
        id: 'route-combo-1',
        title: 'Voyager Express: Private Jet & Luxury Chauffeur',
        category: 'Fastest & Most Luxurious',
        totalDuration: '2h 15m',
        totalPrice: 3850,
        currency: 'USD',
        badge: 'Recommended',
        carbonEmissions: 'Offset to 0g CO2',
        legs: [
          {
            type: 'taxi',
            provider: 'Voyager Black Chauffeur',
            vehicle: 'Mercedes-Maybach S680',
            duration: '35m',
            from: `${origin} Hotel / Residence`,
            to: `${origin} VIP Private Jet Terminal`,
            details: 'Chilled Champagne & Luggage handling',
          },
          {
            type: 'flight',
            provider: 'VistaJet Global 7500',
            flightNumber: 'VJ-882',
            duration: '50m',
            from: `${origin} Executive FBO`,
            to: `${destination} Le Bourget VIP`,
            details: 'Private cabin, no airport security queues, bespoke caviar service',
          },
          {
            type: 'taxi',
            provider: 'Voyager Prestige Concierge Transfer',
            vehicle: 'Rolls-Royce Ghost',
            duration: '50m',
            from: `${destination} VIP Terminal`,
            to: `${destination} Hotel Suite`,
            details: 'Direct room check-in accompaniment',
          },
        ],
      },
      {
        id: 'route-combo-2',
        title: 'Grand Continental: High-Speed Palace Rail & Transfer',
        category: 'Scenic & Ultra-Comfortable',
        totalDuration: '3h 30m',
        totalPrice: 890,
        currency: 'USD',
        badge: 'Eco-Luxury Choice',
        carbonEmissions: '94% lower emissions',
        legs: [
          {
            type: 'taxi',
            provider: 'Audi e-tron GT Chauffeur',
            duration: '25m',
            from: `${origin} Center`,
            to: `${origin} Grand Central Station VIP Lounge`,
            details: 'Fast-track priority gate escort',
          },
          {
            type: 'train',
            provider: 'Eurostar Business Premier / Orient Express Class',
            trainNumber: 'EST-9024',
            duration: '2h 18m',
            from: `${origin} International Platform 1`,
            to: `${destination} Central Terminal`,
            details: 'Raymond Blanc 3-course gourmet dining with French wine pairing',
          },
          {
            type: 'taxi',
            provider: 'Bentley Flying Spur Transfer',
            duration: '45m',
            from: `${destination} Station`,
            to: `${destination} Luxury Villa`,
            details: 'Luggage direct-to-suite transfer',
          },
        ],
      },
      {
        id: 'route-combo-3',
        title: 'Sky Panorama: First Class Commercial & Helipad Hop',
        category: 'Balanced Luxury',
        totalDuration: '3h 10m',
        totalPrice: 1750,
        currency: 'USD',
        badge: 'Popular Choice',
        legs: [
          {
            type: 'flight',
            provider: 'Air France La Première',
            flightNumber: 'AF-1681',
            duration: '1h 15m',
            from: `${origin} International Airport`,
            to: `${destination} Charles de Gaulle`,
            details: 'Private salon transfer in Porsche Panamera tarmac escort',
          },
          {
            type: 'taxi',
            provider: 'Airbus H130 Helicopter Shuttle',
            duration: '15m',
            from: 'Airport Helipad',
            to: 'Downtown Heliport',
            details: 'Breathtaking aerial city skyline panorama',
          },
        ],
      },
    ];

    cache.set(cacheKey, routes, cache.TTL_SEARCH);
    return routes;
  }
}

module.exports = new Rome2RioService();
