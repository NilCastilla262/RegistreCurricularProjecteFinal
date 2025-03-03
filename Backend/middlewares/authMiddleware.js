// backend/middlewares/authMiddleware.js

const jwt = require("jsonwebtoken");
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ error: "No s'ha trobat cap token" });
  }

  try {
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
    return res.status(401).json({ error: "Token invàlid o caducat" });
  }
};

module.exports = { verifyToken };
