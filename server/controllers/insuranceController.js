let inMemoryPolicies = [
  {
    _id: 'ins-001',
    policyNumber: 'VL-INS-88402',
    userId: '660e1a2b3c4d5e6f7a8b9c0d',
    tripId: 'trip-001',
    provider: 'Voyager Luxe Premier Shield (Allianz Global Assistance)',
    planType: 'Platinum Centurion',
    price: 320,
    currency: 'USD',
    validFrom: new Date('2026-11-20'),
    validTo: new Date('2026-11-27'),
    coverage: {
      medicalEmergency: '$2,000,000 (Private Air Evacuation Included)',
      tripCancellation: '100% Non-refundable coverage up to $50,000',
      baggageLoss: '$10,000 Luxury Valuables Coverage',
      flightDelay: '$2,000 Instant Lounge & Suite Credit',
      conciergeAssistance: '24/7 Dedicated Medical Concierge',
    },
    status: 'active',
    claimStatus: 'none',
    claims: [],
  },
];

// @desc Get insurance plans for trip
// @route GET /api/insurance/plans/:tripId
exports.getPlans = async (req, res) => {
  const plans = [
    {
      id: 'plan-silver',
      name: 'Silver Essential',
      price: 140,
      currency: 'USD',
      medicalEmergency: '$500,000',
      cancellation: 'Up to $10,000',
      baggageLoss: '$2,500',
      delayProtection: '$500 after 4 hours',
      airAmbulance: 'Standard Medical Evacuation',
      popular: false,
    },
    {
      id: 'plan-platinum',
      name: 'Platinum Centurion',
      price: 320,
      currency: 'USD',
      medicalEmergency: '$2,000,000',
      cancellation: 'Up to $50,000 (Cancel for Any Reason 90%)',
      baggageLoss: '$10,000',
      delayProtection: '$2,000 Instant Suite & Dining Stipend',
      airAmbulance: 'Private Bombardier Challenger Air Ambulance',
      popular: true,
      badge: 'Most Popular for International Luxury',
    },
    {
      id: 'plan-royal',
      name: 'Bespoke Royal Sovereign',
      price: 680,
      currency: 'USD',
      medicalEmergency: 'Unlimited Worldwide Coverage',
      cancellation: '100% Unconditional Trip Cost Reimbursement',
      baggageLoss: '$35,000 Haute Couture & Watch Protection',
      delayProtection: '$5,000 Immediate Private Jet charter subsidy',
      airAmbulance: 'Global Medevac Jet + Personal Physician Escort',
      popular: false,
      badge: 'Ultra High Net Worth',
    },
  ];

  res.status(200).json({ success: true, tripId: req.params.tripId, plans });
};

// @desc Compare insurance options
// @route POST /api/insurance/compare
exports.comparePlans = async (req, res) => {
  const { planIds } = req.body;
  res.status(200).json({
    success: true,
    comparison: {
      metrics: ['Medical Coverage', 'Trip Cancellation', 'Luggage & Valuables', 'Flight Delay Voucher', 'Concierge Doctor 24/7'],
      plans: planIds || ['Silver Essential', 'Platinum Centurion', 'Bespoke Royal Sovereign'],
    },
  });
};

// @desc Book travel insurance
// @route POST /api/insurance/book
exports.bookInsurance = async (req, res) => {
  const policy = {
    _id: `ins-${Date.now()}`,
    policyNumber: `VL-INS-${Math.floor(100000 + Math.random() * 900000)}`,
    userId: req.user?._id || '660e1a2b3c4d5e6f7a8b9c0d',
    tripId: req.body.tripId || 'trip-001',
    provider: 'Voyager Luxe Premier Shield',
    planType: req.body.planType || 'Platinum Centurion',
    price: req.body.price || 320,
    currency: 'USD',
    validFrom: req.body.validFrom || new Date(),
    validTo: req.body.validTo || new Date(Date.now() + 7 * 86400000),
    status: 'active',
    claimStatus: 'none',
    claims: [],
  };
  inMemoryPolicies.unshift(policy);

  res.status(201).json({
    success: true,
    message: 'Travel protection certificate issued and active.',
    policy,
  });
};

// @desc Get insurance details
// @route GET /api/insurance/:id
exports.getInsuranceDetails = async (req, res) => {
  const policy = inMemoryPolicies.find((p) => p._id === req.params.id || p.policyNumber === req.params.id) || inMemoryPolicies[0];
  res.status(200).json({ success: true, policy });
};

// @desc File insurance claim
// @route POST /api/insurance/:id/claim
exports.fileClaim = async (req, res) => {
  const policy = inMemoryPolicies.find((p) => p._id === req.params.id || p.policyNumber === req.params.id) || inMemoryPolicies[0];
  const claim = {
    claimNumber: `CLM-${Math.floor(100000 + Math.random() * 900000)}`,
    incidentDate: req.body.incidentDate || new Date(),
    amount: req.body.amount || 1500,
    reason: req.body.reason || 'Delayed luggage & emergency luxury wardrobe replacement',
    status: 'under_review',
    createdAt: new Date(),
  };

  policy.claims.push(claim);
  policy.claimStatus = 'submitted';

  res.status(201).json({
    success: true,
    message: 'Claim submitted to priority adjudicator. Typical settlement turnaround is 4 hours.',
    claim,
  });
};
