import React from 'react';

type FilterInputProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

const FilterInput: React.FC<FilterInputProps> = ({ id, label, value, placeholder, onChange }) => (
  <div className="title-group">
    <label className="text text-title" htmlFor={id}>
      {label}
    </label>
    <input
      type="text"
      id={id}
      className="product-filter text text-info"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default FilterInput;
