import React from 'react';

type TextInputProps = {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  id,
  type = 'text',
  value,
  onChange,
  onBlur,
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
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        aria-label={placeholder || id}
      />
    </div>
  );
};

export default TextInput;
