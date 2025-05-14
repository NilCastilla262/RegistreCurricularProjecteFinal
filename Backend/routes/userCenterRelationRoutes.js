// Backend/routes/userCenterRelationRoutes.js
import { Router } from "express";
import { requireCenterAdmin } from "../middlewares/centerAdminMiddleware.js";

import { createUserCenterRelationController, updateUserCenterRelationController, deleteUserCenterRelationController } from "../controllers/userCenterRelationController.js";

const router = Router();

router.post("/", requireCenterAdmin, createUserCenterRelationController);

router.put("/", requireCenterAdmin, updateUserCenterRelationController);

router.delete("/:UserEmail", requireCenterAdmin, deleteUserCenterRelationController);

export default router;
