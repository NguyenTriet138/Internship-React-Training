import React from 'react';

type TableLoadingProps = {
  colSpan: number;
};

const TableLoading: React.FC<TableLoadingProps> = ({ colSpan }) => (
  <tr>
    <td colSpan={colSpan}>
      <div className="loading-container">Loading products...</div>
    </td>
  </tr>
);

export default TableLoading;
