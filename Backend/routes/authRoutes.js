// routes/authRoutes.js
import express from "express";
import { googleLoginController, chooseCenterController } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/google-login", googleLoginController);
router.post("/choose-center", chooseCenterController);
router.get("/centers", verifyToken, getCentersForUserController);

export default router;
