// backend/middlewares/centerMiddleware.js
const jwt = require("jsonwebtoken");

function extractCenterName(req, res, next) {
  if (!req.user || !req.user.centerName) {
    return res.status(400).json({ error: "No s'ha trobat centerName al token" });
  }
  req.centerName = req.user.centerName;
  next();
}

module.exports = { extractCenterName };