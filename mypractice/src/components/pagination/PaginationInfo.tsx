import React from 'react';

type PaginationInfoProps = {
  startItem: number;
  endItem: number;
  totalItems: number;
};

const PaginationInfo: React.FC<PaginationInfoProps> = ({ startItem, endItem, totalItems }) => (
  <div className="pagination-info">
    <span id="results-count">
      Showing {startItem}-{endItem} of {totalItems} results
    </span>
  </div>
);

export default PaginationInfo;
