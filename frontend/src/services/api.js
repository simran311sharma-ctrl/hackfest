/**
 * API Service for StudyBuddy Frontend
 * Manages communication with backend AI service and formatting / export utilities.
 */

const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Check backend status and AI configuration
 */
export async function checkBackendHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    const response = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return { online: false, error: `Backend HTTP ${response.status}` };
    }
    const data = await response.json();
    return { online: true, ...data };
  } catch (error) {
    return { 
      online: false, 
      error: error.name === 'AbortError' ? 'Backend connection timed out' : 'Backend offline or unreachable'
    };
  }
}

/**
 * Send lecture text for AI summarization
 */
export async function requestLectureSummary(lectureText, model = 'gemma-2-9b-it') {
  try {
    const response = await fetch(`${API_BASE_URL}/summarize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ lectureText, model })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Server responded with error status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('[API Service] Summarize request failed:', error);
    throw error;
  }
}

/**
 * Format the entire study guide into clean, printable Plain Text format
 */
export function formatAsText(data) {
  if (!data) return '';
  const s = data.summary || {};
  const e = data.examMode || {};
  const q = data.quickRevision || {};

  let out = `=================================================================\n`;
  out += `STUDYBUDDY – AI LECTURE STUDY GUIDE\n`;
  out += `Title: ${data.title || 'Lecture Summary'}\n`;
  out += `Category: ${data.subjectCategory || 'Academic Notes'}\n`;
  out += `Reading Time: ${data.estimatedReadingTime || 'N/A'}\n`;
  out += `Generated On: ${new Date().toLocaleString()}\n`;
  out += `=================================================================\n\n`;

  out += `-----------------------------------------------------------------\n`;
  out += `1. SHORT SUMMARY\n`;
  out += `-----------------------------------------------------------------\n`;
  out += `${s.shortSummary || 'N/A'}\n\n`;

  out += `-----------------------------------------------------------------\n`;
  out += `2. DETAILED EXPLANATION (SIMPLIFIED)\n`;
  out += `-----------------------------------------------------------------\n`;
  out += `${s.detailedExplanation || 'N/A'}\n\n`;

  out += `-----------------------------------------------------------------\n`;
  out += `3. IMPORTANT POINTS & TAKEAWAYS\n`;
  out += `-----------------------------------------------------------------\n`;
  (s.importantPoints || []).forEach((pt, i) => {
    out += `• ${pt}\n`;
  });
  out += `\n`;

  out += `-----------------------------------------------------------------\n`;
  out += `4. KEY CONCEPTS\n`;
  out += `-----------------------------------------------------------------\n`;
  (s.keyConcepts || []).forEach((c) => {
    out += `[${c.term}]: ${c.explanation}\n\n`;
  });

  out += `-----------------------------------------------------------------\n`;
  out += `5. DEFINITIONS & FORMULAS\n`;
  out += `-----------------------------------------------------------------\n`;
  (s.definitions || []).forEach((d) => {
    out += `• ${d.term}: ${d.definition}\n`;
  });
  if (q.formulasOrRules && q.formulasOrRules.length > 0) {
    out += `\nGoverning Rules / Formulas:\n`;
    q.formulasOrRules.forEach(f => {
      out += `  * ${f.name}: ${f.statement}\n`;
    });
  }
  out += `\n`;

  out += `-----------------------------------------------------------------\n`;
  out += `6. EXAM MODE: PRACTICE QUESTIONS & BLUEPRINT\n`;
  out += `-----------------------------------------------------------------\n`;
  out += `High Yield Topics:\n`;
  (e.importantTopics || []).forEach(t => out += `  - ${t}\n`);
  out += `\nFive Important Exam Questions:\n`;
  (e.fiveImportantExamQuestions || []).forEach((item, idx) => {
    out += `  Q${idx + 1} (${item.marks || '5 Marks'}): ${item.question}\n`;
    if (item.hint) out += `     Hint: ${item.hint}\n`;
  });
  out += `\nThree Short Answer Questions (2-3 Marks):\n`;
  (e.threeShortAnswerQuestions || []).forEach((item, idx) => {
    out += `  SA Q${idx + 1} (${item.marks || '2-3 Marks'}): ${item.question}\n`;
    out += `     Model Answer: ${item.modelAnswer}\n`;
  });
  out += `\nTwo Long Answer Questions (7 Marks):\n`;
  (e.twoLongAnswerQuestions || []).forEach((item, idx) => {
    out += `  LA Q${idx + 1} (${item.marks || '7 Marks'}): ${item.question}\n`;
    out += `     Structured Answer Outline:\n`;
    (item.answerOutline || []).forEach(step => out += `       ${step}\n`);
  });
  out += `\n`;

  out += `-----------------------------------------------------------------\n`;
  out += `7. VIVA VOCE (RAPID FIRE QUESTIONS)\n`;
  out += `-----------------------------------------------------------------\n`;
  (e.vivaQuestions || []).forEach((v, idx) => {
    out += `  Q${idx + 1}: ${v.question}\n`;
    out += `  Ans: ${v.answer}\n\n`;
  });

  out += `-----------------------------------------------------------------\n`;
  out += `8. QUICK REVISION (ONE MINUTE CRAM & EXAM TRAPS)\n`;
  out += `-----------------------------------------------------------------\n`;
  out += `One-Minute Revision:\n`;
  (q.oneMinuteRevision || []).forEach(r => out += `  ⚡ ${r}\n`);
  out += `\n"Remember These" Points & Pitfalls to Avoid:\n`;
  (q.rememberThese || []).forEach(rem => out += `  ⚠️ ${rem}\n`);
  out += `\nKeywords: ${(s.keywords || []).join(', ')}\n`;
  out += `\n=================================================================\n`;
  out += `Generated by StudyBuddy – Your AI-Powered Study Companion\n`;
  out += `=================================================================\n`;

  return out;
}

/**
 * Trigger browser file download
 */
export function downloadFile(content, filename, type = 'text/plain;charset=utf-8') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
