# AI-Assisted Coding Doubt Resolution and Personalized Exam Preparation Platform

**Academic Program:** Master of Computer Applications (MCA) — Minor Project Scope  
**Author / Candidate:** MCA Student  
**Architecture Focus:** Client-Side Single Page Application (React.js + Tailwind CSS + Mock Service Engine)  
**Status:** Documentation Complete — Phase 1 Approved Gate  

---

## 📚 Project Documentation Repository

This repository contains the complete, academic-grade system documentation created prior to frontend implementation, in accordance with the minor project requirements.

| # | Document | Primary Contents | File Link |
| :-: | :--- | :--- | :--- |
| **01** | **Product Requirements Document (PRD)** | Problem statement, objectives, personas, core features, Minor vs Major scope, user stories, acceptance criteria, constraints & success metrics. | [docs/PRD.md](file:///d:/explore_code/docs/PRD.md) |
| **02** | **Software Requirements Specification (SRS)** | System overview, actors & permissions, functional requirements (FR-AUTH, FR-DOUBT, FR-EXAM, FR-SHARED), non-functional requirements (NFRs), Requirements Traceability Matrix (RTM). | [docs/SRS.md](file:///d:/explore_code/docs/SRS.md) |
| **03** | **Architecture, Workflows & Matrices** | Feature-scope matrix, Role & Permission matrix, Complete Frontend Sitemap, Mermaid student workflows, High-level system architecture, and Frontend Responsibility matrix. | [docs/SYSTEM_ARCHITECTURE_AND_WORKFLOWS.md](file:///d:/explore_code/docs/SYSTEM_ARCHITECTURE_AND_WORKFLOWS.md) |
| **04** | **API Contract Specifications** | Formal RESTful JSON request & response schemas for Authentication, Module A (Doubt Resolution & 3-Q Assessment), and Module B (PDF Document Ingestion & Exam Engine). | [docs/API_CONTRACTS.md](file:///d:/explore_code/docs/API_CONTRACTS.md) |
| **05** | **Development Plan & Open Questions** | 7-Milestone frontend execution roadmap (M0 to M6) with acceptance criteria, unit test strategy, and list of open questions awaiting stakeholder approval. | [docs/DEVELOPMENT_PLAN_AND_QUESTIONS.md](file:///d:/explore_code/docs/DEVELOPMENT_PLAN_AND_QUESTIONS.md) |

---

## 🎯 Project Overview at a Glance

### Module A — Coding Doubt Resolution & Formative Diagnostic
1. **Doubt Submission:** Students enter code and conceptual hurdles in a rich multi-language code console.
2. **AI Pedagogical Explanation:** Clean line-by-line explanation, time/space complexity, and syntax-highlighted corrected code.
3. **Formative Assessment Loop ("Did you understand?"):** If the student does not understand, the system triggers an immediate **3-question formative assessment** to expose knowledge gaps.
4. **Remediation & Retest:** Clear report pinpointing missing fundamentals with customized study advice and a 1-click retest.

### Module B — PDF-Based Exam Preparation
1. **PDF Ingestion:** Upload syllabus, lecture slides, or university textbook notes (with file size and MIME validation).
2. **Custom Exam Configuration:** Configure question count (5, 10, 15), difficulty levels, and time limit.
3. **Interactive Timed Exam:** Clean exam room with countdown timer, question palette navigation (Answered, Unanswered, Review), and auto-submission.
4. **Diagnostic Results & Revision Blueprint:** Topic mastery breakdown (Strong >=75%, Moderate, Weak <50%), correct answer explanations, and a targeted revision plan with retest option.

### Roles Supported (Frontend Scope)
- **Student:** Full access to all learning features, tests, and dashboards.
- **Admin:** Authentication + professional placeholder console explaining Major Project governance features.
- **Mentor:** Authentication + professional placeholder console explaining Major Project escalation and review features.
