const { getRecommendations } = require('../services/recommendationService');

const getCareerRecommendations = async (req, res, next) => {
    try {
        const { skills } = req.body;

        if (!skills || !Array.isArray(skills)) {
            return res.status(400).json({ success: false, message: 'Please provide an array of skills' });
        }

        const recommendations = getRecommendations(skills);

        res.status(200).json({
            success: true,
            data: recommendations
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCareerRecommendations
};
