import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Sun,
  Moon,
  LogOut,
  Shield,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { useAuthStore } from '../../../store/authStore';
import { getInitialTheme, applyTheme } from '../../../utils/theme';

export default function AdminTopbar({ onOpenMobile }) {
  const { user, logout, sessionRemaining } = useAuthStore();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(getInitialTheme);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    applyTheme(nextTheme);
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 px-4 sm:px-6 glass-panel bg-[var(--bg-surface)]/80 dark:bg-[#11141B]/90 backdrop-blur-md border-b border-[var(--border-subtle)] flex items-center justify-between sticky top-0 z-20 text-[var(--text-primary)]">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile Sidebar Menu Button */}
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] cursor-pointer"
          aria-label="Open navigation sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative hidden sm:block w-64 md:w-80">
          <Search className="w-4 h-4 text-stone-500 dark:text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search students, topics, doubts..."
            className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-black/5 dark:bg-white/[0.04] border border-stone-300/80 dark:border-white/10 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 focus:outline-none focus:border-orange-500/60 focus:bg-white/80 dark:focus:bg-white/[0.06] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* System Health Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Realtime Telemetry Active</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={handleToggleTheme}
          className="p-2 rounded-xl text-stone-600 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] border border-[var(--border-subtle)] transition-colors cursor-pointer"
          aria-label="Toggle dark/light theme"
          title={theme === 'dark' ? 'Switch to warm light mode (#D6CEC4)' : 'Switch to midnight dark mode (#0B0D12)'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-orange-600" />
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/[0.06] border border-transparent hover:border-[var(--border-subtle)] transition-all cursor-pointer"
            aria-expanded={profileOpen}
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-orange-500/25">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-stone-900 dark:text-white leading-tight">
                {user?.name || 'Admin'}
              </div>
              <div className="text-[10px] text-orange-600 dark:text-orange-400 font-mono font-semibold">
                Administrator
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-stone-500 dark:text-zinc-400 hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel-elevated bg-[#FAF6F2]/95 dark:bg-[#171B24] border border-stone-300/80 dark:border-white/10 shadow-2xl p-2 text-xs space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50 text-[var(--text-primary)]">
              <div className="px-3 py-2 border-b border-[var(--border-subtle)]">
                <div className="font-bold text-stone-900 dark:text-white">{user?.name || 'Admin'}</div>
                <div className="text-[11px] text-stone-600 dark:text-zinc-400 font-mono truncate">{user?.email || 'admin@learnloop.com'}</div>
                <div className="mt-1 text-[10px] text-stone-500 dark:text-zinc-500 font-mono">Session: {sessionRemaining || 'Active'}</div>
              </div>

              <Link
                to="/admin/settings"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-orange-500" />
                <span>Admin Governance</span>
              </Link>

              <Link
                to="/"
                onClick={() => setProfileOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.06] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-orange-500" />
                  <span>Student Workspace</span>
                </span>
                <span className="text-[9px] font-mono text-stone-500 dark:text-zinc-500">Exit Admin</span>
              </Link>

              <div className="pt-1 border-t border-[var(--border-subtle)]">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
