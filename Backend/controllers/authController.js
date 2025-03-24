// controllers/authController.js
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const { getUserByEmail, createUser } = require("../models/userModel");
const { getCentersByUser } = require("../models/userCenterRelationModel");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function generateToken(user, center) {
  const payload = {
    uuid: user.UUID,
    email: user.Email,
    name: user.Name,
    centerName: center.CenterName,
    centerRole: center.Role,
  };
  if (user.UserRole === 2) {
    payload.userRole = 2;
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

async function googleLoginController(req, res) {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: "Falta el camp idToken" });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ error: "Token de Google invàlid (sense payload)" });
    }

    const email = payload.email;
    const name = payload.name || payload.given_name || "SenseNom";
    let user = await getUserByEmail(email);
    if (!user) {
      user = await createUser(name, email);
    }

    const centers = await getCentersByUser(user.UUID);
    if (!centers || centers.length === 0) {
      return res.status(403).json({ error: "No tens cap centre assignat" });
    }

    if (centers.length === 1) {
      const center = centers[0];
      const token = generateToken(user, center);
      return res.status(200).json({ token });
    } else {
      return res.status(200).json({
        multipleCenters: true,
        userUUID: user.UUID,
        centers: centers.map((c) => ({
          centerName: c.CenterName,
          role: c.Role,
        })),
      });
    }
  } catch (error) {
    console.error("Error validant el token de Google:", error);
    return res.status(500).json({
      error: "Error validant el token de Google",
      message: error.message,
    });
  }
}

async function chooseCenterController(req, res) {
  try {
    const { uuid, centerName } = req.body;
    const user = await getUserByUUID(uuid);
    if (!user) {
      return res.status(404).json({ error: "Usuari no trobat" });
    }

    const [center] = await getSpecificCenterByUser(uuid, centerName);
    if (!center) {
      return res.status(403).json({ error: "No tens aquest centre assignat" });
    }

    const token = generateToken(user, center);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error a chooseCenterController:", error);
    return res.status(500).json({ error: "Error intern", message: error.message });
  }
}

module.exports = {
  googleLoginController,
  chooseCenterController,
};
