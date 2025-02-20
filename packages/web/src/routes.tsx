import { Bot, Users } from 'lucide-react';
import { CreateUserPage } from './features/users/pages/create-user-page';
import { UsersPage } from './features/users/pages/users-page';
import { Card, CardDescription, CardHeader, CardTitle } from './shared/components/ui/card';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  isHeaderItem?: boolean;
  requiresAuth?: boolean;
  icon?: React.ReactNode;
  label?: string;
}

function WelcomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to AI-Stack</CardTitle>
          <CardDescription>
            Play around and see what you can build!
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <WelcomePage />,
    isHeaderItem: true,
    icon: <Bot className="h-4 w-4" />,
    label: 'Home'
  },
  {
    path: '/users',
    element: <UsersPage />,
    isHeaderItem: true,
    requiresAuth: true,
    icon: <Users className="h-4 w-4" />,
    label: 'Users'
  },
  {
    path: '/users/create',
    element: <CreateUserPage />,
    isHeaderItem: false,
    requiresAuth: true
  },
]; 