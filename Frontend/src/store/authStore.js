import { create } from 'zustand';
import {
  getActiveSession,
  authenticateUser,
  registerUser,
  clearSession,
  getSessionTimeRemaining,
  createSession,
} from '../utils/auth';

export const useAuthStore = create((set, get) => {
  const initialSession = getActiveSession();

  return {
    user: initialSession?.user || null,
    role: initialSession?.user?.role || null,
    token: initialSession?.token || null,
    isAuthenticated: !!initialSession,
    sessionRemaining: getSessionTimeRemaining() || '',

    // Login action supporting admin, student, and mentor roles
    login: async ({ email, password, role }) => {
      const session = authenticateUser({ email, password, role });
      set({
        user: session.user,
        role: session.user.role,
        token: session.token,
        isAuthenticated: true,
        sessionRemaining: getSessionTimeRemaining() || '24h 0m',
      });
      return session;
    },

    // Register action
    register: async ({ name, email, password, role = 'student' }) => {
      const session = registerUser({ name, email, password, role });
      set({
        user: session.user,
        role: session.user.role,
        token: session.token,
        isAuthenticated: true,
        sessionRemaining: getSessionTimeRemaining() || '24h 0m',
      });
      return session;
    },

    // Direct session setter (e.g. from modal or oauth)
    setSession: (session) => {
      set({
        user: session?.user || null,
        role: session?.user?.role || null,
        token: session?.token || null,
        isAuthenticated: !!session,
        sessionRemaining: getSessionTimeRemaining() || '',
      });
    },

    // Logout action
    logout: () => {
      clearSession();
      set({
        user: null,
        role: null,
        token: null,
        isAuthenticated: false,
        sessionRemaining: '',
      });
    },

    // Refresh session validity check
    refreshSession: () => {
      const session = getActiveSession();
      if (!session) {
        set({
          user: null,
          role: null,
          token: null,
          isAuthenticated: false,
          sessionRemaining: '',
        });
      } else {
        set({
          user: session.user,
          role: session.user.role,
          token: session.token,
          isAuthenticated: true,
          sessionRemaining: getSessionTimeRemaining() || '',
        });
      }
    },
  };
});
