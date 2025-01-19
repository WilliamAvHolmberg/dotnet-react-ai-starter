import { createContext, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUser, useLogout } from '../api';
import type { UserProfileResponseDTO } from '../api';

interface AuthContextValue {
  user: UserProfileResponseDTO | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetCurrentUser({
    query: {
      retry: 0, // Don't retry on 401s
      refetchOnWindowFocus: false
    }
  });

  const { mutate: logout } = useLogout();

  const handleLogout = useCallback(() => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  }, [logout, navigate]);

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 