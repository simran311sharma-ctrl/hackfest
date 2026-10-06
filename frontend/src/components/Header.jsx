import React from 'react';
import { GraduationCap, Sparkles, Info, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Header({ backendHealth, onOpenAbout }) {
  const isOnline = backendHealth.online;
  const isGemmaKey = backendHealth.apiKeyConfigured;
  const modelName = backendHealth.model || 'gemma-2-9b-it';

  return (
    <header className="header-wrapper">
      <div className="container header-inner">
        {/* Brand */}
        <div className="brand-section">
          <div className="logo-badge" title="StudyBuddy Academic Assistant">
            <GraduationCap size={26} />
          </div>
          <div>
            <h1 className="brand-title">
              StudyBuddy
              <span className="hero-pill" style={{ margin: 0, padding: '0.15rem 0.6rem', fontSize: '0.72rem' }}>
                AI
              </span>
            </h1>
            <p className="brand-subtitle">Your AI-powered study companion</p>
          </div>
        </div>

        {/* AI & System Indicators */}
        <div className="header-actions">
          {/* Engine indicator */}
          <div 
            className="model-tag" 
            title={isGemmaKey ? `Live AI Cloud: Google ${modelName}` : 'Running Built-in Study Engine (Demo Mode)'}
          >
            <Cpu size={14} />
            <span>{isGemmaKey ? `Google Gemma (${modelName})` : 'StudyBuddy Engine (Demo)'}</span>
            <span 
              className="pulse-dot" 
              style={{ backgroundColor: isOnline ? (isGemmaKey ? '#10b981' : '#f59e0b') : '#ef4444' }} 
            />
          </div>

          {/* Hackathon About Modal Trigger */}
          <button 
            className="btn btn-secondary btn-sm" 
            onClick={onOpenAbout}
            title="View Hackathon Presentation & Future Scope"
            id="btn-about-project"
          >
            <Info size={15} />
            <span>About Project</span>
          </button>
        </div>
      </div>
    </header>
  );
}
