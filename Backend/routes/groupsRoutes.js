// routes/groupsRoutes.js
import express from "express";
import { getGroupsByUser, getResumeController, getByCenterAndYearController, createGroupController, updateGroupController, deleteGroupController } from "../controllers/groupsController.js";
import { extractCenterName } from "../middlewares/centerMiddleware.js";
import { requireCenterAdmin } from "../middlewares/centerAdminMiddleware.js";
const router = express.Router();

router.get("/", getGroupsByUser);
router.get("/resume", getResumeController);
router.get("/center", extractCenterName, getByCenterAndYearController);
router.post("/", requireCenterAdmin, createGroupController);
router.put("/:uuid", requireCenterAdmin, extractCenterName, updateGroupController);
router.delete("/:uuid", requireCenterAdmin, extractCenterName, deleteGroupController);

export default router;
