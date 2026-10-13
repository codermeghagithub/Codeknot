import React from 'react';
import { motion } from 'framer-motion';
import {
  HelpCircle,
  FileText,
  Clock,
  Sparkles,
  GitBranch,
  Server,
  Layers,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { BENTO_FEATURES } from '../../utils/constants';

export default function BentoFeatures() {
  const icons = {
    'verification-loop': HelpCircle,
    'pdf-engine': FileText,
    'timed-cockpit': Clock,
    'gap-analytics': GitBranch,
    'remediation-paths': Sparkles,
    'fastapi-ready': Server,
  };

  return (
    <section id="features" className="py-20 md:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Platform Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-600 dark:from-indigo-400 dark:via-cyan-300 dark:to-teal-300">Cognitive Retention</span>
          </h2>
          <p className="mt-4 text-stone-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Every layer of CodeKnot is purpose-built to break the passive consumption habit and enforce verifiable coding mastery.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {BENTO_FEATURES.map((f) => {
            const Icon = icons[f.id] || Sparkles;
            return (
              <div
                key={f.id}
                className={`${f.colSpan} glass-panel p-6 sm:p-8 rounded-3xl border border-stone-400/30 dark:border-white/10 hover:border-indigo-500/40 transition-all duration-300 relative group overflow-hidden flex flex-col justify-between shadow-sm`}
              >
                <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition-all -z-10" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-700 dark:text-cyan-300 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-stone-300/50 dark:bg-white/5 border border-stone-400/30 dark:border-white/10 text-stone-700 dark:text-slate-300">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-xs font-mono text-indigo-700 dark:text-indigo-300 mb-3 font-semibold">
                    {f.tagline}
                  </p>
                  <p className="text-sm text-stone-700 dark:text-slate-300 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-300/40 dark:border-white/5 flex items-center text-xs font-semibold text-indigo-700 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
