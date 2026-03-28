import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({ children, className = "", variant = 'primary', type = 'button', disabled = false, onClick }: ButtonProps) {
  const baseStyle = "rounded-full px-6 py-3 font-bold transition-all duration-300 inline-flex items-center justify-center";
  const variants = {
    primary: "bg-accent text-white hover:bg-red-900 shadow-[0_0_20px_rgba(185,28,28,0.2)] hover:shadow-[0_0_30px_rgba(185,28,28,0.4)]",
    secondary: "bg-plum text-white hover:bg-purple-900",
    outline: "border-2 border-neutral-700 text-white hover:border-accent hover:text-accent bg-transparent"
  };

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {children}
    </button>
  );
}
