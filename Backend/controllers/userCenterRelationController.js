// controllers/userCenterRelationController.js
import { getUserByEmail, createTempUser } from "../models/userModel.js";
import { createUserCenterRelation } from "../models/userCenterRelationModel.js";

export async function createUserCenterRelationController(req, res, next) {
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
