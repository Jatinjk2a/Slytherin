require('dotenv').config();
require('express-async-errors');

const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const { connectRedis } = require('./src/config/redis');
const logger = require('./src/utils/logger');

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  await connectDB();
  await connectRedis();

  const server = app.listen(PORT, () => {
    logger.info(`README AI server running on port ${PORT} [${process.env.NODE_ENV}]`);
  });

  // Graceful shutdown
  const shutdown = (signal) => {
    logger.info(`${signal} received — shutting down gracefully`);
    server.close(() => {
      logger.info('HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
    server.close(() => process.exit(1));
  });
}

bootstrap();
