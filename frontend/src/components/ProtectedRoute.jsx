import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authFetch, clearTokens } from '../services/api';

export default function ProtectedRoute({ children, role = null }) {
  const [authStatus, setAuthStatus] = useState('loading');
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setAuthStatus('unauthorized');
        return;
      }
      try {
        const res = await authFetch('/auth/me/');
        if (!res.ok) {
          clearTokens();
          setAuthStatus('unauthorized');
          return;
        }
        const user = await res.json();
        if (role === 'staff' && !user.is_staff) {
          setAuthStatus('forbidden');
        } else {
          setAuthStatus('authorized');
        }
      } catch (err) {
        setAuthStatus('unauthorized');
      }
    };
    checkAuth();
  }, [role, location]);

  if (authStatus === 'loading') {
    return <div className="text-center py-20 text-white text-xl">Loading...</div>;
  }
  if (authStatus === 'unauthorized') {
    return <Navigate to="/login" replace />;
  }
  if (authStatus === 'forbidden') {
    return <Navigate to="/" replace />; // Or a dedicated 'forbidden' page
  }

  return children;
}