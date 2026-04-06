const mongoose = require('mongoose');
const logger = require('../utils/logger');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not defined in environment');

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    logger.info(`MongoDB connected: ${mongoose.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected — attempting reconnect');
      isConnected = false;
    });
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB error:', err);
    });
  } catch (err) {
    logger.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
