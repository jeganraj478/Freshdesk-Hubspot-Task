const WebhookLog = require('../models/WebhookLog');

// Receive webhook from Freshdesk
const receiveWebhook = async (req, res) => {
  try {
    const type = req.body.type || 'freshdesk.event';

    await WebhookLog.create({
      type,
      payload: req.body,
    });

    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ message: 'Failed to store webhook', error: err.message });
  }
};

// 📤 Return logs for frontend display
const getWebhookLogs = async (req, res) => {
  try {
    const logs = await WebhookLog.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load logs', error: err.message });
  }
};

module.exports = {
  receiveWebhook,
  getWebhookLogs,
};
