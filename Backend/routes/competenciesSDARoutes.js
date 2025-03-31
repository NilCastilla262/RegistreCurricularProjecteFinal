// controllers/competenciesSDARoutes.js
const express = require("express");
const router = express.Router();
const { createCompetenciesSDAController } = require("../controllers/competenciesSDAController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("", verifyToken, createCompetenciesSDAController);

module.exports = router;