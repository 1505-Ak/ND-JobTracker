import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'default', size = 'default', ...props },
    ref
  ) => {
    const variantClasses = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border border-gray-300 hover:bg-gray-100',
      ghost: 'hover:bg-gray-100',
    }[variant];

    const sizeClasses = {
      default: 'px-4 py-2 text-sm',
      sm: 'px-3 py-1.5 text-sm',
    }[size];

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium focus:outline-none transition-colors disabled:opacity-50 disabled:pointer-events-none',
          variantClasses,
          sizeClasses,
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button'; 