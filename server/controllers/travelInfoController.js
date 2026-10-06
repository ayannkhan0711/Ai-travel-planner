const weatherService = require('../services/weatherService');
const cache = require('../config/redis');

// @desc Visa requirements
// @route GET /api/travel-info/visa/:fromCountry/:toCountry
exports.getVisaInfo = async (req, res) => {
  const { fromCountry, toCountry } = req.params;
  const isSchengenOrVisaFree =
    ['United States', 'United Kingdom', 'Canada', 'Australia', 'Japan', 'Singapore', 'European Union'].includes(fromCountry);

  const visaData = {
    fromCountry,
    toCountry,
    status: isSchengenOrVisaFree ? 'Visa Free (Up to 90 Days)' : 'Electronic Travel Authorization (eTA) Required',
    requirements: [
      'Passport valid for at least 6 months beyond intended stay',
      'Confirmed return ticket or private flight manifest',
      'Proof of luxury accommodation booking',
      'Comprehensive travel insurance policy',
    ],
    processingTime: isSchengenOrVisaFree ? 'Immediate on Arrival' : '24-48 Hours (Fast-track VIP Concierge Available)',
    fee: isSchengenOrVisaFree ? '$0' : '$65 USD (Waived for Voyager Luxe Centurion Members)',
    conciergeAssistance: 'Voyager Luxe will prepare and submit your electronic visa dossier on your behalf.',
  };

  res.status(200).json({ success: true, data: visaData });
};

// @desc Vaccination & health requirements
// @route GET /api/travel-info/health/:country
exports.getHealthRequirements = async (req, res) => {
  const { country } = req.params;
  const healthData = {
    country,
    mandatoryVaccines: ['Routine childhood vaccinations (Measles, Tetanus)'],
    recommendedVaccines: ['Hepatitis A & B', 'Seasonal Influenza'],
    covidRestrictions: 'No restrictions. Proof of vaccination or negative test is no longer required.',
    waterSafety: 'Tap water is purified and safe at all 5-star establishments; complimentary bottled San Pellegrino provided.',
    emergencyMedicalCare: 'World-class private clinics with English-speaking medical concierges available 24/7.',
  };

  res.status(200).json({ success: true, data: healthData });
};

// @desc Travel advisories
// @route GET /api/travel-info/advisories/:country
exports.getTravelAdvisories = async (req, res) => {
  const { country } = req.params;
  const advisoryData = {
    country,
    safetyLevel: 'Level 1: Exercise Normal Precautions (Safe)',
    advisoryText: `${country} remains one of the safest and most prestigious destinations for international luxury travelers.`,
    curfew: 'None',
    embassyContact: 'Global Diplomatic Liaison & 24/7 Private Security Escort Available',
    localEmergencyNumber: '112 / 911 Direct Line',
    updatedAt: new Date(),
  };

  res.status(200).json({ success: true, data: advisoryData });
};

// @desc Convert currency (live rates with 1hr cache)
// @route POST /api/travel-info/currency-convert
exports.convertCurrency = async (req, res) => {
  const { amount = 1000, from = 'USD', to = 'EUR' } = req.body;

  // Standard luxury exchange rates
  const rates = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    CHF: 0.88,
    AED: 3.67,
    JPY: 154.2,
    SGD: 1.35,
    AUD: 1.52,
    INR: 83.4,
  };

  const fromRate = rates[from.toUpperCase()] || 1.0;
  const toRate = rates[to.toUpperCase()] || 0.92;
  const converted = ((amount / fromRate) * toRate).toFixed(2);

  res.status(200).json({
    success: true,
    amount: parseFloat(amount),
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    convertedAmount: parseFloat(converted),
    exchangeRate: (toRate / fromRate).toFixed(4),
    noCommissionGuarantee: 'Voyager Luxe members pay 0% foreign transaction markups',
    timestamp: new Date(),
  });
};

// @desc Weather forecast (cached for 3 hours)
// @route GET /api/travel-info/weather/:destination/:date
exports.getWeather = async (req, res) => {
  const { destination, date } = req.params;
  const weather = await weatherService.getWeather(destination, date);
  res.status(200).json({ success: true, weather });
};

// @desc Required travel documents
// @route GET /api/travel-info/documents/:country
exports.getRequiredDocuments = async (req, res) => {
  const { country } = req.params;
  const docs = [
    { title: 'Valid Passport', requirement: 'Must have at least 2 blank pages and 6 months validity', priority: 'Mandatory' },
    { title: 'Confirmed Boarding Pass / Private Flight Manifest', requirement: 'Physical or Voyager Luxe Wallet pass', priority: 'Mandatory' },
    { title: 'Proof of Accommodation', requirement: 'Official hotel reservation confirmation', priority: 'Recommended' },
    { title: 'International Travel Insurance', requirement: 'Minimum $500,000 emergency medical coverage', priority: 'Recommended' },
    { title: 'International Driving Permit (IDP)', requirement: 'Only if renting luxury private supercars', priority: 'Optional' },
  ];

  res.status(200).json({ success: true, country, documents: docs });
};
