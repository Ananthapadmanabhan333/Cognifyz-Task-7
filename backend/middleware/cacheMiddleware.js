const { redisClient } = require('../config/redis');

const cache = (duration) => {
    return async (req, res, next) => {
        if (!redisClient.isReady) {
            return next(); // Fallback if redis is not connected
        }
        
        const key = '__express__' + req.originalUrl || req.url;
        try {
            const cachedResponse = await redisClient.get(key);
            if (cachedResponse) {
                return res.status(200).json(JSON.parse(cachedResponse));
            } else {
                res.sendResponse = res.json;
                res.json = (body) => {
                    redisClient.setEx(key, duration, JSON.stringify(body));
                    res.sendResponse(body);
                };
                next();
            }
        } catch (error) {
            next();
        }
    };
};

module.exports = cache;
