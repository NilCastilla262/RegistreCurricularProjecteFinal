//routes/csvRoutes.js
const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const { verifyToken } = require("../middlewares/authMiddleware");

router.post('/upload-csv', verifyToken, upload.single('csvFile'), csvController.uploadCsv);

module.exports = router;
