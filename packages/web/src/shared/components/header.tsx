import { Bot, MessageSquare, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthStatus } from '../../features/auth/components/auth-status';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <span className="font-bold">AI Stack</span>
            </Link>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/users" className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Users</span>
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/sms" className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>SMS</span>
                </Link>
              </Button>
            </nav>
          </div>
          <AuthStatus />
        </div>
      </div>
    </header>
  );
}