const express = require('express');
const passport = require('passport');
const { oauthSuccess, oauthFailed, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/api/auth/failed' }),
    oauthSuccess
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/api/auth/failed' }),
    oauthSuccess
);

router.get('/failed', oauthFailed);
router.get('/logout', logout);
router.get('/me', protect, getMe);

module.exports = router;
