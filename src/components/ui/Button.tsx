"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'review';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  isLoading,
  disabled,
  ...props 
}: ButtonProps) => {
  // Base classes 
  const baseClasses = `inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 outline-none
    ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-95 cursor-pointer'}
    text-[clamp(0.875rem,1vw+0.5rem,1rem)]
    px-[clamp(1rem,2.5vw,1.5rem)]
    py-[clamp(0.6rem,1.5vw,0.875rem)]
    gap-[clamp(0.4rem,1vw,0.75rem)]`;
  
  const variantClasses = {
    primary: "bg-white text-black hover:bg-gray-200",
    secondary: "bg-black text-white  border border-black/20 hover:bg-gray-800 font-bold",
    'primary-outline': "bg-transparent text-white border border-white/20 hover:bg-white/10",
    'secondary-outline': "bg-transparent text-black border border-black/20 hover:bg-black/5 font-bold",
    review: "bg-white/90 backdrop-blur-sm text-black border border-black/10"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <motion.button
      whileHover={(!disabled && !isLoading) ? { y: -2 } : {}}
      whileTap={(!disabled && !isLoading) ? { scale: 0.98 } : {}}
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </motion.button>
  );
};

export default Button;
