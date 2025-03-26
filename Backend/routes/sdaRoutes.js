// routes/sdaRoutes.js
const express = require("express");
const { createSDAController } = require("../controllers/sdaController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", verifyToken, createSDAController);

module.exports = router;
