import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Terminal,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  BookOpen,
  Clock,
  Code2,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { SAMPLE_SIMULATION_DOUBT } from '../../utils/constants';

export default function InteractiveVerificationSimulator() {
  const [activeTab, setActiveTab] = useState('explanation'); // 'explanation' | 'test' | 'result'
  const [copied, setCopied] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { 0: optionIndex, 1: optionIndex, 2: optionIndex }
  const [testSubmitted, setTestSubmitted] = useState(false);

  const { userQuery, userCode, aiExplanation, conceptQuestions, learningPathPreview } = SAMPLE_SIMULATION_DOUBT;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(aiExplanation.correctedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectOption = (questionIndex, optionIndex) => {
    if (testSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    conceptQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
    setActiveTab('result');
    const score = calculateScore();
    if (score >= 2) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#06b6d4', '#10b981'],
        });
      } catch (e) {
        // fallback if canvas-confetti is not loaded in this environment
      }
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setTestSubmitted(false);
    setActiveTab('explanation');
  };

  const score = calculateScore();
  const isMastered = score >= 2;
  const allAnswered = Object.keys(userAnswers).length === conceptQuestions.length;

  return (
    <section id="simulator" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Live Interactive Module</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-cyan-400 dark:to-indigo-400">Concept Verification</span> Loop
          </h2>
          <p className="mt-4 text-stone-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            See how CodeKnot takes a confusing coding problem, provides a pedagogical explanation, and challenges you with a 3-question formative test to guarantee you actually understand.
          </p>
        </div>

        {/* Interactive Shell / Container */}
        <div className="glass-panel-elevated rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-[#0B0F1A]/90 max-w-5xl mx-auto">
          {/* Top Bar / Header of Simulator */}
          <div className="px-5 py-3.5 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1 pl-2 border-l border-white/10">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                <span>CodeKnot Simulator // Doubt-to-Verify-Loop</span>
              </span>
            </div>

            {/* Stepper Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/5 text-xs">
              <button
                onClick={() => setActiveTab('explanation')}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'explanation'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. AI Answer & Code
              </button>
              <button
                onClick={() => setActiveTab('test')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 cursor-pointer ${
                  activeTab === 'test'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3 h-3 text-cyan-400" />
                <span>2. 3-Question Test</span>
                {allAnswered && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                )}
              </button>
              <button
                onClick={() => {
                  if (testSubmitted) setActiveTab('result');
                }}
                disabled={!testSubmitted}
                className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  activeTab === 'result'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 cursor-not-allowed'
                }`}
              >
                3. Result & Path
              </button>
            </div>
          </div>

          {/* Main Simulator Body */}
          <div className="p-6 md:p-8 min-h-[480px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: EXPLANATION VIEW */}
              {activeTab === 'explanation' && (
                <motion.div
                  key="explanation"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* User Question */}
                  <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      <span>Student Doubt Query</span>
                    </div>
                    <p className="text-white font-medium text-base sm:text-lg">
                      "{userQuery}"
                    </p>
                    <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-rose-300 overflow-x-auto">
                      <pre>{userCode}</pre>
                    </div>
                  </div>

                  {/* AI Pedagogical Answer */}
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                        <Sparkles className="w-4 h-4 text-cyan-300" />
                        <span>CodeKnot Pedagogical Analysis</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {aiExplanation.complexity.time}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {aiExplanation.complexity.space}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-200 flex items-start gap-2.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-amber-300">Root Cause: </strong>
                        {aiExplanation.rootCause}
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {aiExplanation.summary}
                    </p>

                    {/* Corrected Code Block with Copy */}
                    <div className="relative rounded-xl bg-black/60 border border-white/10 p-4 font-mono text-xs text-emerald-300 overflow-x-auto">
                      <div className="absolute top-2.5 right-2.5">
                        <button
                          onClick={handleCopyCode}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] transition-colors cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-2">
                        Corrected Implementation (Idempotent Hook)
                      </div>
                      <pre className="text-emerald-300/90 leading-relaxed">
                        {aiExplanation.correctedCode}
                      </pre>
                    </div>
                  </div>

                  {/* Core Innovation Callout: "Still Confused?" Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-900/30 via-cyan-900/20 to-purple-900/20 border border-indigo-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-5 h-5 text-cyan-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Did you actually understand the concept?
                        </h4>
                        <p className="text-xs text-slate-300">
                          Don't just copy the snippet. Verify with our 1-click 3-question formative test.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('test')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
                    >
                      <span>Still Confused? Test My Understanding</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: 3-QUESTION CONCEPT TEST */}
              {activeTab === 'test' && (
                <motion.div
                  key="test"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Test Progress Banner */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
                        Formative Diagnostic: Question {currentQuestionIndex + 1} of {conceptQuestions.length}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {conceptQuestions[currentQuestionIndex].subTopic}
                      </span>
                    </div>

                    {/* Progress indicators (1, 2, 3) */}
                    <div className="flex items-center gap-2">
                      {conceptQuestions.map((q, idx) => (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`w-7 h-7 rounded-lg text-xs font-mono font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            currentQuestionIndex === idx
                              ? 'bg-cyan-500 text-slate-950 ring-2 ring-cyan-300'
                              : userAnswers[idx] !== undefined
                              ? 'bg-indigo-600/40 text-indigo-300 border border-indigo-400/40'
                              : 'bg-white/5 text-slate-400 hover:bg-white/10'
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Question Card */}
                  <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 space-y-6">
                    <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {conceptQuestions[currentQuestionIndex].question}
                    </h3>

                    {/* Options list */}
                    <div className="grid grid-cols-1 gap-3">
                      {conceptQuestions[currentQuestionIndex].options.map((option, optIdx) => {
                        const isSelected = userAnswers[currentQuestionIndex] === optIdx;
                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(currentQuestionIndex, optIdx)}
                            className={`p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600/30 border-2 border-indigo-400 text-white shadow-md shadow-indigo-600/20'
                                : 'bg-white/[0.03] border border-white/10 text-slate-300 hover:bg-white/[0.07] hover:border-white/20'
                            }`}
                          >
                            <span
                              className={`w-5 h-5 rounded-md text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected
                                  ? 'bg-indigo-400 text-slate-950 font-bold'
                                  : 'bg-white/10 text-slate-300'
                              }`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-relaxed">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Nav & Submit bar */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() =>
                        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
                      }
                      disabled={currentQuestionIndex === 0}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                    >
                      Previous Question
                    </button>

                    <div className="flex items-center gap-3">
                      {currentQuestionIndex < conceptQuestions.length - 1 ? (
                        <button
                          onClick={() =>
                            setCurrentQuestionIndex((prev) =>
                              Math.min(conceptQuestions.length - 1, prev + 1)
                            )
                          }
                          className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Next Question</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button
                          onClick={handleSubmitTest}
                          disabled={!allAnswered}
                          className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Submit & Verify Understanding</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {!allAnswered && (
                    <p className="text-center text-[11px] text-slate-500 font-mono">
                      Answer all 3 questions to unlock instant conceptual diagnosis.
                    </p>
                  )}
                </motion.div>
              )}

              {/* TAB 3: RESULT & REMEDIATION PATH */}
              {activeTab === 'result' && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Status Banner */}
                  <div
                    className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                      isMastered
                        ? 'bg-emerald-950/40 border-emerald-500/30'
                        : 'bg-amber-950/40 border-amber-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-4 text-center sm:text-left">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                          isMastered
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {isMastered ? (
                          <CheckCircle2 className="w-8 h-8" />
                        ) : (
                          <AlertTriangle className="w-8 h-8" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-center sm:justify-start gap-2">
                          <span
                            className={`text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full ${
                              isMastered
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-amber-500/20 text-amber-300'
                            }`}
                          >
                            {isMastered ? 'Concept Understood (>= 66%)' : 'Needs Work (< 66%)'}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">
                            Score: {score}/3 ({Math.round((score / 3) * 100)}%)
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-white mt-1">
                          {isMastered
                            ? 'Excellent Intuition! You truly understood this topic.'
                            : 'Knowledge Gap Identified: React Dependency Reconciliation'}
                        </h4>
                      </div>
                    </div>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Retake Simulation</span>
                    </button>
                  </div>

                  {/* Question-by-question breakdown */}
                  <div className="space-y-3">
                    <h5 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                      Itemized Question Diagnostics
                    </h5>
                    {conceptQuestions.map((q, idx) => {
                      const userPick = userAnswers[idx];
                      const isCorrect = userPick === q.correctIndex;
                      return (
                        <div
                          key={q.id}
                          className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-2 text-xs"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-slate-200 font-medium">
                              {idx + 1}. {q.question}
                            </span>
                            {isCorrect ? (
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-rose-400 font-semibold shrink-0">
                                <XCircle className="w-3.5 h-3.5" /> Incorrect
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/5">
                            <strong className="text-slate-300">Explanation: </strong>
                            {q.explanation}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Remediation Learning Path Preview */}
                  <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-cyan-400" />
                        <h5 className="text-sm font-bold text-white">
                          Tailored 3-Step Remediation Path
                        </h5>
                      </div>
                      <span className="text-xs text-indigo-300 font-mono">
                        Estimated: 36 mins total
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {learningPathPreview.map((item) => (
                        <div
                          key={item.step}
                          className="p-3.5 rounded-xl bg-slate-900/80 border border-white/10 hover:border-cyan-500/40 transition-colors space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono text-cyan-400 font-bold">
                              Step 0{item.step}
                            </span>
                            <span className="text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {item.duration}
                            </span>
                          </div>
                          <h6 className="text-xs font-bold text-white line-clamp-1">
                            {item.title}
                          </h6>
                          <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
