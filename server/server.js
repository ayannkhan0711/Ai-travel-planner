const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const { apiLimiter } = require('./middleware/rateLimiter');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const tripRoutes = require('./routes/tripRoutes');
const travelInfoRoutes = require('./routes/travelInfoRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const loyaltyRoutes = require('./routes/loyaltyRoutes');
const supportRoutes = require('./routes/supportRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize database
connectDB();

const app = express();

// Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // For local testing flexibility
  })
);

// CORS Policy
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Allow all in dev mode for seamless demo
      }
    },
    credentials: true,
  })
);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(loggerMiddleware);

// Rate Limiter: 100 requests / 15 mins per IP
app.use('/api', apiLimiter);

// API Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    platform: 'Voyager Luxe API Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    theme: {
      primary: '#8B7355',
      secondary: '#F5E6D3',
      cream: '#FFFAF0',
    },
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/travel-info', travelInfoRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/insurance', insuranceRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/loyalty', loyaltyRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`  ✦ VOYAGER LUXE - PREMIER AI TRAVEL AGGREGATOR ✦`);
  console.log(`  Server running in ${process.env.NODE_ENV || 'development'} on port ${PORT}`);
  console.log(`  API Health: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection] Error: ${err.message}`);
  // In production, log and perform graceful restart
});

module.exports = app;
