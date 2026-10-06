const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    bookingType: {
      type: String,
      required: true,
      enum: ['flight', 'hotel', 'bus', 'train', 'taxi', 'multi-modal'],
    },
    sourceLocation: {
      city: String,
      code: String,
      country: String,
      terminal: String,
    },
    destinationLocation: {
      city: String,
      code: String,
      country: String,
      hotelName: String,
      address: String,
    },
    departureDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    bookingDetails: {
      title: String,
      carrier: String,
      flightNumber: String,
      cabinClass: String,
      seatNumber: String,
      roomType: String,
      numberOfNights: Number,
      vehicleModel: String,
      passengers: [
        {
          firstName: String,
          lastName: String,
          passportNumber: String,
          nationality: String,
          age: Number,
          seat: String,
        },
      ],
      amenities: [String],
      baggageAllowance: String,
      cancellationPolicy: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'paid',
    },
    paymentMethod: {
      type: String,
      default: 'Luxury Concierge Direct (Amex Centurion)',
    },
    confirmationEmail: {
      type: String,
      required: true,
    },
    ticketPDF: {
      type: String,
      default: '',
    },
    itinerary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
    hotelRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    activityRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    userReview: {
      type: String,
    },
    expiryDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
