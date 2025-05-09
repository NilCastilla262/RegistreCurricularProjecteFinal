// Backend/routes/userCenterRelationRoutes.js
import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { requireCenterAdmin } from "../middlewares/centerAdminMiddleware.js";

import { createUserCenterRelationController, updateUserCenterRelationController, deleteUserCenterRelationController } from "../controllers/userCenterRelationController.js";

const router = Router();

router.post("/", verifyToken, requireCenterAdmin, createUserCenterRelationController);

router.put("/", verifyToken, requireCenterAdmin, updateUserCenterRelationController);

router.delete("/:UserEmail", verifyToken, requireCenterAdmin, deleteUserCenterRelationController);

export default router;
