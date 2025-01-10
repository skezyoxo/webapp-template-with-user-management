import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Loading({ className, size = 'md', fullScreen = false }: LoadingProps) {
  const content = <Loader2 className={cn('animate-spin', sizeClasses[size], className)} />;

  if (fullScreen) {
    return <div className="flex h-screen w-screen items-center justify-center">{content}</div>;
  }

  return content;
}
