import React from 'react';
import { APP_NAME } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-[#CFC6BC] dark:bg-[#05080E] border-t border-stone-400/30 dark:border-white/10 py-10 text-stone-600 dark:text-slate-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#EAE4DC] dark:bg-[#0B0F1A] rounded-[11px] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-indigo-600 dark:text-cyan-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-base font-extrabold text-stone-900 dark:text-white tracking-tight">{APP_NAME}</span>
              <span className="text-stone-600 dark:text-slate-400 text-xs ml-2 hidden sm:inline">
                Untangle Code • Verify Real Mastery • Ace Exams
              </span>
            </div>
          </div>

          {/* Simple Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-stone-700 dark:text-slate-400 font-medium">
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-cyan-300 transition-colors">
              How It Works
            </a>
            <a href="#simulator" className="hover:text-indigo-600 dark:hover:text-cyan-300 transition-colors">
              Live Simulator
            </a>
            <a href="#learning-loop" className="hover:text-indigo-600 dark:hover:text-cyan-300 transition-colors">
              The Learning Loop
            </a>
            <a href="#pdf-exam" className="hover:text-indigo-600 dark:hover:text-cyan-300 transition-colors">
              Exam Engine
            </a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-cyan-300 transition-colors">
              FAQ
            </a>
          </div>

          {/* Clean Copyright */}
          <div className="text-stone-500 dark:text-slate-500 text-[11px]">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
