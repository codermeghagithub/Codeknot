import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LandingNavbar from './components/landing/LandingNavbar';
import LandingHero from './components/landing/LandingHero';
import LandingHowItWorks from './components/landing/LandingHowItWorks';
import LandingFeatures from './components/landing/LandingFeatures';
import LandingCtaFooter from './components/landing/LandingCtaFooter';
import StudioWorkspace from './components/studio/StudioWorkspace';
import AuthModal from './components/auth/AuthModal';
import { getInitialTheme, applyTheme } from './utils/theme';
import { useAuthStore } from './store/authStore';
import AdminRoute from './components/admin/layout/AdminRoute';

// Lazy-load Admin section pages so student users never download admin code
const AdminLayout = lazy(() => import('./components/admin/layout/AdminLayout'));
const AdminOverview = lazy(() => import('./pages/admin/AdminOverview'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const AdminUserDetail = lazy(() => import('./pages/admin/AdminUserDetail'));
const AdminChats = lazy(() => import('./pages/admin/AdminChats'));
const AdminTests = lazy(() => import('./pages/admin/AdminTests'));
const AdminAnalytics = lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminPdfs = lazy(() => import('./pages/admin/AdminPdfs'));
const AdminLearningPaths = lazy(() => import('./pages/admin/AdminLearningPaths'));
const AdminReports = lazy(() => import('./pages/admin/AdminReports'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettings'));

function LearnerMainApp() {
  const [theme, setTheme] = useState(getInitialTheme);
  const [viewMode, setViewMode] = useState('landing'); // 'landing' | 'studio'
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState('student');
  const [authMode, setAuthMode] = useState('signin');

  const { user, role, setSession, logout, refreshSession, sessionRemaining } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize theme
  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    applyTheme(initial);
    refreshSession();
  }, [refreshSession]);

  // Open login modal if URL is /login
  useEffect(() => {
    if (location.pathname === '/login') {
      setAuthModalOpen(true);
      setAuthMode('signin');
    } else if (location.pathname === '/dashboard') {
      setViewMode('studio');
    }
  }, [location.pathname]);

  // Handle #studio hash
  useEffect(() => {
    if (window.location.hash === '#studio') {
      setViewMode('studio');
    }

    const handlePopState = (e) => {
      if (e.state?.view === 'studio' || window.location.hash === '#studio') {
        setViewMode('studio');
      } else {
        setViewMode('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleEnterStudio = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.location.hash !== '#studio') {
      window.history.pushState({ view: 'studio' }, '', '#studio');
    }
    setViewMode('studio');
  };

  const handleGoHome = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (window.location.hash === '#studio') {
      window.history.pushState({ view: 'landing' }, '', window.location.pathname);
    }
    setViewMode('landing');
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyTheme(next);
  };

  const handleOpenAuth = (mode = 'signin', targetRole = 'student') => {
    setAuthRole(targetRole);
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (session) => {
    setSession(session);
    if (session?.user?.role === 'admin') {
      navigate('/admin');
    } else {
      handleEnterStudio();
    }
  };

  const handleSignOut = () => {
    logout();
    handleGoHome();
  };

  return (
    <div
      className={`bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased transition-colors duration-200 ${viewMode === 'studio' ? 'fixed inset-0 overflow-hidden' : 'min-h-screen'
        }`}
    >
      {viewMode === 'landing' ? (
        <div className="flex flex-col min-h-screen">
          <LandingNavbar
            theme={theme}
            onToggleTheme={toggleTheme}
            onOpenAuth={handleOpenAuth}
            onEnterStudio={handleEnterStudio}
          />

          <main className="flex-1">
            <LandingHero
              onGetStarted={() => handleOpenAuth('signup')}
              onExploreStudio={handleEnterStudio}
            />
            <LandingHowItWorks />
            <LandingFeatures />
          </main>

          <LandingCtaFooter
            onGetStarted={() => handleOpenAuth('signup')}
            onEnterStudio={handleEnterStudio}
          />
        </div>
      ) : (
        <StudioWorkspace
          currentUser={user}
          sessionRemaining={sessionRemaining}
          onSignOut={handleSignOut}
          onGoHome={handleGoHome}
        />
      )}

      {/* Multi-Role Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
          if (location.pathname === '/login') {
            navigate('/', { replace: true });
          }
        }}
        initialRole={authRole}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* 1. Admin Section (Role-Guarded and Lazy-Loaded) */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:id" element={<AdminUserDetail />} />
        <Route path="chats" element={<AdminChats />} />
        <Route path="tests" element={<AdminTests />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="pdfs" element={<AdminPdfs />} />
        <Route path="learning-paths" element={<AdminLearningPaths />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>

      {/* 2. Learner App & Fallbacks */}
      <Route path="/login" element={<LearnerMainApp />} />
      <Route path="/dashboard" element={<LearnerMainApp />} />
      <Route path="/" element={<LearnerMainApp />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
