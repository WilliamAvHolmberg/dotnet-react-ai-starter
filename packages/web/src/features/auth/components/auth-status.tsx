import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/button';
import { useAuth } from '../context/auth-context';

export const AuthStatus = () => {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();

  // If we have a user, show their info and logout button
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{user.email}</span>
        <Button 
          variant="ghost" 
          onClick={logout}
          disabled={isLoading}
        >
          {isLoading ? 'Signing out...' : 'Sign Out'}
        </Button>
      </div>
    );
  }

  // Otherwise show login button (during loading or when not authenticated)
  return (
    <Button variant="ghost" onClick={() => navigate('/login')}>
      Sign In
    </Button>
  );
}; 