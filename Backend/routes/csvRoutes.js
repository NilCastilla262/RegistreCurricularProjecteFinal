//routes/csvRoutes.js
const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload-csv', upload.single('csvFile'), csvController.uploadCsv);

module.exports = router;
