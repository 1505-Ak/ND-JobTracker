import React from 'react';

interface LogoProps {
  /**
   * Additional Tailwind classes to apply.
   */
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => (
  <img
    src="/logo.jpeg"
    alt="Employed logo"
    className={`h-16 sm:h-18 md:h-20 lg:h-24 w-auto select-none rounded-md shadow-md ${className}`}
  />
);

export default Logo; 