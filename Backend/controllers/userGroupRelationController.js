// controllers/userGroupRelationController.js
import {  getGroupsByUser, getUsersByGroup, createUserGroupRelation, deleteUserGroupRelation, relationExists } from "../models/userGroupRelationModel.js";

async function getGroupsByUserController(req, res, next) {
  try {
    const { uuid: userUUID } = req.params;
    if (!userUUID) {
      const err = new Error("Cal indicar l’UUID d’usuari a la ruta");
      err.status = 400;
      throw err;
    }
    const groups = await getGroupsByUser(userUUID);
    return res.status(200).json(groups);
  } catch (err) {
    next(err);
  }
}

async function getUsersByGroupController(req, res, next) {
  try {
    const { uuid: groupUUID } = req.params;
    if (!groupUUID) {
      const err = new Error("Cal indicar l’UUID de grup a la ruta");
      err.status = 400;
      throw err;
    }
    const users = await getUsersByGroup(groupUUID);
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

async function createUserGroupRelationController(req, res, next) {
  try {
    const { UUIDUser, UUIDGroup } = req.body;
    if (!UUIDUser || !UUIDGroup) {
      const err = new Error("Cal indicar UUIDUser i UUIDGroup");
      err.status = 400;
      throw err;
    }

    if (await relationExists(UUIDUser, UUIDGroup)) {
      const err = new Error("L’usuari ja està assignat a aquest grup");
      err.status = 409;
      throw err;
    }

    await createUserGroupRelation(UUIDUser, UUIDGroup);
    return res.status(201).json({ message: "Assignació realitzada" });
  } catch (err) {
    next(err);
  }
}

async function deleteUserGroupRelationController(req, res, next) {
  try {
    const { userUUID, groupUUID } = req.params;
    if (!userUUID || !groupUUID) {
      const err = new Error("Cal indicar userUUID i groupUUID a la ruta");
      err.status = 400;
      throw err;
    }
    await deleteUserGroupRelation(userUUID, groupUUID);
    return res.status(200).json({ message: "Assignació eliminada" });
  } catch (err) {
    next(err);
  }
}



export {
    deleteUserGroupRelationController,
    createUserGroupRelationController,
    getUsersByGroupController,
    getGroupsByUserController,
}