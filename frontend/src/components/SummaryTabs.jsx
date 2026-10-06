import React, { useState } from 'react';
import { 
  FileText, 
  BookOpen, 
  ListOrdered, 
  HelpCircle, 
  MessageSquare, 
  Zap, 
  Copy, 
  Download, 
  RotateCcw, 
  Trash2, 
  Check, 
  Clock, 
  Tag, 
  Sparkles,
  FileCode
} from 'lucide-react';
import ExamQuestions from './ExamQuestions';
import VivaVoce from './VivaVoce';
import QuickRevision from './QuickRevision';
import { formatAsText, downloadFile } from '../services/api';

export default function SummaryTabs({
  studyData,
  onGenerateAgain,
  onClearAll,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'detailed' | 'points' | 'questions' | 'viva' | 'revision'
  const [copied, setCopied] = useState(false);

  if (!studyData) return null;

  const {
    title = 'Lecture Study Guide',
    estimatedReadingTime = '4 mins',
    subjectCategory = 'Academic Studies',
    summary = {},
    examMode = {},
    quickRevision = {}
  } = studyData;

  const {
    shortSummary = '',
    detailedExplanation = '',
    importantPoints = [],
    keyConcepts = [],
    definitions = [],
    keywords = []
  } = summary;

  // Handle Copy to Clipboard
  const handleCopy = async () => {
    let textToCopy = '';

    if (activeTab === 'summary') {
      textToCopy = `TITLE: ${title}\n\nSHORT SUMMARY:\n${shortSummary}\n\nKEY CONCEPTS:\n` +
        keyConcepts.map(c => `• ${c.term}: ${c.explanation}`).join('\n');
    } else if (activeTab === 'detailed') {
      textToCopy = `DETAILED LECTURE EXPLANATION:\n${detailedExplanation}`;
    } else if (activeTab === 'points') {
      textToCopy = `IMPORTANT POINTS:\n` + importantPoints.map((p, i) => `${i + 1}. ${p}`).join('\n');
    } else if (activeTab === 'questions') {
      textToCopy = `EXAM QUESTIONS FOR ${title}\n\n` +
        (examMode.fiveImportantExamQuestions || []).map((q, i) => `Q${i + 1} (${q.marks}): ${q.question}\nHint: ${q.hint}\n`).join('\n') +
        `\nSHORT ANSWER QUESTIONS:\n` +
        (examMode.threeShortAnswerQuestions || []).map((q, i) => `SA Q${i + 1} (${q.marks}): ${q.question}\nModel Answer: ${q.modelAnswer}\n`).join('\n') +
        `\nLONG ANSWER QUESTIONS (7 MARKS):\n` +
        (examMode.twoLongAnswerQuestions || []).map((q, i) => `LA Q${i + 1} (${q.marks}): ${q.question}\nOutline:\n${q.answerOutline.join('\n')}\n`).join('\n');
    } else if (activeTab === 'viva') {
      textToCopy = `VIVA QUESTIONS FOR ${title}\n\n` +
        (examMode.vivaQuestions || []).map((v, i) => `Q${i + 1}: ${v.question}\nAnswer: ${v.answer}\n`).join('\n');
    } else if (activeTab === 'revision') {
      textToCopy = `ONE-MINUTE REVISION:\n` +
        (quickRevision.oneMinuteRevision || []).join('\n') +
        `\n\nREMEMBER THESE:\n` +
        (quickRevision.rememberThese || []).join('\n');
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onShowToast({
        type: 'success',
        title: 'Copied to Clipboard',
        message: `Copied ${activeTab.toUpperCase()} section notes to your clipboard.`
      });
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      onShowToast({
        type: 'error',
        title: 'Copy Failed',
        message: 'Could not access clipboard. Please copy manually.'
      });
    }
  };

  // Download entire study pack as formatted TXT file
  const handleDownloadTxt = () => {
    const formatted = formatAsText(studyData);
    const sanitizedTitle = (title || 'Lecture_Summary').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    downloadFile(formatted, `${sanitizedTitle}_studyguide.txt`, 'text/plain;charset=utf-8');
    onShowToast({
      type: 'success',
      title: 'Downloaded File',
      message: 'Downloaded complete Study Guide as .txt'
    });
  };

  // Download as Markdown
  const handleDownloadMarkdown = () => {
    let md = `# ${title}\n\n`;
    md += `> **Category**: ${subjectCategory} | **Reading Time**: ${estimatedReadingTime}\n\n`;
    md += `## 1. Short Summary\n${shortSummary}\n\n`;
    md += `## 2. Detailed Explanation\n${detailedExplanation}\n\n`;
    md += `## 3. Important Takeaways\n`;
    importantPoints.forEach(p => md += `- ${p}\n`);
    md += `\n## 4. Key Concepts\n`;
    keyConcepts.forEach(c => md += `### ${c.term}\n${c.explanation}\n\n`);
    md += `## 5. Exam Mode Questions\n`;
    (examMode.fiveImportantExamQuestions || []).forEach(q => md += `* **[${q.marks}] ${q.question}**\n  * *Hint*: ${q.hint}\n`);
    md += `\n## 6. Viva Voce\n`;
    (examMode.vivaQuestions || []).forEach(v => md += `* **Q**: ${v.question}\n  * **A**: ${v.answer}\n`);
    md += `\n## 7. Quick Revision\n`;
    (quickRevision.oneMinuteRevision || []).forEach(r => md += `* ⚡ ${r}\n`);

    const sanitizedTitle = (title || 'Lecture_Summary').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    downloadFile(md, `${sanitizedTitle}_notes.md`, 'text/markdown;charset=utf-8');
    onShowToast({
      type: 'success',
      title: 'Downloaded Markdown',
      message: 'Downloaded complete Study Guide as .md'
    });
  };

  return (
    <div className="glass-card results-section" id="study-results-section">
      {/* Top Header Card */}
      <div className="result-card-header">
        <div className="lecture-title-box">
          <h2 className="lecture-title-text text-gradient">{title}</h2>
          <div className="lecture-meta-row">
            <span className="meta-badge">
              <Tag size={12} color="#818cf8" />
              <span>{subjectCategory}</span>
            </span>
            <span className="meta-badge">
              <Clock size={12} color="#38bdf8" />
              <span>{estimatedReadingTime} read</span>
            </span>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="result-actions">
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handleCopy}
            title="Copy current tab contents"
            id="btn-copy-tab"
          >
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Tab'}</span>
          </button>

          <button 
            className="btn btn-secondary btn-sm" 
            onClick={handleDownloadTxt}
            title="Download full study guide as .txt file"
            id="btn-download-txt"
          >
            <Download size={14} />
            <span>Download TXT</span>
          </button>

          <button 
            className="btn btn-outline btn-sm" 
            onClick={handleDownloadMarkdown}
            title="Download full notes as Markdown"
            id="btn-download-md"
          >
            <FileCode size={14} />
            <span>Markdown</span>
          </button>

          <button 
            className="btn btn-demo btn-sm" 
            onClick={onGenerateAgain}
            title="Regenerate analysis with AI"
            id="btn-generate-again"
          >
            <RotateCcw size={14} />
            <span>Generate Again</span>
          </button>

          <button 
            className="btn btn-outline btn-sm" 
            onClick={onClearAll}
            title="Clear and summarize a new lecture"
            id="btn-clear-all"
          >
            <Trash2 size={14} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation Bar */}
      <nav className="tabs-nav" aria-label="Study Guide Sections">
        <button
          className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
          id="tab-btn-summary"
        >
          <FileText size={16} />
          <span>Summary</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'detailed' ? 'active' : ''}`}
          onClick={() => setActiveTab('detailed')}
          id="tab-btn-detailed"
        >
          <BookOpen size={16} />
          <span>Detailed Notes</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'points' ? 'active' : ''}`}
          onClick={() => setActiveTab('points')}
          id="tab-btn-points"
        >
          <ListOrdered size={16} />
          <span>Important Points</span>
          <span className="tab-badge">{importantPoints.length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
          id="tab-btn-questions"
        >
          <HelpCircle size={16} />
          <span>Exam Questions</span>
          <span className="tab-badge">
            {(examMode.fiveImportantExamQuestions || []).length + (examMode.threeShortAnswerQuestions || []).length + (examMode.twoLongAnswerQuestions || []).length}
          </span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'viva' ? 'active' : ''}`}
          onClick={() => setActiveTab('viva')}
          id="tab-btn-viva"
        >
          <MessageSquare size={16} />
          <span>Viva Voce</span>
          <span className="tab-badge">{(examMode.vivaQuestions || []).length}</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'revision' ? 'active' : ''}`}
          onClick={() => setActiveTab('revision')}
          id="tab-btn-revision"
        >
          <Zap size={16} color="#eab308" />
          <span>Quick Revision</span>
        </button>
      </nav>

      {/* Tab Panels */}
      <div className="tab-content">
        {/* 1. Summary Panel */}
        {activeTab === 'summary' && (
          <div>
            <div className="content-box">
              <h3 className="section-subtitle">
                <Sparkles size={18} color="#818cf8" />
                Short Executive Summary
              </h3>
              <p>{shortSummary}</p>
            </div>

            {/* Key Concepts Sub-section */}
            <div style={{ marginTop: '2rem' }}>
              <h3 className="section-subtitle">
                <BookOpen size={18} color="#38bdf8" />
                Key Concepts Breakdown
              </h3>
              <div className="concept-grid">
                {keyConcepts.map((item, idx) => (
                  <div key={idx} className="concept-card">
                    <h4 className="concept-name">{item.term}</h4>
                    <p className="concept-desc">{item.explanation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords */}
            {keywords.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 className="section-subtitle">
                  <Tag size={18} color="#c084fc" />
                  Key Lecture Terms
                </h3>
                <div className="keywords-cloud">
                  {keywords.map((kw, idx) => (
                    <span key={idx} className="keyword-badge">#{kw}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Detailed Notes Panel */}
        {activeTab === 'detailed' && (
          <div>
            <div className="content-box">
              <h3 className="section-subtitle">
                <BookOpen size={18} color="#818cf8" />
                Simplified Lecture Breakdown
              </h3>
              {detailedExplanation.split('\n\n').map((para, idx) => (
                <p key={idx} style={{ marginBottom: '1.25rem' }}>{para}</p>
              ))}
            </div>

            {/* Core Definitions */}
            {definitions.length > 0 && (
              <div style={{ marginTop: '2rem' }}>
                <h3 className="section-subtitle">
                  <FileText size={18} color="#10b981" />
                  Important Definitions
                </h3>
                <div className="concept-grid">
                  {definitions.map((def, idx) => (
                    <div key={idx} className="concept-card" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                      <h4 className="concept-name" style={{ color: '#34d399' }}>{def.term}</h4>
                      <p className="concept-desc">{def.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Important Points Panel */}
        {activeTab === 'points' && (
          <div>
            <h3 className="section-subtitle">
              <ListOrdered size={18} color="#818cf8" />
              Essential Points & Key Takeaways
            </h3>
            <ul className="points-list">
              {importantPoints.map((point, idx) => (
                <li key={idx} className="point-item">
                  <span className="point-icon">
                    <Check size={18} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 4. Exam Questions Panel */}
        {activeTab === 'questions' && (
          <ExamQuestions examData={examMode} />
        )}

        {/* 5. Viva Voce Panel */}
        {activeTab === 'viva' && (
          <VivaVoce vivaQuestions={examMode.vivaQuestions} />
        )}

        {/* 6. Quick Revision Panel */}
        {activeTab === 'revision' && (
          <QuickRevision quickRevision={quickRevision} summary={summary} />
        )}
      </div>
    </div>
  );
}
