const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');

router.get('/shared/:shareCode', tripController.getSharedTrip);

router.use(protect);

router.post('/create', tripController.createTrip);
router.get('/list', tripController.listTrips);
router.get('/:id', tripController.getTrip);
router.put('/:id/update', tripController.updateTrip);
router.post('/:id/add-day', tripController.addDay);
router.delete('/:id/remove-day', tripController.removeDay);
router.post('/:id/add-activity', tripController.addActivity);
router.post('/:id/add-accommodation', tripController.addAccommodation);
router.delete('/:id/remove-activity', tripController.removeActivity);
router.post('/:id/share', tripController.shareTrip);
router.put('/:id/budget', tripController.updateBudget);
router.post('/:id/estimate-cost', tripController.estimateCost);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
