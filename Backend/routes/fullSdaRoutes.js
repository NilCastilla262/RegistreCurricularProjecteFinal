//routes/fullSdaRoutes.js
import express from "express";
import { getFullSdaController } from "../controllers/fullSdaController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:uuid", verifyToken, getFullSdaController);

export default router;
