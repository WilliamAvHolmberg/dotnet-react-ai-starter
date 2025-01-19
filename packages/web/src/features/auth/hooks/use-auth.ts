import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// TODO: Replace with actual auth state management (e.g., using Zustand, Redux, etc.)
let isAuthenticated = false;

export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useCallback(() => {
    isAuthenticated = true;
    const state = location.state as { from?: { pathname: string } };
    const from = state?.from?.pathname || '/';
    navigate(from);
  }, [navigate, location]);

  const logout = useCallback(() => {
    isAuthenticated = false;
    navigate('/login');
  }, [navigate]);

  return {
    isAuthenticated,
    login,
    logout
  };
} 