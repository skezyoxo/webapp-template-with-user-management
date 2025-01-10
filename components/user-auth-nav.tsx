'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export function UserAuthNav() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'User'}
              className="h-[1.2rem] w-[1.2rem] rounded-full"
            />
          ) : (
            <User className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {session?.user ? (
          <>
            <DropdownMenuItem disabled className="flex flex-col items-start">
              <span className="font-medium">{session.user.name}</span>
              {session.user.email && (
                <span className="text-xs text-muted-foreground">{session.user.email}</span>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onSelect={event => {
                event.preventDefault();
                signOut({ callbackUrl: '/' });
              }}
            >
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={event => {
              event.preventDefault();
              signIn('github');
            }}
          >
            Sign in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
