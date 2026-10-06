/**
 * System and User Prompts for StudyBuddy AI Assistant
 * Specifically tuned for Google Gemma & Gemini models to generate structured study material.
 */

export const SYSTEM_PROMPT = `You are "StudyBuddy", an elite, empathetic AI College Study Assistant and Academic Tutor.
Your goal is to transform college lecture content, transcripts, or notes into crystal-clear, highly effective study materials for students.

Behavioral Guidelines:
1. STRICT ACCURACY: Rely only on the facts and context provided in the lecture. Do NOT invent concepts or hallucinate information that was not taught.
2. MISSING CONTEXT: If a critical definition or formula is referenced vaguely or missing in the lecture, explicitly note: "[Note: Not fully detailed in lecture]".
3. STUDENT-FRIENDLY TONE: Explain complex terms using simple analogies and straightforward language without dumbing down the academic rigor.
4. EXAM-ORIENTED: Highlight concepts that frequently appear in semester exams, university papers, and professor viva sessions.
5. STRICT JSON OUTPUT: Always respond strictly with valid JSON conforming to the exact schema specified, with no markdown code fences or conversational preamble before/after.`;

export function buildUserPrompt(lectureText) {
  return `Please analyze the following lecture text thoroughly and convert it into a structured study guide.

--- LECTURE CONTENT BEGIN ---
${lectureText}
--- LECTURE CONTENT END ---

Output MUST be a valid JSON object matching this exact structure:
{
  "title": "A concise, engaging academic title for this lecture",
  "estimatedReadingTime": "e.g., 4 mins",
  "subjectCategory": "e.g., Computer Science / DBMS / Physics / General",
  "summary": {
    "shortSummary": "A concise, crystal-clear 2-3 paragraph overview capturing the core ideas of the lecture.",
    "detailedExplanation": "A beginner-friendly, detailed breakdown of the lecture. Explain the 'why', 'how', and 'what' using intuitive real-world analogies where appropriate.",
    "importantPoints": [
      "Key takeaway point 1 with actionable insight",
      "Key takeaway point 2 with actionable insight",
      "Key takeaway point 3 with actionable insight",
      "Key takeaway point 4 with actionable insight",
      "Key takeaway point 5 with actionable insight"
    ],
    "keyConcepts": [
      {
        "term": "Concept Name",
        "explanation": "Clear, student-friendly explanation of how this works."
      }
    ],
    "definitions": [
      {
        "term": "Technical Term",
        "definition": "Precise academic definition suitable for exam answers."
      }
    ],
    "keywords": [
      "keyword1",
      "keyword2",
      "keyword3",
      "keyword4",
      "keyword5"
    ]
  },
  "examMode": {
    "importantTopics": [
      "High-yield revision topic 1",
      "High-yield revision topic 2",
      "High-yield revision topic 3"
    ],
    "fiveImportantExamQuestions": [
      {
        "question": "Question 1",
        "marks": "5 Marks",
        "hint": "Key points to cover in the answer"
      },
      {
        "question": "Question 2",
        "marks": "5 Marks",
        "hint": "Key points to cover in the answer"
      },
      {
        "question": "Question 3",
        "marks": "5 Marks",
        "hint": "Key points to cover in the answer"
      },
      {
        "question": "Question 4",
        "marks": "5 Marks",
        "hint": "Key points to cover in the answer"
      },
      {
        "question": "Question 5",
        "marks": "5 Marks",
        "hint": "Key points to cover in the answer"
      }
    ],
    "threeShortAnswerQuestions": [
      {
        "question": "Short answer question 1 (2-3 marks)",
        "marks": "2-3 Marks",
        "modelAnswer": "Concise 2-3 sentence model answer."
      },
      {
        "question": "Short answer question 2 (2-3 marks)",
        "marks": "2-3 Marks",
        "modelAnswer": "Concise 2-3 sentence model answer."
      },
      {
        "question": "Short answer question 3 (2-3 marks)",
        "marks": "2-3 Marks",
        "modelAnswer": "Concise 2-3 sentence model answer."
      }
    ],
    "twoLongAnswerQuestions": [
      {
        "question": "Comprehensive analytical/descriptive question 1 (7 marks)",
        "marks": "7 Marks",
        "answerOutline": [
          "1. Introduction and Definition",
          "2. Core Architecture / Mechanisms",
          "3. Working Example or Diagram description",
          "4. Advantages vs Disadvantages",
          "5. Conclusion / Real-world Application"
        ]
      },
      {
        "question": "Comprehensive analytical/descriptive question 2 (7 marks)",
        "marks": "7 Marks",
        "answerOutline": [
          "1. Concept Overview",
          "2. Step-by-step mathematical or logical formulation",
          "3. Key rules / properties / conditions",
          "4. Practical case study",
          "5. Summary"
        ]
      }
    ],
    "vivaQuestions": [
      {
        "question": "Rapid-fire viva question 1",
        "answer": "Direct, punchy viva answer that professors love."
      },
      {
        "question": "Rapid-fire viva question 2",
        "answer": "Direct, punchy viva answer that professors love."
      },
      {
        "question": "Rapid-fire viva question 3",
        "answer": "Direct, punchy viva answer that professors love."
      },
      {
        "question": "Rapid-fire viva question 4",
        "answer": "Direct, punchy viva answer that professors love."
      },
      {
        "question": "Rapid-fire viva question 5",
        "answer": "Direct, punchy viva answer that professors love."
      }
    ]
  },
  "quickRevision": {
    "oneMinuteRevision": [
      "Ultra-condensed point 1 for last-minute cramming",
      "Ultra-condensed point 2 for last-minute cramming",
      "Ultra-condensed point 3 for last-minute cramming",
      "Ultra-condensed point 4 for last-minute cramming"
    ],
    "formulasOrRules": [
      {
        "name": "Rule / Formula Name",
        "statement": "Mathematical formula, algorithm rule, or canonical law (e.g., Normal Form condition, ACID constraint)"
      }
    ],
    "rememberThese": [
      "Common student pitfall or exam trap to avoid",
      "Crucial distinction or mnemonic to remember",
      "Key point examiners deduct marks for if omitted"
    ]
  }
}

Return ONLY valid JSON.`;
}
