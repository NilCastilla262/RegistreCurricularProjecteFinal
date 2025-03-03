// backend/routes/authRoutes.js

const express = require("express");
const { register, login } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");


const router = express.Router();

// router.post("/register", register);

// router.post("/login", login);

router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).json({ message: "Token vàlid", user: req.user });
});


module.exports = router;
