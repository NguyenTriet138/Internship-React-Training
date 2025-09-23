import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, disabled = false, type = 'button', className = '', ...rest }) => {
  return (
    <button className={`button ${className}`} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default Button;
