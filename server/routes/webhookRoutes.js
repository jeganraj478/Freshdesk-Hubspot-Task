const express = require('express');
const router = express.Router();
const { receiveWebhook, getWebhookLogs } = require('../controllers/webhookController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/webhook/freshdesk', receiveWebhook);
router.get('/webhook/logs', authMiddleware, getWebhookLogs);

module.exports = router;
