import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

interface SelectContextValue {
  value: string;
  setValue: (v: string) => void;
}
const SelectCtx = createContext<SelectContextValue | null>(null);

interface SelectProps {
  value: string;
  onValueChange: (v: string) => void;
  children: React.ReactNode;
}
export const Select = ({ value, onValueChange, children }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  const context: SelectContextValue = {
    value,
    setValue: (v) => {
      onValueChange(v);
      setOpen(false);
    },
  };
  return (
    <SelectCtx.Provider value={context}>
      <div className="relative inline-block w-full">{
        React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as any, { open, toggle });
        })}
      </div>
    </SelectCtx.Provider>
  );
};

export const SelectTrigger = ({ className, children, toggle }: any) => (
  <button type="button" onClick={toggle} className={cn('w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-sm', className)}>
    {children}
  </button>
);

export const SelectValue = () => {
  const ctx = useContext(SelectCtx);
  if (!ctx) return null;
  return <span>{ctx.value}</span>;
};

export const SelectContent = ({ className, open, children }: any) => {
  if (!open) return null;
  return (
    <div className={cn('absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg', className)}>
      {children}
    </div>
  );
};

interface SelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}
export const SelectItem = ({ value, children, className, ...props }: SelectItemProps) => {
  const ctx = useContext(SelectCtx);
  if (!ctx) return null;
  const isSelected = ctx.value === value;
  return (
    <div
      role="option"
      aria-selected={isSelected}
      onClick={() => ctx.setValue(value)}
      className={cn('px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm', isSelected && 'bg-gray-100 font-medium', className)}
      {...props}
    >
      {children}
    </div>
  );
}; 