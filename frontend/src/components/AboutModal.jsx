import React from 'react';
import { X, Sparkles, Target, Zap, Rocket, Layers, CheckCircle } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-badge" style={{ width: '36px', height: '36px' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>About StudyBuddy</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Google Gemma Hackathon Project Presentation
              </p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Problem */}
        <div className="about-section-block">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ color: '#f43f5e' }}>●</span> Problem Statement
          </h3>
          <p>
            College and school students spend 3 to 5 hours watching dense, fast-paced lectures daily. 
            Making handwritten or digital notes manually is slow, stressful, and often leaves out 
            critical exam-oriented definitions, viva questions, and high-scoring 7-mark question structures.
          </p>
        </div>

        {/* Solution */}
        <div className="about-section-block">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ color: '#10b981' }}>●</span> The StudyBuddy Solution
          </h3>
          <p>
            StudyBuddy is an AI-powered academic companion built on Google Gemma. 
            In seconds, it transforms raw lecture transcripts, typed notes, or uploaded PDFs into 
            intuitive study modules: concise summaries, simple analogies, important points, 
            university exam questions (short 2-3 mark and long 7-mark breakdowns), viva voce prep, 
            and 1-minute quick revision cards.
          </p>
        </div>

        {/* Target Users */}
        <div className="about-section-block">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Target size={18} style={{ color: '#38bdf8' }} /> Target Users
          </h3>
          <ul className="future-list">
            <li className="future-item"><CheckCircle size={15} color="#38bdf8" /> College / University Students</li>
            <li className="future-item"><CheckCircle size={15} color="#38bdf8" /> High School Students</li>
            <li className="future-item"><CheckCircle size={15} color="#38bdf8" /> Teachers & Teaching Assistants</li>
            <li className="future-item"><CheckCircle size={15} color="#38bdf8" /> Competitive Exam Aspirants (GATE, GRE)</li>
          </ul>
        </div>

        {/* Future Scope */}
        <div className="about-section-block">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Rocket size={18} style={{ color: '#a855f7' }} /> Future Roadmap & Scope
          </h3>
          <ul className="future-list">
            <li className="future-item"><Zap size={14} color="#a855f7" /> Audio & Video Lecture Transcription</li>
            <li className="future-item"><Zap size={14} color="#a855f7" /> Multilingual Summaries (Hindi, Spanish, etc.)</li>
            <li className="future-item"><Zap size={14} color="#a855f7" /> Personalized AI Study Plans</li>
            <li className="future-item"><Zap size={14} color="#a855f7" /> Interactive AI Quiz Generation</li>
            <li className="future-item"><Zap size={14} color="#a855f7" /> Spaced-Repetition Digital Flashcards</li>
            <li className="future-item"><Zap size={14} color="#a855f7" /> Learning Progress & Mastery Analytics</li>
          </ul>
        </div>

        {/* Architecture Note */}
        <div className="about-section-block" style={{ marginBottom: 0 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Layers size={18} style={{ color: '#f59e0b' }} /> AI Architecture & Security
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Built with a decoupled React + Vite frontend and Node.js Express server. 
            All API keys (<code>GEMMA_API_KEY</code>) remain securely enclosed on the server side 
            and are never exposed to the client. Features an offline intelligent educational rules engine 
            to guarantee zero downtime during hackathon evaluation.
          </p>
        </div>

        <div style={{ marginTop: '1.75rem', textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={onClose}>
            Back to Summarizer
          </button>
        </div>
      </div>
    </div>
  );
}
