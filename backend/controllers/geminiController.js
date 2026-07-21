const { GoogleGenAI } = require('@google/genai');

let aiClient = null;
const getGeminiClient = () => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not defined.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

// @desc    Generate text content using Google Gemini
// @route   POST /api/gemini/generate
// @access  Public
const generateContent = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Prompt string is required in body.'
      });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    res.status(200).json({
      success: true,
      result: response.text
    });
  } catch (error) {
    if (error.message.includes('GEMINI_API_KEY')) {
      return res.status(500).json({
        error: 'Gemini Configuration Error',
        message: 'GEMINI_API_KEY is not configured in environment variables.'
      });
    }
    next(error);
  }
};

module.exports = {
  generateContent
};
