import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, CheckCircle2, HelpCircle, Activity } from 'lucide-react';
import { APP_HEADLINE, APP_SUBHEADLINE } from '../../utils/constants';

export default function LandingHero({ onGetStarted, onExploreStudio }) {
  // Steps for auto-playing preview:
  // 0: Question -> 1: Answer -> 2: 3-Question Check -> 3: Understanding 67%
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const previewSteps = [
    {
      id: 0,
      label: "1. Question",
      content: (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            <span>Student Input // React Hook Doubt</span>
          </div>
          <p className="text-sm font-medium text-stone-900 dark:text-white">
            "Why is my <code className="text-orange-600 dark:text-orange-300 bg-orange-500/10 dark:bg-orange-950/40 px-1.5 py-0.5 rounded font-mono">useEffect</code> re-rendering infinitely when I call <code className="text-orange-600 dark:text-orange-300 bg-orange-500/10 dark:bg-orange-950/40 px-1.5 py-0.5 rounded font-mono">setUser(data)</code>?"
          </p>
          <div className="p-3 rounded-xl bg-[#141417] dark:bg-black/80 border border-stone-700/40 dark:border-white/10 font-mono text-xs text-rose-300">
            <code>useEffect(() =&gt; &#123; api.getUser().then(setUser); &#125;, [user]);</code>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      label: "2. Answer",
      content: (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> CodeKnot Pedagogical Breakdown
            </span>
            <span className="text-stone-500 dark:text-white/60">O(1) execution</span>
          </div>
          <p className="text-xs text-stone-700 dark:text-zinc-300 leading-relaxed">
            <strong className="text-stone-900 dark:text-white">Root Cause:</strong> Calling <code className="text-orange-600 dark:text-orange-300 font-mono">setUser()</code> allocates a new object reference. React compares <code className="text-orange-600 dark:text-orange-300 font-mono">prevUser !== nextUser</code> with <code className="text-orange-600 dark:text-orange-300 font-mono">Object.is</code>, re-triggering the effect endlessly.
          </p>
          <div className="p-2.5 rounded-xl bg-[#141417] dark:bg-black/80 border border-stone-700/40 dark:border-white/10 font-mono text-xs text-emerald-400">
            <code>useEffect(() =&gt; &#123; ... &#125;, []); // Runs only once on mount</code>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      label: "3. 3-Question Check",
      content: (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" /> Concept Verification (3 MCQs)
            </span>
            <span className="text-xs text-stone-500 dark:text-zinc-400">Question 2 of 3</span>
          </div>
          <p className="text-xs font-semibold text-stone-900 dark:text-white">
            "Why does React re-run effects even if object properties didn't change?"
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-stone-400/30 dark:border-white/10 text-stone-600 dark:text-zinc-400">
              A. React does a deep recursive property comparison
            </div>
            <div className="p-2 rounded-lg bg-orange-500/20 border border-orange-500/50 text-orange-700 dark:text-orange-200 font-medium flex items-center justify-between">
              <span>B. React uses Object.is shallow reference equality</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      label: "4. Understanding 67%",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold">
              Formative Diagnosis
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
              Score: 2/3 (67%)
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-orange-500/10 dark:bg-orange-950/30 border border-orange-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <span>Understanding: 67%</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono font-semibold">Needs Work</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-300">
                Weak Area: React Hook Reference Equality & Closures
              </p>
            </div>
          </div>
          <div className="text-[11px] text-stone-500 dark:text-zinc-400 font-mono">
            &gt; Auto-generated 3-step learning path ready in Studio
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-subtle-grid">
      {/* Background warm flame glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] bg-gradient-to-tr from-orange-600/15 via-amber-500/10 to-rose-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Bold Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-stone-900 dark:text-white leading-[1.12] max-w-4xl mx-auto"
        >
          Don't just get the answer.{' '}
          <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 dark:from-orange-500 dark:via-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
            Actually understand it.
          </span>
        </motion.h1>

        {/* One-line subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-6 text-base sm:text-lg text-stone-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          {APP_SUBHEADLINE}
        </motion.p>

        {/* 2 CTAs: Create Account Free & Explore Studio Workspace */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/25 transition-all cursor-pointer active:scale-95"
          >
            <span>Create Account Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreStudio}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-stone-900 dark:text-white glass-panel-elevated hover:bg-white/95 dark:hover:bg-white/10 hover:border-orange-500/50 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group active:scale-95"
          >
            <Terminal className="w-4 h-4 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform" />
            <span>Explore Studio Workspace</span>
          </button>
        </motion.div>

        {/* Auto-playing Mock Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-16 max-w-2xl mx-auto glass-panel-elevated rounded-2xl border border-stone-400/40 dark:border-white/10 overflow-hidden shadow-xl text-left"
        >
          {/* Mock Window Header */}
          <div className="px-4 py-3 bg-stone-300/60 dark:bg-black/40 border-b border-stone-400/30 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-mono text-stone-600 dark:text-zinc-400 ml-2">
                CodeKnot Studio
              </span>
            </div>

            {/* Stepper dots */}
            <div className="flex items-center gap-1.5">
              {previewSteps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${activeStep === step.id
                      ? 'bg-orange-600 text-white font-bold'
                      : 'text-stone-500 dark:text-zinc-500 hover:text-stone-800 dark:hover:text-zinc-300'
                    }`}
                >
                  {step.id + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper Content */}
          <div className="p-5 sm:p-6 min-h-[190px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {previewSteps[activeStep].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
