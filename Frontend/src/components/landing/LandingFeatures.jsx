import React from 'react';
import { HelpCircle, FileText, BarChart3, CheckCircle2 } from 'lucide-react';

export default function LandingFeatures() {
  const features = [
    {
      title: "1-Click Formative Check",
      desc: "Hit 'Still confused?' after any answer to trigger an immediate 3-question diagnostic. Exposes whether you actually understood closures, async loops, or pointers.",
      icon: HelpCircle,
      tag: "Verification Engine",
      highlight: "Stops passive copy-pasting",
    },
    {
      title: "PDF Timed Exam Cockpit",
      desc: "Drag and drop your professor's lecture slides or textbook PDF. Generates realistic timed exams with countdown timers, question palettes, and zero hallucinations.",
      icon: FileText,
      tag: "Document Grounding",
      highlight: "Grounded in your syllabus",
    },
    {
      title: "Knowledge Gap Diagnostics",
      desc: "Maps missed questions directly to core sub-topics. Score below 67% automatically builds a customized 3-step remediation roadmap with 1-click retest validation.",
      icon: BarChart3,
      tag: "Actionable Insights",
      highlight: "Personalized recovery path",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative scroll-mt-20 border-t border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-orange-500 font-bold block mb-2">
            Engineered For Retention
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            Built different from generic chatbots
          </h2>
          <p className="mt-3 text-sm text-stone-700 dark:text-[var(--text-secondary)]">
            Every feature is designed to ensure you retain mental models for interviews and college exams.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-7 rounded-2xl border border-[var(--border-subtle)] hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-300/60 dark:bg-white/5 border border-stone-400/30 dark:border-white/10 text-orange-700 dark:text-orange-400 font-semibold">
                      {f.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 dark:text-white mb-2.5">
                    {f.title}
                  </h3>
                  <p className="text-xs text-stone-700 dark:text-[var(--text-secondary)] leading-relaxed mb-6">
                    {f.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-orange-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{f.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
