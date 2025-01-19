import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/shared/components/ui/toaster';
import { RootLayout } from './shared/layouts/root-layout';
import { Card, CardDescription, CardHeader, CardTitle } from './shared/components/ui/card';
import { LoginPage } from './features/auth/pages/login';
import { UsersPage } from './features/users/pages/users-page';
import { CreateUserPage } from './features/users/pages/create-user-page';
import { SMSPage } from './features/sms/pages/sms-page';

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

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/sms" element={<SMSPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}