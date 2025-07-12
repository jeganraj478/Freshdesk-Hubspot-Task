const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  freshdeskDomain:{ type: String },
  freshdeskKey: { type: String },
  hubspotKey: { type: String }
});

module.exports = mongoose.model('User', userSchema);
