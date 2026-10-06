const mongoose = require('mongoose');

const loyaltyPointsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    points: {
      type: Number,
      default: 25000,
    },
    tier: {
      type: String,
      enum: ['Silver Heritage', 'Gold Sovereign', 'Platinum Centurion', 'Diamond Royale'],
      default: 'Platinum Centurion',
    },
    airlineMiles: {
      emiratesSkywards: { type: Number, default: 42000 },
      singaporeKrisFlyer: { type: Number, default: 38500 },
      qatarPrivilegeClub: { type: Number, default: 29000 },
      britishAirwaysExecutive: { type: Number, default: 15400 },
    },
    hotelChainPoints: {
      marriottBonvoy: { type: Number, default: 68000 },
      hiltonHonors: { type: Number, default: 45000 },
      hyattWorldOfHyatt: { type: Number, default: 32000 },
    },
    linkedAccounts: [
      {
        provider: String,
        accountNumber: String,
        type: { type: String, enum: ['airline', 'hotel'] },
        connectedAt: { type: Date, default: Date.now },
      },
    ],
    history: [
      {
        type: { type: String, enum: ['earned', 'redeemed', 'bonus', 'transferred'] },
        amount: Number,
        description: String,
        date: { type: Date, default: Date.now },
        referenceId: String,
      },
    ],
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LoyaltyPoints', loyaltyPointsSchema);
