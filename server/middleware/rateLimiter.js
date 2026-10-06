const rateLimit = require('express-rate-limit');

// Rate limiting: 100 requests / 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many requests from this IP, please try again after 15 minutes.',
  },
  skip: (req) => {
    // Optional bypass for health checks or admin
    return req.path === '/api/health' || process.env.NODE_ENV === 'test';
  },
});

// Stricter limiter for authentication attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

module.exports = { apiLimiter, authLimiter };
