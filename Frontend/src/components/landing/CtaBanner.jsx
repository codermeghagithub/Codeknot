import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';

export default function CtaBanner({ onLaunchDemo }) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-600/20 via-cyan-500/20 to-purple-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel-elevated p-8 sm:p-12 md:p-16 rounded-3xl border border-stone-400/40 dark:border-white/20 relative overflow-hidden bg-gradient-to-b from-[#E5DED5]/90 to-[#D6CEC4]/95 dark:from-slate-900/90 dark:to-[#090D16]/95 text-center shadow-xl">
          {/* Subtle grid in card */}
          <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-tight">
              Ready to Stop Guessing and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-600 dark:from-cyan-400 dark:via-indigo-300 dark:to-teal-300">
                Actually Verify Your Code?
              </span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-stone-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Don't wait for a failing grade or a painful technical interview to find out what you missed. Test your mental models in 90 seconds with {APP_NAME}.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onLaunchDemo}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-indigo-500 shadow-xl shadow-cyan-600/20 transition-all cursor-pointer active:scale-98"
              >
                <Terminal className="w-5 h-5 text-cyan-200" />
                <span>Launch Interactive Verification Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm sm:text-base font-semibold text-stone-800 dark:text-slate-300 bg-stone-300/60 dark:bg-white/5 hover:bg-stone-300 dark:hover:bg-white/10 border border-stone-400/40 dark:border-white/10 transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Explore The 4-Step Loop</span>
              </a>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-stone-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Instant client-side mock engine</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>1-Click 3-Question formative diagnostics</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero telemetry or third-party ads</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
