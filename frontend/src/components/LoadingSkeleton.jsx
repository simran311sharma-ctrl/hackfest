import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, BookOpen, HelpCircle, Zap, Check } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Reading & tokenizing lecture content...', icon: BookOpen },
  { id: 2, label: 'AI synthesizing core concepts and simplified explanations...', icon: Brain },
  { id: 3, label: 'Generating university exam questions & 7-mark outlines...', icon: HelpCircle },
  { id: 4, label: 'Curating viva questions and 1-minute quick revision...', icon: Zap }
];

export default function LoadingSkeleton() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card loading-wrapper">
      <div className="ai-pulse-orb">
        <Sparkles size={36} />
      </div>

      <h3 className="loading-title">StudyBuddy AI is Studying Your Lecture</h3>
      <p className="loading-subtitle">
        Analyzing academic depth, filtering key definitions, and crafting college study material...
      </p>

      <div className="progress-steps">
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;

          return (
            <div
              key={step.id}
              className={`progress-step ${isActive ? 'active' : ''}`}
              style={{
                opacity: idx > currentStep ? 0.45 : 1,
                borderColor: isActive ? 'var(--primary)' : isDone ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'
              }}
            >
              {isDone ? (
                <Check size={16} color="#10b981" />
              ) : isActive ? (
                <div className="spinner" />
              ) : (
                <StepIcon size={16} color="var(--text-dim)" />
              )}
              <span style={{ fontWeight: isActive ? 600 : 400 }}>{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
