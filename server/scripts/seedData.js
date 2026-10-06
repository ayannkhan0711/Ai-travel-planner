const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('../models/User');
const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const Review = require('../models/Review');
const Insurance = require('../models/Insurance');
const LoyaltyPoints = require('../models/LoyaltyPoints');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/voyager_luxe';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB');

    // Clear existing collections
    await User.deleteMany({});
    await Booking.deleteMany({});
    await Trip.deleteMany({});
    await Review.deleteMany({});
    await Insurance.deleteMany({});
    await LoyaltyPoints.deleteMany({});
    console.log('[Seed] Cleared existing database records');

    // Create Demo User
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('voyagerLuxe2026!', salt);

    const demoUser = await User.create({
      _id: new mongoose.Types.ObjectId('660e1a2b3c4d5e6f7a8b9c0d'),
      firstName: 'Julian',
      lastName: 'Vanderbilt',
      email: 'julian.vanderbilt@voyagerluxe.com',
      password: hashedPassword,
      phone: '+1 (212) 555-0199',
      profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      nationality: 'United States',
      loyaltyPoints: 48500,
      airlineMiles: 64200,
      role: 'admin',
      preferences: {
        currency: 'USD',
        language: 'en',
        cabinClass: 'First Class Suite',
        notifications: { email: true, sms: true, push: true, priceAlerts: true, flightDelays: true },
      },
    });
    console.log('[Seed] Created Demo User: julian.vanderbilt@voyagerluxe.com (password: voyagerLuxe2026!)');

    // Create Sample Bookings
    const booking1 = await Booking.create({
      _id: new mongoose.Types.ObjectId('660e1a2b3c4d5e6f7a8b9c11'),
      userId: demoUser._id,
      bookingReference: 'VL-789042',
      bookingType: 'flight',
      sourceLocation: { city: 'New York', code: 'JFK', country: 'United States', terminal: 'Terminal 1 VIP Suite' },
      destinationLocation: { city: 'Paris', code: 'CDG', country: 'France', terminal: 'Private Pavilion' },
      departureDate: new Date('2026-11-20T10:30:00Z'),
      returnDate: new Date('2026-11-28T18:45:00Z'),
      bookingDetails: {
        title: 'Emirates First Class A380 Suite',
        carrier: 'Emirates',
        flightNumber: 'EK 202',
        cabinClass: 'First Class Suite',
        seatNumber: '02A',
        passengers: [{ firstName: 'Julian', lastName: 'Vanderbilt', passportNumber: 'USA-9921004', age: 34, seat: '02A' }],
        amenities: ['Chauffeur VIP Drive', 'Private Shower Spa', 'Vintage Dom Pérignon 2012', 'Caviar Presentation'],
        cancellationPolicy: 'Complimentary full refund up to 24 hours prior',
      },
      totalPrice: 4850,
      currency: 'USD',
      status: 'confirmed',
      paymentStatus: 'paid',
      confirmationEmail: 'julian.vanderbilt@voyagerluxe.com',
    });

    const booking2 = await Booking.create({
      _id: new mongoose.Types.ObjectId('660e1a2b3c4d5e6f7a8b9c12'),
      userId: demoUser._id,
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
    });

    demoUser.bookingHistory = [booking1._id, booking2._id];
    await demoUser.save();
    console.log('[Seed] Created sample flight & hotel bookings');

    // Create Sample Trip
    await Trip.create({
      userId: demoUser._id,
      tripName: 'Grand Tour of Hernur & Panling Riviera',
      description: 'An exclusive 7-day retreat traversing the golden cliffs of Hernur, ancient vineyards of Famling, and private villas in Panling.',
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      startDate: new Date('2026-11-20'),
      endDate: new Date('2026-11-27'),
      budget: { total: 25000, spent: 9950, currency: 'USD' },
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
          activities: [
            { title: 'VIP Helipad Landing & Maybach Transfer', category: 'transport', time: '14:00', cost: 650 },
            { title: 'Sunset Private Riva Boat Charter', category: 'sightseeing', time: '17:30', cost: 1200 },
          ],
        },
      ],
    });
    console.log('[Seed] Created sample itinerary: Grand Tour of Hernur & Panling');

    console.log('\n[Seed] Database seeding completed successfully! ✨\n');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedDB();
