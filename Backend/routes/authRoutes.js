// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { googleLoginController } = require("../controllers/authController");

router.post("/google-login", googleLoginController);
router.post("/choose-center", chooseCenterController);

module.exports = router;
