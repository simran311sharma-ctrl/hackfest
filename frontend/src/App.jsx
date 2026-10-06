import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LectureInput from './components/LectureInput';
import SummaryTabs from './components/SummaryTabs';
import LoadingSkeleton from './components/LoadingSkeleton';
import AboutModal from './components/AboutModal';
import NotificationToast from './components/NotificationToast';
import { checkBackendHealth, requestLectureSummary } from './services/api';
import { Sparkles, Cpu, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

export default function App() {
  const [lectureText, setLectureText] = useState('');
  const [studyData, setStudyData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [backendHealth, setBackendHealth] = useState({
    online: false,
    apiKeyConfigured: false,
    model: 'gemma-2-9b-it'
  });

  // Toast Notification Manager
  const showToast = ({ type = 'info', title, message }) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setNotifications((prev) => [...prev, { id, type, title, message }]);

    // Auto-dismiss after 4.5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setNotifications((prev) => prev.filter((t) => t.id !== id));
  };

  // Poll backend health check on mount
  useEffect(() => {
    async function loadHealth() {
      const health = await checkBackendHealth();
      setBackendHealth(health);
      if (health.online) {
        if (!health.apiKeyConfigured) {
          showToast({
            type: 'warning',
            title: 'Demo Mode Active',
            message: 'No GEMMA_API_KEY detected in backend/.env. Using built-in offline study engine for hackathon demo.'
          });
        }
      } else {
        showToast({
          type: 'error',
          title: 'Backend Unreachable',
          message: 'Ensure the backend server is running on http://localhost:5000'
        });
      }
    }
    loadHealth();
  }, []);

  // Main Summarization Trigger
  const handleSummarize = async () => {
    const text = lectureText.trim();
    const words = text ? text.split(/\s+/).length : 0;

    if (!text || words === 0) {
      showToast({
        type: 'error',
        title: 'Empty Lecture Content',
        message: 'Please paste lecture text, upload a file, or click "Try Demo Lecture".'
      });
      return;
    }

    if (words < 10) {
      showToast({
        type: 'warning',
        title: 'Content Too Short',
        message: `Your input contains only ${words} words. College study materials require at least 10 words.`
      });
      return;
    }

    setIsLoading(true);
    setStudyData(null);

    try {
      const response = await requestLectureSummary(text, backendHealth.model);

      if (response && response.data) {
        setStudyData(response.data);

        showToast({
          type: 'success',
          title: 'Study Guide Ready!',
          message: response.engineName 
            ? `Generated using ${response.engineName}` 
            : 'Lecture successfully converted into structured study notes.'
        });

        // Smooth scroll to output
        setTimeout(() => {
          const el = document.getElementById('study-results-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        throw new Error('Invalid response structure received from API.');
      }
    } catch (err) {
      console.error('Summarization failure:', err);
      showToast({
        type: 'error',
        title: 'Generation Failed',
        message: err.message || 'Failed to process lecture. Please check backend server.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    setLectureText('');
    setStudyData(null);
    showToast({
      type: 'info',
      title: 'Reset',
      message: 'Workspace cleared. Ready for a new lecture.'
    });
  };

  return (
    <div className="app-layout">
      {/* Toast System */}
      <NotificationToast notifications={notifications} onDismiss={dismissToast} />

      {/* Top Navigation */}
      <Header
        backendHealth={backendHealth}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content Area */}
      <main className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-pill">
            <Sparkles size={14} color="#818cf8" />
            <span>AI-Powered College Study Assistant</span>
          </div>

          <h2 className="hero-heading">
            Turn Long Lectures Into <br />
            <span className="text-gradient">Exam-Ready Study Notes</span>
          </h2>

          <p className="hero-subtext">
            Upload slides, transcripts, or notes. StudyBuddy breaks down complex concepts,
            creates 5-mark and 7-mark university exam questions, viva prep, and 1-minute revision cards.
          </p>
        </section>

        {/* Engine Banner notification */}
        <div className={`engine-banner ${backendHealth.apiKeyConfigured ? 'cloud-mode' : 'demo-mode'}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Cpu size={16} />
            <span>
              {backendHealth.apiKeyConfigured ? (
                <>
                  <strong>Google Gemma Active:</strong> Connected to Google AI Cloud (Model: {backendHealth.model || 'gemma-2-9b-it'}).
                </>
              ) : (
                <>
                  <strong>Demo / Offline Mode Active:</strong> Using built-in Study Engine. Add <code>GEMMA_API_KEY</code> to <code>backend/.env</code> for live cloud inference.
                </>
              )}
            </span>
          </div>

          <button
            className="btn btn-outline btn-sm"
            style={{ padding: '0.2rem 0.6rem', fontSize: '0.785rem' }}
            onClick={() => setIsAboutOpen(true)}
          >
            Learn More
          </button>
        </div>

        {/* Lecture Input Component */}
        <LectureInput
          lectureText={lectureText}
          setLectureText={setLectureText}
          onSummarize={handleSummarize}
          isLoading={isLoading}
          onShowToast={showToast}
        />

        {/* Loading Indicator */}
        {isLoading && <LoadingSkeleton />}

        {/* Structured Results & Tabs */}
        {studyData && !isLoading && (
          <SummaryTabs
            studyData={studyData}
            onGenerateAgain={handleSummarize}
            onClearAll={handleClearAll}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '2rem 0', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span>StudyBuddy</span>
            <span>•</span>
            <span>Google Gemma Hackathon Project</span>
            <span>•</span>
            <span>Made for Students</span>
          </div>
          <p style={{ fontSize: '0.8rem' }}>
            Transforming college education through modular AI lecture summarization.
          </p>
        </div>
      </footer>

      {/* Presentation / About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
