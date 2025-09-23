import React from 'react';

type ItemsPerPageSelectProps = {
  itemsPerPage: number;
  onChange: (items: number) => void;
};

const ItemsPerPageSelect: React.FC<ItemsPerPageSelectProps> = ({ itemsPerPage, onChange }) => (
  <div className="items-per-page">
    <label htmlFor="items-per-page">Items per page:</label>
    <select
      id="items-per-page"
      value={itemsPerPage}
      onChange={(e) => onChange(Number(e.target.value))}
      className="text text-info selection"
    >
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </div>
);

export default ItemsPerPageSelect;
