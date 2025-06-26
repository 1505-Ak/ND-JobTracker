import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline';
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  const styles = {
    default: 'inline-flex items-center rounded-full bg-gray-100 text-gray-800 px-2 py-0.5 text-xs font-semibold',
    outline: 'inline-flex items-center rounded-full border border-gray-300 text-gray-800 px-2 py-0.5 text-xs font-semibold',
  };
  return <span className={cn(styles[variant], className)} {...props} />;
}; 