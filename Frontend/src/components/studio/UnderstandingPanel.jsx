import React, { useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

export default function UnderstandingPanel({
  topic = "React Hook Lifecycle & Closures",
  scorePercent = 67, // e.g. 67% (2/3)
  onLaunchTest,
  learningPath = [
    { id: 1, title: "Master Hook Dependency Arrays & Object.is", time: "12 mins", done: true },
    { id: 2, title: "Interactive Sandbox: Fixing 3 Re-render Traps", time: "18 mins", done: false },
    { id: 3, title: "Verification Retest: React Lifecycle Mastery", time: "6 mins", done: false },
  ],
}) {
  const [steps, setSteps] = useState(learningPath);

  const toggleStep = (id) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  const completedCount = steps.filter((s) => s.done).length;
  const pathProgress = Math.round((completedCount / steps.length) * 100);
  const isMastered = scorePercent >= 67;

  return (
    <aside className="w-80 h-full bg-transparent text-[var(--text-primary)] flex flex-col justify-between overflow-y-auto select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> Understanding Panel
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full glass-pill text-stone-600 dark:text-zinc-400">
            Realtime
          </span>
        </div>

        {/* Detected Topic */}
        <div className="glass-card p-3.5 rounded-xl border border-[var(--border-subtle)]">
          <span className="text-[10px] text-stone-500 dark:text-zinc-400 block font-mono">Detected Topic</span>
          <h4 className="text-xs font-bold text-stone-900 dark:text-white mt-1 truncate">{topic}</h4>
        </div>
      </div>

      {/* Concept Meter Section */}
      <div className="p-4 space-y-4">
        <div className="glass-panel-elevated p-4 rounded-2xl border border-[var(--border-subtle)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 dark:text-white">Concept Meter</span>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                isMastered
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/40'
              }`}
            >
              {isMastered ? 'Understood' : 'Needs Work'}
            </span>
          </div>

          {/* Visual Percentage Bar / Gauge */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600 dark:text-zinc-400">Retention Score</span>
              <span className="font-mono font-extrabold text-orange-600 dark:text-orange-400 text-sm">
                {scorePercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-300/60 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>

          {/* Test Me Button */}
          <button
            onClick={onLaunchTest}
            className="glow-orange-btn w-full mt-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-600/25 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Test Me (3 Questions)</span>
          </button>
        </div>

        {/* Personalized Learning Path */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span className="text-xs font-bold text-stone-900 dark:text-white">Learning Path</span>
            </div>
            <span className="text-[10px] font-mono text-stone-600 dark:text-zinc-400">
              {completedCount}/{steps.length} done
            </span>
          </div>

          <div className="space-y-2">
            {steps.map((st) => (
              <div
                key={st.id}
                onClick={() => toggleStep(st.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                  st.done
                    ? 'glass-card border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    : 'glass-card border-[var(--border-subtle)] text-stone-800 dark:text-zinc-200 hover:border-orange-500/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={st.done}
                  onChange={() => {}}
                  className="mt-0.5 accent-orange-500 rounded cursor-pointer"
                />
                <div className="text-xs space-y-0.5">
                  <div className={`font-medium ${st.done ? 'line-through text-stone-500 dark:text-zinc-400' : 'text-stone-900 dark:text-white'}`}>
                    {st.title}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-stone-500 dark:text-zinc-400 font-mono">
                    <Clock className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                    <span>{st.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[var(--border-subtle)] text-[10px] text-stone-500 dark:text-zinc-500 text-center font-mono">
        Active Concept Verification v1.0
      </div>
    </aside>
  );
}
