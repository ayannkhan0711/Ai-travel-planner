const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/create', bookingController.createBooking);
router.get('/list', bookingController.listBookings);
router.get('/:id', bookingController.getBookingDetails);
router.get('/:id/status', bookingController.getBookingStatus);
router.put('/:id/modify', bookingController.modifyBooking);
router.post('/:id/cancel', bookingController.cancelBooking);
router.post('/:id/print-ticket', bookingController.printTicket);
router.post('/:id/email-ticket', bookingController.emailTicket);
router.get('/:id/refund-status', bookingController.getRefundStatus);
router.post('/:id/rebook', bookingController.rebookBooking);

module.exports = router;
