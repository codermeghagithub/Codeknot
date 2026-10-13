import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Clock,
  CheckCircle,
  Flag,
  Upload,
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { PDF_EXAM_PREVIEW_QUESTIONS } from '../../utils/constants';

export default function PdfExamShowcase() {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeTab, setActiveTab] = useState('exam-room'); // 'upload' | 'exam-room' | 'diagnostic'

  const currentQ = PDF_EXAM_PREVIEW_QUESTIONS[selectedQuestion];

  return (
    <section id="pdf-exam" className="py-20 md:py-28 relative bg-stone-300/30 dark:bg-[#070A12] border-t border-stone-400/30 dark:border-white/5 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Document Ingestion & Testing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Turn Any Textbook PDF into a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-cyan-400 dark:to-indigo-400">Timed Exam Cockpit</span>
          </h2>
          <p className="mt-4 text-stone-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Upload your lecture slides, university syllabus, or 200-page textbook PDF (up to 10MB). CodeKnot grounds questions strictly in your documents — eliminating AI hallucinations and simulating proctored university exams.
          </p>
        </div>

        {/* Feature Demonstration Shell */}
        <div className="glass-panel-elevated rounded-3xl border border-white/10 overflow-hidden max-w-5xl mx-auto bg-slate-950/80 shadow-2xl">
          {/* Top Control Bar */}
          <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Data_Structures_Lecture_Notes.pdf</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">4.8 MB</span>
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">Status: Ingested & Grounded • 15 Questions Configured</p>
              </div>
            </div>

            {/* View Switchers */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('exam-room')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'exam-room' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Timed Exam Cockpit
              </button>
              <button
                onClick={() => setActiveTab('diagnostic')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'diagnostic' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Topic Mastery Diagnostic
              </button>
            </div>
          </div>

          {/* Exam Cockpit Body */}
          {activeTab === 'exam-room' && (
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Question & Options Area */}
              <div className="lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Question 0{selectedQuestion + 1} of 0{PDF_EXAM_PREVIEW_QUESTIONS.length}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300">
                    <Clock className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                    <span className="font-bold">14:38 Remaining</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/90 border border-white/10 space-y-4">
                  <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300">
                    Topic: {currentQ.topic}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {currentQ.text}
                  </h3>

                  <div className="space-y-2.5 pt-2">
                    {currentQ.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-3 border ${
                          oIdx === currentQ.correctIndex && currentQ.status === 'answered'
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                            : 'bg-white/[0.03] border-white/5 text-slate-300'
                        }`}
                      >
                        <span className="w-5 h-5 rounded bg-white/10 text-slate-300 text-[10px] font-mono flex items-center justify-center">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <Flag className="w-3.5 h-3.5" /> Marked for review available
                  </span>
                  <span>Auto-submission safe on timer expiration</span>
                </div>
              </div>

              {/* Question Navigation Palette */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-5">
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                    Question Palette Navigator
                  </h5>
                  <p className="text-[11px] text-slate-400">Click any number to jump instantly</p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {PDF_EXAM_PREVIEW_QUESTIONS.map((q, idx) => {
                    const isSelected = selectedQuestion === idx;
                    let badgeColor = 'bg-white/5 border-white/10 text-slate-400';
                    if (q.status === 'answered') badgeColor = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
                    if (q.status === 'flagged') badgeColor = 'bg-amber-500/20 border-amber-500/40 text-amber-300';

                    return (
                      <button
                        key={q.id}
                        onClick={() => setSelectedQuestion(idx)}
                        className={`h-10 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${badgeColor} ${
                          isSelected ? 'ring-2 ring-cyan-400 shadow-md scale-105' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="pt-3 border-t border-white/10 space-y-2 text-[11px] text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Answered
                    </span>
                    <span className="font-mono text-white">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Marked for Review
                    </span>
                    <span className="font-mono text-white">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-600" /> Unanswered
                    </span>
                    <span className="font-mono text-white">1</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Diagnostic View */}
          {activeTab === 'diagnostic' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Overall Performance: 80% (Excellent)
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1.5">
                    Exam Performance Breakdown & Revision Blueprint
                  </h4>
                  <p className="text-xs text-slate-300">
                    Thresholds match PRD RES-2: &gt;=80% Excellent, 60-79% Good, 40-59% Needs Work, &lt;40% Re-study.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold text-white font-mono">12 / 15</span>
                  <p className="text-xs text-emerald-400 font-medium">80.0% Correct</p>
                </div>
              </div>

              {/* Topic Mastery Bars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Binary Search Trees</span>
                    <span className="text-emerald-400 font-mono font-bold">100% (Strong)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                  <p className="text-[11px] text-slate-400">Mastery confirmed on tree rotations and balancing.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Dynamic Programming</span>
                    <span className="text-amber-400 font-mono font-bold">66% (Moderate)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '66%' }} />
                  </div>
                  <p className="text-[11px] text-slate-400">Revise overlapping subproblems memoization tables.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">Graph Traversal BFS</span>
                    <span className="text-rose-400 font-mono font-bold">40% (Weak)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                  <p className="text-[11px] text-slate-400">Flagged for targeted 20-min revision roadmap.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
