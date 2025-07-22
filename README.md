# ✨ Word Count and Text Analyzer

This is a simple Express-based web app that analyzes user-submitted text. It counts words, and uses OpenAI (GPT) to suggest improvements and review grammar, spelling, and clarity.

---

## 📦 Features

- Counts total words and numbers in the given text
- Suggests improvements using OpenAI API
- Gives feedback on grammar, sentence structure, and rephrasing
- JSON-based API responses
- Ready to deploy on [Vercel](https://vercel.com) using `vercel.json`

---

## 🚀 Vercel Deployment Structure

According to [Vercel's Express integration guide](https://vercel.com/guides/using-express-with-vercel), we use the following:

### `vercel.json`

```json
[{
  "builds": [
    { "src": "api/index.ts", "use": "@vercel/node" }
  ]
}]
```

This tells Vercel to treat `api/index.ts` as a serverless function using the Node.js runtime.


## 🛠️ Running Locally

1. Make sure to install dependencies:
```bash
npm install
```
2. Environment Setup
- Rename `.env.example` to `.env`
```bash
mv .env.example .env
```
- Fill in your OpenAI API key in `.env`

```
OPENAI_API_KEY=your-openai-key-here
```
3. Run it!
```bash
npm start
```
---

## 📮 API Endpoints

### GET `/api/health`

Check if server is running.

**Response**
```json
{ "status": "OK", "message": "Text Analyzer API is running" }
```

---

### POST `/api/analyze-text`

Send raw text to be analyzed.

**Request Body**
```json
{
  "text": "Your sample input text here."
}
```

**Response**
```json
{
  "totalTokens": 16,
  "wordCount": 12,
  "numberCount": 2,
  "words": ["Your", "sample", "input", "text", "here"],
  "numbers": ["2023"],
  "analysis": "Your text could be improved by...",
  "message": "Your essay has 12 words and 2 numbers."
}
```
---

## 📜 License

The Unlicensed
