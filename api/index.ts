import express, { Request, Response } from 'express';
import cors from 'cors';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';

// Load from Vercel environment
const apiKey = process.env.OPENAI_API_KEY;
const port = process.env.PORT || 5000;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Text Analyzer API is running' });
});

// Text analysis endpoint
app.post('/api/analyze-text', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const tokens = text.trim().split(/\s+/);
    const words = tokens.filter(token => /^[A-Za-z]+$/.test(token));
    const numbers = tokens.filter(token => /^\d+$/.test(token));

    const wordCount = words.length;
    const numberCount = numbers.length;

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

    res.json({
      totalTokens: tokens.length,
      wordCount,
      numberCount,
      words,
      numbers,
      analysis: result.text,
      message: `Your essay has ${wordCount} words and ${numberCount} numbers.`,
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Analysis failed. Please try again later.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/api/health`);
  console.log(`Text analysis: http://localhost:${port}/api/analyze-text`);
});
