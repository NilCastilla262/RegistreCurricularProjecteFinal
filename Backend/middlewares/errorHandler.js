// middlewares/errorHandler.js
import logger from '../config/logger.js';

export default (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const meta = {
    uuid: req.user?.uuid || 'anonymous',
    name: req.user?.name || 'anonymous',
    method: req.method,
    url: req.originalUrl,
    status: err.status || 500
  };

  logger.error(err.message, meta);
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Error intern del servidor',
    details: err.details || null,
    path: req.originalUrl,
    timestamp,
  });
};
