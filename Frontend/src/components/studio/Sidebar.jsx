import React from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  MessageSquare,
  FileText,
  BarChart2,
  LogOut,
  ChevronRight,
  Shield,
  GraduationCap,
  UserCheck,
  Clock,
  Sparkles,
} from 'lucide-react';
import Logo from '../common/Logo';

export default function Sidebar({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onOpenPdfExam,
  onOpenProfile,
  currentUser,
  sessionRemaining,
  onSignOut,
  onGoHome,
}) {
  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-3.5 h-3.5 text-amber-400" />;
      case 'mentor':
        return <UserCheck className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-orange-400" />;
    }
  };

  return (
    <aside className="w-64 h-full flex flex-col justify-between bg-transparent text-[var(--text-primary)] select-none">
      {/* Top Header */}
      <div className="p-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center justify-between mb-4">
          <div
            onClick={onGoHome}
            className="cursor-pointer hover:opacity-85 transition-opacity"
            title="CodeKnot Home (Click to return to Landing Page)"
          >
            <Logo className="w-5 h-5" textClassName="text-base font-bold" />
          </div>
        </div>

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="glow-orange-btn w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-600/25 transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Doubt / Session</span>
        </button>
      </div>

      {/* Middle Navigation & History */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Quick Tools */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-zinc-500 font-bold">
            Studio Tools
          </div>
          {currentUser?.role === 'admin' && (
            <Link
              to="/admin"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-violet-600/20 border border-violet-500/30 hover:bg-violet-600/30 transition-all text-left"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Admin Console</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-400/20">Portal</span>
            </Link>
          )}
          <button
            onClick={onOpenPdfExam}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-left"
          >
            <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
            <span>PDF Timed Exam</span>
          </button>
          <button
            onClick={onOpenProfile}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-left"
          >
            <BarChart2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>Progress & Mastery</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-zinc-500 font-bold">
            Recent Doubts
          </div>
          {conversations.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <button
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'glass-card border-orange-500/40 text-orange-700 dark:text-orange-300 font-semibold shadow-sm'
                    : 'text-stone-700 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{conv.title}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-orange-500" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Sign Out */}
      <div className="p-3 border-t border-[var(--border-subtle)] glass-panel bg-black/5 dark:bg-black/20">
        <div
          onClick={onOpenProfile}
          className="flex items-center justify-between p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-lg bg-orange-600/20 border border-orange-500/30 flex items-center justify-center font-bold text-xs text-orange-700 dark:text-orange-300 shrink-0">
              {currentUser?.name ? currentUser.name.charAt(0) : "A"}
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-stone-900 dark:text-white truncate">
                {currentUser?.name || "Student"}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-stone-500 dark:text-zinc-400 font-mono">
                {getRoleIcon(currentUser?.role)}
                <span className="capitalize">{currentUser?.role || "student"}</span>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSignOut();
            }}
            title="Sign Out"
            className="p-1.5 rounded-lg text-stone-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* 24-Hour Timer Status */}
        <div className="mt-2 px-2 flex items-center justify-between text-[10px] text-stone-500 dark:text-zinc-500 font-mono">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-orange-600 dark:text-orange-400" /> Session:
          </span>
          <span className="text-orange-600 dark:text-orange-400 font-semibold">{sessionRemaining || "23h 59m"}</span>
        </div>
      </div>
    </aside>
  );
}
