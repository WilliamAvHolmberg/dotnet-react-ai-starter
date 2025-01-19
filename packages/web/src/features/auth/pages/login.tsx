import { LoginForm } from '../components/login-form';
import { Music } from 'lucide-react';

export const LoginPage = () => {
  return (
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
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-[0_0_1px_1px_rgba(0,0,0,0.05)] space-y-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}; 