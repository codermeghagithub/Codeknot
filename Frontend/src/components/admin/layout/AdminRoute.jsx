import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

/**
 * AdminRoute Guard
 * Only allows users with role === 'admin'.
 * Unauthenticated users are redirected to /login (or /?auth=signin).
 * Authenticated non-admin users are redirected to /dashboard (or /#studio).
 */
export default function AdminRoute({ children }) {
  const { isAuthenticated, role, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated || !user) {
    // Unauthenticated: redirect to login preserving intent
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role !== 'admin') {
    // Authenticated but non-admin: redirect to student dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
