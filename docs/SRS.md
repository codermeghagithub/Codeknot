# Software Requirements Specification (SRS)

**Project Title:** AI-Assisted Coding Doubt Resolution and Personalized Exam Preparation Platform  
**Academic Document Type:** IEEE 830-1998 Standard Adapted for MCA Project Evaluation  
**Version:** 1.0.0  
**Date:** October 2026  

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document details the functional, non-functional, interface, and behavioral specifications for the frontend implementation of the **AI-Assisted Coding Doubt Resolution and Personalized Exam Preparation Platform**. This document serves as the formal baseline for development, evaluation, and test verification for the MCA Minor Project.

### 1.2 Scope of the Software
The software product is a modern Single Page Web Application (SPA) designed to assist computer science students in diagnosing programming doubts and preparing for course examinations using uploaded PDF study materials.
- **In-Scope (Minor Project):** Comprehensive client-side web application built with React.js (JavaScript ES6+), Tailwind CSS, Vite, React Router DOM, React Context API, and a simulated mock API layer using Axios.
- **Out-of-Scope (Deferred to Major Project):** Server-side web services (Node.js/FastAPI), persistent relational/vector databases, live LLM orchestration (LangChain/OpenAI API), live mentor booking, payment gateway integration, and multi-tenant admin telemetry.

### 1.3 Definitions, Acronyms, and Abbreviations
- **SPA:** Single Page Application
- **PRD:** Product Requirements Document
- **SRS:** Software Requirements Specification
- **RAG:** Retrieval-Augmented Generation
- **JWT:** JSON Web Token (simulated via mock tokens in local storage)
- **UI/UX:** User Interface / User Experience
- **WCAG:** Web Content Accessibility Guidelines

---

## 2. Overall Description

### 2.1 System Architecture Overview
The platform operates as a decoupled frontend client interacting with a modular Mock API Service layer that adheres strictly to RESTful conventions. All client operations—including authentication state, active sessions, doubt archives, uploaded document registries, and examination state—are persisted in browser memory and synchronized with `localStorage` to survive page reloads.

```
+-----------------------------------------------------------------------------------+
|                                  BROWSER CLIENT                                   |
|                                                                                   |
|  +--------------------+  +----------------------+  +---------------------------+  |
|  |   React Router     |  |   Auth Context &     |  |   React Hook Form +       |  |
|  |   (Route Guards)   |  |   Session Storage    |  |   Zod Schema Validation   |  |
|  +--------------------+  +----------------------+  +---------------------------+  |
|            |                        |                           |                 |
|  +-----------------------------------------------------------------------------+  |
|  |                            FEATURE UI MODULES                               |  |
|  |  [Auth] [Student Dashboard] [Coding Doubt / Quiz] [PDF Exam / Analytics]    |  |
|  |  [Admin Placeholder] [Mentor Placeholder]                                   |  |
|  +-----------------------------------------------------------------------------+  |
|            |                                                                      |
|  +-----------------------------------------------------------------------------+  |
|  |                     SERVICES & MOCK API LAYER (Axios)                       |  |
|  |   authService.js | doubtService.js | examService.js | mockDatabase.js       |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

### 2.2 User Actors & Permissions
1. **Student (`ROLE_STUDENT`):**
   - Full access to Student Dashboard.
   - Access to Coding Assistant (Submit doubts, view AI explanations).
   - Access to Formative 3-Question Assessments and Knowledge Gap remediation.
   - Access to PDF document upload, status monitoring, and library.
   - Access to Exam Generator, Timed Exam Room, Results, and Revision Planner.
   - Access to personal Doubt and Exam History.
2. **Mentor (`ROLE_MENTOR`):**
   - Authentication (Sign Up & Sign In).
   - Dedicated Mentor Portal Placeholder screen displaying greeting and notice of Major Project features (Student Escalation Queue, Doubt Review, Office Hours Schedule).
3. **Admin (`ROLE_ADMIN`):**
   - Authentication (Sign Up & Sign In).
   - Dedicated Admin Console Placeholder screen displaying greeting and notice of Major Project features (User Management, Token Monitoring, System Audits).

---

## 3. Functional Requirements (FR)

### 3.1 Authentication & Authorization Module (`FR-AUTH`)

| ID | Requirement Description | Priority | Input | Expected Output |
| :--- | :--- | :--- | :--- | :--- |
| **FR-AUTH-01** | Student, Admin, and Mentor Registration | High | Name, Email, Password, Role | Creates mock user record; returns session token and user profile. |
| **FR-AUTH-02** | Role-Specific Sign In | High | Email, Password, Role | Validates credentials against mock store; sets auth token; redirects to role dashboard. |
| **FR-AUTH-03** | Show/Hide Password Toggle | Medium | Toggle icon click | Alternates input type between `password` and `text`. |
| **FR-AUTH-04** | Client-Side Form Validation | High | Form input events | Real-time Zod schema validation messages displayed below fields. |
| **FR-AUTH-05** | Protected Route Guarding | High | Route navigation attempt | Unauthenticated requests redirected to `/login/:role` with return URI. |
| **FR-AUTH-06** | Session Check on Page Reload | High | Page load event | Rehydrates `user` and `token` state from `localStorage` without forced logout. |
| **FR-AUTH-07** | Graceful 401 Interception | High | Mock Axios 401 response | Clears invalid token, issues toast warning, redirects to login. |
| **FR-AUTH-08** | Explicit Sign Out | High | Logout button click | Destroys session in Context and `localStorage`; redirects to landing page. |

### 3.2 Coding Doubt Resolution Module (`FR-DOUBT`)

| ID | Requirement Description | Priority | Input | Expected Output |
| :--- | :--- | :--- | :--- | :--- |
| **FR-DOUBT-01** | Doubt Submission Console | High | Problem title, Language, Description, Code snippet | Validates input; renders loading state with pedagogical tips while resolving. |
| **FR-DOUBT-02** | Structured AI Explanation View | High | Received AI response object | Formats response into: Overview, Line-by-Line Code Breakdown, Time/Space Complexity. |
| **FR-DOUBT-03** | Code Snippet Syntax Highlighting | Medium | Raw code string | Renders highlighted code with copy-to-clipboard button and language tag. |
| **FR-DOUBT-04** | "Did you understand?" Verification | High | "Yes, I got it" vs "I need a concept check" | "Yes" updates mastery score; "Concept check" transitions directly to 3-question assessment. |
| **FR-DOUBT-05** | 3-Question Micro-Assessment Engine | High | Concept key & difficulty | Presents exactly 3 multiple-choice / conceptual questions tailored to the doubt. |
| **FR-DOUBT-06** | Instant Assessment Evaluation | High | Array of 3 selected answers | Calculates score (0-3), marks correct/incorrect answers with explanatory rationale. |
| **FR-DOUBT-07** | Knowledge Gap & Remediation Card | High | Assessment result object | Identifies specific missing prerequisite concepts and suggests concrete revision links. |
| **FR-DOUBT-08** | Concept Retest Option | Medium | "Retest Concept" button click | Resets quiz state and generates 3 alternate test questions for the same concept. |
| **FR-DOUBT-09** | Doubt & Assessment History | Medium | Filter/Search criteria | Paginated/scrollable list of previously asked doubts, solutions, and quiz outcomes. |

### 3.3 PDF-Based Exam Preparation Module (`FR-EXAM`)

| ID | Requirement Description | Priority | Input | Expected Output |
| :--- | :--- | :--- | :--- | :--- |
| **FR-EXAM-01** | PDF Document Upload Interface | High | PDF File (drag-drop or file picker) | Validates file type (`application/pdf`) and size (`<= 10MB`); triggers animated upload progress. |
| **FR-EXAM-02** | Document Registry & Status | High | User document collection | Displays uploaded documents with metadata (Title, Size, Upload Date, Status: Ready / Processing). |
| **FR-EXAM-03** | Document Delete / Re-upload | Low | Document ID | Removes document record from mock store with confirmation modal. |
| **FR-EXAM-04** | Exam Generation Configuration | High | Document ID, Question Count (5/10/15), Difficulty, Time Limit | Validates configuration and prepares customized exam session. |
| **FR-EXAM-05** | Timed Exam Room Environment | High | User interaction / timer ticks | Full-screen exam view with real-time countdown timer, warning colors at 5m and 1m. |
| **FR-EXAM-06** | Question Navigation Matrix | High | Palette item click | Jumps to target question; displays visual indicators: Answered, Unanswered, Marked for Review. |
| **FR-EXAM-07** | Auto-Submit on Timeout | High | Timer countdown reaching 00:00 | Freezes input, triggers notification, and auto-submits responses to evaluation service. |
| **FR-EXAM-08** | Comprehensive Exam Results View | High | Submitted answers array | Computes overall percentage, grade badge, and question-by-question review with explanations. |
| **FR-EXAM-09** | Topic Strength & Weakness Matrix | High | Result topic analytics | Recharts visual graph breaking down topics into Strong (>=75%), Moderate (50-74%), and Weak (<50%). |
| **FR-EXAM-10** | Personalized Revision Recommendations | High | Identified weak topics | Generates customized study blueprint and targeted reading recommendations. |
| **FR-EXAM-11** | Retest Weak Topics Workflow | Medium | "Retest Weak Topics" click | Spawns a new targeted exam focusing specifically on topics where student scored < 50%. |
| **FR-EXAM-12** | Exam History & Progress Dashboard | Medium | Student exam history records | Displays trend chart of exam scores over time and table of past exam attempts. |

### 3.4 Shared & Administrative Modules (`FR-SHARED`)

| ID | Requirement Description | Priority | Input | Expected Output |
| :--- | :--- | :--- | :--- | :--- |
| **FR-SHARED-01** | Public Landing Page | High | View navigation | Feature showcase, workflow preview, call-to-action buttons. |
| **FR-SHARED-02** | Role Selection Hub | High | Role card selection | Routes user to Student, Admin, or Mentor login/signup interfaces. |
| **FR-SHARED-03** | Student Dashboard Home | High | Authenticated student session | Quick metric cards, direct navigation cards to Module A & B, recent activity feed. |
| **FR-SHARED-04** | Admin Placeholder Portal | Medium | Authenticated admin session | Professional placeholder console explaining planned Major Project administration capabilities. |
| **FR-SHARED-05** | Mentor Placeholder Portal | Medium | Authenticated mentor session | Professional placeholder console explaining planned Major Project mentoring features. |

---

## 4. Non-Functional Requirements (NFR)

### 4.1 Performance & Responsiveness (`NFR-PERF`)
- **NFR-PERF-01:** First Contentful Paint (FCP) shall occur within 1.2 seconds in standard modern desktop browsers on local preview.
- **NFR-PERF-02:** Client-side state transitions (switching between dashboard tabs, question palette updates) shall execute with zero perceptible latency (`< 50ms`).
- **NFR-PERF-03:** Mock API latency shall be realistically simulated:
  - Immediate operations (Auth, History fetch): `200ms - 400ms`.
  - Heavy operations (AI Explanation, Document Analysis, Exam Generation): `1200ms - 1800ms` with interactive skeleton loading states to test production-like UX.

### 4.2 Usability, Aesthetics & Accessibility (`NFR-UX`)
- **NFR-UX-01:** Modern aesthetic design following dark/light harmonious color palette using Tailwind CSS tokens, Fira Code for programming snippets, and Inter for primary typography.
- **NFR-UX-02:** Full responsiveness across standard breakpoints: Mobile (`375px+`), Tablet (`768px+`), Desktop (`1024px+`), and Wide Displays (`1440px+`).
- **NFR-UX-03:** Accessibility: Semantic HTML5 elements (`<nav>`, `<main>`, `<article>`, `<aside>`), ARIA labels on icon buttons, keyboard navigable quiz matrices, and minimum WCAG 2.1 AA contrast ratios.

### 4.3 Reliability & State Persistence (`NFR-REL`)
- **NFR-REL-01:** All mock data (User records, doubt history, uploaded documents, generated exams, exam history) must persist in browser `localStorage`.
- **NFR-REL-02:** In the event of an unexpected page refresh during a timed exam, the exam timer and current answers must be recovered from local state.
- **NFR-REL-03:** System must provide a one-click "Reset Mock Data" utility in the development environment to restore clean demonstration seeds.

---

## 5. Requirements Traceability Matrix (RTM)

| Requirement ID | Module | Primary Frontend Route / Page | Component(s) Involved |
| :--- | :--- | :--- | :--- |
| **FR-AUTH-01 to 04** | Auth | `/register/:role` | `RegisterPage`, `AuthForm`, `validation.js` |
| **FR-AUTH-02 to 04** | Auth | `/login/:role` | `LoginPage`, `AuthForm`, `validation.js` |
| **FR-AUTH-05 to 08** | Auth | All Protected Routes | `ProtectedRoute`, `AuthContext`, `apiClient.js` |
| **FR-DOUBT-01 to 03** | Doubt | `/student/doubt-assistant` | `DoubtSubmissionForm`, `ExplanationView`, `CodeBlock` |
| **FR-DOUBT-04 to 08** | Doubt | `/student/doubt-assessment/:doubtId` | `AssessmentQuizView`, `KnowledgeGapCard`, `RecommendationList` |
| **FR-DOUBT-09** | Doubt | `/student/doubt-history` | `DoubtHistoryTable`, `DoubtDetailModal` |
| **FR-EXAM-01 to 03** | Exam | `/student/documents` | `PdfUploader`, `DocumentList`, `DocumentStatusBadge` |
| **FR-EXAM-04** | Exam | `/student/exam-setup/:documentId` | `ExamConfigForm`, `QuestionCountSelector` |
| **FR-EXAM-05 to 07** | Exam | `/student/exam-room/:examId` | `ExamRoom`, `ExamTimer`, `QuestionPalette`, `QuestionCard` |
| **FR-EXAM-08 to 11** | Exam | `/student/exam-results/:attemptId` | `ExamResultsView`, `TopicMasteryChart`, `RevisionPlanCard` |
| **FR-EXAM-12** | Exam | `/student/exam-history` | `ExamHistoryTable`, `ScoreTrendChart` |
| **FR-SHARED-01, 02** | Shared | `/`, `/select-role` | `LandingPage`, `RoleSelectionModal` |
| **FR-SHARED-03** | Shared | `/student/dashboard` | `StudentDashboard`, `QuickActionCards`, `RecentActivityFeed` |
| **FR-SHARED-04** | Admin | `/admin/dashboard` | `AdminPlaceholderPage` |
| **FR-SHARED-05** | Mentor | `/mentor/dashboard` | `MentorPlaceholderPage` |
