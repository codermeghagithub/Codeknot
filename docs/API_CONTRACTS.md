# Proposed API Contract Specification

**Project Title:** AI-Assisted Coding Doubt Resolution and Personalized Exam Preparation Platform  
**Document:** API Contract & Mock Service Specifications (RESTful / JSON)  
**Version:** 1.0.0  

This document defines the formal request and response schemas utilized by the frontend's Mock Service Layer (`src/services/`). When the project transitions to the Major Project phase, the backend (Node.js/Express or FastAPI) will implement these exact endpoints without requiring frontend changes.

---

## 1. Authentication Endpoints (`/api/auth`)

### 1.1 Register New User
- **Endpoint:** `POST /api/auth/register`
- **Description:** Registers a new student, mentor, or admin.
- **Request Headers:** `Content-Type: application/json`
- **Request Body:**
```json
{
  "name": "Rohan Sharma",
  "email": "rohan@example.com",
  "password": "Password@123",
  "role": "student"
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "mock-jwt-token-xyz-12345",
    "user": {
      "id": "usr_std_001",
      "name": "Rohan Sharma",
      "email": "rohan@example.com",
      "role": "student",
      "createdAt": "2026-10-11T10:30:00Z"
    }
  }
}
```
- **Response `400 Bad Request`:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Email is already registered"
  }
}
```

---

### 1.2 Sign In User
- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticates user credentials and checks role match.
- **Request Body:**
```json
{
  "email": "rohan@example.com",
  "password": "Password@123",
  "role": "student"
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "mock-jwt-token-xyz-12345",
    "user": {
      "id": "usr_std_001",
      "name": "Rohan Sharma",
      "email": "rohan@example.com",
      "role": "student",
      "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan"
    }
  }
}
```
- **Response `401 Unauthorized`:**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 1.3 Get Current User Session
- **Endpoint:** `GET /api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "id": "usr_std_001",
    "name": "Rohan Sharma",
    "email": "rohan@example.com",
    "role": "student"
  }
}
```

---

## 2. Module A: Coding Doubt Resolution Endpoints (`/api/doubts`)

### 2.1 Submit a Coding Doubt
- **Endpoint:** `POST /api/doubts`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
```json
{
  "title": "IndexOutOfBounds Exception in Binary Search Loop",
  "language": "cpp",
  "codeSnippet": "int binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}",
  "query": "My code crashes with segmentation fault or out-of-bounds when target is not present in the array.",
  "errorMessage": "AddressSanitizer: heap-buffer-overflow on address 0x..."
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "doubtId": "dbt_98234",
    "title": "IndexOutOfBounds Exception in Binary Search Loop",
    "language": "cpp",
    "conceptTag": "Binary Search Boundary Conditions",
    "aiExplanation": {
      "overview": "The bug occurs because `high` is initialized to `n` instead of `n - 1`. In an 0-indexed array with size `n`, index `n` is out-of-bounds. When `target` is greater than all elements, `low` reaches `n` and `arr[n]` is accessed, triggering undefined behavior.",
      "correctedCode": "int binarySearch(int arr[], int n, int target) {\n    int low = 0, high = n - 1;\n    while (low <= high) {\n        int mid = low + (high - low) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return -1;\n}",
      "keyFixes": [
        "Initialize `high = n - 1` so maximum accessed index is within `0` to `n - 1`.",
        "Use `mid = low + (high - low) / 2` to prevent 32-bit integer overflow when `low + high` exceeds `INT_MAX`."
      ],
      "complexity": {
        "timeComplexity": "O(log N)",
        "spaceComplexity": "O(1)"
      }
    },
    "createdAt": "2026-10-11T10:32:00Z",
    "status": "pending_check"
  }
}
```

---

### 2.2 Submit Comprehension Verification ("Did You Understand?")
- **Endpoint:** `POST /api/doubts/:doubtId/feedback`
- **Request Body:**
```json
{
  "understood": false,
  "studentNotes": "Still confused about why mid calculation can overflow."
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "action": "trigger_assessment",
  "assessmentId": "asmt_dbt_98234",
  "message": "Generating 3 personalized concept check questions"
}
```

---

### 2.3 Fetch Formative 3-Question Assessment
- **Endpoint:** `GET /api/doubts/:doubtId/assessment`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "assessmentId": "asmt_dbt_98234",
    "doubtId": "dbt_98234",
    "concept": "Binary Search Boundary Conditions & Integer Overflow",
    "questions": [
      {
        "id": "q1",
        "questionText": "For an array of size 5 (indices 0 to 4), if `high` is initialized to 5, what happens if the searched value is greater than `arr[4]` in the first iteration?",
        "options": [
          { "id": "opt_a", "text": "It cleanly returns -1." },
          { "id": "opt_b", "text": "The loop terminates because low > high." },
          { "id": "opt_c", "text": "Mid may evaluate to index 5, accessing memory beyond the array bounds." },
          { "id": "opt_d", "text": "The array automatically reallocates memory." }
        ]
      },
      {
        "id": "q2",
        "questionText": "Why is `low + (high - low) / 2` mathematically safer than `(low + high) / 2` in languages with bounded integer types (C++, Java)?",
        "options": [
          { "id": "opt_a", "text": "It runs in O(1) whereas addition is O(N)." },
          { "id": "opt_b", "text": "If low + high exceeds 2^31 - 1, it overflows to a negative integer, causing negative index access." },
          { "id": "opt_c", "text": "It always rounds up rather than down." },
          { "id": "opt_d", "text": "It prevents division by zero." }
        ]
      },
      {
        "id": "q3",
        "questionText": "What should the loop continuation condition be when search space is defined by `high = n - 1`?",
        "options": [
          { "id": "opt_a", "text": "while (low < high)" },
          { "id": "opt_b", "text": "while (low <= high)" },
          { "id": "opt_c", "text": "while (low != high)" },
          { "id": "opt_d", "text": "while (high > 0)" }
        ]
      }
    ]
  }
}
```

---

### 2.4 Evaluate 3-Question Assessment & Generate Remediation
- **Endpoint:** `POST /api/doubts/:doubtId/assessment/evaluate`
- **Request Body:**
```json
{
  "assessmentId": "asmt_dbt_98234",
  "answers": [
    { "questionId": "q1", "selectedOptionId": "opt_c" },
    { "questionId": "q2", "selectedOptionId": "opt_a" },
    { "questionId": "q3", "selectedOptionId": "opt_b" }
  ]
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "score": 2,
    "totalQuestions": 3,
    "percentage": 66.67,
    "evaluations": [
      {
        "questionId": "q1",
        "isCorrect": true,
        "selectedOptionId": "opt_c",
        "correctOptionId": "opt_c",
        "explanation": "Correct! Accessing arr[5] causes an out-of-bounds error on an array of length 5."
      },
      {
        "questionId": "q2",
        "isCorrect": false,
        "selectedOptionId": "opt_a",
        "correctOptionId": "opt_b",
        "explanation": "Incorrect. Both expressions take O(1) time. The true reason is avoiding integer overflow when low + high exceeds 2,147,483,647."
      },
      {
        "questionId": "q3",
        "isCorrect": true,
        "selectedOptionId": "opt_b",
        "correctOptionId": "opt_b",
        "explanation": "Correct! When low == high, exactly 1 element remains to be inspected."
      }
    ],
    "knowledgeGaps": [
      {
        "topic": "Integer Representation & 32-Bit Overflow Mechanics",
        "severity": "High",
        "description": "Confusion identified regarding integer bounds and arithmetic overflow in C++ / Java data types."
      }
    ],
    "recommendations": [
      {
        "title": "Review 32-Bit Signed Integer Overflow in Binary Search",
        "type": "Article Guide",
        "readTime": "4 mins",
        "summary": "Learn how Google researchers discovered a hidden overflow bug in Java's Arrays.binarySearch."
      },
      {
        "title": "Practice Edge Cases: Search in Single-Element Arrays",
        "type": "Interactive Retest",
        "actionUrl": "retest"
      }
    ]
  }
}
```

---

## 3. Module B: PDF Exam Preparation Endpoints (`/api/exams` & `/api/documents`)

### 3.1 Upload & Ingest PDF Document
- **Endpoint:** `POST /api/documents/upload`
- **Headers:** `Content-Type: multipart/form-data`
- **Request:** FormData with `file: <binary_pdf>` and `title: "Unit 3 - Trees & Binary Search Trees"`
- **Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "id": "doc_pdf_771",
    "title": "Unit 3 - Trees & Binary Search Trees.pdf",
    "fileSize": "2.4 MB",
    "totalPages": 28,
    "status": "ready",
    "detectedTopics": [
      "Binary Tree Traversals (Inorder, Preorder, Postorder)",
      "Binary Search Tree Insertion and Deletion",
      "AVL Trees & Balance Factor",
      "Red-Black Tree Properties"
    ],
    "uploadedAt": "2026-10-11T10:35:00Z"
  }
}
```

---

### 3.2 List Uploaded Documents
- **Endpoint:** `GET /api/documents`
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": [
    {
      "id": "doc_pdf_771",
      "title": "Unit 3 - Trees & Binary Search Trees.pdf",
      "fileSize": "2.4 MB",
      "totalPages": 28,
      "status": "ready",
      "uploadedAt": "2026-10-11T10:35:00Z",
      "examsGeneratedCount": 2
    },
    {
      "id": "doc_pdf_772",
      "title": "Operating Systems - Memory Management.pdf",
      "fileSize": "4.1 MB",
      "totalPages": 42,
      "status": "ready",
      "uploadedAt": "2026-10-10T14:20:00Z",
      "examsGeneratedCount": 1
    }
  ]
}
```

---

### 3.3 Configure & Generate Exam
- **Endpoint:** `POST /api/exams/generate`
- **Request Body:**
```json
{
  "documentId": "doc_pdf_771",
  "title": "MCA Semester Mock - Trees & BST",
  "questionCount": 10,
  "difficulty": "medium",
  "durationMinutes": 15
}
```
- **Response `201 Created`:**
```json
{
  "success": true,
  "data": {
    "examId": "exm_sess_4910",
    "documentId": "doc_pdf_771",
    "documentTitle": "Unit 3 - Trees & Binary Search Trees.pdf",
    "title": "MCA Semester Mock - Trees & BST",
    "durationMinutes": 15,
    "totalQuestions": 10,
    "questions": [
      {
        "id": "eq_1",
        "topic": "Binary Tree Traversals",
        "questionText": "What is the sequence of nodes visited in an Inorder traversal of a Binary Search Tree containing values [10, 5, 15, 2, 7]?",
        "options": [
          { "id": "a", "text": "10, 5, 2, 7, 15" },
          { "id": "b", "text": "2, 5, 7, 10, 15" },
          { "id": "c", "text": "2, 7, 5, 15, 10" },
          { "id": "d", "text": "15, 10, 7, 5, 2" }
        ]
      },
      {
        "id": "eq_2",
        "topic": "AVL Trees & Balance Factor",
        "questionText": "What are the permissible balance factor values for any node in an AVL tree?",
        "options": [
          { "id": "a", "text": "-1, 0, +1" },
          { "id": "b", "text": "0, +1, +2" },
          { "id": "c", "text": "Strictly 0" },
          { "id": "d", "text": "-2, -1, 0, +1, +2" }
        ]
      }
    ]
  }
}
```

---

### 3.4 Submit Exam Answers & Compute Diagnostic Results
- **Endpoint:** `POST /api/exams/:examId/submit`
- **Request Body:**
```json
{
  "timeSpentSeconds": 720,
  "answers": [
    { "questionId": "eq_1", "selectedOptionId": "b" },
    { "questionId": "eq_2", "selectedOptionId": "b" }
  ]
}
```
- **Response `200 OK`:**
```json
{
  "success": true,
  "data": {
    "attemptId": "att_90114",
    "examId": "exm_sess_4910",
    "examTitle": "MCA Semester Mock - Trees & BST",
    "submittedAt": "2026-10-11T10:50:00Z",
    "totalQuestions": 10,
    "correctCount": 7,
    "scorePercentage": 70.0,
    "timeTaken": "12m 00s",
    "grade": "B+",
    "topicBreakdown": [
      {
        "topic": "Binary Tree Traversals",
        "total": 3,
        "correct": 3,
        "percentage": 100.0,
        "status": "Strong"
      },
      {
        "topic": "BST Insertion and Deletion",
        "total": 3,
        "correct": 3,
        "percentage": 100.0,
        "status": "Strong"
      },
      {
        "topic": "AVL Trees & Balance Factor",
        "total": 4,
        "correct": 1,
        "percentage": 25.0,
        "status": "Weak"
      }
    ],
    "revisionPlan": [
      {
        "priority": 1,
        "topic": "AVL Trees & Balance Factor",
        "recommendation": "Review left-left and right-left rotation rules. Balance factors must remain in {-1, 0, 1}.",
        "estimatedStudyTime": "25 mins"
      }
    ],
    "detailedQuestions": [
      {
        "id": "eq_2",
        "questionText": "What are the permissible balance factor values for any node in an AVL tree?",
        "topic": "AVL Trees & Balance Factor",
        "selectedOptionId": "b",
        "correctOptionId": "a",
        "isCorrect": false,
        "explanation": "An AVL tree is height-balanced where the difference between heights of left and right subtrees cannot exceed 1. Permissible values are {-1, 0, +1}."
      }
    ]
  }
}
```
