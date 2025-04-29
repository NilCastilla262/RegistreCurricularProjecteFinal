// routes/authRoutes.js
import express from "express";
import { googleLoginController, chooseCenterController } from "../controllers/authController.js";

const router = express.Router();

router.post("/google-login", googleLoginController);
router.post("/choose-center", chooseCenterController);

export default router;
