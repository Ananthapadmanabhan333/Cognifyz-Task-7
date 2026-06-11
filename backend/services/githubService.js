const axios = require('axios');

const githubAPI = axios.create({
    baseURL: 'https://api.github.com',
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        // 'Authorization': `token ${process.env.GITHUB_TOKEN}` // Optional, but increases rate limit
    }
});

const getGithubUser = async (username) => {
    try {
        const response = await githubAPI.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(`GitHub User Error: ${error.response?.data?.message || error.message}`);
    }
};

const getGithubRepos = async (username) => {
    try {
        const response = await githubAPI.get(`/users/${username}/repos?sort=updated&per_page=100`);
        return response.data;
    } catch (error) {
        throw new Error(`GitHub Repos Error: ${error.response?.data?.message || error.message}`);
    }
};

module.exports = {
    getGithubUser,
    getGithubRepos
};
