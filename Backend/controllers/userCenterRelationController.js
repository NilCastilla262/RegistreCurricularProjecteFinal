// controllers/userCenterRelationController.js
import { getUserByEmail, createTempUser } from "../models/userModel.js";
import {
  createUserCenterRelation,
  updateUserCenterRelation,
  deleteUserCenterRelation,
  getSpecificCenterByUser,
  countAdminsByCenter
} from "../models/userCenterRelationModel.js";

async function createUserCenterRelationController(req, res, next) {
  try {
    const { UserEmail, Role } = req.body;
    if (!UserEmail || Role === undefined) {
      const err = new Error("UserEmail i Role són requerits");
      err.status = 400;
      throw err;
    }

    let user = await getUserByEmail(UserEmail);
    if (!user) {
      user = await createTempUser(UserEmail);
    }
    const UUIDUser = user.UUID;
    const centerName = req.user.centerName;

    const existing = await getSpecificCenterByUser(UUIDUser, centerName);
    if (existing.length > 0) {
      const err = new Error("La relació ja existeix");
      err.status = 409;
      throw err;
    }

    await createUserCenterRelation(UUIDUser, centerName, Role);
    return res.status(201).json({ message: "Relació creada correctament" });
  } catch (err) {
    next(err);
  }
}

async function updateUserCenterRelationController(req, res, next) {
  try {
    const { UserEmail, Role } = req.body;
    if (!UserEmail || Role === undefined) {
      const err = new Error("UserEmail i Role són requerits");
      err.status = 400;
      throw err;
    }

    let user = await getUserByEmail(UserEmail);
    if (!user) {
      user = await createTempUser(UserEmail);
    }
    const UUIDUser = user.UUID;
    const centerName = req.user.centerName;

    const rel = await getSpecificCenterByUser(UUIDUser, centerName);
    if (rel.length === 0) {
      const err = new Error("No existeix la relació usuari-centre");
      err.status = 404;
      throw err;
    }
    const originalRole = rel[0].Role;
    if (originalRole === Role) {
      return res.json({ message: "Sense canvis" });
    }

    if (originalRole === 2 && Role !== 2) {
      const cnt = await countAdminsByCenter(centerName);
      if (cnt <= 1) {
        const err = new Error("Ha de quedar almenys un Administrador de centre");
        err.status = 400;
        throw err;
      }
    }

    await updateUserCenterRelation(UUIDUser, centerName, Role);
    return res.json({ message: "Rol actualitzat correctament" });
  } catch (err) {
    next(err);
  }
}

async function deleteUserCenterRelationController(req, res, next) {
  try {
    const { UserEmail } = req.params;
    if (!UserEmail) {
      const err = new Error("Cal passar l’email de l’usuari a la ruta");
      err.status = 400;
      throw err;
    }

    const user = await getUserByEmail(UserEmail);
    if (!user) {
      return res.status(404).json({ error: "Usuari no trobat" });
    }
    const UUIDUser = user.UUID;
    const centerName = req.user.centerName;

    if (req.user.uuid === UUIDUser) {
      const err = new Error("No et pots treure a tu mateix");
      err.status = 400;
      throw err;
    }

    const rel = await getSpecificCenterByUser(UUIDUser, centerName);
    if (rel.length === 0) {
      const err = new Error("No existeix la relació usuari-centre");
      err.status = 404;
      throw err;
    }
    const originalRole = rel[0].Role;

    if (originalRole === 2) {
      const cnt = await countAdminsByCenter(centerName);
      if (cnt <= 1) {
        const err = new Error("Ha de quedar almenys un Administrador de centre");
        err.status = 400;
        throw err;
      }
    }

    await deleteUserCenterRelation(UUIDUser, centerName);
    return res.json({ message: "Relació eliminada correctament" });
  } catch (err) {
    next(err);
  }
}

export {
  createUserCenterRelationController,
  updateUserCenterRelationController,
  deleteUserCenterRelationController
};