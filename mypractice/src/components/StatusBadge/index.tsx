import React from 'react';
import { ProductStatus } from '../../types/product.types';

type StatusBadgeProps = {
  status: ProductStatus;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusClass =
    status === ProductStatus.Available ? 'status-available' : 'status-sold-out';

  return <span className={`status-badge ${statusClass}`}>{status}</span>;
};

export default StatusBadge;
