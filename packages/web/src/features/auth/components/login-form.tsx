import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { useLoginWithErrorHandling } from '../api';
import type { LoginRequestDTO } from '../api';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/shared/utils/utils';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login, isPending } = useLoginWithErrorHandling();
  const [formData, setFormData] = useState<LoginRequestDTO>({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const success = await login(formData);
    if (success) {
      navigate('/');
    } else {
      setError(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError(false);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="relative">
          <Mail className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
            error ? "text-rose-300" : "text-gray-500"
          )} />
          <Input
            name="email"
            type="email"
            placeholder="Email address"
            value={formData.email || ''}
            onChange={handleChange}
            className={cn(
              "pl-10 h-11 transition-all duration-200 bg-white/50 hover:bg-white focus:bg-white",
              error && "ring-rose-100 border-rose-200 focus:ring-rose-100 focus:border-rose-200"
            )}
            required
          />
        </div>
        <div className="relative">
          <Lock className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200",
            error ? "text-rose-300" : "text-gray-500"
          )} />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password || ''}
            onChange={handleChange}
            className={cn(
              "pl-10 h-11 transition-all duration-200 bg-white/50 hover:bg-white focus:bg-white",
              error && "ring-rose-100 border-rose-200 focus:ring-rose-100 focus:border-rose-200"
            )}
            required
            minLength={6}
          />
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-500/80 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="h-4 w-4" />
          <span>Please check your credentials and try again</span>
        </div>
      )}
      <Button 
        type="submit" 
        disabled={isPending}
        className="w-full h-11 transition-all duration-200"
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Signing in...</span>
          </div>
        ) : (
          'Continue'
        )}
      </Button>
    </form>
  );
}; 