// config/rateLimiter.js
import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: "Has superat el límit de peticions per minut",
});
