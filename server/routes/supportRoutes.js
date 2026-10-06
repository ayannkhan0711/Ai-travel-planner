const express = require('express');
const router = express.Router();
const supportController = require('../controllers/supportController');
const { protect } = require('../middleware/authMiddleware');

router.get('/faq', supportController.getFAQ);
router.post('/emergency-contact', supportController.getEmergencyContact);

router.use(protect);

router.post('/ticket', supportController.createTicket);
router.get('/tickets/:id', supportController.getTicket);
router.post('/ticket/:id/message', supportController.addMessage);

module.exports = router;
