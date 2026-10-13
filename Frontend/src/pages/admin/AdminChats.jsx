import React from 'react';
import { MessageSquare } from 'lucide-react';

export default function AdminChats() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-white tracking-tight">Chats & Doubts</h1>
        <p className="text-xs text-stone-600 dark:text-zinc-400 font-mono mt-1">Review student coding conversations & flag incorrect AI responses</p>
      </div>
      <div className="glass-panel-elevated p-8 rounded-3xl border border-stone-300/80 dark:border-white/10 text-center text-stone-700 dark:text-zinc-300 shadow-xl space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto shadow-sm">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900 dark:text-white">Conversations Console</h3>
        <p className="text-xs text-stone-600 dark:text-zinc-400 max-w-md mx-auto">
          Filter by topic/flagged, full conversation drawer with code blocks, and AI response correction.
        </p>
      </div>
    </div>
  );
}
