import { useNavigate } from 'react-router-dom';
import { Button } from '../../../shared/components/ui/button';
import { useGetCurrentUser, useLogout } from '../api';

export const AuthStatus = () => {
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate('/login');
      },
    });
  };

  // If we have a user, show their info and logout button
  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{user.email}</span>
        <Button 
          variant="ghost" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Signing out...' : 'Sign Out'}
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