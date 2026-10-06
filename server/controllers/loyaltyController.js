let loyaltyAccount = {
  points: 48500,
  tier: 'Diamond Royale Centurion',
  cashEquivalent: 485.0,
  airlineMiles: {
    emiratesSkywards: 64200,
    singaporeKrisFlyer: 52100,
    qatarPrivilegeClub: 38400,
    britishAirwaysAvios: 29800,
  },
  hotelPoints: {
    marriottBonvoy: 112000,
    hiltonHonors: 78500,
    hyattWorldOfHyatt: 46000,
  },
  linkedAccounts: [
    { provider: 'Emirates Skywards', accountNumber: 'EK-992100-GOLD', status: 'Active Sync' },
    { provider: 'Marriott Bonvoy', accountNumber: 'MB-441098-TITANIUM', status: 'Active Sync' },
    { provider: 'Singapore KrisFlyer', accountNumber: 'SQ-881290-SOLITAIRE', status: 'Active Sync' },
  ],
  history: [
    { type: 'earned', amount: 8500, description: 'Hernur Riviera Villa Booking Bonus', date: new Date('2026-09-15') },
    { type: 'earned', amount: 12000, description: 'Emirates First Class Suite Miles Conversion', date: new Date('2026-09-01') },
    { type: 'redeemed', amount: -5000, description: 'Helicopter Airport Transfer Upgrade Voucher', date: new Date('2026-08-20') },
  ],
};

// @desc Get loyalty points balance
// @route GET /api/loyalty/points
exports.getPoints = async (req, res) => {
  res.status(200).json({
    success: true,
    points: loyaltyAccount.points,
    tier: loyaltyAccount.tier,
    cashEquivalent: loyaltyAccount.cashEquivalent,
    nextTierPointsRequired: 1500,
    benefits: [
      'Complimentary airport private suite escort',
      'Guaranteed 4:00 PM late check-out at partner palaces',
      'Free upgrade to First Class on eligible long-haul routes',
      'Dedicated personal concierge WhatsApp line',
    ],
  });
};

// @desc Get airline miles
// @route GET /api/loyalty/miles
exports.getMiles = async (req, res) => {
  res.status(200).json({
    success: true,
    airlineMiles: loyaltyAccount.airlineMiles,
    hotelPoints: loyaltyAccount.hotelPoints,
    totalMilesAggregated: Object.values(loyaltyAccount.airlineMiles).reduce((a, b) => a + b, 0),
  });
};

// @desc Get points/miles history
// @route GET /api/loyalty/history
exports.getHistory = async (req, res) => {
  res.status(200).json({
    success: true,
    history: loyaltyAccount.history,
  });
};

// @desc Redeem points
// @route POST /api/loyalty/redeem
exports.redeemPoints = async (req, res) => {
  const { amount = 5000, rewardType = 'VIP Lounge Pass' } = req.body;
  if (loyaltyAccount.points < amount) {
    return res.status(400).json({ success: false, message: 'Insufficient loyalty balance' });
  }

  loyaltyAccount.points -= amount;
  loyaltyAccount.history.unshift({
    type: 'redeemed',
    amount: -amount,
    description: `Redeemed for ${rewardType}`,
    date: new Date(),
  });

  res.status(200).json({
    success: true,
    message: `Successfully redeemed ${amount.toLocaleString()} points for ${rewardType}`,
    remainingPoints: loyaltyAccount.points,
  });
};

// @desc Link airline/hotel account
// @route POST /api/loyalty/link-account
exports.linkAccount = async (req, res) => {
  const { provider, accountNumber, type = 'airline' } = req.body;
  const newLink = { provider, accountNumber, status: 'Active Sync', connectedAt: new Date() };
  loyaltyAccount.linkedAccounts.push(newLink);

  res.status(201).json({
    success: true,
    message: `${provider} account linked with auto-sync enabled`,
    account: newLink,
  });
};
