// controllers/authController.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

const generateToken = (user) => {
  const payload = {
    uuid: user.UUID,
    email: user.Email,
    name: user.Name,
    role: user.Role
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};

const googleAuthCallback = async (req, res) => {
  try {
    const token = generateToken(req.user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error al generar el token", message: error.message });
  }
};

module.exports = {
  googleAuthCallback,
  generateToken
};
