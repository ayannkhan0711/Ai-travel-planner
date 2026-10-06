const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { protect } = require('../middleware/authMiddleware');

router.get('/multi-modal', searchController.searchMultiModal);
router.get('/flights', searchController.searchFlights);
router.get('/trains', searchController.searchTrains);
router.get('/buses', searchController.searchBuses);
router.get('/hotels', searchController.searchHotels);
router.get('/taxis', searchController.searchTaxis);
router.get('/activities', searchController.searchActivities);
router.get('/restaurants', searchController.searchRestaurants);

// Saved searches (user protected)
router.get('/saved', protect, searchController.getSavedSearches);
router.post('/save', protect, searchController.saveSearch);
router.delete('/:id', protect, searchController.deleteSavedSearch);

module.exports = router;
