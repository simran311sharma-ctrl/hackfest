# StudyBuddy – AI Lecture Summarizer 🎓⚡

> **"Your AI-Powered Study Companion"**  
> Built for the **Google Gemma Hackathon**. Transforms college lectures, slides, and transcripts into crystal-clear notes, 5-mark and 7-mark university exam questions, viva preparation, and 1-minute quick revision cards.

---

## 🌟 Project Overview

College students often spend hours listening to complex lectures, struggling to extract the core ideas, missing key definitions, and lacking structured exam practice questions. 

**StudyBuddy** is a fully functional web application designed specifically for college students, professors, and self-learners. Powered by **Google Gemma**, it ingests raw lecture transcripts, typed notes, or uploaded slides (.txt / .pdf) and automatically compiles them into an organized, student-friendly academic study package.

---

## 🚀 Key Features

### 1. 🏠 Modern Student Dashboard
- **Clean, Responsive UI**: Optimized for laptop monitors, tablets, and smartphones.
- **Visual Design**: Sleek glassmorphism, curated indigo/slate palette, clear typography (Plus Jakarta Sans & Inter), micro-animations, and zero clutter.
- **Engine Status Banner**: Real-time display indicating whether the application is running in **Live Google Gemma AI Cloud Mode** or **Built-in Offline Study Engine Mode**.

### 2. 📥 Multi-Modal Lecture Input
- **Direct Text / Paste**: Paste transcript chunks or classroom notes with real-time word and character counters.
- **TXT Upload**: Drag and drop `.txt` files.
- **PDF Upload**: Client-side PDF slide parser extracting slide text directly into the preview box before summarization.
- **Try Demo Lecture (1-Click)**: Instant button pre-loading a comprehensive Database Management Systems (DBMS) lecture (covering Relational Models, Keys, ACID Properties with bank transfer examples, and 1NF/2NF/3NF Normalization).

### 3. 🧠 AI Lecture Summarizer
- **Short Executive Summary**: 2-3 concise paragraphs capturing core themes.
- **Detailed Explanation**: Beginner-friendly breakdown using intuitive real-world analogies.
- **Important Points**: Actionable bulleted takeaways with checkmarks.
- **Key Concepts**: Concept cards explaining the "why" and "how".
- **Core Definitions**: University-standard definitions.
- **Keywords Cloud**: Interactive vocabulary tag pills.

### 4. 🎯 Exam Mode
- **5 Core Exam Questions**: Standard 5-mark university exam questions with structured answer hints.
- **3 Short-Answer Questions**: 2-3 marks each with sample concise model answers.
- **2 Long-Answer / 7-Mark Questions**: Full 5-step structured essay breakdown (Introduction, Architecture/Mechanism, Diagrams/Equations, Trade-offs, Conclusion).
- **High-Yield Revision Topics**: Box listing the highest-probability exam topics.

### 5. ⚡ Quick Revision & Viva Voce
- **1-Minute Pre-Exam Cram**: Ultra-condensed bullet summary for last-minute review right before the exam hall.
- **📐 Governing Formulas & Rules**: Mathematical laws, algorithmic rules, or normal form constraints.
- **💡 "Remember These" Points**: Exam traps, common student pitfalls, and memory anchors.
- **🎓 Viva Voce Flashcards**: 5 rapid-fire oral questions with an interactive **Reveal/Hide Answer** toggle for self-testing.

### 6. 🛠️ Study Pack Actions
- **📋 Copy Tab / Copy All**: Quick copy formatted notes to clipboard.
- **💾 Download as TXT**: Clean, printable plain text study guide.
- **📑 Download as Markdown**: Well-structured `.md` export.
- **🔄 Generate Again**: Re-runs analysis.
- **🧹 Clear**: Resets input and outputs for a fresh lecture.

---

## 🛠️ Technologies Used

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Vanilla CSS (Modern Design System), Lucide React Icons |
| **PDF Extraction** | `pdfjs-dist` (client-side text stream parser) |
| **Backend API** | Node.js, Express 4, CORS, Dotenv |
| **AI Model & Engine** | Google Gemma (`gemma-2-9b-it`, `gemma-2-27b-it`) via Google AI Studio API + Built-in Pedagogical Rules Fallback Engine |
| **Tooling** | Native PowerShell launcher, NPM |

---

## 📂 Project Structure

```text
Hacktober/
├── backend/                        # Node.js Express API Layer
│   ├── services/
│   │   ├── aiService.js            # Communicates with Google Gemma / Gemini API
│   │   ├── promptTemplates.js      # Strict college tutor system prompt & JSON schema
│   │   └── mockStudyEngine.js      # Robust built-in pedagogical engine (Demo/offline)
│   ├── .env.example                # Example environment variables
│   ├── .env                        # Local configuration (PORT, GEMMA_API_KEY)
│   ├── package.json                # Backend dependencies (express, cors, dotenv)
│   └── server.js                   # Express server entry point & validation
│
├── frontend/                       # React + Vite Client Application
│   ├── public/                     # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx          # Top navbar, branding, engine status & about modal trigger
│   │   │   ├── LectureInput.jsx    # Paste, TXT, PDF dropzone & demo lecture button
│   │   │   ├── SummaryTabs.jsx     # Main tab navigation, copy, download, & clear buttons
│   │   │   ├── ExamQuestions.jsx   # 5-mark, 2-3 mark, and 7-mark question breakdowns
│   │   │   ├── VivaVoce.jsx        # Interactive rapid-fire oral test flashcards
│   │   │   ├── QuickRevision.jsx   # 1-minute cram cards, formulas, and pitfalls
│   │   │   ├── AboutModal.jsx      # Hackathon presentation modal (Problem, Solution, Scope)
│   │   │   ├── LoadingSkeleton.jsx # Multi-step animated AI reasoning indicator
│   │   │   └── NotificationToast.jsx # Floating alerts for copy, export, and warnings
│   │   ├── services/
│   │   │   ├── api.js              # Fetch requests to backend & text formatting utilities
│   │   │   ├── demoLecture.js      # Pre-curated DBMS lecture dataset
│   │   │   └── pdfExtractor.js     # PDF and TXT text extraction logic
│   │   ├── styles/
│   │   │   └── index.css           # Complete responsive Vanilla CSS design system
│   │   ├── App.jsx                 # Master application controller and state manager
│   │   └── main.jsx                # React root mount
│   ├── index.html                  # HTML entry with Plus Jakarta Sans & Inter fonts
│   ├── vite.config.js              # Vite bundler configuration
│   └── package.json                # Frontend dependencies
│
├── start.bat                       # 1-Click launcher for Windows
└── README.md                       # Comprehensive documentation
```

---

## ⚙️ How to Configure `GEMMA_API_KEY`

StudyBuddy is built to work securely with Google's Gemma models via Google AI Studio.

1. Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Open `backend/.env` in any text editor.
3. Paste your key:
   ```env
   PORT=5000
   GEMMA_API_KEY=AIzaSyYourActualKeyHere
   AI_MODEL=gemma-2-9b-it
   ```
4. Save the file.
5. Restart the backend server. The UI will instantly display:  
   `● Google Gemma (gemma-2-9b-it)` with a green active indicator!

> **💡 Zero-Friction Demo Mode**:  
> If you do not have an API key right now, **StudyBuddy works straight out of the box**! The built-in offline engine will generate high-quality structured notes and exam questions for both the DBMS demo and custom text.

---

## 🚀 How to Run the Application

### Method 1: 1-Click Launch (Windows)
Double-click the `start.bat` file in the root folder. It will:
1. Verify Node.js.
2. Start the Backend API on `http://localhost:5000`.
3. Start the Frontend Vite server on `http://localhost:5173`.
4. Automatically open `http://localhost:5173` in your default browser.

---

### Method 2: Manual Terminal Execution

#### 1. Start the Backend:
```bash
cd backend
npm install
node server.js
```
*Backend runs on `http://localhost:5000`.*

#### 2. Start the Frontend:
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

Open `http://localhost:5173` in your browser.

---

## 🎨 How to Customize the UI (For Beginners)

If you want to tweak colors, text, or layout, here are the exact files to edit:

| Want to change? | Open this file |
| :--- | :--- |
| **Colors, fonts, cards, shadows** | `frontend/src/styles/index.css` *(Edit the `:root` CSS variables at the top!)* |
| **App Title, Subtitle, Navbar** | `frontend/src/components/Header.jsx` |
| **Hero headline and description** | `frontend/src/App.jsx` |
| **Demo lecture text** | `frontend/src/services/demoLecture.js` |
| **Exam Questions or 7-mark layout** | `frontend/src/components/ExamQuestions.jsx` |
| **Viva Flashcard style** | `frontend/src/components/VivaVoce.jsx` |
| **About / Hackathon presentation text** | `frontend/src/components/AboutModal.jsx` |

---

## 🔄 Complete Project Flow in Simple Terms

1. **User Input**: The student either pastes notes, uploads a `.txt`/`.pdf`, or clicks **"Try Demo Lecture"**.
2. **Text Preview**: The file is parsed and its plain text is displayed in the input box so the student can review or edit it.
3. **Backend Request**: When the student clicks **"Summarize with Gemma AI"**, the frontend sends a `POST` request to `http://localhost:5000/api/summarize`.
4. **AI Generation**:
   - The backend passes the lecture text into our custom academic **System Prompt** designed for Google Gemma.
   - If a `GEMMA_API_KEY` is present, it queries the Google AI Studio Gemma 2 model.
   - If no key is set or network fails, it seamlessly routes through the smart local educational engine.
5. **Structured Rendering**: The backend returns clean JSON. The frontend renders 6 interactive tabs: Summary, Detailed Notes, Important Points, Exam Questions, Viva Flashcards, and Quick Revision.
6. **Study & Export**: The student can interactively reveal viva answers, expand 7-mark question outlines, copy sections, or download the full study guide as `.txt` or `.md`.

---

## 🏆 Hackathon Presentation Highlights

- **Target Audience**: College students facing dense university syllabi, high school students, teaching assistants, and competitive examination aspirants.
- **Key Differentiator**: Unlike generic chatbots that produce long walls of text, StudyBuddy structures output into practical college study tools: **7-mark long answer outlines**, **model short answers**, **viva questions**, and **1-minute pre-exam cram summaries**.
- **Future Roadmap**:
  - Direct audio/video lecture recording & Whisper transcription.
  - Multilingual summaries (Hindi, Tamil, Spanish, French, etc.).
  - Automated spaced-repetition digital flashcards with export to Anki.
  - AI quiz generator with instant grading and explanations.
