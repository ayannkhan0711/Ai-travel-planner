const express = require('express');
const router = express.Router();
const loyaltyController = require('../controllers/loyaltyController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/points', loyaltyController.getPoints);
router.get('/miles', loyaltyController.getMiles);
router.get('/history', loyaltyController.getHistory);
router.post('/redeem', loyaltyController.redeemPoints);
router.post('/link-account', loyaltyController.linkAccount);

module.exports = router;
