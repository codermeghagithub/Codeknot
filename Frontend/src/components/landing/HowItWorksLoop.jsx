import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareCode, HelpCircle, CheckSquare, GitFork, Zap } from 'lucide-react';
import { WORKFLOW_STEPS } from '../../utils/constants';

export default function HowItWorksLoop() {
  const [activeStep, setActiveStep] = useState(0);

  const stepDetails = [
    {
      icon: MessageSquareCode,
      codePreview: `// Input: Any coding obstacle or error stack trace
const [count, setCount] = useState(0);
// Problem: Why doesn't count update immediately after setCount?`,
      annotation: "CodeKnot analyzes lexical scope, async state dispatching, and re-render cycles instead of giving just a band-aid fix.",
    },
    {
      icon: HelpCircle,
      codePreview: `// Button inside AI Answer:
<Button variant="outline" onClick={triggerConceptVerification}>
  Still confused? Test my understanding
</Button>`,
      annotation: "Never get left wondering. The button triggers instant dynamic test generation on the core principle in < 2 seconds.",
    },
    {
      icon: CheckSquare,
      codePreview: `// 3 Questions targeting the root principle:
Q1: How does React schedule setState batches?
Q2: What is the value of 'count' immediately on the next line?
Q3: How do functional state updaters solve stale closures?`,
      annotation: "Engineered to test mental models. Cannot be solved by blindly copy-pasting the earlier explanation.",
    },
    {
      icon: GitFork,
      codePreview: `// Granular Diagnosis Output:
Score: 1/3 -> Status: Needs Work (< 66%)
Identified Gap: Stale Closure in Async Handlers
Action: 3-Step Action Plan with Practice Exercises + 1-Click Retest`,
      annotation: "Turns failure into an immediate learning roadmap so knowledge gaps are eliminated permanently.",
    },
  ];

  return (
    <section id="learning-loop" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Formative Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            The 4-Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-purple-400">Learning Verification</span> Loop
          </h2>
          <p className="mt-4 text-stone-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Every step is designed by pedagogical engineering principles to guarantee true concept retention, preventing students from falling into passive AI copy-pasting.
          </p>
        </div>

        {/* Step Cards Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {WORKFLOW_STEPS.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive
                    ? 'glass-panel-elevated border-indigo-500/60 ring-2 ring-indigo-500/30 bg-[#E8E1D8] dark:bg-[#0F172A]'
                    : 'glass-panel hover:border-stone-400/50 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-2xl font-black ${
                      isActive ? 'text-indigo-600 dark:text-cyan-400' : 'text-stone-400 dark:text-slate-500'
                    }`}
                  >
                    {s.step}
                  </span>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30'
                        : 'bg-stone-300/60 dark:bg-white/5 text-stone-700 dark:text-slate-400'
                    }`}
                  >
                    {s.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-white mb-1.5 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-slate-400 line-clamp-3">
                  {s.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Showcase Card */}
        <div className="glass-panel-elevated rounded-3xl p-6 sm:p-8 border border-stone-400/30 dark:border-white/10 max-w-4xl mx-auto shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
            >
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-bold">
                  <span>STEP {WORKFLOW_STEPS[activeStep].step} DETAIL</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                  {WORKFLOW_STEPS[activeStep].title}
                </h3>
                <p className="text-sm text-stone-700 dark:text-slate-300 leading-relaxed">
                  {WORKFLOW_STEPS[activeStep].description}
                </p>
                <div className="p-3 rounded-xl bg-cyan-500/10 dark:bg-cyan-950/20 border border-cyan-500/20 text-xs text-stone-800 dark:text-cyan-200">
                  <strong className="text-cyan-700 dark:text-cyan-300">How CodeKnot does it: </strong>
                  {stepDetails[activeStep].annotation}
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl bg-[#141210] dark:bg-black/80 border border-stone-600/30 dark:border-white/10 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-slate-400 text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <span>CodeKnot Runtime Inspector</span>
                    </span>
                    <span>JavaScript (ES2024)</span>
                  </div>
                  <pre className="text-slate-200 leading-relaxed">
                    {stepDetails[activeStep].codePreview}
                  </pre>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
