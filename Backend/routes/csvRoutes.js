// routes/csvRoutes.js
import express from "express";
import multer from "multer";
import csvController from "../controllers/csvController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/upload-csv', verifyToken, upload.single('csvFile'), csvController.uploadCsv);

export default router;
