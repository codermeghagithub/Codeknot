# Phased Frontend Development Plan & Open Questions

**Project Title:** AI-Assisted Coding Doubt Resolution and Personalized Exam Preparation Platform  
**Document:** Phased Execution Roadmap & Architectural Decisions Requiring Approval  
**Version:** 1.0.0  

---

## 1. Phased Frontend Development Plan

To guarantee robust code quality, complete testability, and adherence to academic evaluation standards, the frontend will be built in seven sequential milestones. Each milestone has clear scope and testable acceptance criteria.

```
+-------------+     +-------------+     +-------------+     +-------------+
| Milestone 0 | --> | Milestone 1 | --> | Milestone 2 | --> | Milestone 3 |
| Project Scaf|     | Auth & Core |     | Student Dash|     | Module A    |
+-------------+     +-------------+     +-------------+     +-------------+
                                                                   |
+-------------+     +-------------+     +-------------+            |
| Milestone 6 | <-- | Milestone 5 | <-- | Milestone 4 | <----------+
| Polish & QA |     | Placeholders|     | Module B    |
+-------------+     +-------------+     +-------------+
```

---

### Milestone 0: Environment Setup & Project Scaffolding
- **Objective:** Initialize the React SPA using Vite, configure Tailwind CSS, install required dependencies, set up standard directory structure, and configure Vitest.
- **Key Tasks:**
  - Initialize project with `npm create vite@latest frontend -- --template react` (JavaScript only).
  - Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `react-router-dom`, `axios`, `lucide-react`, `react-hook-form`, `@hookform/resolvers`, `zod`, `recharts`.
  - Configure Tailwind design tokens (colors, font family `Inter` and `Fira Code`, animations).
  - Create standardized folder structure matching Section 7 of project specification.
  - Set up Vitest and React Testing Library configuration.
- **Acceptance Criteria:**
  - `npm run dev` boots cleanly with zero console warnings.
  - `npm run test` executes basic smoke test successfully.
  - Standard folder structure is populated with initial index files.

---

### Milestone 1: Authentication, Route Guards & Shared Layout
- **Objective:** Build full authentication flows for Student, Mentor, and Admin roles, plus layout shells and session persistence.
- **Key Tasks:**
  - Implement `AuthContext` with `login`, `register`, `logout`, and auto-session check from `localStorage`.
  - Build `LoginPage` and `RegisterPage` with role toggle or route parameter (`/login/:role`).
  - Implement Zod validation schemas for email, password strength, and user details with real-time feedback.
  - Implement `show/hide password` visibility toggle.
  - Build `ProtectedRoute` component with role verification and graceful redirection to login with query return URLs.
  - Build shared navigation header, sidebar, footer, and responsive mobile drawer.
- **Acceptance Criteria:**
  - User can register as Student, Mentor, or Admin and immediately log in.
  - Invalid inputs show inline Zod validation error messages.
  - Navigating to `/student/dashboard` while logged out redirects to `/login/student`.
  - Refreshing the browser preserves the logged-in session.
  - Sign-out cleanses state and redirects to landing page.

---

### Milestone 2: Landing Page & Student Dashboard Core
- **Objective:** Create an engaging, academic landing page and the central Student Dashboard.
- **Key Tasks:**
  - Build `LandingPage` with hero section, feature spotlights (Module A & B), interactive workflow demo preview, and role selection CTA modal.
  - Build `StudentDashboard` with:
    - Welcome hero banner with personalized greeting and date.
    - Quick Metric KPI Cards (Doubts Solved, Exams Completed, Overall Mastery %).
    - Primary Action Cards ("Ask a Coding Doubt" & "Upload Study PDF").
    - Recent Activity stream (latest doubts and exam attempts).
    - Longitudinal progress chart snippet using Recharts.
- **Acceptance Criteria:**
  - Landing page is responsive from 320px mobile to wide desktop.
  - Role selection card cleanly directs to corresponding sign-in/sign-up page.
  - Student Dashboard accurately reflects aggregated data from mock local storage.

---

### Milestone 3: Module A — Coding Doubt Resolution & Formative Diagnostic
- **Objective:** Deliver the complete interactive coding doubt submission, AI explanation display, 3-question diagnostic quiz, and knowledge gap remediation views.
- **Key Tasks:**
  - Build `DoubtSubmissionForm` with multi-line code editor, syntax selection (Python, C++, Java, JS, SQL), error message input, and character count.
  - Build `ExplanationView` with structured cards: Overview, Formatted Code with line highlights and copy button, and Time/Space Complexity badges.
  - Build "Did you understand?" feedback component with binary choices.
  - Build `AssessmentQuizView` presenting exactly 3 questions with single-select radio options and immediate submission validation.
  - Build `AssessmentResultsView` displaying score (0/3 to 3/3), question breakdown with explanations, knowledge gap warning cards, and "Retest Concept" button.
  - Build `DoubtHistory` page with search, language filters, and past diagnosis viewing.
- **Acceptance Criteria:**
  - Submitting a doubt simulates an AI loading state and displays the structured explanation.
  - Clicking "Did not understand" transitions directly to the 3-question quiz.
  - Submitting quiz answers renders accurate score, displays correct/incorrect rationales, and lists identified knowledge gaps.
  - All submitted doubts and assessments are saved and searchable in Doubt History.

---

### Milestone 4: Module B — PDF-Based Exam Preparation & Diagnostic Analytics
- **Objective:** Build PDF upload handling, document management, exam configuration, timed exam interface, and comprehensive topic-mastery results.
- **Key Tasks:**
  - Build `PdfUploader` with drag-and-drop, `.pdf` extension validation, 10MB file limit check, and animated upload simulation.
  - Build `DocumentList` displaying document metadata, processing status badges ("Processing" -> "Ready"), and "Generate Exam" action.
  - Build `ExamConfigForm` allowing selection of question count (5, 10, 15), difficulty, and time limit.
  - Build `ExamRoom` with:
    - Active countdown timer hook with visual color shifts (green -> amber -> pulsing red).
    - 2D Question Palette navigation drawer (Answered, Unanswered, Marked for Review).
    - Question card with radio selection and review flags.
    - Auto-submit trigger when timer expires.
  - Build `ExamResultsView` with:
    - Score percentage, grade band badge, and time taken.
    - Recharts horizontal/vertical bar chart showing topic strength vs. weakness.
    - Question-by-question breakdown with detailed explanations.
    - Personalized Revision Plan highlighting weak topics (<50%).
    - "Retest Weak Topics" quick action button.
  - Build `ExamHistory` page with longitudinal score trend graph.
- **Acceptance Criteria:**
  - Non-PDF files or files > 10MB are rejected with clear error feedback.
  - Exam countdown timer accurately ticks down and auto-submits on expiration.
  - Topic breakdown correctly categorizes topics into Strong, Moderate, and Weak.
  - Retest weak topics generates a focused assessment targeting sub-50% areas.

---

### Milestone 5: Admin & Mentor Placeholder Portals
- **Objective:** Implement dedicated, polished placeholder dashboards for Admin and Mentor roles to reflect complete role separation without developing out-of-scope backend features.
- **Key Tasks:**
  - Build `AdminDashboard` placeholder: system status badges, simulated metrics (active students, documents indexed), and notice banner detailing Major Project administrative roadmap.
  - Build `MentorDashboard` placeholder: upcoming cohort schedule notice, doubt escalation queue preview placeholder, and Major Project roadmap.
  - Role guard verification ensuring students cannot access mentor or admin portals.
- **Acceptance Criteria:**
  - Admin login leads exclusively to Admin Dashboard; Mentor login leads to Mentor Dashboard.
  - Both screens present clean, professional UI with clear academic context notes.

---

### Milestone 6: Design Polish, Accessibility, State Verification & Unit Testing
- **Objective:** Polish responsive UI, verify edge states (loading, empty, error), enforce accessibility standards, and write unit tests for critical flows.
- **Key Tasks:**
  - Implement empty state illustrations and error retry boundaries across all lists.
  - Add toast notification system for feedback (success, warning, error).
  - Add "Reset Demo Data" button in developer drawer or footer.
  - Write Vitest tests for:
    - Authentication form validation schemas.
    - Exam timer countdown and auto-submission logic.
    - 3-Question assessment score calculation.
    - Topic strength/weakness categorization logic.
- **Acceptance Criteria:**
  - All test suites pass cleanly (`npm run test`).
  - No broken links, missing image assets, or unhandled errors.
  - Complete responsiveness validated across mobile, tablet, and desktop viewports.

---

## 2. List of Open Questions & Unresolved Decisions

The following items are cataloged for your explicit review and sign-off before proceeding to code execution:

### Question 1: Auth Route Structure
- **Current Recommendation:** Use unified parameterized routes `/login/:role` and `/register/:role` (where `:role` is `student`, `mentor`, or `admin`) with a visual tab switcher on the form to allow quick role toggle.
- **Alternative:** Separate distinct paths: `/login/student`, `/login/mentor`, `/login/admin`.
- *Does the recommended parameterized route with visual role tabs meet your preference?*

### Question 2: Pre-seeded Demo Data
- **Current Recommendation:** Provide rich, pre-seeded academic demo data upon initial launch (e.g., 2 pre-uploaded computer science PDFs on "Data Structures" and "Operating Systems", 3 sample coding doubts, and 2 previous exam attempts) so the platform is immediately demonstrable during viva/evaluation without requiring manual uploads first.
- *Would you like this pre-seeded demo dataset enabled by default with a "Reset Demo Data" option?*

### Question 3: 3-Question Assessment Retest Logic
- **Current Recommendation:** When a student clicks "Retest Concept" after a 3-question diagnostic, the system generates an alternate 3-question set focusing on the exact identified knowledge gap.
- *Is generating an alternate 3-question set the desired behavior?*

### Question 4: Exam Question Count Options
- **Current Recommendation:** Provide 5, 10, and 15 questions as selectable options for the PDF exam generation (with 5, 10, and 15-minute defaults) to allow fast evaluation during project demos.
- *Are these question count options suitable, or would you like a custom number input?*

---

## 3. Approval Gate

> [!IMPORTANT]
> In accordance with the project instructions:
> **All documentation deliverables have been created. We will now STOP and await your explicit review and approval before generating any React frontend code or initiating workspace scaffolding.**
