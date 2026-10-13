import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  X,
  Award,
  Flame,
  Calendar,
  CheckCircle2,
  Clock,
  BookOpen,
  Shield,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import { MOCK_USER_PROFILE } from '../../utils/constants';

export default function ProfileModal({ isOpen, onClose, currentUser, sessionRemaining }) {
  if (!isOpen) return null;

  const profile = {
    ...MOCK_USER_PROFILE,
    name: currentUser?.name || MOCK_USER_PROFILE.name,
    email: currentUser?.email || MOCK_USER_PROFILE.email,
    role: currentUser?.role || MOCK_USER_PROFILE.role,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-xl glass-panel-elevated rounded-3xl border border-stone-300/80 dark:border-white/15 shadow-2xl overflow-hidden my-6"
      >
        {/* Header */}
        <div className="p-6 pb-4 border-b border-stone-200/80 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-lg font-bold text-white shadow-md shadow-orange-500/30">
              {profile.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-stone-900 dark:text-white">{profile.name}</h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-orange-500/15 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                  {profile.role}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-zinc-400 font-mono">{profile.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-panel p-3.5 rounded-2xl border border-stone-300/80 dark:border-white/5 text-center">
              <span className="text-xl font-black text-stone-900 dark:text-white font-mono">{profile.stats.doubtsSolved}</span>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 mt-0.5">Doubts Solved</p>
            </div>
            <div className="glass-panel p-3.5 rounded-2xl border border-stone-300/80 dark:border-white/5 text-center">
              <span className="text-xl font-black text-stone-900 dark:text-white font-mono">{profile.stats.conceptTestsTaken}</span>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 mt-0.5">Concept Checks</p>
            </div>
            <div className="glass-panel p-3.5 rounded-2xl border border-stone-300/80 dark:border-white/5 text-center">
              <span className="text-xl font-black text-orange-600 dark:text-orange-400 font-mono">{profile.stats.masteryRate}</span>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 mt-0.5">Retention Rate</p>
            </div>
            <div className="glass-panel p-3.5 rounded-2xl border border-stone-300/80 dark:border-white/5 text-center">
              <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                {profile.stats.activeStreakDays}d
              </span>
              <p className="text-[11px] text-stone-600 dark:text-zinc-400 mt-0.5">Active Streak</p>
            </div>
          </div>

          {/* 7-Day Streak Calendar */}
          <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-stone-300/80 dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" /> 7-Day Active Streak
              </span>
              <span className="text-orange-600 dark:text-orange-400 font-mono font-semibold text-[11px]">
                6 of 7 days completed
              </span>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {profile.streakDays.map((d, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-[10px] text-stone-600 dark:text-zinc-400 font-mono">{d.day}</div>
                  <div
                    className={`h-8 rounded-xl flex items-center justify-center transition-all ${
                      d.active
                        ? 'bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-sm'
                        : 'bg-stone-200/70 dark:bg-white/5 text-stone-400 dark:text-zinc-600 border border-stone-300/60 dark:border-white/5'
                    }`}
                  >
                    {d.active ? <CheckCircle2 className="w-4 h-4" /> : '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Mastery Bars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" /> Topic Mastery Breakdown
            </h4>
            <div className="space-y-2.5">
              {profile.topicMastery.map((tm, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/70 dark:bg-white/[0.02] border border-stone-300/80 dark:border-white/10 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-stone-800 dark:text-white">{tm.topic}</span>
                    <span className="font-mono text-orange-600 dark:text-orange-400 font-bold">{tm.percent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                      style={{ width: `${tm.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Earned */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" /> Earned Milestones
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {profile.badges.map((b) => (
                <div key={b.id} className="p-3 rounded-xl bg-orange-500/10 dark:bg-orange-950/20 border border-orange-500/30 space-y-1">
                  <div className="text-xs font-bold text-orange-800 dark:text-orange-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span>{b.title}</span>
                  </div>
                  <p className="text-[11px] text-stone-600 dark:text-zinc-400">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Admin Portal Quick Link for Admin accounts */}
          {profile.role === 'admin' && (
            <Link
              to="/admin"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-cyan-300 bg-gradient-to-r from-violet-600/30 to-cyan-600/20 border border-violet-500/40 hover:bg-violet-600/40 transition-all flex items-center justify-between shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Enter Admin Console</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-300">/admin &rarr;</span>
            </Link>
          )}

          {/* 24-Hour Session Info */}
          <div className="p-3 rounded-xl bg-white/80 dark:bg-black/40 border border-stone-300/80 dark:border-white/5 flex items-center justify-between text-xs">
            <span className="text-stone-600 dark:text-zinc-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" /> Auto-Signout Guard:
            </span>
            <span className="font-mono text-orange-600 dark:text-orange-400 font-bold">{sessionRemaining || "23h 58m"} remaining</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
