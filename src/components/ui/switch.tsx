import React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(({ className, ...props }, ref) => (
  <label className="inline-flex items-center cursor-pointer">
    <input
      ref={ref}
      type="checkbox"
      className="sr-only peer"
      {...props}
    />
    <div
      className={cn(
        'w-9 h-5 bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 peer-checked:bg-blue-600 relative transition-colors',
        className
      )}
    >
      <span
        className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"
      />
    </div>
  </label>
));
Switch.displayName = 'Switch'; 