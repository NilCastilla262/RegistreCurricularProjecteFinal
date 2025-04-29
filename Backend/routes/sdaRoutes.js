//routes/sdaRoutes.js
import express from "express";
import { createSDAController, getAllSdasController, markCriteriaController } from "../controllers/sdaController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, createSDAController);
router.get("/", verifyToken, getAllSdasController);
router.post('/markCriteria', verifyToken, markCriteriaController);

export default router;
