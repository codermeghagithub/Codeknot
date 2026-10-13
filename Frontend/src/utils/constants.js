// LearnLoop Global Constants and Editorial Content Specification

export const APP_NAME = "LearnLoop";
export const APP_HEADLINE_MAIN = "Don't just get the answer.";
export const APP_HEADLINE_SERIF = "Actually understand";
export const APP_HEADLINE_END = " it.";
export const APP_HEADLINE = "Don't just get the answer. Actually understand it.";
export const APP_SUBHEADLINE = "Students ask a doubt, prove comprehension with a 3-question check, and close hidden gaps.";

// Design Palette Tokens
export const THEME_COLORS = {
  light: {
    paper: "#F3EEE6",
    paperSecondary: "#E9DFD0",
    ink: "#1B1A17",
    orange: "#F25C05",
    orangeText: "#C74600", // WCAG AA for small text on paper
    border: "rgba(27, 26, 23, 0.12)",
  },
  dark: {
    charcoal: "#14120F",
    charcoalCard: "#1D1A16",
    text: "#F1EBE0",
    orange: "#F25C05",
    border: "rgba(241, 235, 224, 0.12)",
  },
};

// Hero Marquee Topics
export const MARQUEE_TOPICS = [
  "React Reconciliation & Hooks",
  "Python Asyncio Event Loops",
  "FastAPI Dependency Injection",
  "JavaScript Lexical Closures",
  "PostgreSQL Query Indexing",
  "PyTorch Tensor Gradients",
  "Distributed Lock Leases",
  "Binary Search Tree Balancing",
];

// Interactive Demo Loop Script (Client-side simulation)
export const HERO_DEMO_SCRIPT = {
  question: "Why does my useEffect re-render infinitely when fetching user data?",
  userCode: `useEffect(() => {\n  api.getUser().then(setUser);\n}, [user]); // ⚠️ Circular reference`,
  aiAnswer: "Root Cause: setUser() creates a new object reference in memory. React compares prevUser !== nextUser via Object.is, triggering the effect endlessly.",
  aiFixCode: `useEffect(() => {\n  api.getUser().then(setUser);\n}, []); // ✅ Executes once on mount`,
  quizQuestion: "Why does React re-run this effect even with identical user properties?",
  quizOptions: [
    "A. React runs deep recursive field comparison",
    "B. React uses Object.is shallow reference inequality",
    "C. Browser DOM dispatch forces state refresh",
  ],
  correctOption: 1,
  resultScore: "67%",
  resultStatus: "Needs work",
};

export const CHAT_MODES = [
  { id: 'explain', label: 'Explain', desc: 'Line-by-line intuition & visual mental models' },
  { id: 'debug', label: 'Debug', desc: 'Find root causes, fix race conditions & memory traps' },
  { id: 'eli5', label: 'ELI5', desc: 'Simplest real-world analogies with zero jargon' },
  { id: 'interview', label: 'Interview', desc: 'Big-O complexity, edge cases & DSA trade-offs' },
];

export const SUGGESTION_CHIPS = [
  { text: "Why does my React useEffect trigger an infinite re-render loop?", topic: "React Hooks" },
  { text: "Explain Python async/await vs threading with an analogy", topic: "Asynchronous Python" },
  { text: "Debug memory leaks with JavaScript event listeners", topic: "JS Closures & Memory" },
  { text: "How to solve Two Sum with O(n) time and O(n) space?", topic: "Data Structures & Algos" },
];

export const INITIAL_CONVERSATION = {
  id: "conv_default",
  title: "React useEffect Infinite Loop",
  topic: "React Hook Lifecycle & Closures",
  messages: [
    {
      id: "msg_1",
      role: "user",
      content: "Why is my React `useEffect` re-rendering infinitely when I fetch user data and call `setUser(data)` inside?",
      code: `useEffect(() => {\n  api.getUser().then(data => {\n    setUser(data); // ⚠️ Triggers component re-render\n  });\n}, [user]); // ⚠️ Dependency causes circular execution`,
      time: "Just now",
    },
    {
      id: "msg_2",
      role: "assistant",
      mode: "explain",
      content: `Your infinite loop happens because of **reference inequality** in React's reconciliation cycle:\n\n1. When \`setUser(data)\` updates state, React creates a new object reference in memory.\n2. The component re-renders.\n3. React inspects the dependency array \`[user]\` using \`Object.is(prevUser, nextUser)\`.\n4. Because the memory address changed, React assumes dependencies mutated, re-triggering the effect immediately!`,
      code: `// ✅ Recommended Fix: Decouple dependencies or run only on mount\nuseEffect(() => {\n  let isSubscribed = true;\n\n  async function fetchProfile() {\n    try {\n      const data = await api.getUser();\n      if (isSubscribed) setUser(data);\n    } catch (err) {\n      console.error(err);\n    }\n  }\n\n  fetchProfile();\n  return () => { isSubscribed = false; }; // Cleanup prevents race conditions\n}, []); // Empty dependency: executes exactly once on mount`,
      complexity: "Time: O(1) Hook Execution | Space: O(1) Cleanup Closure",
      time: "Just now",
      showVerificationCta: true,
    },
  ],
};

export const SAMPLE_3Q_CHECK = {
  topic: "React Hook Lifecycle & Closures",
  questions: [
    {
      id: 1,
      question: "Why does React trigger useEffect even if `data` contains identical field values as `prevUser`?",
      options: [
        "React performs a recursive deep equality comparison",
        "React compares dependencies using Object.is (reference equality)",
        "Browser DOM events force effect cycles on state dispatch",
      ],
      correctIndex: 1,
      explanation: "React relies on strict reference equality (Object.is). A newly allocated object has a distinct heap address, triggering the dependency check.",
    },
    {
      id: 2,
      question: "If an effect depends only on the user's numeric ID instead of the whole object, what is the best practice?",
      options: [
        "Pass JSON.stringify(user) into the array",
        "Pass only primitive property `user?.id` into the dependency array",
        "Remove the array completely to allow continuous synchronization",
      ],
      correctIndex: 1,
      explanation: "Passing primitive values like user.id avoids re-runs caused by reference mutations, re-executing only when identity truly changes.",
    },
    {
      id: 3,
      question: "What is the primary objective of returning a cleanup callback from an effect?",
      options: [
        "To clear the component Redux store",
        "To cancel unmounted async operations and unsubscribe detached listeners",
        "To force garbage collection in V8 immediately",
      ],
      correctIndex: 1,
      explanation: "Cleanup functions run before re-running the effect or upon unmounting, preventing memory leaks, stale setState calls, and race conditions.",
    },
  ],
};

export const MOCK_USER_PROFILE = {
  name: "Alex Dev",
  email: "alex@learnloop.com",
  role: "student",
  stats: {
    doubtsSolved: 42,
    conceptTestsTaken: 28,
    masteryRate: "78%",
    activeStreakDays: 6,
  },
  topicMastery: [
    { topic: "React Hooks & Reconciliation", percent: 84, level: "Strong" },
    { topic: "Asynchronous JavaScript (Promises & Closures)", percent: 76, level: "Good" },
    { topic: "Data Structures (Binary Trees & HashMaps)", percent: 58, level: "Needs Work" },
  ],
  streakDays: [
    { day: "Mon", active: true },
    { day: "Tue", active: true },
    { day: "Wed", active: true },
    { day: "Thu", active: true },
    { day: "Fri", active: true },
    { day: "Sat", active: true },
    { day: "Sun", active: false },
  ],
  badges: [
    { id: "b1", title: "Loop Pioneer", desc: "First 10 concept checks verified", icon: "Flame" },
    { id: "b2", title: "Bug Hunter", desc: "Fixed 5 race conditions", icon: "Shield" },
    { id: "b3", title: "Exam Ready", desc: "Completed first timed PDF exam", icon: "BookOpen" },
  ],
};
