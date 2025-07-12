const express = require('express');
const router = express.Router();
const { getContactByEmail } = require('../controllers/hubspotController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/hubspot/contact', authMiddleware, getContactByEmail);

module.exports = router;
