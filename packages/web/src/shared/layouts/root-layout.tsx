import { Outlet } from 'react-router-dom';
import { Header } from '../components/header';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
} 