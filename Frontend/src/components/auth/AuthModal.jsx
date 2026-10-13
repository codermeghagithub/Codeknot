import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  GraduationCap,
  Shield,
  UserCheck,
  Mail,
  Lock,
  User,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Clock,
} from 'lucide-react';
import Logo from '../common/Logo';
import {
  registerUser,
  authenticateUser,
  findUserByEmail,
} from '../../utils/auth';

export default function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  initialRole = 'student',
  initialMode = 'signin',
}) {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [authMode, setAuthMode] = useState(initialMode); // 'signin' | 'signup'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const roleMeta = {
    student: {
      badge: 'Student',
      badgeClass: 'bg-orange-500/15 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30',
      icon: GraduationCap,
    },
    admin: {
      badge: 'Admin',
      badgeClass: 'bg-amber-500/15 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
      icon: Shield,
    },
    mentor: {
      badge: 'Mentor',
      badgeClass: 'bg-purple-500/15 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30',
      icon: UserCheck,
    },
  };

  const currentRoleConfig = roleMeta[selectedRole];

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleModeSwitch = (mode) => {
    setAuthMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (authMode === 'signup' && !formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      if (authMode === 'signup') {
        const existing = findUserByEmail(formData.email);
        if (existing) {
          setErrorMessage(`An account already exists for this email! Switched to Sign In.`);
          setAuthMode('signin');
          setIsLoading(false);
          return;
        }

        const session = registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: selectedRole,
        });

        setSuccessMessage(`Account created! Entering Learn Studio as ${selectedRole}.`);
        setTimeout(() => {
          setIsLoading(false);
          onAuthSuccess(session);
          onClose();
        }, 500);
      } else {
        const existing = findUserByEmail(formData.email);
        if (!existing) {
          setErrorMessage(`No account found for "${formData.email}". Switched to Sign Up to create your account.`);
          setAuthMode('signup');
          setIsLoading(false);
          return;
        }

        const session = authenticateUser({
          email: formData.email,
          password: formData.password,
          role: selectedRole,
        });

        setSuccessMessage(`Welcome back, ${session.user.name}! 24h session active.`);
        setTimeout(() => {
          setIsLoading(false);
          onAuthSuccess(session);
          onClose();
        }, 500);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-md glass-panel-elevated rounded-3xl border border-stone-300/80 dark:border-white/15 shadow-2xl overflow-hidden my-6"
      >
        {/* Top Minimal Bar */}
        <div className="p-5 pb-3 border-b border-stone-200/80 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Logo className="w-5 h-5" textClassName="text-base font-bold" />
            <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${currentRoleConfig.badgeClass}`}>
              {currentRoleConfig.badge}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/70 dark:hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Role Selector (Student / Admin / Mentor) */}
        <div className="px-6 pt-4">
          <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-stone-200/70 dark:bg-white/[0.04] border border-stone-300/60 dark:border-white/5">
            {[
              { id: 'student', label: 'Student', icon: GraduationCap },
              { id: 'admin', label: 'Admin', icon: Shield },
              { id: 'mentor', label: 'Mentor', icon: UserCheck },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = selectedRole === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleRoleChange(tab.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 font-bold'
                      : 'text-stone-700 dark:text-zinc-400 hover:text-stone-950 dark:hover:text-white hover:bg-stone-300/60 dark:hover:bg-white/5'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Title & Don't have an account / Already have an account Switcher (Like Photo 2) */}
        <div className="px-6 pt-5 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
            {authMode === 'signin' ? 'Sign In To Your Account' : 'Sign Up For Your Account'}
          </h2>
          <p className="text-xs text-stone-600 dark:text-zinc-400 mt-1.5 font-medium">
            {authMode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('signup')}
                  className="font-bold text-orange-600 dark:text-orange-400 hover:underline uppercase tracking-wide cursor-pointer ml-1"
                >
                  SIGN UP
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => handleModeSwitch('signin')}
                  className="font-bold text-orange-600 dark:text-orange-400 hover:underline uppercase tracking-wide cursor-pointer ml-1"
                >
                  SIGN IN
                </button>
              </>
            )}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 pt-4 space-y-4">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/30 text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {authMode === 'signup' && (
              <div>
                <label className="text-xs font-semibold text-stone-800 dark:text-zinc-200 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="e.g. Megha De"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 dark:bg-black/40 border border-stone-300/80 dark:border-white/10 text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 text-xs focus:outline-none focus:border-orange-500 transition-colors shadow-xs"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-stone-800 dark:text-zinc-200 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-500 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="name@university.edu or student@codeknot.dev"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 dark:bg-black/40 border border-stone-300/80 dark:border-white/10 text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 text-xs focus:outline-none focus:border-orange-500 transition-colors shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-800 dark:text-zinc-200 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 dark:text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/90 dark:bg-black/40 border border-stone-300/80 dark:border-white/10 text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-zinc-500 text-xs focus:outline-none focus:border-orange-500 transition-colors shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-500 dark:text-zinc-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 24-Hour Session Security Badge */}
            <div className="p-2.5 rounded-xl bg-orange-500/10 dark:bg-orange-950/20 border border-orange-500/25 text-[11px] text-stone-700 dark:text-zinc-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>Session:</span>
              </span>
              <span className="font-mono text-orange-600 dark:text-orange-400 font-bold">
                Automatic sign out after 24 hours
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              {isLoading ? (
                <span className="animate-pulse">Authenticating...</span>
              ) : authMode === 'signup' ? (
                <>
                  <span>Create {currentRoleConfig.badge} Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <span>Sign In as {currentRoleConfig.badge}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
