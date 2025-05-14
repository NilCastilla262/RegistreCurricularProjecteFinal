//routes/fullSdaRoutes.js
import express from "express";
import { getFullSdaController } from "../controllers/fullSdaController.js";

const router = express.Router();

router.get("/:uuid", getFullSdaController);

export default router;
