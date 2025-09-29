import React from 'react';

type ErrorMessageProps = {
  title?: string;
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ title = 'Error', message }) => (
  <div className="error-container">
    <h2>{title}</h2>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
