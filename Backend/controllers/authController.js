// controllers/authController.js
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { getUserByEmail, createUser, getUserByUUID, updateUserName } from "../models/userModel.js";
import { getCentersByUser, getSpecificCenterByUser } from "../models/userCenterRelationModel.js";

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

async function googleLoginController(req, res, next) {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      const err = new Error("Falta el camp idToken");
      err.status = 400;
      throw err;
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      const err = new Error("Token de Google invàlid (sense payload)");
      err.status = 401;
      throw err;
    }

    const email = payload.email;
    const name  = payload.name || payload.given_name || "SenseNom";

    let user = await getUserByEmail(email);

    if (!user) {
      user = await createUser(name, email);
    } else if (!user.Name) {
      await updateUserName(user.UUID, name);
      user.Name = name;
    }

    const centers = await getCentersByUser(user.UUID);
    if (!centers || centers.length === 0) {
      const err = new Error("No tens cap centre assignat");
      err.status = 403;
      throw err;
    }

    if (centers.length === 1) {
      const token = generateToken(user, centers[0]);
      return res.status(200).json({ token });
    }

    return res.status(200).json({
      multipleCenters: true,
      userUUID: user.UUID,
      centers: centers.map((c) => ({
        centerName: c.CenterName,
        role:       c.Role,
      })),
    });
  } catch (error) {
    next(error);
  }
}

async function chooseCenterController(req, res, next) {
  try {
    const { uuid, centerName } = req.body;
    const user = await getUserByUUID(uuid);
    if (!user) {
      const err = new Error("Usuari no trobat");
      err.status = 404;
      throw err;
    }

    const [center] = await getSpecificCenterByUser(uuid, centerName);
    if (!center) {
      const err = new Error("No tens aquest centre assignat");
      err.status = 403;
      throw err;
    }

    const token = generateToken(user, center);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

async function getCentersForUserController(req, res, next) {
  try {
    const userUUID = req.user.uuid;
    const centers = await getCentersByUser(userUUID);
    return res.status(200).json(
      centers.map(c => ({
        centerName: c.CenterName,
        role:       c.Role
      }))
    );
  } catch (err) {
    next(err);
  }
}

export {
  googleLoginController,
  chooseCenterController,
  getCentersForUserController
};
