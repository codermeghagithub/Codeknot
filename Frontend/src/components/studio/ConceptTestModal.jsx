import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertTriangle,
} from 'lucide-react';
import { SAMPLE_3Q_CHECK } from '../../utils/constants';

export default function ConceptTestModal({ isOpen, onClose, onTestCompleted }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const { topic, questions } = SAMPLE_3Q_CHECK;

  const handleSelectOption = (qIdx, optIdx) => {
    if (submitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  const calculateScore = () => {
    let sc = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) sc++;
    });
    return sc;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const sc = calculateScore();
    const percent = Math.round((sc / questions.length) * 100);

    if (sc >= 2) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F97316', '#F59E0B', '#10B981'],
        });
      } catch (e) {}
    }

    if (onTestCompleted) {
      onTestCompleted(percent);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setCurrentIdx(0);
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === questions.length;
  const isMastered = score >= 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-lg glass-panel-elevated rounded-3xl border border-stone-300/80 dark:border-white/15 shadow-2xl overflow-hidden my-6"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200/80 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/15 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">3-Question Concept Check</h3>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 font-mono">{topic}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {!submitted ? (
            /* Active Question State */
            <div className="space-y-5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-orange-600 dark:text-orange-400 font-semibold uppercase tracking-wider">
                  Question {currentIdx + 1} of {questions.length}
                </span>

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5">
                  {questions.map((q, idx) => (
                    <div
                      key={q.id}
                      className={`w-6 h-6 rounded-md text-xs font-mono flex items-center justify-center transition-all ${
                        currentIdx === idx
                          ? 'bg-orange-600 text-white font-bold shadow-xs'
                          : userAnswers[idx] !== undefined
                          ? 'bg-orange-500/15 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-500/30'
                          : 'bg-stone-200/70 dark:bg-white/5 text-stone-600 dark:text-zinc-500 border border-stone-300/60 dark:border-white/5'
                      }`}
                    >
                      {idx + 1}
                    </div>
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <h4 className="text-sm font-bold text-stone-900 dark:text-white leading-relaxed">
                {questions[currentIdx].question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {questions[currentIdx].options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentIdx, optIdx)}
                      className={`w-full p-3 rounded-xl text-left text-xs font-medium transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-orange-500/15 dark:bg-orange-500/20 border-2 border-orange-600 dark:border-orange-500 text-orange-950 dark:text-white shadow-sm font-semibold'
                          : 'bg-white/80 dark:bg-white/[0.03] border border-stone-300/80 dark:border-white/10 text-stone-800 dark:text-zinc-200 hover:bg-stone-100 dark:hover:bg-white/[0.07]'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-orange-600 text-white font-bold' : 'bg-stone-200/80 dark:bg-white/10 text-stone-700 dark:text-zinc-400 font-bold'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setCurrentIdx((p) => Math.max(0, p - 1))}
                  disabled={currentIdx === 0}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white bg-stone-200/70 dark:bg-white/5 border border-stone-300/60 dark:border-white/5 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx((p) => Math.min(questions.length - 1, p + 1))}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 flex items-center gap-1.5 cursor-pointer shadow-md shadow-orange-600/25"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!allAnswered}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 disabled:opacity-40 cursor-pointer flex items-center gap-1.5 shadow-md shadow-orange-600/30"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit & Verify</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results State */
            <div className="space-y-5">
              <div
                className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
                  isMastered
                    ? 'bg-emerald-500/10 dark:bg-emerald-950/40 border-emerald-500/30 dark:border-emerald-500/40'
                    : 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-500/30 dark:border-amber-500/40'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    isMastered
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}
                >
                  {isMastered ? <CheckCircle2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        isMastered
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {isMastered ? 'Concept Understood' : 'Needs Work'}
                    </span>
                    <span className="text-xs text-stone-600 dark:text-zinc-400 font-mono">
                      Score: {score}/3 ({Math.round((score / 3) * 100)}%)
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white mt-1">
                    {isMastered
                      ? 'Verified Intuition! Mental model locked in.'
                      : 'Knowledge Gap Detected in Dependency Synchronization'}
                  </h4>
                </div>
              </div>

              {/* Explanations */}
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const isCorrect = userAnswers[idx] === q.correctIndex;
                  return (
                    <div key={q.id} className="p-3 rounded-xl bg-white/80 dark:bg-black/40 border border-stone-300/80 dark:border-white/5 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900 dark:text-white">Q{idx + 1}: {q.question.slice(0, 45)}...</span>
                        {isCorrect ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Correct
                          </span>
                        ) : (
                          <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Missed
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-zinc-400">{q.explanation}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200/80 dark:border-white/10">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white bg-stone-200/70 dark:bg-white/5 border border-stone-300/60 dark:border-white/5 flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Check</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 cursor-pointer shadow-md shadow-orange-600/25"
                >
                  Done (Apply to Studio)
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
