import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle2 } from 'lucide-react';
import { PERSONAS } from '../../utils/constants';

export default function StudentPersonas() {
  return (
    <section id="personas" className="py-20 md:py-28 relative bg-stone-300/30 dark:bg-[#070A12] border-t border-stone-400/30 dark:border-white/5 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Users className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Target Personas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-cyan-400 dark:to-indigo-400">Real Academic Needs</span>
          </h2>
          <p className="mt-4 text-stone-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            From daily assignment doubt resolution to high-stakes university exam preparation and professor evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PERSONAS.map((p, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-stone-400/30 dark:border-white/10 hover:border-indigo-400/50 transition-all duration-300 relative group flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-300/50 dark:bg-white/5 border border-stone-400/30 dark:border-white/10 text-indigo-700 dark:text-cyan-300 font-semibold">
                    {p.tag}
                  </span>
                  <span className="text-xs text-stone-600 dark:text-slate-400 font-mono">{p.context}</span>
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-base border ${p.avatarColor}`}>
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 dark:text-white">{p.name}</h3>
                    <p className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">{p.role}</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div className="p-3 rounded-xl bg-rose-500/10 dark:bg-rose-950/20 border border-rose-500/25 text-stone-700 dark:text-slate-300">
                    <strong className="text-rose-700 dark:text-rose-300 block mb-1">Pain Point:</strong>
                    {p.painPoint}
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/25 text-stone-700 dark:text-slate-300">
                    <strong className="text-emerald-700 dark:text-emerald-300 block mb-1">CodeKnot Impact:</strong>
                    {p.benefit}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-300/40 dark:border-white/5 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Verified Pedagogical Impact</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
