import React, { useState } from 'react';
import { HelpCircle, Eye, EyeOff, Check, Sparkles, MessageSquare } from 'lucide-react';

export default function VivaVoce({ vivaQuestions = [] }) {
  const [revealed, setRevealed] = useState({});
  const [allRevealed, setAllRevealed] = useState(false);

  const toggleReveal = (idx) => {
    setRevealed((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleAll = () => {
    const nextState = !allRevealed;
    setAllRevealed(nextState);
    const newRevealed = {};
    vivaQuestions.forEach((_, idx) => {
      newRevealed[idx] = nextState;
    });
    setRevealed(newRevealed);
  };

  if (!vivaQuestions || vivaQuestions.length === 0) {
    return <p style={{ color: 'var(--text-muted)' }}>No viva questions generated yet.</p>;
  }

  return (
    <div>
      {/* Viva Header & Interactive Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h3 className="section-subtitle" style={{ margin: 0 }}>
            <MessageSquare size={18} color="#a855f7" />
            Viva Voce Oral Exam Preparation (5 Rapid-Fire Questions)
          </h3>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Practice answering before revealing the model viva answer.
          </p>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={toggleAll}
          id="btn-toggle-all-viva"
        >
          {allRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
          <span>{allRevealed ? 'Hide All Answers' : 'Reveal All Answers'}</span>
        </button>
      </div>

      {/* Viva Question Cards */}
      {vivaQuestions.map((v, idx) => {
        const isShown = Boolean(revealed[idx]);

        return (
          <div key={idx} className="viva-card">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div className="viva-q-text">
                <span style={{ 
                  background: 'rgba(168, 85, 247, 0.2)', 
                  color: '#c084fc', 
                  borderRadius: '50%', 
                  width: '24px', 
                  height: '24px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '0.785rem',
                  flexShrink: 0
                }}>
                  {idx + 1}
                </span>
                <span>{v.question}</span>
              </div>

              <button
                className="viva-reveal-btn"
                onClick={() => toggleReveal(idx)}
                title={isShown ? 'Hide answer' : 'Reveal answer'}
              >
                {isShown ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <EyeOff size={13} /> Hide
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Eye size={13} /> Reveal
                  </span>
                )}
              </button>
            </div>

            {/* Answer Box */}
            {isShown && (
              <div className="viva-answer-content">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem', fontWeight: 700, color: '#34d399', fontSize: '0.85rem' }}>
                  <Check size={15} />
                  <span>Viva Examiner Answer:</span>
                </div>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{v.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
