const { createLogger, format, transports } = require('winston');
const { combine, timestamp, colorize, printf, json } = format;

const devFormat = printf(({ level, message, timestamp, ...meta }) => {
  const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
  return `${timestamp} [${level}]: ${message}${metaStr}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
  transports: [
    new transports.Console({
      format:
        process.env.NODE_ENV === 'production'
          ? json()
          : combine(colorize(), timestamp({ format: 'HH:mm:ss' }), devFormat),
    }),
  ],
  exceptionHandlers: [new transports.Console()],
  rejectionHandlers: [new transports.Console()],
});

// Add HTTP level for morgan
logger.stream = {
  write: (message) => logger.http(message.trim()),
};

module.exports = logger;
