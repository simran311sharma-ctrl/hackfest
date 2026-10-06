import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { summarizeLecture } from './services/aiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite development server (usually http://localhost:5173) and any local host
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Increase payload limit to support large lecture transcript pastes and notes
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

/**
 * Health check & configuration status endpoint
 */
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMMA_API_KEY && process.env.GEMMA_API_KEY.trim() !== '' && process.env.GEMMA_API_KEY !== 'your_google_gemma_api_key_here');
  res.json({
    status: 'ok',
    service: 'StudyBuddy AI Lecture Summarizer Backend',
    version: '1.0.0',
    model: process.env.AI_MODEL || 'gemma-2-9b-it',
    apiKeyConfigured: hasKey,
    mode: hasKey ? 'live-cloud-gemma' : 'offline-demo-engine',
    timestamp: new Date().toISOString()
  });
});

/**
 * Main AI Summarization endpoint
 */
app.post('/api/summarize', async (req, res) => {
  try {
    const { lectureText, model } = req.body;

    // 1. Validation: Empty or missing text
    if (!lectureText || typeof lectureText !== 'string' || lectureText.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Please provide lecture content. Text cannot be empty.'
      });
    }

    const trimmed = lectureText.trim();
    const wordCount = trimmed.split(/\s+/).length;

    // 2. Validation: Content too short
    if (wordCount < 10) {
      return res.status(400).json({
        success: false,
        error: `Lecture content is too short (${wordCount} words). Please provide at least 10 words for a meaningful summary and study questions.`
      });
    }

    // 3. Validation: Extremely large text warning/safety cap (e.g. > 150,000 chars)
    let processedText = trimmed;
    if (trimmed.length > 100000) {
      console.warn(`[StudyBuddy API] Very large lecture text received (${trimmed.length} chars). Trimming to first 100,000 characters for optimal processing.`);
      processedText = trimmed.slice(0, 100000);
    }

    // 4. Run AI Summarization
    const result = await summarizeLecture(processedText, { model });

    return res.json({
      success: true,
      wordCount,
      ...result
    });

  } catch (error) {
    console.error('[StudyBuddy API] Unexpected server error:', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while processing the lecture. Please try again.',
      details: error.message
    });
  }
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('[StudyBuddy Server Error]', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error occurred.',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`\n========================================================`);
  console.log(`🚀 StudyBuddy AI Backend running on: http://localhost:${PORT}`);
  console.log(`📚 AI Model Target: ${process.env.AI_MODEL || 'gemma-2-9b-it'}`);
  const hasKey = Boolean(process.env.GEMMA_API_KEY && process.env.GEMMA_API_KEY.trim() !== '' && process.env.GEMMA_API_KEY !== 'your_google_gemma_api_key_here');
  console.log(`🔑 GEMMA_API_KEY Status: ${hasKey ? 'Configured ✅ (Live Google AI)' : 'Not Set ⚠️ (Using Built-in Study Engine for Hackathon Demo)'}`);
  console.log(`========================================================\n`);
});
