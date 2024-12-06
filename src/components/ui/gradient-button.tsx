// components/GradientButton.tsx

import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;  // Changed 'Children' to 'children'
  onClick?: () => void;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-purple-500 to-teal-300 text-white font-semibold py-2 px-6 rounded-full shadow-md 
                  hover:opacity-95  transform transition-transform duration-300 ease-in-out hover:scale-105
                  focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default GradientButton;
