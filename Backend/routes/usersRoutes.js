// routes/usersRoutes.js
import express from "express";
import { getUsersByCenterController } from "../controllers/userController.js";

const router = express.Router();

router.get( "/center", getUsersByCenterController );

export default router;
