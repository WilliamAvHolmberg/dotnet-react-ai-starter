import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/shared/components/ui/toaster';
import { RootLayout } from './shared/layouts/root-layout';
import { routes, RouteConfig } from './routes';
import { AuthGuard } from './features/auth/components/auth-guard';
import { AuthProvider } from './features/auth/context/auth-context';
import { LoginPage } from './features/auth/pages/login';

function renderRoutes(routes: RouteConfig[]) {
  return routes.map(route => {
    const element = route.requiresAuth ? (
      <AuthGuard>{route.element}</AuthGuard>
    ) : (
      route.element
    );

    return <Route key={route.path} path={route.path} element={element} />;
  });
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<RootLayout />}>
            {renderRoutes(routes)}
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}