const getRecommendations = (skills) => {
    // Simple rule-based recommendation engine based on skills
    const recommendations = {
        domains: [],
        technologies: [],
        learningPath: []
    };

    const lowercaseSkills = skills.map(s => s.toLowerCase());

    if (lowercaseSkills.some(s => ['react', 'vue', 'angular', 'html', 'css', 'javascript'].includes(s))) {
        recommendations.domains.push('Frontend Development');
        recommendations.technologies.push('TypeScript', 'Next.js', 'Tailwind CSS');
        recommendations.learningPath.push('Master Advanced React Patterns', 'Learn State Management (Redux/Zustand)', 'Explore Server Side Rendering');
    }

    if (lowercaseSkills.some(s => ['node.js', 'python', 'java', 'express', 'mongodb', 'sql'].includes(s))) {
        recommendations.domains.push('Backend Development');
        recommendations.technologies.push('Docker', 'GraphQL', 'PostgreSQL', 'Redis');
        recommendations.learningPath.push('Learn Microservices Architecture', 'Master Database Indexing', 'Explore Cloud Deployments (AWS/GCP)');
    }

    if (lowercaseSkills.some(s => ['machine learning', 'python', 'tensorflow', 'data analysis'].includes(s))) {
        recommendations.domains.push('Data Science & AI');
        recommendations.technologies.push('PyTorch', 'Pandas', 'Scikit-learn');
        recommendations.learningPath.push('Deep Dive into Neural Networks', 'Learn MLOps', 'Build End-to-end ML Pipelines');
    }

    if (recommendations.domains.length === 0) {
        recommendations.domains.push('Full Stack Development');
        recommendations.technologies.push('MERN Stack', 'Git/GitHub');
        recommendations.learningPath.push('Build full CRUD applications', 'Learn Version Control', 'Practice System Design');
    }

    // Deduplicate
    recommendations.domains = [...new Set(recommendations.domains)];
    recommendations.technologies = [...new Set(recommendations.technologies)];
    
    return recommendations;
};

module.exports = {
    getRecommendations
};
