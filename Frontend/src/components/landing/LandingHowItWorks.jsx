import React from 'react';
import { MessageSquareCode, Brain, CheckSquare, Users } from 'lucide-react';

export default function LandingHowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Ask",
      desc: "Submit broken code, runtime stack traces, or conceptual dilemmas in the Studio console.",
      icon: MessageSquareCode,
    },
    {
      num: "02",
      title: "Understand",
      desc: "Receive pedagogic line-by-line intuition, time/space complexity, and clean corrected code.",
      icon: Brain,
    },
    {
      num: "03",
      title: "Test",
      desc: "Take an instant, logic-based diagnostic quiz to assess core understanding and pinpoint specific knowledge gaps.",
      icon: CheckSquare,
    },
    {
      num: "04",
      title: "Mentor",
      desc: "If concepts remain unclear after testing, get instantly matched with an expert mentor for 1-on-1 personalized guidance.",
      icon: Users,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative scroll-mt-20 border-t border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-widest text-orange-500 font-bold block mb-2">
            The Verification Loop
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight">
            How it works
          </h2>
          <p className="mt-3 text-sm text-stone-700 dark:text-[var(--text-secondary)]">
            Four disciplined steps from initial confusion to verified concept retention.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="glass-panel p-6 rounded-2xl border border-[var(--border-subtle)] hover:border-orange-500/40 transition-all duration-300 group shadow-sm"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-stone-500 dark:text-zinc-500 group-hover:text-orange-500 transition-colors">
                    {s.num}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 dark:text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-stone-700 dark:text-[var(--text-secondary)] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
