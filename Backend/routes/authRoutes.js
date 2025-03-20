// routes/authRoutes.js
const express = require("express");
const passport = require("../config/passport");
const { googleAuthCallback } = require("../controllers/authController");

const router = express.Router();

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  googleAuthCallback
);

module.exports = router;
