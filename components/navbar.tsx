'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Boxes } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-switcher';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Boxes className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              <span className="text-primary">Application</span>
              <span className="text-muted-foreground">Name</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-6">
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary relative py-2',
                      pathname === '/'
                        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/upload"
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary relative py-2',
                      pathname === '/upload'
                        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    Upload
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
