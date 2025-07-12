const mongoose = require('mongoose');

const webhookLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  type: { type: String },         
  payload: { type: Object }
});

module.exports = mongoose.model('WebhookLog', webhookLogSchema);
