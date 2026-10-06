const express = require('express');
const router = express.Router();
const travelInfoController = require('../controllers/travelInfoController');

router.get('/visa/:fromCountry/:toCountry', travelInfoController.getVisaInfo);
router.get('/health/:country', travelInfoController.getHealthRequirements);
router.get('/advisories/:country', travelInfoController.getTravelAdvisories);
router.post('/currency-convert', travelInfoController.convertCurrency);
router.get('/weather/:destination/:date', travelInfoController.getWeather);
router.get('/documents/:country', travelInfoController.getRequiredDocuments);

module.exports = router;
