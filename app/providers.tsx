'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/auth.context';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          themes={['light', 'dark', 'rose', 'blue', 'green', 'purple', 'orange']}
        >
          {children}
        </ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
