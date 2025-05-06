// backend/middlewares/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const err = new Error("No s'ha trobat cap token");
      err.status = 403;
      throw err;
    }

    const rawDecoded = jwt.decode(token);
    if (rawDecoded?.uuid) req.user = { uuid: rawDecoded.uuid };

    const decoded = jwt.verify(token, JWT_SECRET);

    const currentTime = Math.floor(Date.now() / 1000);
    const timeLeft = decoded.exp - currentTime;

    if (timeLeft < 1200) {
      const newToken = jwt.sign(
        { uuid: decoded.uuid, email: decoded.email, role: decoded.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );

      res.setHeader("Authorization", `Bearer ${newToken}`);
    }

    req.user = decoded;
    next();

  } catch (error) {
    next(error);
  }
};

export { verifyToken };
