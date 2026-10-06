const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/add', wishlistController.addToWishlist);
router.get('/list', wishlistController.getWishlist);
router.delete('/:id', wishlistController.removeFromWishlist);
router.post('/:id/move-to-trip', wishlistController.moveToTrip);

module.exports = router;
