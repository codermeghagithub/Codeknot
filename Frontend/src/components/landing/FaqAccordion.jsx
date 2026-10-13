import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS } from '../../utils/constants';

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 relative bg-stone-300/30 dark:bg-[#070A12] border-t border-stone-400/30 dark:border-white/5 scroll-mt-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Frequently Answered Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Got Questions? <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-cyan-400 dark:to-indigo-400">We've Got Answers</span>
          </h2>
          <p className="mt-4 text-stone-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Everything you need to know about CodeKnot's formative diagnostic engine, PDF exam room, and project architecture.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-panel rounded-2xl border border-stone-400/30 dark:border-white/10 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-300/30 dark:hover:bg-white/[0.02]"
                >
                  <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-snug">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-stone-300/50 dark:bg-white/5 border border-stone-400/40 dark:border-white/10 flex items-center justify-center shrink-0 text-stone-700 dark:text-slate-300">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm text-stone-700 dark:text-slate-300 leading-relaxed border-t border-stone-300/40 dark:border-white/5 pt-4">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
