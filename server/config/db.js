const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI;

const connectDB = () => {
  mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));
};

module.exports = connectDB;