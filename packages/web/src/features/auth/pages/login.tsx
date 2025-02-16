import { LoginForm } from '../components/login-form';
import { Music } from 'lucide-react';
import { Button } from '../../../shared/components/ui/button';
import { usePostApiUsersSeed } from '@/api/hooks/api';
import { ToastProvider } from '@/shared/components/ui/toast';
import { toast } from '@/shared/components/ui/use-toast';

export const LoginPage = () => {
  const seedUser = usePostApiUsersSeed();

  const handleSeed = async () => {
    try {
      await seedUser.mutateAsync();
      toast({
        title: 'Default user created successfully',
        description: 'Default user created successfully',
        variant: 'default',
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Failed to create default user, maybe it already exists?',
        description: 'Failed to create default user, maybe it already exists?',
      });
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-[400px] space-y-10 animate-in fade-in duration-1000">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-black/5 p-4 backdrop-blur">
                <Music className="h-8 w-8 text-black/80" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
              <p className="text-gray-500">Enter your credentials to continue</p>
            </div>
          </div>

          <div className="bg-blue-50/80 backdrop-blur-lg rounded-xl p-4 border border-blue-100 shadow-sm">
            <div className="space-y-3">
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Workshop Credentials:</p>
                <p>Username: <span className="font-mono">test@example.com</span></p>
                <p>Password: <span className="font-mono">Test123!</span></p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSeed}
                disabled={seedUser.isPending}
                className="w-full"
              >
                {seedUser.isPending ? 'Creating user...' : 'Create Default User'}
              </Button>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-[0_0_1px_1px_rgba(0,0,0,0.05)] space-y-6">
            <LoginForm />
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}; 