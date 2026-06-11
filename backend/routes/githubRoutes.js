const express = require('express');
const { getUserProfile, getUserRepos } = require('../controllers/githubController');
const cache = require('../middleware/cacheMiddleware');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Optional: protect these routes with JWT if required by task
// router.use(protect);

router.get('/user/:username', cache(3600), getUserProfile);
router.get('/repos/:username', cache(3600), getUserRepos);

module.exports = router;
