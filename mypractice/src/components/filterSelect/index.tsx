import React from 'react';

type Option = { value: string; label: string };

type FilterSelectProps = {
  id: string;
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

const FilterSelect: React.FC<FilterSelectProps> = ({ id, label, value, options, onChange }) => (
  <div className="title-group">
    <label className="text text-title" htmlFor={id}>
      {label}
    </label>
    <select
      id={id}
      className="product-filter text text-info selection"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default FilterSelect;
