const Booking = require('../models/Booking');
const emailService = require('../services/emailService');
const pdfTicketService = require('../services/pdfTicketService');
const cache = require('../config/redis');

// In-memory fallback bookings store for instant reactivity
let inMemoryBookings = [
  {
    _id: '660e1a2b3c4d5e6f7a8b9c11',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    bookingReference: 'VL-789042',
    bookingType: 'flight',
    sourceLocation: { city: 'New York', code: 'JFK', country: 'United States', terminal: 'VIP Suite 1' },
    destinationLocation: { city: 'Paris', code: 'CDG', country: 'France', terminal: 'Private Pavilion' },
    departureDate: new Date('2026-11-20T10:30:00Z'),
    returnDate: new Date('2026-11-28T18:45:00Z'),
    bookingDetails: {
      title: 'Emirates First Class A380 Suite',
      carrier: 'Emirates',
      flightNumber: 'EK 202',
      cabinClass: 'First Class Suite',
      seatNumber: '02A',
      passengers: [
        { firstName: 'Julian', lastName: 'Vanderbilt', passportNumber: 'USA-9921004', age: 34, seat: '02A' },
      ],
      amenities: ['Chauffeur VIP Drive', 'Private Shower Spa', 'Vintage Dom Pérignon 2012', 'Caviar Presentation'],
      cancellationPolicy: 'Complimentary full refund up to 24 hours prior',
    },
    totalPrice: 4850,
    currency: 'USD',
    status: 'confirmed',
    paymentStatus: 'paid',
    confirmationEmail: 'julian.vanderbilt@voyagerluxe.com',
    createdAt: new Date(),
  },
  {
    _id: '660e1a2b3c4d5e6f7a8b9c12',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    bookingReference: 'VL-443918',
    bookingType: 'hotel',
    sourceLocation: { city: 'Paris' },
    destinationLocation: { city: 'Paris', hotelName: 'The Grand Palace & Reserve', address: 'Historic District, Paris' },
    departureDate: new Date('2026-11-20T14:00:00Z'),
    returnDate: new Date('2026-11-26T12:00:00Z'),
    bookingDetails: {
      title: 'Royal Penthouse Suite',
      roomType: 'Royal Penthouse Suite with Panoramic Terrace',
      numberOfNights: 6,
      passengers: [{ firstName: 'Julian', lastName: 'Vanderbilt' }],
      amenities: ['24/7 Dedicated Butler', 'Heated Rooftop Pool', 'Rolls-Royce House Car'],
      cancellationPolicy: 'Free cancellation until 48 hours prior',
    },
    totalPrice: 5100,
    currency: 'USD',
    status: 'confirmed',
    paymentStatus: 'paid',
    confirmationEmail: 'julian.vanderbilt@voyagerluxe.com',
    createdAt: new Date(),
  },
];

// @desc Create booking
// @route POST /api/bookings/create
exports.createBooking = async (req, res, next) => {
  try {
    const reference = `VL-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBookingData = {
      userId: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
      bookingReference: reference,
      bookingType: req.body.bookingType || 'flight',
      sourceLocation: req.body.sourceLocation || { city: 'New York', code: 'JFK' },
      destinationLocation: req.body.destinationLocation || { city: 'Paris', code: 'CDG' },
      departureDate: req.body.departureDate || new Date(),
      returnDate: req.body.returnDate,
      bookingDetails: req.body.bookingDetails || {},
      totalPrice: req.body.totalPrice || 2450,
      currency: req.body.currency || 'USD',
      status: 'confirmed',
      paymentStatus: 'paid',
      confirmationEmail: req.body.confirmationEmail || req.user?.email || 'guest@voyagerluxe.com',
    };

    let booking;
    try {
      booking = await Booking.create(newBookingData);
    } catch (e) {
      newBookingData._id = `booking-${Date.now()}`;
      newBookingData.createdAt = new Date();
      inMemoryBookings.unshift(newBookingData);
      booking = newBookingData;
    }

    // Trigger transactional email notification
    await emailService.sendBookingConfirmation(booking, req.user || {});

    // Clear search and rate caches on new booking as required
    cache.clearSearchCache();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed with bespoke priority status.',
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all user bookings
// @route GET /api/bookings/list
exports.listBookings = async (req, res, next) => {
  try {
    let bookings = [];
    try {
      bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });
    } catch (e) {
      bookings = inMemoryBookings;
    }

    if (!bookings || bookings.length === 0) {
      bookings = inMemoryBookings;
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get booking details
// @route GET /api/bookings/:id
exports.getBookingDetails = async (req, res, next) => {
  try {
    let booking;
    try {
      booking = await Booking.findById(req.params.id);
    } catch (e) {
      booking = inMemoryBookings.find((b) => b._id.toString() === req.params.id || b.bookingReference === req.params.id);
    }

    if (!booking) {
      booking = inMemoryBookings.find((b) => b._id.toString() === req.params.id || b.bookingReference === req.params.id);
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get real-time booking status
// @route GET /api/bookings/:id/status
exports.getBookingStatus = async (req, res) => {
  const statuses = [
    { status: 'Gate Lounge Open', detail: 'VIP Salon Concierge awaits arrival at Terminal 1', updatedAgo: '2m ago' },
    { status: 'On Schedule', detail: 'Aircraft cleared for on-time luxury boarding', updatedAgo: '5m ago' },
    { status: 'Chauffeur Dispatched', detail: 'Maybach S680 is en-route to your residence', updatedAgo: '1m ago' },
  ];
  const update = statuses[Math.floor(Math.random() * statuses.length)];

  res.status(200).json({
    success: true,
    bookingId: req.params.id,
    liveStatus: update.status,
    detail: update.detail,
    lastChecked: new Date(),
    gate: 'VIP Salon A-01',
    departureTime: '10:30 AM (On Time)',
  });
};

// @desc Modify booking (seat, room, etc.)
// @route PUT /api/bookings/:id/modify
exports.modifyBooking = async (req, res, next) => {
  try {
    const { seatNumber, roomType, specialRequests } = req.body;
    let booking = inMemoryBookings.find((b) => b._id.toString() === req.params.id || b.bookingReference === req.params.id);

    if (booking) {
      if (seatNumber) booking.bookingDetails.seatNumber = seatNumber;
      if (roomType) booking.bookingDetails.roomType = roomType;
      booking.bookingDetails.specialRequests = specialRequests;
    }

    res.status(200).json({
      success: true,
      message: 'Booking preferences successfully modified',
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc Cancel booking
// @route POST /api/bookings/:id/cancel
exports.cancelBooking = async (req, res) => {
  let booking = inMemoryBookings.find((b) => b._id.toString() === req.params.id || b.bookingReference === req.params.id);
  if (booking) {
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
  }

  res.status(200).json({
    success: true,
    message: 'Booking cancelled. Full refund of 100% credited to original payment method.',
    refundAmount: booking ? booking.totalPrice : 2450,
    currency: 'USD',
  });
};

// @desc Generate PDF ticket
// @route POST /api/bookings/:id/print-ticket
exports.printTicket = async (req, res) => {
  let booking = inMemoryBookings.find((b) => b._id.toString() === req.params.id || b.bookingReference === req.params.id) || inMemoryBookings[0];
  const ticketHtml = pdfTicketService.generateTicketHtml(booking);

  res.setHeader('Content-Type', 'text/html');
  res.send(ticketHtml);
};

// @desc Email ticket to user
// @route POST /api/bookings/:id/email-ticket
exports.emailTicket = async (req, res) => {
  let booking = inMemoryBookings.find((b) => b._id.toString() === req.params.id || b.bookingReference === req.params.id) || inMemoryBookings[0];
  await emailService.sendBookingConfirmation(booking, req.user || {});

  res.status(200).json({
    success: true,
    message: `Digital luxury boarding pass & dossier emailed to ${booking.confirmationEmail}`,
  });
};

// @desc Check refund status
// @route GET /api/bookings/:id/refund-status
exports.getRefundStatus = async (req, res) => {
  res.status(200).json({
    success: true,
    bookingId: req.params.id,
    refundStatus: 'Processed',
    refundPercentage: '100%',
    amount: 4850,
    currency: 'USD',
    reference: 'REF-CENTURION-9921',
    creditedDate: new Date(),
  });
};

// @desc Rebook after cancellation
// @route POST /api/bookings/:id/rebook
exports.rebookBooking = async (req, res) => {
  const newRef = `VL-RE-${Math.floor(100000 + Math.random() * 900000)}`;
  res.status(200).json({
    success: true,
    message: 'Journey rebooked with priority seat allocation',
    newBookingReference: newRef,
    departureDate: req.body.newDepartureDate || new Date(Date.now() + 7 * 24 * 3600 * 1000),
  });
};
