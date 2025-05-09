// Backend/routes/userCenterRelationRoutes.js
import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createUserCenterRelationController } from "../controllers/userCenterRelationController.js";

const router = Router();

router.post("/", verifyToken, createUserCenterRelationController);

export default router;
