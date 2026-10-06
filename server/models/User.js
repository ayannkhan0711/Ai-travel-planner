const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
      select: false,
    },
    firstName: {
      type: String,
      required: [true, 'Please provide your first name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide your last name'],
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    profilePhoto: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    dateOfBirth: {
      type: Date,
    },
    nationality: {
      type: String,
      default: 'United States',
    },
    passport: {
      number: String,
      expiryDate: Date,
      issuingCountry: String,
    },
    visaStatus: [
      {
        country: String,
        status: String,
        validUntil: Date,
      },
    ],
    preferences: {
      currency: {
        type: String,
        default: 'USD',
      },
      language: {
        type: String,
        default: 'en',
      },
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        priceAlerts: { type: Boolean, default: true },
        flightDelays: { type: Boolean, default: true },
      },
      cabinClass: {
        type: String,
        default: 'First Class',
      },
    },
    loyaltyPoints: {
      type: Number,
      default: 15400,
    },
    airlineMiles: {
      type: Number,
      default: 48500,
    },
    savedTrips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.Mixed,
      },
    ],
    bookingHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    role: {
      type: String,
      enum: ['user', 'admin', 'concierge'],
      default: 'user',
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
