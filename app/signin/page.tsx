'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignInPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button
              variant="outline"
              onClick={() => signIn('github', { callbackUrl: '/' })}
              className="w-full"
            >
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
