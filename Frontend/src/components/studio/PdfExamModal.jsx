import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  FileText,
  Clock,
  CheckCircle2,
  Upload,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export default function PdfExamModal({ isOpen, onClose }) {
  const [examStep, setExamStep] = useState('setup'); // 'setup' | 'exam' | 'result'
  const [selectedFile, setSelectedFile] = useState("Operating_Systems_Lecture_Notes.pdf");
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("Medium");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!isOpen) return null;

  const mockQuestions = [
    {
      id: 1,
      q: "What is the primary condition that causes a thread deadlock in resource allocation?",
      opts: ["Circular wait condition", "Context switch preemption", "Paging fragmentation", "Belady's anomaly"],
      correct: 0,
    },
    {
      id: 2,
      q: "Which scheduling algorithm is provably optimal for minimizing average waiting time?",
      opts: ["First-Come First-Served (FCFS)", "Shortest Job Next (SJN)", "Round Robin (RR)", "Priority with Aging"],
      correct: 1,
    },
    {
      id: 3,
      q: "In virtual memory management, what does the Translation Lookaside Buffer (TLB) cache?",
      opts: ["Disk sector addresses", "Virtual-to-physical page table translations", "Instruction cache lines", "CPU register states"],
      correct: 1,
    },
  ];

  const handleStartExam = () => {
    setAnswers({});
    setCurrentQ(0);
    setExamStep('exam');
  };

  const handleSelectOption = (optIdx) => {
    setAnswers((p) => ({ ...p, [currentQ]: optIdx }));
  };

  const handleFinishExam = () => {
    setExamStep('result');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-2xl glass-panel-elevated rounded-3xl border border-stone-300/80 dark:border-white/15 shadow-2xl overflow-hidden my-6"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-stone-200/80 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/15 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">PDF-Grounded Timed Exam Cockpit</h3>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 font-mono">Module B // Zero Hallucinations</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {examStep === 'setup' && (
            <div className="space-y-6">
              {/* PDF Ingestion Area */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-orange-500/40 bg-orange-500/5 dark:bg-orange-950/20 text-center space-y-2">
                <Upload className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto" />
                <div className="text-xs font-bold text-stone-900 dark:text-white">
                  Ingested: <span className="text-orange-600 dark:text-orange-300 font-mono font-semibold">{selectedFile}</span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-zinc-400 font-medium">
                  Document verified & chunked (4.2 MB) • Ready for custom timed exam generation
                </p>
              </div>

              {/* Exam Options */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-900 dark:text-white block mb-1.5">Question Count</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[5, 10, 15].map((cnt) => (
                      <button
                        key={cnt}
                        onClick={() => setQuestionCount(cnt)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          questionCount === cnt
                            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30'
                            : 'bg-stone-200/70 dark:bg-white/5 text-stone-700 dark:text-zinc-300 hover:bg-stone-300/80 dark:hover:bg-white/10 border border-stone-300/80 dark:border-white/10'
                        }`}
                      >
                        {cnt} Qs
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-900 dark:text-white block mb-1.5">Difficulty</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Easy", "Medium", "Hard"].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setDifficulty(lvl)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                          difficulty === lvl
                            ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30'
                            : 'bg-stone-200/70 dark:bg-white/5 text-stone-700 dark:text-zinc-300 hover:bg-stone-300/80 dark:hover:bg-white/10 border border-stone-300/80 dark:border-white/10'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={handleStartExam}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 cursor-pointer"
              >
                <span>Enter Timed Exam Room</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {examStep === 'exam' && (
            <div className="space-y-6">
              {/* Exam Cockpit Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200/80 dark:border-white/10 text-xs">
                <span className="font-mono text-orange-600 dark:text-orange-400 font-bold uppercase">
                  Question {currentQ + 1} of {mockQuestions.length}
                </span>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 font-mono font-bold">
                  <Clock className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 animate-pulse" />
                  <span>14:42 Remaining</span>
                </div>
              </div>

              {/* Question Text */}
              <h4 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white leading-relaxed">
                {mockQuestions[currentQ].q}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {mockQuestions[currentQ].opts.map((opt, oIdx) => {
                  const isChosen = answers[currentQ] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-3.5 rounded-xl text-left text-xs font-medium flex items-center gap-3 transition-all cursor-pointer ${
                        isChosen
                          ? 'bg-orange-500/15 dark:bg-orange-500/20 border-2 border-orange-600 dark:border-orange-500 text-orange-950 dark:text-white shadow-sm font-semibold'
                          : 'bg-white/80 dark:bg-white/[0.03] border border-stone-300/80 dark:border-white/10 text-stone-800 dark:text-zinc-200 hover:bg-stone-100 dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded text-[10px] font-mono flex items-center justify-center ${isChosen ? 'bg-orange-600 text-white font-bold' : 'bg-stone-200/80 dark:bg-white/10 text-stone-700 dark:text-zinc-400 font-bold'}`}>
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-200/80 dark:border-white/10">
                <button
                  onClick={() => setCurrentQ((p) => Math.max(0, p - 1))}
                  disabled={currentQ === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white bg-stone-200/70 dark:bg-white/5 border border-stone-300/60 dark:border-white/5 disabled:opacity-40 cursor-pointer"
                >
                  Previous
                </button>

                {currentQ < mockQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQ((p) => Math.min(mockQuestions.length - 1, p + 1))}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 cursor-pointer shadow-md shadow-orange-600/25"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleFinishExam}
                    className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 cursor-pointer shadow-md shadow-emerald-600/30"
                  >
                    Submit Exam
                  </button>
                )}
              </div>
            </div>
          )}

          {examStep === 'result' && (
            <div className="text-center space-y-5 py-3">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">Exam Completed & Diagnosed</h3>
                <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1">Score: 80% (Excellent) • 100% Document Grounded</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-stone-300/80 dark:border-white/10 text-left text-xs space-y-2">
                <div className="flex justify-between font-bold text-stone-900 dark:text-white">
                  <span>Deadlock Handling</span>
                  <span className="text-emerald-600 dark:text-emerald-400">100% (Strong)</span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 dark:text-white">
                  <span>Memory TLB Cache</span>
                  <span className="text-amber-600 dark:text-amber-400">67% (Moderate)</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setExamStep('setup')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white bg-stone-200/70 dark:bg-white/5 border border-stone-300/60 dark:border-white/5 flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Another PDF Exam</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 cursor-pointer shadow-md shadow-orange-600/25"
                >
                  Return to Studio
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
