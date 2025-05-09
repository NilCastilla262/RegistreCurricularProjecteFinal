// routes/usersRoutes.js
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getUsersByCenterController } from "../controllers/userController.js";

const router = express.Router();

router.get( "/center", verifyToken, getUsersByCenterController );

export default router;
