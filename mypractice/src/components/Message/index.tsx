import React from 'react';
import { MessageType } from '../../types/user.types';

type FormMessageProps = {
  message: string;
  type?: MessageType;
  className?: string;
};

const FormMessage: React.FC<FormMessageProps> = ({ message, type = 'error', className = '' }) => {
  return (
    <div className={`form-message ${type} ${className}`} style={{ display: message ? 'block' : 'none' }}>
      {message}
    </div>
  );
};

export default FormMessage;
