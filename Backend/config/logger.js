// config/logger.js
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import path from 'path';

const logDir = path.resolve('logs');

const errorTransport = new transports.DailyRotateFile({
  dirname: logDir,
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '30d',
  level: 'error',
});

const actionTransport = new transports.DailyRotateFile({
  dirname: logDir,
  filename: 'action-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxFiles: '30d',
  level: 'info',
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message, ...meta }) => {
      const metaString = Object.keys(meta).length
        ? ` ${JSON.stringify(meta)}`
        : '';
      return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaString}`;
    })
  ),
  transports: [
    errorTransport,
    actionTransport
  ],
  exitOnError: false,
});

export default logger;
