'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { ErrorBoundary } from '@/components/error-boundary';
import { AuthProvider } from '@/contexts/auth.context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        themes={['light', 'dark', 'rose', 'blue', 'green', 'purple', 'orange']}
      >
        <AuthProvider>
          <ErrorBoundary>{children}</ErrorBoundary>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
