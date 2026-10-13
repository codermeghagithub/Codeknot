import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Brain, Terminal } from 'lucide-react';
import { APP_NAME, HERO_STATS } from '../../utils/constants';

export default function Hero({ onExploreLoop, onOpenSimulator }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-grid-mesh">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] md:w-[900px] md:h-[500px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Headline (Clean & High-Impact) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-white leading-[1.12]"
          >
            Untangle Code.{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-teal-300 bg-clip-text text-transparent">
              Verify Real Mastery.
            </span>{' '}
            Ace College Exams.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-stone-700 dark:text-slate-300 max-w-3xl leading-relaxed"
          >
            Stop copying AI solutions blindly. <strong className="text-stone-900 dark:text-white font-semibold">{APP_NAME}</strong> resolves your coding doubts with line-by-line intuition, and immediately challenges you with a <span className="text-indigo-600 dark:text-cyan-300 font-semibold">1-click 3-question formative test</span> to expose your hidden knowledge gaps before exams do.
          </motion.p>

          {/* Primary & Secondary Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onOpenSimulator}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all duration-200 shadow-xl shadow-indigo-600/25 hover:shadow-cyan-500/20 active:scale-98 cursor-pointer"
            >
              <Terminal className="w-5 h-5 text-cyan-200" />
              <span>Try Live Doubt & Test Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreLoop}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-stone-800 dark:text-slate-200 bg-stone-300/50 dark:bg-slate-800/80 hover:bg-stone-300 dark:hover:bg-slate-800 hover:text-stone-950 dark:hover:text-white border border-stone-400/40 dark:border-white/10 transition-all duration-200 active:scale-98 cursor-pointer backdrop-blur-sm"
            >
              <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>See The 4-Step Loop</span>
            </button>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-stone-600 dark:text-slate-400"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>No credit card or setup needed</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Grounds exams in uploaded course PDFs</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Instant client-side evaluation engine</span>
            </span>
          </motion.div>
        </div>

        {/* Hero Stats Card Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {HERO_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-2xl hover:border-indigo-500/40 transition-all duration-300 relative overflow-hidden group text-center shadow-sm"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight font-sans">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-stone-500 dark:text-slate-400 mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
