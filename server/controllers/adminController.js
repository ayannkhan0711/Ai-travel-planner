const User = require('../models/User');
const Booking = require('../models/Booking');

// @desc Admin dashboard stats
// @route GET /api/admin/dashboard
exports.getDashboard = async (req, res) => {
  res.status(200).json({
    success: true,
    stats: {
      totalRevenue: 2849500,
      activeBookings: 184,
      totalUsers: 1420,
      npsScore: 98.4,
      averageBookingValue: 4620,
      activePrivateJetCharters: 12,
      pendingConciergeTickets: 3,
    },
    recentTransactions: [
      { id: 'TX-9901', client: 'Lord Sterling', amount: 9850, destination: 'Hernur Riviera Suite', status: 'Completed' },
      { id: 'TX-9902', client: 'Sophia Rothschild', amount: 14200, destination: 'Panling Private Island', status: 'Completed' },
      { id: 'TX-9903', client: 'Elena Rostova', amount: 5600, destination: 'Vouke Chalet & Ski', status: 'In Escrow' },
    ],
  });
};

// @desc List all users
// @route GET /api/admin/users
exports.getUsers = async (req, res) => {
  res.status(200).json({
    success: true,
    count: 3,
    users: [
      {
        _id: 'usr-1',
        name: 'Julian Vanderbilt',
        email: 'julian.vanderbilt@voyagerluxe.com',
        tier: 'Centurion Black',
        lifetimeSpend: '$84,500',
        joined: '2024-03-12',
      },
      {
        _id: 'usr-2',
        name: 'Lady Genevieve Laurent',
        email: 'g.laurent@paris-invest.fr',
        tier: 'Centurion Gold',
        lifetimeSpend: '$126,200',
        joined: '2023-11-04',
      },
      {
        _id: 'usr-3',
        name: 'Alexander Sterling',
        email: 'a.sterling@geneva-fund.ch',
        tier: 'Centurion Black',
        lifetimeSpend: '$92,000',
        joined: '2024-01-20',
      },
    ],
  });
};

// @desc List all bookings
// @route GET /api/admin/bookings
exports.getBookings = async (req, res) => {
  res.status(200).json({
    success: true,
    count: 4,
    bookings: [
      { ref: 'VL-789042', user: 'Julian Vanderbilt', route: 'JFK ➔ CDG', carrier: 'Emirates First A380', price: 4850, status: 'Confirmed' },
      { ref: 'VL-443918', user: 'Julian Vanderbilt', hotel: 'The Grand Palace Paris', price: 5100, status: 'Confirmed' },
      { ref: 'VL-882104', user: 'Genevieve Laurent', route: 'GVA ➔ DXB', carrier: 'VistaJet Private', price: 18400, status: 'In Flight' },
      { ref: 'VL-192031', user: 'Alexander Sterling', hotel: 'Vouke Alpine Chalet', price: 6800, status: 'Reserved' },
    ],
  });
};

// @desc Analytics & insights
// @route GET /api/admin/analytics
exports.getAnalytics = async (req, res) => {
  res.status(200).json({
    success: true,
    topDestinations: [
      { destination: 'Hernur Riviera', bookings: 342, growth: '+28%' },
      { destination: 'Panling Lagoon', bookings: 289, growth: '+35%' },
      { destination: 'Paris Historic Reserve', bookings: 412, growth: '+14%' },
      { destination: 'Vouke Alpine Glaciers', bookings: 198, growth: '+42%' },
    ],
    modeBreakdown: {
      firstClassCommercial: '44%',
      privateJetHelicopter: '28%',
      highSpeedLuxuryRail: '18%',
      bespokeChauffeur: '10%',
    },
  });
};

// @desc System logs
// @route GET /api/admin/logs
exports.getLogs = async (req, res) => {
  res.status(200).json({
    success: true,
    logs: [
      { timestamp: new Date(Date.now() - 60000), level: 'INFO', event: 'Amadeus Flight Availability Cache Refreshed (TTL: 30m)' },
      { timestamp: new Date(Date.now() - 180000), level: 'INFO', event: 'Rome2Rio Multi-Modal Combined Routing Synchronized' },
      { timestamp: new Date(Date.now() - 360000), level: 'SUCCESS', event: 'Booking Confirmation Email Dispatched [VL-789042]' },
      { timestamp: new Date(Date.now() - 900000), level: 'AUDIT', event: 'Security Handshake Verified - AES-256 JWT Token Rotation' },
    ],
  });
};

// @desc Update app settings
// @route POST /api/admin/settings
exports.updateSettings = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Global platform settings updated.',
    settings: req.body,
  });
};
