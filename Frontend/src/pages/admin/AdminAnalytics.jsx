import React from 'react';
import { TrendingUp, Sparkles } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">Weak-Topic Analytics</h1>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 font-bold">
              Hero Insight
            </span>
          </div>
          <p className="text-xs text-stone-600 dark:text-zinc-400 font-mono mt-1">
            Diagnostic pass rates, failure rates & attention priorities from 3-Q concept checks
          </p>
        </div>
      </div>

      <div className="glass-panel-elevated p-8 rounded-3xl border border-stone-300/80 dark:border-white/10 text-center text-stone-700 dark:text-zinc-300 shadow-xl space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-sm">
          <TrendingUp className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900 dark:text-white">Weak-Topic Analytics Module</h3>
        <p className="text-xs text-stone-600 dark:text-zinc-400 max-w-md mx-auto">
          Pass-rate rankings, failure trend lines, and failing question diagnostics will load here with full charts in Step 4.
        </p>
      </div>
    </div>
  );
}
