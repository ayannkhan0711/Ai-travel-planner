const express = require('express');
const router = express.Router();
const insuranceController = require('../controllers/insuranceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/plans/:tripId', insuranceController.getPlans);
router.post('/compare', insuranceController.comparePlans);

router.use(protect);

router.post('/book', insuranceController.bookInsurance);
router.get('/:id', insuranceController.getInsuranceDetails);
router.post('/:id/claim', insuranceController.fileClaim);

module.exports = router;
