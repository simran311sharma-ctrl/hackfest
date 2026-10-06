import React from 'react';
import { Zap, AlertTriangle, BookMarked, Tag, FunctionSquare, CheckSquare } from 'lucide-react';

export default function QuickRevision({ quickRevision = {}, summary = {} }) {
  const {
    oneMinuteRevision = [],
    formulasOrRules = [],
    rememberThese = []
  } = quickRevision;

  const {
    definitions = [],
    keywords = []
  } = summary;

  return (
    <div className="revision-grid">
      {/* 1. One-Minute Revision Cram Box */}
      <div className="cram-box" style={{ gridColumn: '1 / -1' }}>
        <h3 className="section-subtitle">
          <Zap size={18} color="#eab308" />
          ⚡ 1-Minute Pre-Exam Cram (Key Bullet Summary)
        </h3>
        <ul className="points-list">
          {oneMinuteRevision.map((point, idx) => (
            <li key={idx} className="point-item" style={{ borderColor: 'rgba(234, 179, 8, 0.25)', background: 'rgba(234, 179, 8, 0.04)' }}>
              <span style={{ color: '#facc15', fontWeight: 'bold' }}>⚡</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 2. "Remember These" / Common Pitfalls */}
      <div className="cram-box">
        <h3 className="section-subtitle">
          <AlertTriangle size={18} color="#f43f5e" />
          💡 "Remember These" Points & Exam Traps
        </h3>
        {rememberThese.length > 0 ? (
          rememberThese.map((item, idx) => (
            <div key={idx} className="remember-item">
              <span style={{ color: '#f43f5e', fontWeight: 700 }}>⚠️</span>
              <span>{item}</span>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No critical pitfalls flagged in this lecture.</p>
        )}
      </div>

      {/* 3. Formulas & Governing Rules */}
      <div className="cram-box">
        <h3 className="section-subtitle">
          <FunctionSquare size={18} color="#38bdf8" />
          📐 Important Formulas & Governing Rules
        </h3>
        {formulasOrRules.length > 0 ? (
          formulasOrRules.map((rule, idx) => (
            <div key={idx} className="formula-card">
              <div className="formula-name">{rule.name}</div>
              <div className="formula-statement">{rule.statement}</div>
            </div>
          ))
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>No mathematical formulas identified in this lecture.</p>
        )}
      </div>

      {/* 4. Important Definitions */}
      <div className="cram-box" style={{ gridColumn: '1 / -1' }}>
        <h3 className="section-subtitle">
          <BookMarked size={18} color="#10b981" />
          📖 Core Definitions for University Exams
        </h3>
        <div className="concept-grid">
          {definitions.map((def, idx) => (
            <div key={idx} className="concept-card" style={{ borderColor: 'rgba(16, 185, 129, 0.2)' }}>
              <div className="concept-name" style={{ color: '#34d399' }}>{def.term}</div>
              <div className="concept-desc">{def.definition}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Keywords Tag Cloud */}
      {keywords.length > 0 && (
        <div className="cram-box" style={{ gridColumn: '1 / -1' }}>
          <h3 className="section-subtitle">
            <Tag size={18} color="#a855f7" />
            🏷️ Subject Keywords & Vocabulary
          </h3>
          <div className="keywords-cloud">
            {keywords.map((kw, idx) => (
              <span key={idx} className="keyword-badge">
                #{kw}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
