import React from 'react';
import PageNumbers from '@components/pagination/PageNumber';

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  pages: number[];
  onPageChange: (page: number) => void;
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  pages,
  onPageChange,
}) => (
  <div className="pagination-buttons">
    <button
      id="prev-page"
      className="button"
      disabled={currentPage <= 1}
      onClick={() => onPageChange(currentPage - 1)}
    >
      Previous
    </button>

    <PageNumbers pages={pages} currentPage={currentPage} onPageChange={onPageChange} />

    <button
      id="next-page"
      className="button"
      disabled={currentPage >= totalPages}
      onClick={() => onPageChange(currentPage + 1)}
    >
      Next
    </button>
  </div>
);

export default PaginationControls;
