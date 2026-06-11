const { analyzeResume } = require('../services/aiService');

const analyzeUserResume = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload a resume file' });
        }

        // In a real application, you would parse the PDF/Word file to text here.
        // For this task, assuming the user uploads a text file or we just use dummy text for now.
        const resumeText = req.file.buffer.toString('utf-8');
        
        // Fallback to dummy text if file is empty or unreadable
        const textToAnalyze = resumeText.trim().length > 0 ? resumeText : "Sample software engineer resume with React, Node.js and MongoDB skills.";

        const analysisResult = await analyzeResume(textToAnalyze);

        res.status(200).json({
            success: true,
            data: analysisResult
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    analyzeUserResume
};
