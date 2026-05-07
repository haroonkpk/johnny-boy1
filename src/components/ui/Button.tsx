"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'primary-outline' | 'secondary-outline' | 'review';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}

const Button = ({ 
  variant = 'primary', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) => {
  // Base classes 
  const baseClasses = `inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 cursor-pointer outline-none
    hover:opacity-90 active:scale-95
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
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClasses}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
