import React, { useState } from 'react';
import { 
  HelpCircle, 
  Award, 
  Lightbulb, 
  CheckCircle2, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Target
} from 'lucide-react';

export default function ExamQuestions({ examData }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'five' | 'short' | 'long'
  const [expandedCards, setExpandedCards] = useState({});

  if (!examData) {
    return <p style={{ color: 'var(--text-muted)' }}>No exam questions generated yet.</p>;
  }

  const {
    importantTopics = [],
    fiveImportantExamQuestions = [],
    threeShortAnswerQuestions = [],
    twoLongAnswerQuestions = []
  } = examData;

  const toggleExpand = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      {/* High-Yield Topics Revision Card */}
      {importantTopics.length > 0 && (
        <div className="exam-topics-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Target size={18} color="#818cf8" />
            <h4 style={{ fontSize: '1rem', color: '#c7d2fe' }}>High-Yield Semester Exam Revision Topics</h4>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {importantTopics.map((topic, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.9rem', color: '#cbd5e1' }}>
                <span style={{ color: '#818cf8' }}>✓</span>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('all')}
        >
          All Exam Questions ({fiveImportantExamQuestions.length + threeShortAnswerQuestions.length + twoLongAnswerQuestions.length})
        </button>
        <button
          className={`btn btn-sm ${filter === 'five' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('five')}
        >
          5 Core Exam Questions
        </button>
        <button
          className={`btn btn-sm ${filter === 'short' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('short')}
        >
          3 Short Answers (2-3 Marks)
        </button>
        <button
          className={`btn btn-sm ${filter === 'long' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setFilter('long')}
        >
          2 Long Answers (7 Marks)
        </button>
      </div>

      {/* 1. Five Important Exam Questions */}
      {(filter === 'all' || filter === 'five') && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="section-subtitle">
            <Award size={18} color="#f59e0b" />
            5 Important Exam Questions (Standard 5-Mark Weightage)
          </h3>
          {fiveImportantExamQuestions.map((item, idx) => (
            <div key={`five-${idx}`} className="exam-question-card">
              <div className="question-meta">
                <span className="marks-tag">{item.marks || '5 Marks'}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Q{idx + 1}</span>
              </div>
              <h4 className="question-title">{item.question}</h4>
              {item.hint && (
                <div className="question-hint-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', color: '#a5b4fc', fontWeight: 600 }}>
                    <Lightbulb size={14} />
                    <span>Answer Hint & Structure:</span>
                  </div>
                  <p>{item.hint}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 2. Three Short Answer Questions (2-3 Marks) */}
      {(filter === 'all' || filter === 'short') && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="section-subtitle">
            <CheckCircle2 size={18} color="#10b981" />
            3 Short-Answer Questions (2-3 Marks with Model Answers)
          </h3>
          {threeShortAnswerQuestions.map((item, idx) => (
            <div key={`short-${idx}`} className="exam-question-card">
              <div className="question-meta">
                <span className="marks-tag" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  {item.marks || '2-3 Marks'}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Short Q{idx + 1}</span>
              </div>
              <h4 className="question-title">{item.question}</h4>
              {item.modelAnswer && (
                <div className="model-answer-box">
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: '#6ee7b7' }}>
                    Model Answer:
                  </strong>
                  <p>{item.modelAnswer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 3. Two Long Answer Questions (7 Marks) */}
      {(filter === 'all' || filter === 'long') && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 className="section-subtitle">
            <Layers size={18} color="#f43f5e" />
            2 Long-Answer / 7-Mark Descriptive Questions
          </h3>
          {twoLongAnswerQuestions.map((item, idx) => {
            const cardId = `long-${idx}`;
            const isExpanded = expandedCards[cardId] !== false; // default open

            return (
              <div key={cardId} className="exam-question-card" style={{ borderColor: 'rgba(244, 63, 94, 0.25)' }}>
                <div className="question-meta">
                  <span className="marks-tag seven-marks">{item.marks || '7 Marks'}</span>
                  <button
                    onClick={() => toggleExpand(cardId)}
                    className="btn btn-outline btn-sm"
                    style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                  >
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    <span>{isExpanded ? 'Hide Outline' : 'Show 7-Mark Outline'}</span>
                  </button>
                </div>

                <h4 className="question-title" style={{ fontSize: '1.1rem' }}>{item.question}</h4>

                {isExpanded && item.answerOutline && (
                  <div style={{ marginTop: '1rem', background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fda4af', marginBottom: '0.5rem' }}>
                      📋 Recommended 7-Mark Step-by-Step Answer Structure:
                    </div>
                    {item.answerOutline.map((step, sIdx) => (
                      <div key={sIdx} className="outline-step">
                        <span style={{ color: '#f43f5e', fontWeight: 600 }}>{sIdx + 1}.</span>
                        <span>{step.replace(/^\d+\.\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
