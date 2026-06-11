const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const oauthSuccess = (req, res) => {
    if (req.user) {
        const token = generateToken(req.user._id);
        // In a real app, you might redirect to frontend with token in URL or set an HttpOnly cookie
        // For simplicity in testing with a decoupled frontend, we'll redirect with token as query param
        res.redirect(`http://localhost:5173/auth/success?token=${token}`);
    } else {
        res.status(401).json({ success: false, message: 'Not authenticated' });
    }
};

const oauthFailed = (req, res) => {
    res.status(401).json({
        success: false,
        message: 'OAuth login failed'
    });
};

const logout = (req, res) => {
    req.logout((err) => {
        if (err) return res.status(500).json({ success: false, message: 'Logout failed' });
        res.json({ success: true, message: 'Logged out successfully' });
    });
};

const getMe = async (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
};

module.exports = {
    oauthSuccess,
    oauthFailed,
    logout,
    getMe
};
