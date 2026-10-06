const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
    },
    provider: {
      type: String,
      required: true,
      default: 'Voyager Luxe Premier Shield (Allianz Global)',
    },
    planType: {
      type: String,
      enum: ['Silver Essential', 'Gold Sovereign', 'Platinum Centurion', 'Bespoke Royal'],
      default: 'Platinum Centurion',
    },
    coverage: {
      medicalEmergency: { type: String, default: '$1,000,000' },
      tripCancellation: { type: String, default: 'Up to 100% Non-refundable trip cost' },
      baggageLoss: { type: String, default: '$5,000' },
      flightDelay: { type: String, default: '$1,500' },
      emergencyEvacuation: { type: String, default: '$500,000' },
      conciergeAssistance: { type: String, default: '24/7 Global Priority' },
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'USD',
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validTo: {
      type: Date,
      required: true,
    },
    policyNumber: {
      type: String,
      required: true,
      unique: true,
    },
    documentUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'claimed', 'cancelled'],
      default: 'active',
    },
    claimStatus: {
      type: String,
      enum: ['none', 'submitted', 'in_review', 'approved', 'rejected'],
      default: 'none',
    },
    claims: [
      {
        claimNumber: String,
        incidentDate: Date,
        amount: Number,
        reason: String,
        status: { type: String, default: 'under_review' },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Insurance', insuranceSchema);
