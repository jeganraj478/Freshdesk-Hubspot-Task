const cors = require('cors');

require('dotenv').config();
const ALLOWED_URL = process.env.ALLOWED_URL;

const corsOptions = cors({
  origin: ALLOWED_URL, // Allow frontend to access the backend
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed header
});

module.exports = corsOptions;