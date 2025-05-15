// middlewares/dbHealthCheckMiddleware.js
import { getConnection } from "../config/db.js";

export default async function dbHealthCheck(req, res, next) {
  try {
    const pool = await getConnection();
    if (!pool.connected) {
      const err = new Error("Database not connected");
      err.status = 503;
      throw err;
    }
    next();
  } catch (err) {
    next(err);
  }
}