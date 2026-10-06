const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGODB_URI || 'mongodb://localhost:27017/voyager_luxe';
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[Voyager Luxe] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[Voyager Luxe] MongoDB Connection Warning: ${error.message}`);
    console.warn('[Voyager Luxe] Server will run with graceful in-memory storage fallback.');
  }
};

module.exports = connectDB;
