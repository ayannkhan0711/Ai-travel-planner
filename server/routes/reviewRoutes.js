const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.get('/destination/:destination', reviewController.getDestinationReviews);
router.get('/hotel/:hotelId', reviewController.getHotelReviews);
router.get('/:bookingId', reviewController.getBookingReviews);

router.post('/create', protect, reviewController.createReview);
router.put('/:id', protect, reviewController.updateReview);
router.delete('/:id', protect, reviewController.deleteReview);
router.post('/:id/helpful', reviewController.markHelpful);

module.exports = router;
