import React from 'react';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  children,
  className,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${className} px-5 py-2 rounded-full cursor-pointer text-white bg-cyan-400 transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:brightness-90 hover:saturate-125`}
    >
      {children}
    </button>
  );
};

export default Button;
