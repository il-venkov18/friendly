// button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`
        bg-blue-500 hover:bg-blue-600 text-white font-medium 
        rounded-lg px-6 py-3 transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-blue-400 
        focus:ring-offset-2 focus:ring-offset-[#1C1C1C] ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};