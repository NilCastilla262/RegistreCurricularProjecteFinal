//routes/sdaRoutes.js
import express from "express";
import { createSDAController, getAllSdasController, markCriteriaController } from "../controllers/sdaController.js";
import { extractCenterName } from "../middlewares/centerMiddleware.js";

const router = express.Router();

router.post("/", createSDAController);
router.get("/", extractCenterName, getAllSdasController);
router.post('/markCriteria', markCriteriaController);

export default router;
