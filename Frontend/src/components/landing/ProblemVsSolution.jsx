import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, Target, Zap } from 'lucide-react';
import { COMPARISON_POINTS } from '../../utils/constants';

export default function ProblemVsSolution() {
  return (
    <section className="py-20 md:py-28 relative bg-stone-300/30 dark:bg-[#070A12] border-y border-stone-400/30 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>The Pedagogical Gap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Why Generic AI Chatbots <span className="text-rose-600 dark:text-rose-400">Fail</span> Students
          </h2>
          <p className="mt-4 text-stone-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            When you ask a standard AI chatbot for code, you get an answer — but you don't know if you actually understand it. You copy, you run it, you think you know it, and then you fail the technical interview or university exam.
          </p>
        </div>

        {/* Side by side comparison cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Left: Typical AI Chatbot Trap */}
          <div className="p-8 rounded-3xl bg-rose-500/10 dark:bg-rose-950/15 border border-rose-500/25 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl -z-10" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <XCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">The Typical AI Chatbot Trap</h3>
                <p className="text-xs text-rose-700 dark:text-rose-300 font-mono">Passive Illusion of Competence</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-stone-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900 dark:text-white">Copy-paste without intuition:</strong> Gives the full code directly, eliminating the cognitive struggle required for long-term memory.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900 dark:text-white">Zero understanding verification:</strong> Never checks whether you understood closures, pointers, or re-renders.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900 dark:text-white">Hallucinated exam preparation:</strong> Questions are arbitrary, out of syllabus, and untimed.</span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900 dark:text-white">No structured recovery:</strong> If you are confused, it just dumps another 500 words of text.</span>
              </li>
            </ul>
          </div>

          {/* Right: The CodeKnot Solution */}
          <div className="p-8 rounded-3xl bg-indigo-500/10 dark:bg-indigo-950/20 border border-indigo-500/30 dark:border-cyan-500/30 relative overflow-hidden group shadow-md shadow-indigo-500/5">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl -z-10" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-900 dark:text-white">The CodeKnot Learning Loop</h3>
                <p className="text-xs text-indigo-700 dark:text-cyan-300 font-mono">Formative Verification + PDF Grounding</p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-stone-700 dark:text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900 dark:text-white">1-Click 'Still Confused?' prompt:</strong> Transforms passive reading into immediate 3-question active recall.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900 dark:text-white">Sub-topic gap diagnostics:</strong> Tells you exactly what you missed (e.g., Object.is shallow vs deep references).</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900 dark:text-white">PDF-grounded timed exams:</strong> Upload course slides or textbook to take realistic timed mock exams with question palettes.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span><strong className="text-stone-900 dark:text-white">Actionable 3-step remediation:</strong> Step-by-step path + 1-click retest until mastery is achieved.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Feature Comparison Matrix Table */}
        <div className="max-w-5xl mx-auto glass-panel rounded-2xl border border-stone-400/30 dark:border-white/10 overflow-hidden shadow-sm">
          <div className="p-4 bg-stone-300/60 dark:bg-slate-900/80 border-b border-stone-400/30 dark:border-white/10 font-bold text-xs uppercase text-stone-600 dark:text-slate-400 tracking-wider flex items-center justify-between">
            <span>Feature Breakdown</span>
            <span>Pedagogical Standard Comparison</span>
          </div>
          <div className="divide-y divide-stone-300/40 dark:divide-white/5">
            {COMPARISON_POINTS.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-3 items-center ${
                  item.highlight ? 'bg-indigo-500/[0.04]' : ''
                }`}
              >
                <div className="md:col-span-3 text-xs sm:text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>{item.feature}</span>
                </div>
                <div className="md:col-span-4 text-xs text-rose-700 dark:text-rose-300/80 flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <span>{item.chatbots}</span>
                </div>
                <div className="md:col-span-5 text-xs text-indigo-900 dark:text-cyan-200 font-medium flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item.codeknot}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
