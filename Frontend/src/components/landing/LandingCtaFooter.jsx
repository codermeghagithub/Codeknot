import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import Logo from '../common/Logo';
import { APP_NAME } from '../../utils/constants';

export default function LandingCtaFooter({ onGetStarted, onEnterStudio }) {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-primary)] transition-colors">
      {/* Final Call to Action */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl border border-stone-400/30 dark:border-white/10 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-56 h-56 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
            Ready to stop guessing and{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 dark:from-orange-500 dark:to-amber-400 bg-clip-text text-transparent">
              actually understand?
            </span>
          </h2>
          <p className="mt-3 text-sm text-stone-700 dark:text-[var(--text-secondary)] max-w-xl mx-auto">
            Try CodeKnot free. Test your mental models in 90 seconds without complex setups.
          </p>

          <div className="mt-7 flex items-center justify-center">
            <button
              onClick={onEnterStudio}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-lg shadow-orange-600/30 transition-all cursor-pointer active:scale-95"
            >
              <Terminal className="w-4 h-4" />
              <span>Open Studio Sandbox</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tiny Minimal Footer */}
      <div className="py-8 border-t border-[var(--border-subtle)] px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <Logo className="w-4 h-4" textClassName="text-sm font-bold" />
            <span>—</span>
            <span className="text-stone-600 dark:text-zinc-400">AI Coding Tutor & Concept Verifier</span>
          </div>

          <div className="flex items-center gap-5 font-medium">
            <a href="#how-it-works" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
              Features
            </a>
            <button onClick={onEnterStudio} className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer">
              Learn Studio
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-pill border border-[var(--border-subtle)] text-xs font-semibold text-stone-700 dark:text-zinc-300 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <span>Enhance your coding skills build logic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
