const express = require('express');
const multer = require('multer');
const { analyzeUserResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('resume'), analyzeUserResume);

module.exports = router;
