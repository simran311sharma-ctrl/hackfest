import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  Trash2, 
  ArrowRight, 
  FileUp, 
  Check, 
  AlertCircle,
  FileCheck,
  FileType
} from 'lucide-react';
import { extractTextFromTxt, extractTextFromPdf } from '../services/pdfExtractor';
import { DEMO_LECTURE } from '../services/demoLecture';

export default function LectureInput({
  lectureText,
  setLectureText,
  onSummarize,
  isLoading,
  onShowToast
}) {
  const [inputMode, setInputMode] = useState('paste'); // 'paste' | 'txt' | 'pdf'
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileSize, setSelectedFileSize] = useState('');
  const [isExtractingFile, setIsExtractingFile] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  const wordCount = lectureText.trim() ? lectureText.trim().split(/\s+/).length : 0;
  const charCount = lectureText.length;

  // Handle Loading Demo Lecture
  const handleLoadDemo = () => {
    setLectureText(DEMO_LECTURE.content);
    setSelectedFileName(DEMO_LECTURE.fileName);
    setSelectedFileSize('~3.8 KB');
    onShowToast({
      type: 'info',
      title: 'Demo Lecture Loaded',
      message: 'Loaded comprehensive DBMS Lecture (ACID, Relations & Normalization).'
    });
  };

  // Handle Clearing Input
  const handleClear = () => {
    setLectureText('');
    setSelectedFileName('');
    setSelectedFileSize('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onShowToast({
      type: 'info',
      title: 'Cleared',
      message: 'Lecture input and file cleared.'
    });
  };

  // Process File (TXT or PDF)
  const processUploadedFile = async (file) => {
    if (!file) return;

    const fileName = file.name;
    const fileExt = fileName.split('.').pop().toLowerCase();
    const sizeKb = (file.size / 1024).toFixed(1) + ' KB';

    // File type validation
    if (fileExt !== 'txt' && fileExt !== 'pdf') {
      onShowToast({
        type: 'error',
        title: 'Unsupported File Type',
        message: `Please upload a .txt or .pdf file. (${fileName} is not supported)`
      });
      return;
    }

    // Size limit check (15MB)
    if (file.size > 15 * 1024 * 1024) {
      onShowToast({
        type: 'error',
        title: 'File Too Large',
        message: 'Maximum allowed file size is 15MB. Please upload a smaller file.'
      });
      return;
    }

    setIsExtractingFile(true);
    setSelectedFileName(fileName);
    setSelectedFileSize(sizeKb);

    try {
      let extracted = '';
      if (fileExt === 'txt') {
        extracted = await extractTextFromTxt(file);
      } else if (fileExt === 'pdf') {
        extracted = await extractTextFromPdf(file);
      }

      if (!extracted || extracted.trim().length === 0) {
        throw new Error('Extracted text was empty.');
      }

      setLectureText(extracted);
      onShowToast({
        type: 'success',
        title: 'File Extracted Successfully',
        message: `Extracted ${extracted.split(/\s+/).length} words from "${fileName}".`
      });
    } catch (err) {
      console.error('File parsing error:', err);
      onShowToast({
        type: 'error',
        title: 'Extraction Error',
        message: err.message || 'Could not parse text from this file.'
      });
      setSelectedFileName('');
      setSelectedFileSize('');
    } finally {
      setIsExtractingFile(false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processUploadedFile(files[0]);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processUploadedFile(files[0]);
    }
  };

  const handleTabSwitch = (mode) => {
    setInputMode(mode);
    if (mode === 'txt' || mode === 'pdf') {
      setTimeout(() => {
        if (fileInputRef.current) {
          fileInputRef.current.accept = mode === 'txt' ? '.txt,text/plain' : '.pdf,application/pdf';
        }
      }, 50);
    }
  };

  return (
    <section className="glass-card input-card">
      {/* Input Header & Mode Switcher */}
      <div className="input-header">
        <div className="input-modes">
          <button
            className={`input-mode-btn ${inputMode === 'paste' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('paste')}
            id="tab-mode-paste"
          >
            <FileText size={16} />
            <span>Direct Text / Paste</span>
          </button>
          <button
            className={`input-mode-btn ${inputMode === 'txt' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('txt')}
            id="tab-mode-txt"
          >
            <FileType size={16} />
            <span>Upload TXT</span>
          </button>
          <button
            className={`input-mode-btn ${inputMode === 'pdf' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('pdf')}
            id="tab-mode-pdf"
          >
            <FileUp size={16} />
            <span>Upload PDF</span>
          </button>
        </div>

        {/* Try Demo Lecture Button */}
        <button
          className="btn btn-demo btn-sm"
          onClick={handleLoadDemo}
          title="Load sample DBMS Lecture (ACID, Relations & Normalization)"
          id="btn-try-demo"
        >
          <Sparkles size={16} />
          <span>Try Demo Lecture (DBMS)</span>
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        accept={inputMode === 'pdf' ? '.pdf,application/pdf' : '.txt,text/plain'}
      />

      {/* Upload Dropzone (when in TXT or PDF mode) */}
      {(inputMode === 'txt' || inputMode === 'pdf') && (
        <div
          className={`dropzone ${isDragOver ? 'dragover' : ''}`}
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ marginBottom: '1.25rem' }}
        >
          <div className="dropzone-icon">
            <Upload size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>
              {isExtractingFile 
                ? 'Extracting lecture content...' 
                : `Click or Drag & Drop your ${inputMode.toUpperCase()} file here`}
            </h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              Supports university slides, lecture transcripts, and notes (up to 15MB)
            </p>
          </div>
        </div>
      )}

      {/* Selected File Badge */}
      {selectedFileName && (
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="file-info-badge">
            <FileCheck size={16} color="#818cf8" />
            <span><strong>File:</strong> {selectedFileName} ({selectedFileSize})</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            Text extracted & previewed below
          </span>
        </div>
      )}

      {/* Textarea for Direct Input / Extracted Content */}
      <div className="textarea-container">
        <textarea
          className="lecture-textarea"
          placeholder="Paste lecture transcript, classroom notes, or syllabus content here... or upload a .txt or .pdf file above."
          value={lectureText}
          onChange={(e) => setLectureText(e.target.value)}
          disabled={isLoading || isExtractingFile}
          id="lecture-text-input"
        />

        {/* Textarea Footer: Word & Char Count */}
        <div className="textarea-footer">
          <div>
            <span><strong>{wordCount}</strong> words</span>
            <span style={{ margin: '0 0.5rem' }}>•</span>
            <span><strong>{charCount}</strong> characters</span>
            {wordCount > 0 && wordCount < 10 && (
              <span style={{ color: '#f59e0b', marginLeft: '0.75rem' }}>
                (Needs at least 10 words for AI analysis)
              </span>
            )}
          </div>

          {lectureText && (
            <button
              onClick={handleClear}
              className="btn btn-outline btn-sm"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.785rem' }}
              title="Clear text"
            >
              <Trash2 size={13} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Action Bar */}
      <div className="input-actions-bar">
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>💡 Tip: Click <strong>"Try Demo Lecture"</strong> for an instant preview!</span>
        </div>

        <button
          className="btn btn-primary"
          onClick={onSummarize}
          disabled={isLoading || isExtractingFile || wordCount === 0}
          id="btn-summarize"
        >
          {isLoading ? (
            <>
              <div className="spinner" />
              <span>Generating Study Material...</span>
            </>
          ) : (
            <>
              <Sparkles size={17} />
              <span>Summarize with Gemma AI</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
