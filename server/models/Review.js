const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    targetId: {
      type: String, // e.g., 'hotel-101' or 'destination-paris'
      index: true,
    },
    destination: {
      type: String,
      index: true,
    },
    type: {
      type: String,
      enum: ['hotel', 'flight', 'activity', 'restaurant', 'destination'],
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String,
      },
    ],
    helpful: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Review', reviewSchema);
