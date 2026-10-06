import { SYSTEM_PROMPT, buildUserPrompt } from './promptTemplates.js';
import { generateLocalStudyGuide } from './mockStudyEngine.js';

/**
 * Service to handle AI lecture summarization requests.
 * Uses Google Gemma / Gemini API when GEMMA_API_KEY is available.
 * Gracefully falls back to local intelligent study engine if no key or on network failure.
 */
export async function summarizeLecture(lectureText, options = {}) {
  const apiKey = process.env.GEMMA_API_KEY || process.env.GEMINI_API_KEY;
  const preferredModel = options.model || process.env.AI_MODEL || 'gemma-2-9b-it';

  // If no API key is set in environment, use high-quality local engine
  if (!apiKey || apiKey.trim() === '' || apiKey.trim() === 'your_google_gemma_api_key_here') {
    console.log('[StudyBuddy AI] No GEMMA_API_KEY detected in .env. Using Built-in Study Engine (Demo Mode).');
    const localData = generateLocalStudyGuide(lectureText);
    return {
      engine: 'local-offline',
      engineName: 'Built-in Study Engine (Demo Mode)',
      model: 'Built-in Pedagogical Rules Engine',
      apiKeyConfigured: false,
      message: 'Running with Built-in Engine. For live Gemma 2 inference, provide your GEMMA_API_KEY in backend/.env',
      data: localData
    };
  }

  // Attempt Google AI Studio API call (supporting Gemma 2 & Gemini models)
  console.log(`[StudyBuddy AI] Calling Google AI API using model: ${preferredModel}...`);

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${preferredModel}:generateContent?key=${apiKey.trim()}`;

    const requestBody = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: buildUserPrompt(lectureText) }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
        maxOutputTokens: 4096
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[StudyBuddy AI] Google AI API responded with ${response.status}: ${errText}`);
      
      // If gemma model name failed, try gemini-1.5-flash fallback if needed
      if (preferredModel.startsWith('gemma') && response.status === 404) {
        console.log('[StudyBuddy AI] Gemma endpoint not enabled on this key tier, trying gemini-1.5-flash fallback...');
        return await summarizeLecture(lectureText, { model: 'gemini-1.5-flash' });
      }

      console.log('[StudyBuddy AI] Falling back to high-grade local engine due to API response error.');
      const localData = generateLocalStudyGuide(lectureText);
      return {
        engine: 'local-fallback',
        engineName: 'Built-in Study Engine (Fallback)',
        model: preferredModel,
        apiKeyConfigured: true,
        warning: `AI API returned status ${response.status}. Switched to local engine so your workflow continues uninterrupted.`,
        data: localData
      };
    }

    const json = await response.json();
    const candidateText = json.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      throw new Error('Empty response received from AI model.');
    }

    // Parse JSON from model text
    let parsedData;
    try {
      // Clean possible markdown code fences if model accidentally emitted them
      const cleaned = candidateText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      parsedData = JSON.parse(cleaned);
    } catch (parseError) {
      console.error('[StudyBuddy AI] JSON Parse error from model output:', parseError);
      const localData = generateLocalStudyGuide(lectureText);
      return {
        engine: 'local-fallback',
        engineName: 'Built-in Study Engine (Parse Error Fallback)',
        model: preferredModel,
        apiKeyConfigured: true,
        warning: 'AI model returned non-standard JSON formatting. Used robust local parser fallback.',
        data: localData
      };
    }

    return {
      engine: 'google-gemma',
      engineName: `Google ${preferredModel}`,
      model: preferredModel,
      apiKeyConfigured: true,
      message: 'Successfully generated using Google AI (Gemma/Gemini)',
      data: parsedData
    };
  } catch (error) {
    console.error('[StudyBuddy AI] Network or execution error calling AI API:', error.message);
    const localData = generateLocalStudyGuide(lectureText);
    return {
      engine: 'local-fallback',
      engineName: 'Built-in Study Engine (Network Fallback)',
      model: preferredModel,
      apiKeyConfigured: true,
      warning: `Network error connecting to AI API: ${error.message}. Loaded offline analysis.`,
      data: localData
    };
  }
}
