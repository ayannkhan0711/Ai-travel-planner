const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', adminController.getDashboard);
router.get('/users', adminController.getUsers);
router.get('/bookings', adminController.getBookings);
router.get('/analytics', adminController.getAnalytics);
router.get('/logs', adminController.getLogs);
router.post('/settings', adminController.updateSettings);

module.exports = router;
