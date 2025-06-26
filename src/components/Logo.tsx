import React from 'react';
import logoImg from '../../4EEBFF23-9B09-4D9B-A505-7ACE647A89B0.jpeg';

interface LogoProps {
  /**
   * Additional Tailwind classes to apply.
   */
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => (
  <img
    src={logoImg}
    alt="Employed logo"
    className={`h-16 sm:h-18 md:h-20 lg:h-24 w-auto select-none rounded-md shadow-md ${className}`}
  />
);

export default Logo; 