import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../../utils/constants';

export default function Testimonials() {
  return (
    <section className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Academic Validation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Trusted by Students & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-cyan-400 dark:to-indigo-300">Endorsed by Faculty</span>
          </h2>
          <p className="mt-4 text-stone-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            See how the 3-question formative assessment loop bridges the chasm between copying answers and true conceptual comprehension.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-stone-400/30 dark:border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-cyan-500/10 transition-all -z-10" />

              <div>
                <Quote className="w-8 h-8 text-indigo-600/30 dark:text-indigo-400/40 mb-4 group-hover:text-cyan-500/60 transition-colors" />
                <p className="text-sm text-stone-800 dark:text-slate-200 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-300/40 dark:border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">{t.name}</h4>
                    <p className="text-xs text-stone-600 dark:text-slate-400">{t.university}</p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 border border-cyan-500/30">
                    {t.course}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.score}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
