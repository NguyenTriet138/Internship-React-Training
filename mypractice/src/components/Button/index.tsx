import React from 'react';

type PrimaryButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, disabled = false, type = 'button', className = '', ...rest }) => {
  return (
    <button className={`button ${className}`} type={type} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};

export default PrimaryButton;
