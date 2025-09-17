import React from 'react';

type PrimaryButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, disabled = false, type = 'button', className = '' }) => {
  return (
    <button className={`button ${className}`} type={type} disabled={disabled}>
      {children}
    </button>
  );
};

export default PrimaryButton;
