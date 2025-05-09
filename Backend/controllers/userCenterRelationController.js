// controllers/userCenterRelationController.js
import { getUserByEmail, createTempUser } from "../models/userModel.js";
import {  createUserCenterRelation, updateUserCenterRelation, deleteUserCenterRelation } from "../models/userCenterRelationModel.js";

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

    const centerName = req.user?.centerName;

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
    await updateUserCenterRelation(user.UUID, req.user.centerName, Role);
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

    await deleteUserCenterRelation(user.UUID, req.user.centerName);
    return res.json({ message: "Relació eliminada correctament" });
  } catch (err) {
    next(err);
  }
}

export { 
  createUserCenterRelationController,
  updateUserCenterRelationController,
  deleteUserCenterRelationController,
};