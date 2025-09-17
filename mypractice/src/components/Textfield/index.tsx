import React from 'react';

type TextInputProps = {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = true,
  className = '',
}) => {
  return (
    <div className={`form-group-login ${className}`}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        aria-label={placeholder || id}
      />
    </div>
  );
};

export default TextInput;
