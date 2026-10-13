import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, ArrowRight, Shield } from 'lucide-react';
import Logo from '../common/Logo';
import { useAuthStore } from '../../store/authStore';

export default function LandingNavbar({ theme, onToggleTheme, onOpenAuth, onEnterStudio }) {
  const { role } = useAuthStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3.5 px-4 sm:px-8 transition-all bg-[var(--bg-primary)]/85 backdrop-blur-md border-b border-[var(--border-subtle)] shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo: clicking stays on Home Page */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer hover:opacity-90 transition-opacity"
          title="CodeKnot Home"
        >
          <Logo />
        </div>

        {/* Clean Center Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-[var(--text-secondary)]">
          <a href="#how-it-works" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            How it works
          </a>
          <a href="#features" className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
            Features
          </a>
          <button
            onClick={onEnterStudio}
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
          >
            Studio Workspace
          </button>
          {role === 'admin' && (
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/20 text-cyan-300 border border-violet-500/40 font-bold hover:bg-violet-500/30 transition-all shadow-xs"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Admin Console</span>
            </Link>
          )}
        </nav>

        {/* Right Actions: Theme Toggle, Create account only (no Login) */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-[var(--text-secondary)] hover:text-stone-900 dark:hover:text-white bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-[var(--border-subtle)] transition-colors cursor-pointer"
            aria-label="Toggle light and dark theme"
            title={theme === 'dark' ? 'Switch to warm light mode (#D6CEC4)' : 'Switch to midnight dark mode (#0B0D12)'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-orange-600" />
            )}
          </button>

          {/* Create Account Primary CTA Only */}
          <button
            onClick={() => onOpenAuth('signup')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-600/30 transition-all cursor-pointer active:scale-95"
          >
            <span>Create account</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
