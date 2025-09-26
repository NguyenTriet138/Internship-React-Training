import React from 'react';

type TableEmptyStateProps = {
  message: string;
  colSpan: number;
};

const TableEmptyState: React.FC<TableEmptyStateProps> = ({ message, colSpan }) => (
  <tr>
    <td colSpan={colSpan}>
      <div className="loading-container">{message}</div>
    </td>
  </tr>
);

export default TableEmptyState;
