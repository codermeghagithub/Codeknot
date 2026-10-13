# PRD: LearnLoop — AI Coding Tutor with Concept Verification

> **Document purpose:** This PRD is written for an AI coding agent (Google Antigravity) and for the human team. It defines WHAT to build and WHY, the full product vision, and exactly what is in scope for the CURRENT phase (frontend only, mock data).
> **Product name:** "LearnLoop" is a placeholder. Keep it in one constant (`APP_NAME` in `src/utils/constants.js`) so it can be renamed easily.
> **Version:** 1.0 | **Type:** Minor project (academic) | **Current phase:** Phase 1, Frontend only

---

## 0. Instructions for the AI Agent (read first)

1. Build **Phase 1 (Frontend)** only. Do **not** build backend, database, or real AI/RAG logic yet.
2. Use **React 18 + Vite + JavaScript (NO TypeScript)** and **Tailwind CSS**.
3. All data comes from a **service layer with mock data**. Components never call `axios`/`fetch` directly. Switching to the real FastAPI backend later must require changing only `src/services/*` and `.env`.
4. Follow the folder structure in Section 12 exactly.
5. Implement the API contract in Section 10 as the mock service shapes, so the backend can be built to match.
6. Work in small milestones (Section 15). After each milestone, the app must run without errors (`npm run dev`).
7. Do not add the mentor or payment UI. Those are out of scope (Section 3).
8. Write complete files. No placeholders like "rest of code here".
9. When a requirement is ambiguous, choose the simplest option that satisfies the acceptance criteria and note the assumption in `README.md`.

---

## 1. Overview

### 1.1 Problem
Students who get stuck on coding problems can ask AI chatbots, but a chatbot's answer does not tell them whether they **actually understood** the concept. Students copy answers without learning, and have no structured way to find and fix knowledge gaps.

### 1.2 Solution
LearnLoop is a ChatGPT-style web app with a **learning verification loop**:

1. Student asks a coding doubt and gets an answer.
2. If still confused, the app generates a **personalized 3-question test** on that topic.
3. The result reveals whether the student truly understands the topic.
4. If not, the app gives a **personalized learning path** to clear the topic.
5. Separately, students can **upload a book/notes PDF**, take a **personalized exam** generated from it, and see performance with a percentage and preparation advice.

### 1.3 Goals
| # | Goal | Success metric (demo-level) |
|---|------|-----------------------------|
| G1 | Students get coding answers in a familiar chat UI | Chat answer renders with formatted code in under 2s (mock) |
| G2 | Verify real understanding, not just give answers | 3-question test reachable in 1 click from any answer |
| G3 | Turn weak results into an actionable plan | Every failed test leads to a learning path with at least 3 steps |
| G4 | Let students self-assess on their own study material | PDF upload to exam to result flow works end to end |
| G5 | Clean, responsive, accessible UI | Works on mobile, tablet, desktop; keyboard navigable |

### 1.4 Non-goals (this project)
- Mentor booking, escalation, and payments (see Section 3).
- Training or fine-tuning any ML model.
- Native mobile apps.
- Multi-language UI (English only).

---

## 2. Target Users and Personas

**Persona A: Aarav, 2nd-year CS student (primary).** Learns JS/React/Python, gets stuck on bugs and concepts, copies AI answers without understanding. Needs: fast answers, honest feedback on his understanding, a clear way to improve.

**Persona B: Priya, exam-preparing student (secondary).** Has textbook PDFs. Needs: a way to test herself on the book and see how prepared she is.

**Persona C: Evaluator or professor (demo audience).** Needs: a clear, working, visually polished flow they can understand in 5 minutes.

---

## 3. Scope

### 3.1 In scope: Phase 1 (NOW): Frontend only
- Auth screens (mock), dashboard, chat UI, concept test, learning path, PDF upload and exam UI, result and performance UI, history, dark mode, responsive layout.
- Mock service layer matching the final API contract.

### 3.2 Planned: Phase 2 (later): Backend
- FastAPI REST API, PostgreSQL, authentication (JWT), persistence.

### 3.3 Planned: Phase 3 (later): AI / RAG
- Cloud LLM for answers, test generation, and learning paths.
- Embedding model plus vector search for PDF-based question generation (RAG).

### 3.4 Out of scope for the minor project: Mentor escalation
Documented for future reference only. **Do not build any UI or logic for it.**
- If the learning path does not resolve the gap, recommend a human mentor.
- First 2 mentor calls free; paid afterwards.
- Requires payments, scheduling, and a mentor directory.

---

## 4. Core User Flows

### Flow 1: Doubt to Answer to Verify to Learn
```
Login -> Chat -> Ask coding question -> AI answer
  -> [Still confused? Test my understanding]
  -> Concept Test (3 MCQs, one at a time)
  -> Result
      |- Score >= 2/3 -> "You understand this" -> back to Chat
      |- Score <  2/3 -> Knowledge-gap summary -> Learning Path
```

### Flow 2: PDF to Exam to Performance
```
Dashboard -> Upload PDF -> Exam setup (count, difficulty)
  -> Take exam (timer, navigator) -> Submit
  -> Result page (score, %, level, charts, focus topics)
```

---

## 5. Functional Requirements

Priority: **P0** = must have, **P1** = should have, **P2** = nice to have.

### 5.1 Authentication (Mock in Phase 1) — P0
| ID | Requirement |
|----|-------------|
| AUTH-1 | Register and Login forms with client-side validation (email format, password at least 8 chars, name required). |
| AUTH-2 | Mock login stores a fake token in the auth store and `localStorage`. |
| AUTH-3 | `ProtectedRoute` redirects unauthenticated users to `/login`; authenticated users visiting `/login` go to `/dashboard`. |
| AUTH-4 | Logout clears the token and state. |

**Acceptance:** Invalid inputs show inline errors; refresh keeps the user logged in; protected pages are not reachable without login.

### 5.2 Dashboard — P0
| ID | Requirement |
|----|-------------|
| DASH-1 | Greeting with user name. |
| DASH-2 | Quick-action cards: Ask a Doubt, Upload PDF, Continue Learning. |
| DASH-3 | Recent activity list (chats, tests, exams). |
| DASH-4 | Recent scores summary (mini chart or stat cards). |

### 5.3 Chat (Core) — P0
| ID | Requirement |
|----|-------------|
| CHAT-1 | ChatGPT-style layout: conversation sidebar, message area, bottom input. |
| CHAT-2 | Send with Enter; Shift+Enter inserts a new line; send button disabled when empty. |
| CHAT-3 | User and AI bubbles. AI messages render **Markdown** with **syntax-highlighted code blocks** and a **copy** button. |
| CHAT-4 | Typing indicator while waiting for a response. |
| CHAT-5 | Auto-scroll to the newest message. |
| CHAT-6 | New chat, switch chat, delete chat (state-level). |
| CHAT-7 | After each AI answer show **"Still confused? Test my understanding"**. Clicking it calls `generateConceptTest(topic)` and routes to `/test/:testId`. |
| CHAT-8 | Error state with a retry action if the mock/real call fails. |
| CHAT-9 | (P1) Regenerate response; (P2) suggested starter prompts on an empty chat. |

### 5.4 Concept Test (3 Questions) — P0
| ID | Requirement |
|----|-------------|
| TEST-1 | Exactly **3 multiple-choice questions** (4 options each), shown one at a time. |
| TEST-2 | Progress indicator (e.g., "Question 2 of 3"), Next/Previous, answer selection persisted while navigating. |
| TEST-3 | Submit enabled only when all 3 are answered (or with a confirmation if skipped). |
| TEST-4 | Result view: score out of 3, a badge **Understood** (>= 2/3) or **Needs Work** (< 2/3), and per-question correct/incorrect with explanations. |
| TEST-5 | If **Needs Work**: show **GapSummary** (weak sub-topics) and a CTA **"Get my learning path"**. |
| TEST-6 | If **Understood**: congratulatory state with a CTA back to chat. |

### 5.5 Personalized Learning Path — P0
| ID | Requirement |
|----|-------------|
| LP-1 | Vertical timeline of steps, e.g., Revise basics, Practice problems, Build a mini example. |
| LP-2 | Each step has: title, description, estimated time, and resource cards (article, video, practice). |
| LP-3 | User can mark steps complete; overall progress bar updates; state persists in the store and `localStorage`. |
| LP-4 | CTA to "Retake test" on the same topic when all steps are done (P1). |

### 5.6 PDF Exam — P0
| ID | Requirement |
|----|-------------|
| PDF-1 | Drag-and-drop and click-to-browse upload. **PDF only, max 10 MB.** Show file name and size; allow remove. Show clear errors for wrong type or oversize. |
| PDF-2 | Mock "analyzing" step with a progress or loading state. |
| PDF-3 | Exam setup: number of questions (10 / 15 / 20) and difficulty (Easy / Medium / Hard). |
| PDF-4 | Exam UI: question display, **countdown timer**, **question navigator grid** (answered / unanswered / marked for review), Next/Previous, Mark for review. |
| PDF-5 | Submit confirmation modal showing counts of answered, unanswered, and marked questions. Auto-submit when the timer ends. |
| PDF-6 | Guard against accidental refresh/leave during an exam (`beforeunload` warning). |

### 5.7 Results and Performance — P0
| ID | Requirement |
|----|-------------|
| RES-1 | Show score, **percentage**, correct, wrong, and skipped counts. |
| RES-2 | Performance level (in `utils/scoreCalculator.js`): **>= 80% Excellent; 60 to 79% Good; 40 to 59% Needs Improvement; < 40% Needs More Preparation.** |
| RES-3 | Message: good score shows "Good job!"; otherwise "You need more preparation" plus a list of suggested focus topics. |
| RES-4 | Charts: pie (correct/wrong/skipped) and bar (topic-wise performance) using Recharts. |
| RES-5 | Actions: Retake exam, New PDF, Go to dashboard. |

### 5.8 History — P1
| ID | Requirement |
|----|-------------|
| HIST-1 | Table of past chats, concept tests, and PDF exams: date, type, topic, score. |
| HIST-2 | Filter by type and search by topic; click a row to open the item. |

### 5.9 Global UI — P0/P1
| ID | Requirement |
|----|-------------|
| UI-1 | Fully responsive; sidebar collapses to a drawer on mobile. |
| UI-2 | Light/Dark mode toggle, persisted. |
| UI-3 | Loading, empty, and error states for every async view. |
| UI-4 | Toast notifications for success/error. |
| UI-5 | Accessibility: semantic HTML, focus states, aria-labels, keyboard navigation, sufficient color contrast (WCAG AA). |
| UI-6 | 404 page. |

---

## 6. Non-Functional Requirements

| Area | Requirement |
|------|-------------|
| Performance | Initial load under 3s on broadband; route-level code splitting (`React.lazy`). |
| Compatibility | Latest 2 versions of Chrome, Edge, Firefox, Safari. Stable internet needed for cloud AI/RAG features (later phases). |
| Maintainability | Small reusable components; single responsibility per file; no hardcoded URLs or magic numbers. |
| Security (frontend) | Sanitize rendered Markdown (no raw HTML injection); validate uploads client-side; never store secrets in the frontend; env vars via Vite (`VITE_*` only for non-secrets). |
| Reliability | Graceful handling of network errors with retry; no crash on empty or malformed data. |
| Testability | Pure logic (score calculator, formatters) in `utils/` and unit-testable (Vitest, P2). |

---

## 7. Tech Stack

| Layer | Technology | Phase |
|-------|-----------|-------|
| Client | Modern browser, stable internet (for cloud AI/RAG) | All |
| Frontend | React 18, Vite, **JavaScript (no TypeScript)**, Tailwind CSS (component system), React Router v6 | **1 (now)** |
| Frontend libs | Axios, Zustand, react-markdown (+ rehype-sanitize), react-syntax-highlighter, react-hot-toast, lucide-react, Recharts, react-dropzone | **1 (now)** |
| Backend | Python 3.12+, FastAPI (primary API). Node.js optional for auxiliary needs (e.g., realtime/streaming gateway or tooling) | 2 |
| Database | PostgreSQL (with `pgvector` for embeddings, to be confirmed) | 2 and 3 |
| AI services | Embedding model + cloud LLM API. **Providers may change during implementation**, so the AI layer must be provider-agnostic (adapter pattern) | 3 |

> The frontend must not depend on any specific AI provider. It only talks to the app's own API.

---

## 8. System Architecture (target)

```
[React SPA] --HTTPS/JSON--> [FastAPI]
                               |- Auth (JWT)
                               |- Chat service ----> [LLM provider adapter]
                               |- Test generator --> [LLM provider adapter]
                               |- Learning-path generator --> [LLM]
                               |- PDF pipeline: parse -> chunk -> embed -> store -> retrieve (RAG)
                               '- PostgreSQL (users, chats, tests, exams, pdf chunks/embeddings)
```

**Phase 1 reality:** only the `[React SPA]` exists. A mock service layer simulates the FastAPI responses.

---

## 9. Data Model (reference for later phases)

Frontend mock data should mirror these shapes.

```
User            { id, name, email, createdAt }
Conversation    { id, userId, title, createdAt, updatedAt }
Message         { id, conversationId, role: "user"|"assistant", content (markdown), topic?, createdAt }
ConceptTest     { id, userId, conversationId, topic, createdAt, score?, total: 3, status }
TestQuestion    { id, testId, question, options[4], correctIndex, explanation, subTopic }
LearningPath    { id, testId, topic, steps[] }
LearningStep    { id, title, description, estimatedMinutes, resources[], completed }
Resource        { type: "article"|"video"|"practice", title, url }
PdfDocument     { id, userId, fileName, sizeBytes, status, createdAt }
PdfExam         { id, pdfId, count, difficulty, durationMinutes, createdAt }
ExamQuestion    { id, examId, question, options[4], correctIndex, topic }
ExamResult      { examId, score, total, percentage, level, correct, wrong, skipped, topicBreakdown[] }
```

---

## 10. API Contract (mock now, FastAPI later)

All endpoints are prefixed `/api`. Auth header: `Authorization: Bearer <token>`. Errors use the shape `{ "error": { "code": string, "message": string } }`.

| Method | Endpoint | Request | Response |
|--------|----------|---------|----------|
| POST | `/auth/register` | `{ name, email, password }` | `{ user, token }` |
| POST | `/auth/login` | `{ email, password }` | `{ user, token }` |
| GET | `/auth/me` | none | `{ user }` |
| GET | `/conversations` | none | `{ conversations[] }` |
| GET | `/conversations/:id` | none | `{ conversation, messages[] }` |
| DELETE | `/conversations/:id` | none | `{ success }` |
| POST | `/chat` | `{ message, conversationId? }` | `{ conversationId, reply (markdown), topic }` |
| POST | `/test/generate` | `{ topic, conversationId? }` | `{ testId, questions[{id, question, options, correctIndex, explanation, subTopic}] }` |
| POST | `/test/submit` | `{ testId, answers[{questionId, selectedIndex}] }` | `{ score, total, understood, weakTopics[], perQuestion[] }` |
| GET | `/learning-path/:testId` | none | `{ topic, steps[] }` |
| PATCH | `/learning-path/steps/:stepId` | `{ completed }` | `{ step }` |
| POST | `/pdf/upload` | `FormData(file)` | `{ pdfId, fileName, sizeBytes }` |
| POST | `/pdf/exam` | `{ pdfId, count, difficulty }` | `{ examId, durationMinutes, questions[] }` |
| POST | `/pdf/submit` | `{ examId, answers[{questionId, selectedIndex\|null}] }` | `{ score, total, percentage, level, correct, wrong, skipped, topicBreakdown[{topic, correct, total}], focusTopics[] }` |
| GET | `/history` | `?type=&q=` | `{ items[{id, type, topic, date, score}] }` |

**Rule:** In Phase 1, `VITE_USE_MOCK=true` makes each service return mock data after an 800 to 1500 ms fake delay. When `false`, it calls the real endpoint via the Axios instance.

---

## 11. AI Behavior Requirements (for Phase 3, informs mock content quality)

| Capability | Expected behavior |
|-----------|------------------|
| Answering | Clear explanation, minimal working code, brief "why it works". Focus on JS, React, Python, FastAPI, and AI/ML topics. |
| Concept test | Exactly 3 MCQs targeting the **core concept** of the question; plausible distractors; each with explanation and sub-topic tag. Not answerable by copying the previous answer verbatim. |
| Gap analysis | Map wrong answers to weak sub-topics. |
| Learning path | 3 to 6 ordered steps, each with time estimate and resources; adapted to the weak sub-topics. |
| PDF exam (RAG) | Questions grounded **only** in the uploaded PDF's content; tagged by topic/chapter; difficulty adjustable. |

Mock content in Phase 1 must feel realistic (real JS/React/Python concepts), not "Lorem ipsum".

---

## 12. Frontend Folder Structure (follow exactly)

```
learnloop-frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/      Button, Input, Modal, Loader, Card, Badge, ProgressBar, EmptyState, ErrorState
│   │   ├── layout/      Navbar, Sidebar, MainLayout, ProtectedRoute, ThemeToggle
│   │   ├── chat/        ChatWindow, MessageBubble, ChatInput, CodeBlock, ConfusedButton, TypingIndicator, ConversationList
│   │   ├── test/        QuestionCard, TestProgress, TestResultSummary
│   │   ├── learning/    LearningPathTimeline, ResourceCard, GapSummary
│   │   └── pdf/         PdfUploader, PdfExamSetup, ExamTimer, QuestionNavigator, ExamResultChart
│   ├── pages/
│   │   ├── Landing.jsx, Login.jsx, Register.jsx, Dashboard.jsx
│   │   ├── ChatPage.jsx, ConceptTestPage.jsx, LearningPathPage.jsx
│   │   ├── PdfExamPage.jsx, ResultPage.jsx, HistoryPage.jsx, NotFound.jsx
│   ├── services/        api.js, authService.js, chatService.js, testService.js, learningService.js, pdfExamService.js, historyService.js
│   ├── mocks/           mockData files + delay.js
│   ├── store/           authStore.js, chatStore.js, testStore.js, learningStore.js, themeStore.js
│   ├── hooks/           useAuth.js, useChat.js, useTest.js, useTimer.js, useLearningPath.js
│   ├── routes/          AppRoutes.jsx
│   ├── utils/           constants.js, formatters.js, scoreCalculator.js, validators.js
│   ├── styles/          index.css
│   ├── App.jsx
│   └── main.jsx
├── .env.example         VITE_API_BASE_URL, VITE_USE_MOCK=true
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
```

### Routes
| Path | Page | Protected |
|------|------|-----------|
| `/` | Landing | No |
| `/login`, `/register` | Auth | No |
| `/dashboard` | Dashboard | Yes |
| `/chat`, `/chat/:conversationId` | ChatPage | Yes |
| `/test/:testId` | ConceptTestPage | Yes |
| `/learning-path/:testId` | LearningPathPage | Yes |
| `/pdf-exam` | PdfExamPage | Yes |
| `/result/:type/:id` | ResultPage | Yes |
| `/history` | HistoryPage | Yes |
| `*` | NotFound | No |

---

## 13. UX and Design Guidelines

- **Look and feel:** clean, modern, calm "study tool" aesthetic. Generous spacing, rounded cards, subtle shadows. Chat layout familiar to ChatGPT users.
- **Design tokens:** define primary, secondary, success, warning, danger, and neutral palettes plus font scale and spacing in `tailwind.config.js`. Support light and dark themes through CSS variables or Tailwind `dark:` classes.
- **Typography:** one clean sans-serif for UI; monospace for code.
- **Feedback:** every async action shows a loader; every failure shows a friendly message and a retry.
- **Status colors:** green = understood or good, amber = needs improvement, red = needs more preparation. Never rely on color alone (add icon or label).
- **Landing page:** hero explaining the learning loop (Ask, Understand, Test, Learn), 3 feature highlights, CTA to register.

---

## 14. State Management and Conventions

- **Zustand** stores per domain (auth, chat, test, learning, theme). Persist auth, theme, and learning progress to `localStorage`.
- **Data flow:** `Component -> hook -> service -> (mock | axios)`. No direct API calls in components.
- **Naming:** components `PascalCase.jsx`, hooks `useXxx.js`, services `xxxService.js`, constants `UPPER_SNAKE_CASE`.
- **Style:** functional components and hooks only; props destructured; one responsibility per file; meaningful comments on non-obvious logic only.
- **Lint and format:** ESLint + Prettier configured.

---

## 15. Milestones (Phase 1: Frontend)

| # | Milestone | Deliverables | Done when |
|---|-----------|-------------|-----------|
| M1 | Setup | Vite + React + Tailwind, folder structure, router skeleton, env, theme tokens | App runs; all routes render placeholder pages |
| M2 | Layout and Auth | MainLayout, Navbar, Sidebar, ProtectedRoute, Login/Register, auth store | Login/logout works; guards work |
| M3 | Service layer and mocks | `api.js`, all services, mock data, delay helper | Every endpoint in Section 10 has a working mock |
| M4 | Chat | Chat UI, markdown + code, typing indicator, confused button | Full chat flow works with mocks |
| M5 | Concept test and learning path | Test UI, results, gap summary, timeline, progress | Flow 1 works end to end |
| M6 | PDF exam and results | Uploader, setup, exam UI + timer + navigator, result charts | Flow 2 works end to end |
| M7 | Dashboard, history, polish | Dashboard, history table, dark mode, a11y pass, responsive pass, README | All acceptance criteria met |

---

## 16. Acceptance Criteria (Phase 1 Definition of Done)

- [ ] `npm install && npm run dev` runs with no errors or console warnings of note.
- [ ] Flow 1 (Chat, Test, Result, Learning Path) works end to end with mocks.
- [ ] Flow 2 (PDF upload, Exam, Result with charts) works end to end with mocks.
- [ ] A score below 2/3 in the concept test always routes to GapSummary and a learning path.
- [ ] Performance levels follow the thresholds in RES-2 exactly.
- [ ] Responsive at 360px, 768px, and 1280px widths with no horizontal scroll.
- [ ] Dark mode works on every page.
- [ ] No component imports `axios` directly.
- [ ] Setting `VITE_USE_MOCK=false` switches services to real endpoints without changing components.
- [ ] No mentor or payment UI exists anywhere.
- [ ] README explains setup, folder structure, and how to switch from mock to real API.

---

## 17. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Backend contract changes later | Rework in services | Keep contract in one place (Section 10) and in service comments; only services change |
| AI provider changes | Backend rework | Provider-agnostic adapter on the backend; frontend unaffected |
| LLM-generated questions are low quality | Poor learning value | Structured output schema, validation, and regenerate option (Phase 3) |
| PDF parsing issues (scanned/large PDFs) | Failed exams | Size/type limits now; OCR and chunking strategy in Phase 3 |
| Scope creep (mentor, payments) | Missed deadline | Explicitly out of scope (Section 3.4) |

---

## 18. Future Roadmap (not for now)

1. **Phase 2:** FastAPI backend, PostgreSQL, JWT auth, persistence, real history.
2. **Phase 3:** LLM chat, test and path generation, embeddings and RAG for PDFs, streaming responses.
3. **Phase 4:** Mentor recommendation and escalation (first 2 calls free, then paid), payments, mentor directory and scheduling, analytics, and adaptive difficulty.

---

## 19. Open Questions

1. Final product name?
2. Which LLM and embedding providers will be used in Phase 3?
3. Should PDF exams also support short-answer questions beyond MCQ?
4. Is a Node.js service needed (streaming gateway, tooling), or is FastAPI alone enough?
5. Should users be able to retake the same concept test or always get a fresh one?
