const axios = require('axios');

// We'll use OpenAI API for resume analysis
const analyzeResume = async (resumeText) => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            // Mock response if no API key is provided
            return {
                skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
                score: 85,
                suggestions: ['Add more quantified achievements', 'Include a section on open source contributions']
            };
        }

        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are an expert HR recruiter and technical resume analyzer. Analyze the given resume text and extract technical skills, provide a resume score out of 100, and give 2-3 brief improvement suggestions. Return the result STRICTLY as a JSON object with keys: 'skills' (array of strings), 'score' (number), 'suggestions' (array of strings)."
                },
                {
                    role: "user",
                    content: `Analyze this resume: ${resumeText}`
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const resultText = response.data.choices[0].message.content;
        return JSON.parse(resultText);

    } catch (error) {
        throw new Error(`AI Analysis Error: ${error.response?.data?.error?.message || error.message}`);
    }
};

module.exports = {
    analyzeResume
};
