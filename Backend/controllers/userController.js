// controllers/userController.js
import { getUsersByCenter } from "../models/userModel.js";

export async function getUsersByCenterController(req, res, next) {
  try {
    const centerName = req.user.centerName;
    if (!centerName) {
      const err = new Error("No s'ha trobat centerName al token");
      err.status = 400;
      throw err;
    }

    const users = await getUsersByCenter(centerName);
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
