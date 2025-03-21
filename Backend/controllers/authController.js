// controllers/authController.js
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function generateToken(user) {
  const payload = {
    uuid: user.UUID,
    email: user.Email,
    name: user.Name,
    role: user.Role
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

exports.googleLoginController = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: "Falta el camp idToken" });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ error: "Token de Google invàlid (sense payload)" });
    }

    const email = payload.email;
    const name = payload.name || payload.given_name || "SenseNom";

    let user = await getUserByEmail(email);
    if (!user) {
      user = await createUser(name, email, "Teacher");
    }

    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error validant el token de Google:", error);
    return res.status(500).json({
      error: "Error validant el token de Google",
      message: error.message
    });
  }
};