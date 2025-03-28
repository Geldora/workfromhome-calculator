
import React, { ReactNode, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

// Use memo to prevent unnecessary re-renders of the Layout component
const Layout = memo(({ children, title, subtitle }: LayoutProps) => {
  const location = useLocation();
  
  const routes = [
    { path: '/', label: 'Work Habits' },
    { path: '/costs', label: 'Annual Costs' },
    { path: '/results', label: 'Results' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 sm:px-6 md:py-24">
      <div className="w-full max-w-3xl mx-auto space-y-12 animate-fade-in flex flex-col min-h-[calc(100vh-8rem)]">
        <header className="space-y-2 text-center">
          <h1 className="text-4xl font-light text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          )}
        </header>

        <nav className="pt-2">
          <div className="flex justify-center overflow-x-auto scrollbar-hide">
            <div className="flex space-x-1 p-1 rounded-full bg-secondary/50 backdrop-blur-sm">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className={cn(
                    'relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                    location.pathname === route.path
                      ? 'text-primary-foreground bg-primary shadow-sm'
                      : 'text-foreground/70 hover:text-foreground hover:bg-secondary/80'
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <main className="w-full flex-grow animate-slide-up">
          <div className="bg-white/70 backdrop-blur-sm border border-border/50 rounded-2xl shadow-sm p-8 w-full">
            {children}
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
});

// Display name for React DevTools
Layout.displayName = 'Layout';

export default Layout;
