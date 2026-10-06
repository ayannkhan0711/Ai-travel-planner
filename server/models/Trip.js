const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tripName: {
      type: String,
      required: [true, 'Please provide a trip name'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    budget: {
      total: { type: Number, default: 10000 },
      spent: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
    },
    destinations: [
      {
        city: String,
        country: String,
        lat: Number,
        lng: Number,
        stayDurationDays: Number,
        activitiesCount: Number,
      },
    ],
    days: [
      {
        dayNumber: Number,
        date: Date,
        title: String,
        notes: String,
        weather: {
          temp: Number,
          condition: String,
          icon: String,
        },
        activities: [
          {
            title: String,
            category: String, // sightseeing, dining, relaxation, culture
            time: String,
            location: String,
            cost: Number,
            notes: String,
            isCompleted: { type: Boolean, default: false },
          },
        ],
      },
    ],
    transportation: [
      {
        type: { type: String }, // flight, train, taxi, ferry
        provider: String,
        reference: String,
        departureTime: String,
        arrivalTime: String,
        origin: String,
        destination: String,
        cost: Number,
      },
    ],
    accommodations: [
      {
        hotelName: String,
        address: String,
        checkIn: Date,
        checkOut: Date,
        roomType: String,
        cost: Number,
      },
    ],
    sharedWith: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        email: String,
        permission: { type: String, enum: ['view', 'edit'], default: 'view' },
      },
    ],
    shareCode: {
      type: String,
      unique: true,
      sparse: true,
    },
    totalEstimatedCost: {
      type: Number,
      default: 0,
    },
    packingList: [
      {
        item: String,
        category: String,
        isPacked: { type: Boolean, default: false },
      },
    ],
    currency: {
      type: String,
      default: 'USD',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trip', tripSchema);
