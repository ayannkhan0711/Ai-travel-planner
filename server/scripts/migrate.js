const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');
const Booking = require('../models/Booking');
const Trip = require('../models/Trip');
const Review = require('../models/Review');
const SearchCache = require('../models/SearchCache');

const migrate = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/voyager_luxe';
    await mongoose.connect(mongoUri);
    console.log('[Migration] Connected to MongoDB');

    console.log('[Migration] Building indexes...');
    await User.createIndexes();
    await Booking.createIndexes();
    await Trip.createIndexes();
    await Review.createIndexes();
    await SearchCache.createIndexes();

    console.log('[Migration] Indexes successfully synchronized:');
    console.log(' - User: email (unique)');
    console.log(' - Booking: bookingReference (unique), userId, departureDate');
    console.log(' - Trip: userId, shareCode (unique)');
    console.log(' - Review: targetId, destination, rating');
    console.log(' - SearchCache: searchHash (unique), expiryTime (TTL: 0)');

    console.log('[Migration] Done!');
    process.exit(0);
  } catch (err) {
    console.error('[Migration Error]', err);
    process.exit(1);
  }
};

migrate();
