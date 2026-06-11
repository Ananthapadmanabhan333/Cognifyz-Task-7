const { getGithubUser, getGithubRepos } = require('../services/githubService');

const getUserProfile = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await getGithubUser(username);
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(error);
    }
};

const getUserRepos = async (req, res, next) => {
    try {
        const { username } = req.params;
        const repos = await getGithubRepos(username);
        
        // Analyze languages
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        res.status(200).json({ 
            success: true, 
            data: repos,
            analytics: {
                totalRepos: repos.length,
                languages
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserProfile,
    getUserRepos
};
