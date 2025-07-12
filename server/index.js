const express = require('express');
const corsOptions = require('./config/cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const freshdeskRoutes = require('./routes/freshdeskRoutes');
const hubspotRoutes = require('./routes/hubspotRoutes');
const webhookRoutes = require('./routes/webhookRoutes');

require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(corsOptions);


app.use('/api/auth', authRoutes);
app.use('/api', freshdeskRoutes);
app.use('/api', hubspotRoutes);
app.use('/api', webhookRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



