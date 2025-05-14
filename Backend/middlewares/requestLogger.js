// middlewares/requestLogger.js
import logger from '../config/logger.js';

export default (req, res, next) => {
  const { method, originalUrl: url, body, user } = req;
  const meta = {
    uuid: user?.uuid || 'anonymous',
    name: user?.name || 'anonymous',
    body: Object.keys(body || {}).length ? body : undefined
  };
  logger.info(`${method} ${url}`, meta);
  next();
};
