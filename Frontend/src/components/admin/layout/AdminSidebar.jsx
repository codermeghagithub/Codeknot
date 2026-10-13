import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileCheck2,
  TrendingUp,
  FileText,
  Route,
  FileSpreadsheet,
  Settings,
  X,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import Logo from '../../common/Logo';
import { useAuthStore } from '../../../store/authStore';

const ADMIN_NAV_ITEMS = [
  { path: '/admin', label: 'Overview', icon: LayoutDashboard, exact: true },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/chats', label: 'Chats & Doubts', icon: MessageSquare },
  { path: '/admin/tests', label: 'Tests & Exams', icon: FileCheck2 },
  { path: '/admin/analytics', label: 'Weak-Topic Analytics', icon: TrendingUp, badge: 'Hero' },
  { path: '/admin/pdfs', label: 'PDF Library', icon: FileText },
  { path: '/admin/learning-paths', label: 'Learning Paths', icon: Route },
  { path: '/admin/reports', label: 'Reports', icon: FileSpreadsheet },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminSidebar({ mobileOpen, onCloseMobile }) {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navContent = (
    <div className="flex flex-col h-full glass-panel bg-[var(--bg-surface)]/85 dark:bg-[#11141B]/95 backdrop-blur-xl text-[var(--text-primary)] border-r border-[var(--border-subtle)] select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Link to="/admin" className="flex items-center gap-2 group" onClick={onCloseMobile}>
            <Logo className="w-5 h-5" textClassName="text-base font-bold" />
          </Link>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 font-bold">
            Admin
          </span>
        </div>

        {mobileOpen && (
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-3.5 space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-zinc-500 font-bold">
          Navigation
        </div>

        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-600/20 to-amber-600/10 text-orange-600 dark:text-orange-400 border border-orange-500/40 shadow-sm shadow-orange-500/15 font-bold'
                    : 'text-stone-700 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/[0.04]'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 uppercase font-bold">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Switch to Learner Studio & Sign Out */}
      <div className="p-3.5 border-t border-[var(--border-subtle)] space-y-2">
        <Link
          to="/"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 dark:text-zinc-300 hover:text-stone-950 dark:hover:text-white bg-black/5 dark:bg-white/[0.03] hover:bg-black/10 dark:hover:bg-white/[0.07] border border-[var(--border-subtle)] transition-all group"
          onClick={onCloseMobile}
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <span>Learner Studio</span>
          </span>
          <span className="text-[10px] font-mono text-stone-500 dark:text-zinc-500">Public App</span>
        </Link>

        <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between px-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-orange-500/25">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-stone-900 dark:text-white truncate max-w-[110px]">
                {user?.name || 'Admin'}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-zinc-400 font-mono truncate max-w-[110px]">
                {user?.email || 'admin@learnloop.com'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign out of Admin Console"
            className="p-1.5 rounded-lg text-stone-500 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 h-screen shrink-0 fixed left-0 top-0 z-30">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm">
          <div className="w-72 h-full animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
          <div className="flex-1" onClick={onCloseMobile} />
        </div>
      )}
    </>
  );
}
