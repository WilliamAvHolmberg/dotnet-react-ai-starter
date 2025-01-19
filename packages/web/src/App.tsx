import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/shared/components/ui/toaster';
import { RootLayout } from './shared/layouts/root-layout';
import { routes, RouteConfig } from './routes';
import { AuthGuard } from './features/auth/components/auth-guard';
import { AuthProvider } from './features/auth/context/auth-context';

function renderRoutes(routes: RouteConfig[]) {
  return routes.map(route => {
    const element = route.requiresAuth ? (
      <AuthGuard>{route.element}</AuthGuard>
    ) : (
      route.element
    );

    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={element}>
          {renderRoutes(route.children)}
        </Route>
      );
    }
    return <Route key={route.path} path={route.path} element={element} />;
  });
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<RootLayout />}>
            {renderRoutes(routes.filter(route => route.path !== '/login'))}
          </Route>
          {routes.find(route => route.path === '/login') && (
            <Route path="/login" element={routes.find(route => route.path === '/login')?.element} />
          )}
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}