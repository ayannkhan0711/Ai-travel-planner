const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/list', notificationController.listNotifications);
router.get('/unread', notificationController.getUnreadNotifications);
router.put('/:id/read', notificationController.markAsRead);
router.post('/settings', notificationController.updateSettings);
router.post('/price-alert', notificationController.setPriceAlert);
router.post('/flight-alert', notificationController.enableFlightAlert);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router;
