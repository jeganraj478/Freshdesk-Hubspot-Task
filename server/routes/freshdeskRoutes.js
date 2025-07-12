const express = require('express');
const router = express.Router();
const { getTickets, getTicketDetails } = require('../controllers/freshdeskController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/tickets', authMiddleware, getTickets);
router.get('/ticket/:id', authMiddleware, getTicketDetails);

module.exports = router;
