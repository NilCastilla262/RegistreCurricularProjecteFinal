// routes/sdaRoutes.js
const express = require("express");
const { createSDAController, getAllSdasController, markCriteriaController } = require("../controllers/sdaController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createSDAController);

router.get("/", verifyToken, getAllSdasController);

router.post('/markCriteria', verifyToken, markCriteriaController);

module.exports = router;
