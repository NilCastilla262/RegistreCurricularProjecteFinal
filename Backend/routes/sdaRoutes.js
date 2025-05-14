//routes/sdaRoutes.js
import express from "express";
import { createSDAController, getAllSdasController, markCriteriaController } from "../controllers/sdaController.js";

const router = express.Router();

router.post("/", createSDAController);
router.get("/", getAllSdasController);
router.post('/markCriteria', markCriteriaController);

export default router;
