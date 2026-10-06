const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);
router.put('/preferences', userController.updatePreferences);
router.get('/settings', userController.getSettings);
router.put('/settings', userController.updateSettings);
router.delete('/account', userController.deleteAccount);

module.exports = router;
