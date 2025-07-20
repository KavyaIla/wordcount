require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { openai } = require('@ai-sdk/openai');
const { generateText } = require('ai');

// Set the API key as an environment variable

const apiKey = process.env.OPENAI_API_KEY;
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Text Analyzer API is running' });
});

// Text analysis endpoint (OpenAI suggestions + word/number count + lists)
app.post('/api/analyze-text', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    // Split input into tokens based on whitespace
    const tokens = text.trim().split(/\s+/);

    // Filter words and numbers separately using regex
    const words = tokens.filter(token => /^[A-Za-z]+$/.test(token));
    const numbers = tokens.filter(token => /^\d+$/.test(token));

    const wordCount = words.length;
    const numberCount = numbers.length;

    // Generate improvements using OpenAI
    const result = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: `Please analyze the following text and provide a comprehensive review. Focus on:
        
1. Grammar and spelling
2. Suggest improvements to make it more effective, formal, or impressive.
3. If any sentences can be rephrased to sound better, rephrase them.

Text to analyze:
${text}

Please provide a detailed analysis with specific examples and actionable suggestions.`,
      maxTokens: 1000,
    });

    // Final response
    res.json({
      totalTokens: tokens.length,
      wordCount: wordCount,
      numberCount: numberCount,
      words: words,
      numbers: numbers,
      analysis: result.text,
      message: `Your essay has ${wordCount} words and ${numberCount} numbers.`,
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Analysis failed. Please try again later.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Text analysis: http://localhost:${PORT}/api/analyze-text`);
});
