const Trip = require('../models/Trip');

// Sample default luxury trips in-memory store
let inMemoryTrips = [
  {
    _id: 'trip-001',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    tripName: 'Grand Tour of Hernur & Panling Riviera',
    description: 'An exclusive 7-day retreat traversing the golden cliffs of Hernur, ancient vineyards of Famling, and private villas in Panling.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    startDate: new Date('2026-11-20'),
    endDate: new Date('2026-11-27'),
    budget: { total: 25000, spent: 12450, currency: 'USD' },
    shareCode: 'HERNUR-LUXE-2026',
    totalEstimatedCost: 19800,
    destinations: [
      { city: 'Hernur', country: 'Riviera', stayDurationDays: 3, activitiesCount: 5 },
      { city: 'Panling', country: 'Coastal Reserve', stayDurationDays: 4, activitiesCount: 6 },
    ],
    days: [
      {
        dayNumber: 1,
        date: new Date('2026-11-20'),
        title: 'Arrival in Hernur & Welcome Champagne Reception',
        notes: 'Chauffeur meets at VIP terminal. Evening yacht cruise along golden coves.',
        weather: { temp: 24, condition: 'Golden Sunset' },
        activities: [
          { title: 'VIP Helipad Landing & Maybach Transfer', category: 'transport', time: '14:00', cost: 650 },
          { title: 'Sunset Private Riva Boat Charter', category: 'sightseeing', time: '17:30', cost: 1200 },
          { title: 'Welcome Tasting Menu at Villa Hernur (2 Michelin Stars)', category: 'dining', time: '20:00', cost: 580 },
        ],
      },
      {
        dayNumber: 2,
        date: new Date('2026-11-21'),
        title: 'Private Cliffside Spa & Vintage Wine Cellars',
        notes: 'Full day rejuvenation and private cellar tasting.',
        weather: { temp: 23, condition: 'Clear Sky' },
        activities: [
          { title: 'Guerlain Bespoke Facial & Thermal Bath', category: 'relaxation', time: '10:00', cost: 450 },
          { title: 'Centennial Grand Cru Cellar Tour with Head Sommelier', category: 'culture', time: '14:30', cost: 850 },
        ],
      },
      {
        dayNumber: 3,
        date: new Date('2026-11-22'),
        title: 'Scenic Coastal Transfer to Panling',
        notes: 'Helicopter transfer over the azure coast to Panling Luxury Villas.',
        weather: { temp: 25, condition: 'Sunny' },
        activities: [
          { title: 'Helicopter Flight Hernur to Panling', category: 'transport', time: '11:00', cost: 1400 },
          { title: 'Check-in to Panling Overwater Villa Suite', category: 'hotel', time: '12:30', cost: 2200 },
          { title: 'Private Beachside Chef BBQ under the Stars', category: 'dining', time: '19:30', cost: 600 },
        ],
      },
    ],
    packingList: [
      { item: 'Tailored linen shirts & trousers', category: 'Attire', isPacked: true },
      { item: 'Cashmere travel wrap for flights', category: 'Attire', isPacked: true },
      { item: 'Bespoke swimwear & designer shades', category: 'Beachwear', isPacked: false },
      { item: 'International passport & travel insurance card', category: 'Essentials', isPacked: true },
    ],
  },
];

// @desc Create new trip
// @route POST /api/trips/create
exports.createTrip = async (req, res, next) => {
  try {
    const shareCode = `TRIP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const newTrip = {
      _id: `trip-${Date.now()}`,
      userId: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
      tripName: req.body.tripName || 'Bespoke Luxury Voyage',
      description: req.body.description || '',
      coverImage: req.body.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      startDate: req.body.startDate || new Date(),
      endDate: req.body.endDate || new Date(Date.now() + 7 * 86400000),
      budget: req.body.budget || { total: 15000, spent: 0, currency: 'USD' },
      destinations: req.body.destinations || [{ city: 'Hernur', country: 'Riviera', stayDurationDays: 3, activitiesCount: 3 }],
      days: req.body.days || [
        {
          dayNumber: 1,
          date: req.body.startDate || new Date(),
          title: 'Arrival & Grand Welcome',
          activities: [{ title: 'Private VIP Chauffeur Transfer', category: 'transport', time: '14:00', cost: 350 }],
        },
      ],
      shareCode,
      totalEstimatedCost: req.body.budget?.total || 15000,
      packingList: [
        { item: 'Valid Passport & Digital Visa', category: 'Documents', isPacked: true },
        { item: 'Luxury evening wear & cocktail attire', category: 'Attire', isPacked: false },
      ],
    };

    inMemoryTrips.unshift(newTrip);

    res.status(201).json({
      success: true,
      message: 'Itinerary created in your personal dossier',
      trip: newTrip,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all user trips
// @route GET /api/trips/list
exports.listTrips = async (req, res) => {
  res.status(200).json({
    success: true,
    count: inMemoryTrips.length,
    trips: inMemoryTrips,
  });
};

// @desc Get trip details
// @route GET /api/trips/:id
exports.getTrip = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id || t.shareCode === req.params.id);
  if (!trip) {
    return res.status(404).json({ success: false, message: 'Itinerary not found' });
  }
  res.status(200).json({ success: true, trip });
};

// @desc Update trip
// @route PUT /api/trips/:id/update
exports.updateTrip = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id);
  if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

  Object.assign(trip, req.body);
  res.status(200).json({ success: true, message: 'Trip itinerary updated', trip });
};

// @desc Add day to itinerary
// @route POST /api/trips/:id/add-day
exports.addDay = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id);
  if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

  const nextDayNum = trip.days.length + 1;
  const newDay = {
    dayNumber: nextDayNum,
    date: new Date(new Date(trip.startDate).getTime() + (nextDayNum - 1) * 86400000),
    title: req.body.title || `Day ${nextDayNum}: Coastal Exploration`,
    notes: req.body.notes || 'Curated leisure and dining day',
    activities: req.body.activities || [],
  };
  trip.days.push(newDay);

  res.status(201).json({ success: true, message: 'Day added to itinerary', day: newDay });
};

// @desc Remove day from itinerary
// @route DELETE /api/trips/:id/remove-day
exports.removeDay = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id);
  if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

  trip.days = trip.days.filter((d) => d.dayNumber !== parseInt(req.body.dayNumber || req.query.dayNumber));
  res.status(200).json({ success: true, message: 'Day removed from itinerary', days: trip.days });
};

// @desc Add activity to day
// @route POST /api/trips/:id/add-activity
exports.addActivity = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id);
  if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

  const dayIndex = trip.days.findIndex((d) => d.dayNumber === parseInt(req.body.dayNumber));
  if (dayIndex === -1) return res.status(404).json({ success: false, message: 'Specified day not found' });

  const activity = {
    title: req.body.title || 'Private Michelin Dinner',
    category: req.body.category || 'dining',
    time: req.body.time || '19:00',
    location: req.body.location || 'Panling',
    cost: req.body.cost || 450,
    notes: req.body.notes || 'Table reserved with sea view',
  };
  trip.days[dayIndex].activities.push(activity);
  trip.budget.spent = (trip.budget.spent || 0) + (activity.cost || 0);

  res.status(201).json({ success: true, message: 'Activity added to itinerary', activity });
};

// @desc Add hotel to trip
// @route POST /api/trips/:id/add-accommodation
exports.addAccommodation = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id);
  if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

  if (!trip.accommodations) trip.accommodations = [];
  const hotel = {
    hotelName: req.body.hotelName || 'The Grand Palace Hernur',
    address: req.body.address || 'Cliffside Promenade, Hernur',
    cost: req.body.cost || 1200,
    checkIn: req.body.checkIn || trip.startDate,
    checkOut: req.body.checkOut || trip.endDate,
  };
  trip.accommodations.push(hotel);

  res.status(201).json({ success: true, message: 'Accommodation reserved for trip', hotel });
};

// @desc Remove activity
// @route DELETE /api/trips/:id/remove-activity
exports.removeActivity = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id);
  if (!trip) return res.status(404).json({ success: false, message: 'Trip not found' });

  const day = trip.days.find((d) => d.dayNumber === parseInt(req.body.dayNumber));
  if (day) {
    day.activities = day.activities.filter((a) => a.title !== req.body.title);
  }

  res.status(200).json({ success: true, message: 'Activity removed' });
};

// @desc Share trip with friends
// @route POST /api/trips/:id/share
exports.shareTrip = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id);
  const shareCode = trip?.shareCode || `HERNUR-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
  const shareLink = `${process.env.CLIENT_URL || 'http://localhost:3000'}/trips/shared/${shareCode}`;

  res.status(200).json({
    success: true,
    shareCode,
    shareLink,
    message: 'Private luxury itinerary share link generated.',
  });
};

// @desc Get shared trip
// @route GET /api/trips/shared/:shareCode
exports.getSharedTrip = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t.shareCode === req.params.shareCode) || inMemoryTrips[0];
  res.status(200).json({ success: true, trip });
};

// @desc Update budget
// @route PUT /api/trips/:id/budget
exports.updateBudget = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id);
  if (trip) {
    trip.budget.total = req.body.total || trip.budget.total;
  }
  res.status(200).json({ success: true, message: 'Budget updated', budget: trip?.budget });
};

// @desc Estimate total trip cost
// @route POST /api/trips/:id/estimate-cost
exports.estimateCost = async (req, res) => {
  const trip = inMemoryTrips.find((t) => t._id === req.params.id) || inMemoryTrips[0];
  let calculated = 0;
  trip.days.forEach((d) => d.activities.forEach((a) => (calculated += a.cost || 0)));

  res.status(200).json({
    success: true,
    estimatedTotal: calculated + 4850, // Including flights & hotel suite
    currency: 'USD',
    breakdown: {
      flights: 3200,
      accommodations: 5400,
      activities: calculated,
      privateTransfers: 1250,
      conciergeFee: 'Complimentary Elite Membership',
    },
  });
};

// @desc Delete trip
// @route DELETE /api/trips/:id
exports.deleteTrip = async (req, res) => {
  inMemoryTrips = inMemoryTrips.filter((t) => t._id !== req.params.id);
  res.status(200).json({ success: true, message: 'Trip successfully deleted' });
};
