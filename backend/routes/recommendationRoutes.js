const express = require('express');
const { getCareerRecommendations } = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', getCareerRecommendations);

module.exports = router;
